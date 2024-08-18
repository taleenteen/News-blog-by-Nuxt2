<template>
  <v-card
    class="mx-auto mb-2 rounded-xl"
    min-width="344px"
    max-width="344"
    height="330px"
  >
    <v-img :src="picture" height="200px"></v-img>

    <v-card-title>
      <p>{{ title }}</p>
    </v-card-title>

    <v-card-subtitle>
      {{ formatDateEN(createdAt) }}
    </v-card-subtitle>
  </v-card>
</template>

<script>
export default {
  name: 'CardS',
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
p {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
