<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12">
        <v-card>
          <v-card-title>
            <v-avatar color="teal" rounded size="80">
              <v-icon dark size="55"> mdi-account-circle </v-icon>
            </v-avatar>
            <span class="text-h5 ml-5">ข้อมูลส่วนตัว</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="4">
                  <div style="font-size: 15px">ชื่อ</div>
                  <h4>{{ userInfo.firstname }}</h4>
                </v-col>
                <v-col cols="12" sm="6" md="4">
                  <div style="font-size: 15px">นามสกุล</div>
                  <h4>{{ userInfo.lastname }}</h4>
                </v-col>
                <v-col cols="12" sm="4">
                  <div style="font-size: 15px">อีเมล</div>
                  <h4>{{ userInfo.email }}</h4>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
        <h5 class="mt-3" style="color: red">
          * หากข้อมูลของท่านไม่ถูกต้อง โปรดิดต่อผู้ดูแลระบบ
        </h5>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  middleware: 'admin-auth',
  head() {
    return {
      title: 'โปรไฟล์',
    }
  },
  data() {
    return {
      userInfo: this.$store.$auth.user,
    }
  },
  methods: {},
}
</script>
