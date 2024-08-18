<template >
  <v-sheet color="grey lighten-4" dark>
    <v-list-item three-line class="py-5">
      <v-list-item-content class="text-center">
        <v-list-item-title
          class="font-weight-bold black--text"
          style="font-size: x-large"
        >
          {{ userInfo.displayname }}
        </v-list-item-title>
        <v-list-item-subtitle class="font-weight-bold black--text">
          {{ userInfo.firstname }} {{ userInfo.lastname }}
        </v-list-item-subtitle>
        <v-list-item-subtitle class="font-weight-bold black--text">
          {{ userInfo.email }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
    <v-divider color="grey lighten-4" />

    <v-card-actions class="d-flex justify-center">
      <NavbarLogoutButton />
    </v-card-actions>
  </v-sheet>
</template>

<script>
export default {
  name: 'UserInfo',
  data() {
    return {
      userInfo: this.$store.getters.getUser,
    }
  },
}
</script>

<style scoped>
</style>
