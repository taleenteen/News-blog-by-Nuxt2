<template>
  <div>
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
</template>
  
  <script>
export default {
  async asyncData({ params }) {
    const id = params.id // When calling /abc the slug will be "abc"
    return { id }
  },
  data() {
    return {
      category_id: '',
      Comments: {},
      Post: {},
      allUser: {},
      content: '',
    }
  },
  methods: {
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
    formatDateEN(date) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
      return new Date(date).toLocaleDateString('en-GB', options)
    },
    /*  getCategory(){
    if (this.Post.category_id == '1') {
            this.category_id='Education'
          }
          else if (this.Post.category_id == '2'){
            this.category_id='Economy'
          }
  } */
  },
}
</script>