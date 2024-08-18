<template>
  <v-btn class="mr-2" text color="pink" @click="logout()">logout</v-btn>
</template>

<script>
export default {
  methods: {
    async logout() {
      this.$store.commit('setToken', null)
      this.$store.commit('setUser', null)
      this.$cookies.removeAll()
      this.$router.push('/')
    },
  },
}
</script>
