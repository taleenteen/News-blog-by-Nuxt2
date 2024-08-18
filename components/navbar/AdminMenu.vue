<template>
  <v-menu bottom offset-y>
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mr-2" text color="pink" v-bind="attrs" v-on="on"
        ><h2>ADMIN</h2></v-btn
      >
    </template>
    <v-list>
      <v-list-item to="/admins/user">
        <v-list-item-icon>
          <v-icon>mdi-account-circle</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>USER</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/admins/post">
        <v-list-item-icon>
          <v-icon>mdi-newspaper-variant-outline</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>POST</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item to="/admins/category">
        <v-list-item-icon>
          <v-icon>mdi-note</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>CATEGORY</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>