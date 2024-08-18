<template>
  <v-col align="right" justify="right">
    <v-card max-width="374" height="920">
      <v-img :src="bet" style="filter: blur(4px)"></v-img>
    </v-card>
  </v-col>
</template>

<script>
export default {
  data() {
    return {
      bet: `https://i.pinimg.com/originals/bb/49/0b/.jpg`,
    }
  },
}
</script>
