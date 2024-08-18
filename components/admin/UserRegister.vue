<template>
  <div>
    <div class="d-flex justify-end">
      <v-btn @click="registerDialog = true" class="mb-3" color="primary"
        ><v-icon medium> mdi-plus </v-icon>
        <h4>เพิ่มผู้ใช้งาน</h4></v-btn
      >
    </div>
    <ModalsConfirmDialogModal
      :open="NewUserConfirmDialog"
      :method="register"
      :message="NewUserConfirmDialogMessage"
      :confirmDialog.sync="NewUserConfirmDialog"
    />
    <ModalsCompleteDialogModal />
    <ModalsErrorDialogModal />
    <v-dialog
      v-model="registerDialog"
      persistent
      scrollable
      :retain-focus="false"
      max-width="900"
      max-height="500"
    >
      <v-card>
        <v-card-title class="text-h5"
          ><v-icon justify="left" class="mr-3" size="50"
            >mdi-account-plus</v-icon
          >
          เพิ่มผู้ใช้งาน
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col cols="12">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      required
                      label="อีเมล"
                      name="email"
                      prepend-inner-icon="mdi-email"
                      class="rounded-1"
                      :rules="[
                        (v) => !!v || 'โปรดระบุรหัสผู้ใช้งาน',
                        (v) => /.+@.+/.test(v) || 'โปรดระบุรูปแบบที่ถูกต้อง',
                      ]"
                      outlined
                      v-model="newUser.email"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      required
                      label="รหัสผ่าน"
                      name="password"
                      prepend-inner-icon="mdi-lock"
                      type="password"
                      class="rounded-1"
                      :rules="[
                        (v) => !!v || 'โปรดระบุรหัสผ่าน',
                        (v) => /.{6,}/.test(v) || 'รหัสผ่านอย่างน้อย 6 ตัว',
                      ]"
                      outlined
                      v-model="newUser.password"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      required
                      label="ชื่อ"
                      name="firstname"
                      prepend-inner-icon=""
                      :rules="[(v) => !!v || 'โปรดระบุชื่อจริง']"
                      class="rounded-1"
                      outlined
                      v-model="newUser.first_name"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      required
                      label="นามสกุล"
                      name="lastname"
                      prepend-inner-icon=""
                      class="rounded-1"
                      outlined
                      :rules="[(v) => !!v || 'โปรดระบุนามสกุล']"
                      v-model="newUser.last_name"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <!-- this is location -->

                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      required
                      label="display name"
                      name="displayname"
                      prepend-inner-icon=""
                      :rules="[(v) => !!v || 'โปรดระบุ Display name']"
                      class="rounded-1"
                      outlined
                      v-model="newUser.displayname"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="mb-3"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="
              NewUserConfirmDialog = true
              NewUserConfirmDialogMessage = `ยืนยันการเพิ่มผู้ใช้งาน ?`
            "
            class="font-weight-medium mt-1"
          >
            <v-icon class="mr-1" medium> mdi-content-save </v-icon> บันทึก
          </v-btn>
          <v-btn
            color="error"
            @click="clearNewUser()"
            class="font-weight-medium mt-1"
          >
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  middleware: 'admin-auth',
  head() {
    return {
      title: 'จัดการผู้ใช้งาน',
    }
  },
  data() {
    return {
      valid: true,
      newUser: {
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        displayname: '',
      },
      loadingDialog: false,
      registerDialog: false,
      NewUserConfirmDialog: false,
      NewUserConfirmDialogMessage: '',
    }
  },
  methods: {
    async register() {
      try {
        this.loadingDialog = true
        await this.$store
          .dispatch('api/user/addNewUser', {
            firstname: this.newUser.first_name,
            lastname: this.newUser.last_name,
            email: this.newUser.email,
            password: this.newUser.password,
            displayname: this.newUser.displayname,
          })
          .then((res) => {
            console.log(res)
            if (res.status == 201) {
              this.loadingDialog = false
              this.title = 'Well done black man'
              this.message = 'regis complete'
              this.dialog = true
            } else if (res.status == 200) {
              this.loadingDialog = false
              this.registerDialog = false
              this.clearNewUser()
              this.$completeDialog.open({
                message: 'สามารถเข้าใช้งานด้วยอีเมลและรหัสผ่านได้ทันที',
                resolver: async (result) => {
                  try {
                    this.$nuxt.refresh()
                  } catch (error) {
                    console.warn(error)
                  }
                },
              })
            } else {
              this.loadingDialog = false
              this.title = 'Register completed'
              this.message = 'You can login now'
              this.dialog = true
              this.registerDialog = false
              this.$nuxt.refresh()
              this.clearNewUser()
              this.$completeDialog.open({
                message: 'สามารถเข้าใช้งานด้วยอีเมลและรหัสผ่านได้ทันที',
                resolver: async (result) => {
                  try {
                    this.$nuxt.refresh()
                  } catch (error) {
                    console.warn(error)
                  }
                },
              })
            }
          })
      } catch (error) {
        console.log(error)
      }
    },
    clearNewUser() {
      this.email = ''
      this.password = ''
      this.first_name = ''
      this.last_name = ''
      this.displayname = ''
      this.registerDialog = false
    },
  },
}
</script>