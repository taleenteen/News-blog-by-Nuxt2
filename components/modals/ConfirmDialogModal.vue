<template>
  <v-dialog
    persistent
    :retain-focus="false"
    v-model="open"
    max-width="500"
    max-height="300"
  >
    <v-card>
      <v-card-title class="text-h5"
        ><v-icon justify="left" class="mr-3" size="50">mdi-help-circle</v-icon>
        คุณกำลังจะดำเนินการ
      </v-card-title>
      <v-divider class="mb-3"></v-divider>
      <v-card-text>
        {{ message }}
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="confirm" class="font-weight-medium mt-3">
          ตกลง
        </v-btn>
        <v-btn color="error" @click="cancel" class="font-weight-medium mt-3">
          ยกเลิก
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    method: { type: Function },
    open: {
      required: true,
    },
    message: {
      required: true,
      type: String,
    },
  },
  // mounted() {
  //   this.method()
  // },
  data() {
    return {
      // open: false,
      // message: '',
    }
  },
  methods: {
    confirm() {
      this.method()
      this.$emit('update:confirmDialog', false)
      // this.close()
    },
    cancel() {
      this.$emit('update:confirmDialog', false)
      // this.close()
    },
    // close() {
    //   this.open = false
    // },
  },
}
</script>
