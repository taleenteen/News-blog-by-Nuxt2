<template>
  <v-main class="pt-0">
    <v-container class="justify-center">
      <div>
        <v-row justify="center">
          <v-col class="d-flex" cols="12" sm="6">
            <v-select
              v-model="categories"
              :items="allCategories"
              item-text="category_name"
              item-value="id"
              label="เลือกประเภทข่าว"
              @input="fetctcategorypost()"
              outlined
              dense
            ></v-select>
            <v-btn
              class="mx-2"
              fab
              dark
              small
              color="primary"
              @click="backFetch()"
              v-if="categories != ''"
            >
              <v-icon dark> mdi-minus </v-icon>
            </v-btn>
          </v-col>
        </v-row>
        <v-row>
          <v-col justify="center">
            <div class="block1">
              <v-row>
                <h1 v-if="categories != ''">ประเภทข่าวที่พบ</h1>
                <h1 v-else>ข่าวทั้งหมด</h1>
              </v-row>
              <v-row justify="center">
                <div
                  v-for="(news, index) in allPost"
                  :key="news.id"
                  @click="$router.push('/posts/' + news.id)"
                >
                  <v-col v-if="index == 0">
                    <div class="bigcard">
                      <CardL
                        :picture="news.picture"
                        :title="news.title"
                        :createdAt="news.createdAt"
                      />
                    </div>
                  </v-col>
                  <v-col v-else justify="center">
                    <CardS
                      :picture="news.picture"
                      :title="news.title"
                      :createdAt="news.createdAt"
                    />
                  </v-col>
                </div>
              </v-row>
            </div>
          </v-col>
        </v-row>
      </div>
      <v-pagination
        class="pagination mb-2"
        v-model="pageCategory"
        :length="totalpages"
        v-if="categories !== ''"
      ></v-pagination>

      <v-pagination
        class="pagination mb-2"
        v-model="page"
        :length="totalpages"
        v-else
      ></v-pagination>
    </v-container>
  </v-main>
</template>

<script>
import AdsLeft from '~/components/AdsLeft.vue'

export default {
  mounted() {
    this.fetchMockData()
  },
  watch: {
    page() {
      this.fetchMockData()
    },
    pageCategory() {
      this.fetchCategoryMockData()
    },
  },
  data() {
    return {
      search: '',
      page: 1,
      pageCategory: 1,
      allPost: [],
      allCategories: [],
      categories: '',
      posts: {},
      totalpages: 0,
    }
  },
  methods: {
    fetchMockData() {
      // ข้อมูลทดลองสำหรับโพส เนื่องจางไม่มี database แล้ว
      const mockPosts = [
        {
          id: 1,
          title: 'ข่าวที่น่าสนใจ 1',
          picture:
            'https://c8.alamy.com/comp/2BEAFRR/tv-news-studio-with-broadcaster-and-breaking-world-background-vector-illustration-breaking-news-on-tv-broadcasting-journalist-2BEAFRR.jpg',
          createdAt: '2024-08-18',
        },
        {
          id: 2,
          title: 'ข่าวที่น่าสนใจ 2',
          picture:
            'https://t4.ftcdn.net/jpg/02/09/53/11/360_F_209531103_vL5MaF5fWcdpVcXk5yREBk3KMcXE0X7m.jpg',
          createdAt: '2024-08-18',
        },
        {
          id: 3,
          title: 'ข่าวที่น่าสนใจ 3',
          picture:
            'https://cdn.pixabay.com/photo/2016/02/01/00/56/news-1172463_640.jpg',
          createdAt: '2024-08-18',
        },
        {
          id: 4,
          title: 'ข่าวที่น่าสนใจ 4',
          picture:
            'https://media.istockphoto.com/id/1197831888/vector/male-hand-holding-megaphone-with-breaking-news-speech-bubble-loudspeaker-banner-for-business.jpg?s=612x612&w=0&k=20&c=4CvdND_C8H3AxDMlEAZ8j9oagSvlmMcNHlrVoqoc9KQ=',
          createdAt: '2024-08-18',
        },
        {
          id: 5,
          title: 'ข่าวที่น่าสนใจ 5',
          picture:
            'https://media.istockphoto.com/id/1425854945/vector/breaking-news-banner-template-illustration-vector-design.jpg?s=612x612&w=0&k=20&c=KZSrOz8sZ24xrKddlBJY8a9Aoy6FC0MR32fz7Fe61sU=',
          createdAt: '2024-08-18',
        },
      ]
      this.allPost = mockPosts
      this.posts = mockPosts[0]
      this.totalpages = 1
    },
    fetchCategoryMockData() {
      // ข้อมูลทดลองสำหรับโพส category
      const mockCategoryPosts = [
        {
          id: 1,
          title: 'ข่าวประเภทที่เลือก 1',
          picture: 'https://via.placeholder.com/150',
          createdAt: '2024-08-18',
        },
        {
          id: 2,
          title: 'ข่าวประเภทที่เลือก 2',
          picture: 'https://via.placeholder.com/150',
          createdAt: '2024-08-18',
        },
      ]
      this.allPost = mockCategoryPosts
      this.posts = mockCategoryPosts[0]
      this.totalpages = 1
    },
    clearCategory() {
      this.categories = ''
    },
    backFetch() {
      this.clearCategory()
      this.fetchMockData()
      this.$nuxt.refresh()
    },
    formatDateEN(date) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
      return new Date(date).toLocaleDateString('en-GB', options)
    },
  },
  components: { AdsLeft },
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
