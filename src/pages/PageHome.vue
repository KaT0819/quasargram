<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-sm-8">
        <template v-if="!loadingPosts && posts.length">
          <q-card
            v-for="post in posts"
            :key="post.id"
            class="my-card q-mb-md"
            flat
            bordered
          >
            <q-item>
              <q-item-section avatar>
                <q-avatar size="48px">
                  <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
                </q-avatar>
              </q-item-section>

              <q-item-section>
                <q-item-label class="text-bold">Title</q-item-label>
                <q-item-label caption> {{ post.location }} </q-item-label>
              </q-item-section>
            </q-item>
            <q-separator />
            <q-img class="col-5" :src="post.imageUrl" />
            <q-card-section>
              <div class="text-h6">{{ post.location }}</div>
              <div class="text-caption text-grey">
                {{ post.date | niceDate }}
              </div>
            </q-card-section>
          </q-card>
        </template>
        <template v-else-if="!loadingPosts && !posts.length">
          <h5 class="text-center text-grey">まだ投稿がありません。</h5>
        </template>
        <template v-else>
          <q-card flat bordered>
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" size="40px" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square />

            <q-card-actions align="right" class="q-gutter-md">
              <q-skeleton type="QBtn" />
              <q-skeleton type="QBtn" />
            </q-card-actions>
          </q-card>
        </template>
      </div>
      <div class="col-4 large-screen-only">
        <q-item>
          <q-item-section avatar>
            <q-avatar size="48px">
              <img src="https://cdn.quasar.dev/img/boy-avatar.png" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-bold">Title</q-item-label>
            <q-item-label caption> text </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script>
// import { response } from "app/backend/node_modules/@types/express";
import { date } from "quasar";

export default {
  name: "PageHome",
  data() {
    return {
      posts: [],
      loadingPosts: false,
    };
  },
  methods: {
    getPosts() {
      this.loadingPosts = true;
      this.$axios
        .get("http://localhost:3000/posts")
        .then((response) => {
          console.log("response:", response);
          this.posts = response.data;
          this.loadingPosts = false;
        })
        .catch((err) => {
          this.$q.dialog({
            title: "エラー",
            message: "投稿が取得できませんでした。",
          });
          this.loadingPosts = false;
        });
      // これで囲むと時間を待たせることが出来る
      // setTimeout(() => {}, 3000);
    },
  },
  filters: {
    niceDate(value) {
      return date.formatDate(value, "MMMM D h:mm:ssA");
    },
  },
  created() {
    this.getPosts();
  },
};
</script>

<style lang="sass">
.card-post
  .q-img
    min-height: 200px
</style>
