<template>
  <v-main>
    <v-container class="justify-center">
      <v-row align="center" justify="center" dense class="text-center">
        <v-col cols="7">
          <v-card
            class="mx-auto mb-0 mt-12 ml-0 pa-15 pt-10 justify-center"
            outlined
          >
            <v-spacer></v-spacer>
            <img
              src="~/assets/login/ube-logo.png"
              contain
              class="mt-15 mb-10 justify-center"
              width="auto"
              height="150"
            />
            <v-card-text>
              <v-row class="d-flex justify-center">
                <v-col cols="12">
                  <v-form ref="form" v-model="valid" lazy-validation>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          required
                          @keyup.enter="login(email, password)"
                          label="Email"
                          name="Email"
                          prepend-inner-icon="mdi-account-circle"
                          type="email"
                          :rules="[
                            (v) => !!v || 'โปรดระบุรหัสผู้ใช้งาน',
                            (v) =>
                              /.+@.+/.test(v) || 'โปรดระบุรูปแบบที่ถูกต้อง',
                          ]"
                          class="rounded-1"
                          outlined
                          v-model="email"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          required
                          @keyup.enter="login(email, password)"
                          label="รหัสผ่าน"
                          name="password"
                          prepend-inner-icon="mdi-lock"
                          type="password"
                          class="rounded-1"
                          :rules="[
                            (v) => !!v || 'โปรดระบุรหัสผ่าน',
                            (v) => /\d/.test(v) || 'โปรดระบุรหัสผ่านเป็นตัวเลข',
                            (v) => /.{6,}/.test(v) || 'รหัสผ่านอย่างน้อย 6 ตัว',
                          ]"
                          outlined
                          v-model="password"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          required
                          @keyup.enter="login(email, password)"
                          label="ชื่อ"
                          name="first_name"
                          prepend-inner-icon=""
                          :rules="[(v) => !!v || 'โปรดระบุชื่อจริง']"
                          class="rounded-1"
                          outlined
                          v-model="first_name"
                        >
                        </v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          required
                          @keyup.enter="login(email, password)"
                          label="นามสกุล"
                          name="last_name"
                          prepend-inner-icon=""
                          class="rounded-1"
                          outlined
                          :rules="[(v) => !!v || 'โปรดระบุนามสกุล']"
                          v-model="last_name"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col justify-center>
                        <v-text-field
                          required
                          @keyup.enter="login(email, password)"
                          label="Display Name"
                          name="displayname"
                          prepend-inner-icon=""
                          class="rounded-1"
                          outlined
                          :rules="[(v) => !!v || 'โปรดระบุ Display Name']"
                          v-model="displayname"
                        >
                        </v-text-field>
                      </v-col>
                    </v-row>

                    <v-divider></v-divider>
                    <v-btn
                      @click="getRegister()"
                      class="rounded-1 mt-10"
                      color="#3E8CDA"
                      large
                      block
                    >
                      <div class="white--text font-weight-bold">ลงทะเบียน</div>
                    </v-btn>
                  </v-form>
                </v-col>
              </v-row>

              <v-row class="text-center mt-3">
                <v-col>
                  <a href="/login" color="#3E8CDA">already register? login here</a>
                </v-col>
              </v-row>
              <v-row class="text-center"> </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- loading dialog -->
    <v-overlay :value="loadingDialog"></v-overlay>
    <div class="text-center">
      <v-dialog v-model="loadingDialog" hide-overlay persistent width="300">
        <v-card color="#056839" dark>
          <v-card-text>
            กำลังลงทะเบียน
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
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
          <v-btn color="primary" text @click="returnToLogin"> ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-main>
</template>

<script>
export default {
  middleware: 'login',
  layout: 'default',
  name: 'IndexPage',
  head() {
    return {
      title: 'Register',
    }
  },
  data() {
    return {
      valid: true,
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      displayname: '',
      dialog: false,
      message: '',
      title: '',
      loadingDialog: false,
    }
  },
  methods: {
    returnToLogin() {
      this.$router.push('/')
    },
    async getRegister() {
      try {
        this.loadingDialog = true
        await this.$store
          .dispatch('api/user/addNewUser', {
            firstname: this.first_name,
            lastname: this.last_name,
            email: this.email,
            password: this.password,
            displayname: this.displayname,
          })
          .then((res) => {
            console.log(res)
            if (res.status == 201) {
              this.title = 'Well done black man'
              this.message = 'regis complete'
              this.dialog = true
            } else {
              this.title = 'Register completed'
              this.message = 'You can login now'
              this.dialog = true
            }
          })
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>
