<template>
  <div>
    <ModalsConfirmDialogModal
      :open="confirmDialog"
      :method="savePost"
      :message="confirmDialogMessage"
      :confirmDialog.sync="confirmDialog"
    />
    <ModalsCompleteDialogModal />
    <ModalsErrorDialogModal />
    <v-spacer></v-spacer>

    <v-data-table
      :headers="headers"
      :items="allPost"
      sort-by="id"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-icon class="mr-2" large>mdi-newspaper-variant-outline</v-icon>
          <v-toolbar-title> โพสข่าวทั้งหมด</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="ค้นหา"
            single-line
            hide-details
          ></v-text-field>
        </v-toolbar>
      </template>
      <template v-slot:[`item.edit`]="{ item }">
        <v-btn
          @click="openEditDialog(item.id)"
          icon
          color="warning"
          depressed
          fab
          small
        >
          <v-icon medium> mdi-pencil-outline </v-icon>
        </v-btn>
      </template>
      <template v-slot:[`item.delete`]="{ item }">
        <v-btn text @click="openDeleteDialog(item.id)"
          ><v-icon class="mr-2" medium color="error">
            mdi-newspaper-remove
          </v-icon></v-btn
        >
      </template>
    </v-data-table>
    <!-- edit dialog -->
    <v-dialog
      persistent
      scrollable
      :retain-focus="false"
      v-model="editDialog"
      max-width="900"
      max-height="500"
    >
      <v-card>
        <v-card-title class="text-h5"
          ><v-icon justify="left" class="mr-3" size="50">mdi-newspaper</v-icon>
          แก้ไขข้อมูลโพส
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col cols="12">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      disabled
                      label="รหัสโพส"
                      prepend-inner-icon="mdi-newspaper"
                      class="rounded-1"
                      outlined
                      v-model="post.id"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      required
                      label="หัวข้อข่าว"
                      prepend-inner-icon="mdi-newspaper-variant"
                      class="rounded-1"
                      :rules="[(v) => !!v || 'โปรดระบุหัวข้อข่าว']"
                      outlined
                      v-model="post.title"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-textarea
                      outlined
                      auto-grow
                      v-model="post.content"
                      label="เนื้อหาโพส"
                      rows="4"
                      row-height="30"
                      shaped
                    ></v-textarea>
                    <v-col>
                      <v-img
                        class="mx-auto"
                        :src="post.picture"
                        height="250"
                        width="300"
                      ></v-img>
                    </v-col>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-file-input
                      v-model="file"
                      label="รูปภาพ"
                      filled
                      prepend-icon="mdi-camera"
                    ></v-file-input>
                  </v-col>

                  <v-col cols="12">
                    <v-select
                      v-model="post.category_id"
                      :items="allCategories"
                      item-text="category_name"
                      item-value="id"
                      :rules="[(v) => !!v || 'โปรดเลือกประเภทข่าว']"
                      label="เลือกประเภทข่าว"
                      outlined
                      required
                    ></v-select>
                  </v-col>
                </v-row>
                <v-switch
                  v-model="post.available_status"
                  label="เปิดการใช้งาน"
                ></v-switch>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>
        <v-divider class="mb-3"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            @click="
              confirmDialog = true
              confirmDialogMessage = `ยืนยันการแก้ไขข้อมูลผู้ใช้งาน ?`
            "
            class="font-weight-medium mt-1"
          >
            <v-icon class="mr-1" medium> mdi-content-save </v-icon> บันทึก
          </v-btn>
          <v-btn
            color="error"
            @click="clearUser()"
            class="font-weight-medium mt-1"
          >
            ยกเลิก
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-overlay :value="loadingDialog"></v-overlay>
    <div class="text-center">
      <v-dialog v-model="loadingDialog" hide-overlay persistent width="300">
        <v-card color="#056839" dark>
          <v-card-text>
            กำลังโหลด
            <v-progress-linear
              indeterminate
              color="white"
              class="mb-0"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-dialog>
    </div>
    <v-dialog v-model="deleteDialog" max-width="500" max-height="700">
      <v-card>
        <v-card-title class="text-h5"
          ><v-icon justify="left" class="mr-3" size="50"
            >mdi-newspaper-remove</v-icon
          >
          ยืนยันการลบโพส
        </v-card-title>

        <v-divider class="mb-3"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            @click="deleteUser()"
            class="font-weight-medium mt-3"
          >
            <v-icon class="mr-1" medium> mdi-newspaper-remove </v-icon> ลบ
          </v-btn>
          <v-btn
            color="primary"
            @click="clearDeleteUser()"
            class="font-weight-medium mt-3"
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
      allCategories: [],
      allPost: [],
      search: '',
      file: null,
      headers: [
        {
          text: 'หัวข้อข่าว',
          value: 'title',
          sortable: true,
          align: 'start',
        },

        { text: 'แก้ไข', value: 'edit', sortable: false, align: 'right' },
        {
          text: 'ลบโพสข่าว',
          value: 'delete',
          sortable: false,
          align: 'right',
        },
      ],
      post: {},
      category: {
        category_name: '',
      },
      newUser: {
        news_name: '',
        categories: '',
        news_details: '',
        file: null,
        picture: '',
      },
      confirmDeleteId: '',
      confirmPhone: '',
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      registerDialog: false,
      categoryDialog: false,
      confirmDialog: false,
      confirmDialogMessage: '',
      NewUserConfirmDialog: false,
      NewUserConfirmDialogMessage: '',
      CategoryConfirmDialog: false,
      CategoryConfirmDialogMessage: '',
    }
  },
  methods: {
    async openEditDialog(id) {
      console.log(id)
      try {
        await this.$store
          .dispatch('api/public/getSinglePost', { params: { id: id } })
          .then(async (res) => {
            this.post = res
          })
        this.editDialog = true
      } catch (error) {
        this.editDialog = false
      }
    },
    async openDeleteDialog(id) {
      try {
        await this.$store
          .dispatch('api/public/getSinglePost', { params: { id: id } })
          .then(async (res) => {
            this.post = res
          })
        this.deleteDialog = true
      } catch (error) {
        this.deleteDialog = false
        this.$errorDialog.open({
          message: error,
        })
      }
    },
    clearUser() {
      this.editDialog = false
    },
    async savePost() {
      try {
        let file = new FormData()
        file.append('file', this.file),
          file.append('id', this.post.id),
          file.append('title', this.post.title),
          file.append('content', this.post.content),
          file.append('category_id', this.post.category_id),
          file.append('available_status', this.post.available_status),
          (this.loadingDialog = true)
        await this.$store
          .dispatch('api/admin/editPostInfo', file)
          .then((res) => {
            if (res.status === 201) {
              this.editDialog = false
            } else {
              this.editDialog = false
              this.loadingDialog = false
              this.$nuxt.refresh()
            }
          })
      } catch (error) {
        this.editDialog = false
        this.loadingDialog = false
        this.$nuxt.refresh()
      }
    },
    async confirmDeleteUser(id) {
      await this.$store
        .dispatch('api/public/getSinglePostforEdit', { id: id })
        .then((res) => {
          this.post.id = res.id
        })
      this.deleteDialog = true
    },
    clearDeleteUser() {
      this.deleteDialog = false
    },
    convertAvailableStatus(status) {
      if (status === true) {
        return 'เปิด'
      } else if (status === false) {
        return 'ปิด'
      }
    },
    async deleteUser() {
      await this.$store.dispatch('api/admin/deletePost', { id: this.post.id })
      this.$nuxt.refresh()
      this.deleteDialog = false
    },
  },
}
</script>
<style></style>