# Quasargram (quasargram)
Quasargram App

## I used it as a reference
https://www.youtube.com/watch?v=opmng7llVJ0
His Tutorials are awesome. Thanks

## setup
```
# for camera
npm install --save md-gum-polyfill
```


## Install the dependencies
```bash
yarn
# or
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Lint the files
```bash
yarn lint
# or
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://v1.quasar.dev/quasar-cli/quasar-conf-js).



### backend

``` shell
cd backend

# setup
npm install express --save
npm install -g nodemon
npm install firebase-admin --save
npm install busboy --save
heroku plugins:install heroku-builds

# run
npm start
```


## Deploy
for Firebase Hosting
```
# setup
npm install -g firebase-tools
# login
firebase login
# init
firebase init

? Please select an option: Use an existing project
? Select a default Firebase project for this directory: quasargram-be710 (Quasargram)
? What do you want to use as your public directory? dist/spa
? Configure as a single-page app (rewrite all urls to /index.html)? No
? Set up automatic builds and deploys with GitHub? No
+  Wrote dist/spa/404.html
? File dist/spa/index.html already exists. Overwrite? No
i  Skipping write of dist/spa/index.html

i  Writing configuration info to firebase.json...
i  Writing project information to .firebaserc...

+  Firebase initialization complete!

# Deploy
firebase deploy


=== Deploying to 'quasargram-be710'...

i  deploying hosting
i  hosting[quasargram-be710]: beginning deploy...
i  hosting[quasargram-be710]: found 28 files in dist/spa
+  hosting[quasargram-be710]: file upload complete
i  hosting[quasargram-be710]: finalizing version...
+  hosting[quasargram-be710]: version finalized
i  hosting[quasargram-be710]: releasing new version...
+  hosting[quasargram-be710]: release complete

+  Deploy complete!

Project Console: https://console.firebase.google.com/project/quasargram-be710/overview
Hosting URL: https://quasargram-be710.web.app

```


## Guide
### Firebase Storage
https://firebase.google.com/docs/storage/admin/start


### Firebase Hosting
https://firebase.google.com/docs/hosting?authuser=0&hl=ja
