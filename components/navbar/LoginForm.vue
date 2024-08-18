<template>
  <!--   <v-dialog
    persistent
    scrollable
    :retain-focus="false"
    v-model="loginDialog"
    max-width="900"
    max-height="500"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mr-2" text color="pink" v-on="on" v-bind="attrs">
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </template> -->
  <v-card>
    <v-card-title class="text-h5"
      ><v-icon justify="left" class="mr-3" size="50" color="#3E8CDA">mdi-account</v-icon>
      LOGIN
    </v-card-title>
    <v-divider class="mb-3"></v-divider>
    <v-card-text>
      <v-row class="d-flex justify-center mt-3">
        <v-col cols="12">
          <v-form ref="form" @submit.prevent="login()">
            <v-text-field
              v-model="email"
              name="email"
              label="Email"
              type="text"
              placeholder="email"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              name="password"
              label="Password"
              type="password"
              placeholder="password"
              required
            ></v-text-field>
            <v-col class="text-center mt-3">
              <a href="/register" color="#3E8CDA">ยังไม่มีบัญชี ? สมัครเลย</a>
            </v-col>
            <div class="d-flex justify-center">
              <v-btn
                type="submit"
                class="mr-3 mb-2"
                color="#3E8CDA"
                value="log in"
                style="color:whitesmoke"
                >Login</v-btn
              >
              <v-btn @click="loginDialog = false" class="mb-2" color="error"
                >ปิด</v-btn
              >
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
  <!--  </v-dialog> -->
</template>

<script>
export default {
  data() {
    return {
      loginDialog: false,
      email: '',
      password: '',
    }
  },
  methods: {
    async login() {
      try {
      //   this.$cookies.removeAll()
        const email = this.email
        const password = this.password
        this.loadingDialog
        await this.$store.dispatch('api/auth/login',{email,password})
        .then((res) => {
            console.log(res.user.token)
            this.$store.dispatch('setToken',res.user.token)
            this.$store.dispatch('fetchUser')
          })

        // let response = await this.$auth.loginWith('user', {
        //   data: {
        //     email,
        //     password,
        //   },
        // })
        // if (response.status === 200) {
        //   this.loadingDialog = false
        //   this.loginDialog = false
        //   this.$router.push('/')
        // } else {
        //   this.title = 'Login Fail'
        //   this.loadingDialog = false
        //   this.message = 'Wrong Email or Password!! Please try again'
        // }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
