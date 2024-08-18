<template>
  <div>
    <v-row align="center" justify="center" dense class="text-center mb-5">
      <!--  main banner -->
      <v-col>
        <v-row align="center" justify="center" dense class="text-left">
          <v-col cols="8">
            <h1>{{ Post.title }}</h1>
          </v-col>
        </v-row>

        <v-row align="center" justify="center" dense>
          <v-col cols="4" class="text-left">
            <h4>
              <v-icon>mdi-calendar-range</v-icon>วันที่
              {{ formatDateEN(Post.createdAt) }}
            </h4>
          </v-col>
          <v-col cols="4" class="text-right">
            <h4>
              ประเภทข่าว {{ Post.category ? Post.category.category_name : '' }}
            </h4>
          </v-col>
        </v-row>

        <v-row align="center" justify="center" dense>
          <v-col cols="8"><v-divider></v-divider></v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-img
              class="mx-auto"
              :src="Post.picture"
              height="700"
              width="700"
            ></v-img>
          </v-col>
        </v-row>

        <v-row align="center" justify="center" dense>
          <v-col cols="8"><v-divider></v-divider></v-col>
        </v-row>
      </v-col>
    </v-row>
    <!--  end main banner -->
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="6">
        <v-row align="start" justify="center" dense>
          <v-col cols="" align="start">
            <p v-html="Post.content"></p>
          </v-col>
        </v-row>

        <v-row align="center" justify="center" dense>
          <v-col cols=""><v-divider></v-divider></v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="">
            <v-row>
              <v-col class="text-left">
                <h1 style="color: #3e8cda">Comments</h1>
                <v-row class="mb-10" v-for="coms in Comment" :key="coms.id">
                  <v-col cols="9">
                    <v-row
                      align="center"
                      justify="center"
                      dense
                      class="text-left"
                    >
                      <v-col>
                        <p style="color: inherit">
                          <v-icon>mdi-account-circle</v-icon> {{ coms.user_id }}
                        </p>
                      </v-col>
                    </v-row>
                    <v-row
                      align="center"
                      justify="center"
                      dense
                      class="text-left"
                    >
                      <v-col>
                        <p style="color: inherit" v-html="coms.content"></p>
                      </v-col>
                    </v-row>
                  </v-col>
                  <v-col cols="12"><v-divider></v-divider></v-col>
                </v-row>
                <div v-if="$store.getters.isAuth">
                  <p>Comment</p>
                  <v-textarea
                    filled
                    auto-grow
                    v-model="content"
                    label="Comment"
                    rows="4"
                    row-height="30"
                    shaped
                  ></v-textarea>

                  <v-btn
                    @click="getComment()"
                    class="rounded-1 mt-10"
                    color="blue"
                    large
                    block
                  >
                    <div class="white--text font-weight-bold">Comment</div>
                  </v-btn>
                </div>
                <postsCommentLogin v-if="!$store.getters.isAuth" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="2">
        <v-row>
          <v-icon>mdi-fire</v-icon>
          <h3>ยอดนิยม</h3>
        </v-row>
        <v-row class="pr-2 mb-4"><v-divider></v-divider></v-row>
        <!-- /////////////////////////////////////////////////// -->
        <v-row class="mb-2">
          <div
            v-for="(news, index) in relatedPosts"
            :key="news.id"
            @click="$router.push('/posts/' + news.id)"
          >
            <v-col justify="center">
              <CardMini
                :picture="news.picture"
                :title="news.title"
                :createdAt="news.createdAt"
              />
            </v-col>
          </div>
        </v-row>
        <!-- /////////////////////////////////////////////////// -->
      </v-col>
      <v-col cols="2"></v-col>
    </v-row>
  </div>
</template>


<script>
export default {
  async asyncData({ params }) {
    const id = params.id // When calling /abc the slug will be "abc"
    return { id }
  },
  async fetch() {
    let Post = await this.$store.dispatch('api/public/getSinglePost', {
      params: { id: this.id },
    })
    let Comment = await this.$store.dispatch('api/public/getAllComment', {
      params: { id: this.id },
    })
    this.fetctRelated()

    console.log(Post)
    if (Post == null) {
      this.$nuxt.error({
        statusCode: 404,
        message: ' Post Not found ' + this.id,
      })
      return
    } else {
      this.Post = Post
      this.Comment = Comment
    }
  },
  data() {
    return {
      category_id: '',
      Comment: {},
      Post: {},
      allUser: {},
      content: '',
      relatedPosts: [],
    }
  },

  methods: {
    async fetctRelated() {
      let data = await this.$store.dispatch('api/public/getRelatedPosts', {
        params: {
          category_id: this.Post.category_id,
        },
      })
      this.relatedPosts = data
    },
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      let formData = new FormData()
      formData.append('file', file)
      this.$store
        .dispatch('api/file/uploadPicture', formData)
        .then((result) => {
          const url = result // Get url from response
          console.log('this is url', result)
          Editor.insertEmbed(cursorLocation, 'image', url)
          resetUploader()
        })
        .catch((err) => {
          console.log(err)
        })
    },
    formatDateEN(date) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
      return new Date(date).toLocaleDateString('en-GB', options)
    },
    async getComment() {
      try {
        this.loadingDialog = true
        await this.$store.dispatch('api/public/createComment', {
          content: this.content,
          id: this.id,
        })
        this.$nuxt.refresh()
        this.clearInfo().then((res) => {
          console.log(res)
          if (res.status == 201) {
            this.clearInfo()
          } else {
            this.clearInfo()
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    clearInfo() {
      this.content = ''
      this.title = 'Register completed'
      this.message = 'You can login now'
      this.dialog = true
    },
  },
}
</script>
