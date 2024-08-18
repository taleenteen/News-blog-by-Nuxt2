<template>
  <v-app dark>
    <v-app-bar fixed app color="grey" elevation="2">
      <v-btn text to="/" plain> <h2>TTT News</h2></v-btn>
      <NavbarAdminMenu v-if="$store.getters.isAdmin" />
      <v-spacer />
      <ProfileMenu />
      <v-btn text color="#3BA34E" to="/posts/search">
        <v-icon class="mr-1" medium> mdi-magnify </v-icon>
      </v-btn>
    </v-app-bar>
    <v-main class="pt-15 pr-5 pl-5">
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer absolute app>
      <span>TTT crops&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import ProfileMenu from '@/components/navbar/ProfileMenu.vue'
import { mapGetters } from 'vuex'

export default {
  components: { ProfileMenu },
  name: 'DefaultLayout',
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['getUser']),
  },
  methods: {
    async getlogin() {
      try {
        const email = this.email
        const password = this.password
        this.loadingDialog
        let response = await this.$auth.loginWith('user', {
          data: {
            email,
            password,
          },
        })
        if (response.status === 200) {
          this.loadingDialog = false
          this.$router.push('/users')
        } else {
          this.title = 'Login Fail'
          this.loadingDialog = false
          this.message = 'Wrong Email or Password!! Please try again'
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style scoped>
.v-application {
  background-color: #eaecee;
}
</style>
