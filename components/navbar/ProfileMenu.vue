<template>
  <v-menu
    v-model="menuDialog"
    :close-on-content-click="false"
    offset-x
    offset-y
    min-width="300"
  >
    <template #activator="{ on, attrs }">
      <v-btn color="#3E8CDA" dark icon v-bind="attrs" v-on="on">
        <v-icon size="45"> mdi-account-circle </v-icon>
      </v-btn>
    </template>

    <NavbarUserInfo v-if="$store.getters.isAuth" />
    <NavbarLoginForm v-else />
  </v-menu>
</template>

<script>
export default {
  name: 'ProfileMenu',
  data() {
    return {
      menuDialog: false,
    }
  },
}
</script>
