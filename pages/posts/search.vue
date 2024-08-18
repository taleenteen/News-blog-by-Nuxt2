<template>
  <v-main class="pt-0">
    <v-container class="justify-center">
      <div class="block1">
        <v-row>
          <v-col justify="center">
            <v-text-field
              v-model="search"
              label="กรอกข้อความที่ต้องการค้นหา"
              solo
              @keydown.enter="getSearch()"
            >
              <template v-slot:append>
                <v-fade-transition>
                  <v-icon v-if="search" @click="getSearch()">
                    mdi-magnify
                  </v-icon>
                </v-fade-transition>
              </template>
            </v-text-field>
          </v-col>
        </v-row>

        <v-row align="center" justify="center" dense class="text-left">
          <v-col cols="7" v-if="result === ''">
            <h1 align="center">Please insert text to search</h1>
          </v-col>
          <v-col cols="7" v-if="result != ''">
            <h1 align="center">Search result of "{{ result }}"</h1>
          </v-col>
        </v-row>

        <v-row align="center" justify="center" dense>
          <v-col cols="7"><v-divider></v-divider></v-col>
        </v-row>

        <v-row justify="center">
          <div
            v-for="(news, index) in allPost"
            :key="news.id"
            @click="handleClick(news)"
          >
            <v-col v-if="index == 0">
              <div class="bigcard" @click="handleClick(news)">
                <CardL
                  :picture="news.picture"
                  :title="news.title"
                  :createdAt="news.createdAt"
                />
              </div>
            </v-col>

            <v-col v-else cols="6" justify="center">
              <CardS
                :picture="news.picture"
                :title="news.title"
                :createdAt="news.createdAt"
              />
            </v-col>
          </div>
        </v-row>
      </div>
      <v-pagination
        class="pagination mb-2"
        v-model="page"
        :length="totalpages"
      ></v-pagination>
    </v-container>
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="text-h5">
          {{ title }}
        </v-card-title>

        <v-card-text>
          {{ message }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false"> ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>
  
  <script>
export default {
  watch: {
    page() {
      this.getSearch()
    },
  },
  data() {
    return {
      search: '',
      page: 1,
      allPost: [],
      posts: {},
      totalpages: 0,
      dialog: false,
      title: '',
      message: '',
      result: '',
    }
  },
  methods: {
    async getSearch() {
      if (this.search == '') {
        this.title = 'ไม่พบสิ่งที่ค้นหา'
        this.message = 'โปรดใส่ตัวอักษรเพื่อค้นหา'
        this.dialog = true
        return
      } else {
        let data = await this.$store.dispatch('api/public/getSearch', {
          params: {
            search: this.search,
            page: this.page,
          },
        })
        this.allPost = data.post
        this.totalpages = data.totalpages
        this.result = this.search
      }
    },
    handleClick(news) {
      console.log('News', news)
      window.location = '/posts/' + news.id
    },
    formatDateEN(date) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
      return new Date(date).toLocaleDateString('en-GB', options)
    },
  },
}
</script>
  
  <style scoped>
.block1 {
  max-width: 732px;
  min-width: 344px;

  margin: auto;
  padding: 0;
}

.block2 {
  max-width: 344px;
  min-width: 344px;
  height: 302px;

  margin: auto;
}

.bigcard {
  display: flex;
  height: 302px;
}

.cimg {
  max-width: 434px;
  min-width: 344px;
  max-height: 294px;
  float: left;
}

.ctitle {
  max-height: 210px;

  min-width: 200px;
  max-width: 240px;
  float: left;
}

.cdate {
  max-width: 110px;
  float: left;
}
</style>
  