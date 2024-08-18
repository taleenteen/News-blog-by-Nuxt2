<template>
  <v-card class="mx-auto mb-2 rounded-lg" width="290px" height="100px">
    <v-row>
      <v-col cols="5" class="py-0 pl-2 pr-1">
        <v-img
          :src="picture"
          width="120px"
          height="100px"
          class="rounded-l-lg d-flex flex-row mt-0"
        ></v-img>
      </v-col>
      <v-col cols="7" class="py-1 pl-1 pr-4" style="float: left">
        <v-card-title class="d-flex flex-row">{{ title }}</v-card-title>

        <v-card-subtitle class="d-flex flex-row">{{
          formatDateEN(createdAt)
        }}</v-card-subtitle>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
export default {
  name: 'CardMini',
  props: {
    picture: {
      type: String,
      default: () => '',
    },
    title: {
      type: String,
      default: () => '',
    },
    createdAt: {
      type: String,
      default: () => '',
    },
  },
  methods: {
    formatDateEN(date) {
      const options = { year: 'numeric', month: 'numeric', day: 'numeric' }
      return new Date(date).toLocaleDateString('en-GB', options)
    },
  },
}
</script>

<style scoped>
.cimg {
  float: left;
}

.ctitle {
  max-height: 100px;
  float: left;
}

.cdate {
  float: left;
}
</style>