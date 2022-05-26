/**
 * dependencies
 */

const express = require("express");
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
} = require("firebase-admin/firestore");
const { getStorage } = require('firebase-admin/storage');

let inspect = require("util").inspect;
let busboy = require('busboy');
let path = require('path');
let os = require('os');
let fs = require('fs');
const { v4: uuidv4 } = require('uuid');

/**
 * config - express
 */
const app = express();

/**
 * config - firebase
 */
const serviceAccount = require('./serviceAccountKey.json');

initializeApp({
  credential: cert(serviceAccount),
  storageBucket: 'quasargram-be710.appspot.com'
});

const db = getFirestore();
let bucket = getStorage().bucket()

/**
 * endpoint
 */
app.get('/posts', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  let posts = [];
  db.collection('posts')
    .orderBy('date', 'desc')
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        // console.log(doc.id, "=>", doc.data());
        posts.push(doc.data());
      });
      res.send(posts);
    });
});

app.post('/createPost', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');

  console.log('POST request');
  let uuid = uuidv4()
  const bb = busboy({ headers: req.headers });
  let fields = {}
  let fileData = {}

  bb.on("file", (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );
    let filepath = path.join(os.tmpdir(), filename)
    file.pipe(fs.createWriteStream(filepath))
    fileData = { filepath, mimeType }
  });
  bb.on("field", (name, val, info) => {
    console.log(`Field [${name}]: value: %j`, val);
    fields[name] = val
  });
  bb.on("close", () => {
    console.log('fields:', fields);
    console.log('uuid:', uuid);

    bucket.upload(
      fileData.filepath,
      {
        uploadType: 'media',
        metadata: {
          contentType: fileData.mimeType,
          firebaseStrageDownloadToken: uuid
        }
      },
      (err, uploadedFile) => {
        if (!err) {
          createDocument(uploadedFile)
        }
      }
    )

    function createDocument(uploadedFile) {
      db.collection('posts').doc(fields.id).set({
        id: fields.id,
        caption: fields.caption,
        location: fields.location,
        date: parseInt(fields.date),
        imageUrl: `https://firebasestorage.googleapis.com/v0/b/${
          bucket.name }/o/${ uploadedFile.name }?alt=media&token=${ uuid }`
      }).then(() => {
        res.send('Post added: ' + fields.id)
      })
    }
  });

  req.pipe(bb);
});

/**
 * listen
 */
// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })
app.listen(process.env.PORT || 3000);
