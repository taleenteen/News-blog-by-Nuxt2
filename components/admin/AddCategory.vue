<template>
  <div>
    <ModalsConfirmDialogModal
      :open="CategoryConfirmDialog"
      :method="addCategory"
      :message="CategoryConfirmDialogMessage"
      :confirmDialog.sync="CategoryConfirmDialog"
    />
    <div class="d-flex justify-end">
      <v-btn @click="categoryDialog = true" class="mr-3 mb-2" color="primary"
        ><v-icon medium> mdi-plus </v-icon>
        <h4>เพิ่มประเภทข่าว</h4></v-btn
      >
    </div>
    <v-dialog
      v-model="categoryDialog"
      persistent
      scrollable
      :retain-focus="false"
      max-width="900"
      max-height="500"
    >
      <v-card>
        <v-card-title class="text-h5"
          ><v-icon justify="left" class="mr-3" size="50"
            >mdi-newspaper-plus</v-icon
          >
          เพิ่มประเภทข่าว
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col cols="8">
              <template>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <p>ประเภทข่าว</p>
                  <v-text-field
                    v-model="category.category_name"
                    label="ประเภทข่าว"
                    required
                    :rules="[(v) => !!v || 'โปรดระบุประเภทข่าว']"
                    outlined
                  ></v-text-field>
                </v-form>
              </template>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="mb-3"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="
              CategoryConfirmDialog = true
              CategoryConfirmDialogMessage = `ยืนยันการเพิ่มประเภทข่าว ?`
            "
            class="font-weight-medium mt-1"
          >
            <v-icon class="mr-1" medium> mdi-content-save </v-icon>
            เพิ่มประเภทข่าว
          </v-btn>
          <v-btn
            color="error"
            @click="clearCategory()"
            class="font-weight-medium mt-1"
          >
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  middleware: 'admin-auth',
  head() {
    return {
      title: 'จัดการผู้ใช้งาน',
    }
  },
  async fetch() {
    this.allPost = await this.$store.dispatch('api/admin/getAllPost')
    this.allCategories = await this.$store.dispatch('api/public/getAllCategory')
  },
  data() {
    return {
      valid: true,
      category: {
        category_name: '',
      },
      loadingDialog: false,
      categoryDialog: false,
      confirmDialog: false,
      confirmDialogMessage: '',
      CategoryConfirmDialog: false,
      CategoryConfirmDialogMessage: '',
    }
  },
  methods: {
    clearCategory() {
      this.category.category_name = ''
    },
    async addCategory() {
      try {
        this.loadingDialog = true
        await this.$store
          .dispatch('api/admin/createCategory', {
            category_name: this.category.category_name,
          })
          .then((res) => {
            console.log(res)
            if (res.status == 201) {
              this.title = 'Well done black man'
              this.message = 'regis complete'
              this.dialog = true
              this.clearCategory()
              this.categoryDialog = false
              this.$nuxt.refresh()
              this.loadingDialog = false
            } else {
              this.title = 'Register completed'
              this.message = 'You can login now'
              this.dialog = true
              this.clearCategory()
              this.categoryDialog = false
              this.$nuxt.refresh()
              this.loadingDialog = false
            }
          })
      } catch (error) {
        console.log(error)
      }
    },
    clearCategory() {
      this.category_name = ''
      this.categoryDialog = false
    },
  },
}
</script>
<style></style>