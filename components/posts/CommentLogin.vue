<template>
  <v-card class="mx-auto" max-width="344" outlined>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title align="center" class="text-h5 mb-1">
          ต้องการคอมเมนต์ ?
        </v-list-item-title>
        <v-list-item-subtitle align="center" class="text-h7 mb-1"
          >โปรดล็อกอินหรือสมัครสมาชิก</v-list-item-subtitle
        >
      </v-list-item-content>
    </v-list-item>
    <v-col align="center" justify="center">
      <v-btn text color="green" @click="$router.push('/register')"
        >register</v-btn
      >
    </v-col>
  </v-card>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>