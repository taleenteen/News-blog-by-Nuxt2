<template>
  <div>
    <ModalsConfirmDialogModal
      :open="NewUserConfirmDialog"
      :method="register"
      :message="NewUserConfirmDialogMessage"
      :confirmDialog.sync="NewUserConfirmDialog"
    />
    <div class="d-flex justify-end">
      <v-btn @click="registerDialog = true" class="mb-2" color="primary"
        ><v-icon medium> mdi-plus </v-icon>
        <h4>เพิ่มโพสข่าว</h4></v-btn
      >
    </div>
    <v-dialog
      v-model="registerDialog"
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
          เพิ่มโพสข่าว
        </v-card-title>
        <v-divider class="mb-3"></v-divider>
        <v-card-text>
          <v-row class="d-flex justify-center mt-3">
            <v-col cols="8">
              <template>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <p>ชื่อข่าว</p>
                  <v-text-field
                    v-model="newPost.news_name"
                    label="ชื่อข่าว"
                    required
                    :rules="[(v) => !!v || 'โปรดระบุชื่อข่าว']"
                    outlined
                  ></v-text-field>
                  <v-select
                    v-model="newPost.categories"
                    :items="allCategories"
                    item-text="category_name"
                    item-value="id"
                    :rules="[(v) => !!v || 'โปรดเลือกประเภทข่าว']"
                    label="เลือกประเภทข่าว"
                    outlined
                    required
                  ></v-select>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <p>รูปภาพ (URL)</p>
                      <v-file-input
                        v-model="newPost.file"
                        label="รูปภาพ"
                        filled
                        prepend-icon="mdi-camera"
                      ></v-file-input>
                    </v-col>
                  </v-row>

                  <p>รายละเอียดข่าว</p>
                  <vue-editor
                    id="editor"
                    useCustomImageHandler
                    @image-added="handleImageAdded"
                    v-model="newPost.news_details"
                    :rules="[(v) => !!v || 'โปรดระบุรายละเอียดข่าว']"
                  >
                  </vue-editor>
                  <!-- <v-textarea
                    outlined
                    v-model="newPost.news_details"
                    label="รายละเอียดข่าว"
                    required
                    :rules="[(v) => !!v || 'โปรดระบุรายละเอียดข่าว']"
                  ></v-textarea> -->
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
              NewUserConfirmDialog = true
              NewUserConfirmDialogMessage = `ยืนยันการเพิ่มผู้ใช้งาน ?`
            "
            class="font-weight-medium mt-1"
          >
            <v-icon class="mr-1" medium> mdi-content-save </v-icon> โพสข่าว
          </v-btn>
          <v-btn
            color="error"
            @click="clearNewPost()"
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
      newPost: {
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
    async register() {
      try {
        let file = new FormData()
        file.append('file', this.newPost.file),
          file.append('title', this.newPost.news_name),
          file.append('picture', this.newPost.picture),
          file.append('content', this.newPost.news_details),
          file.append('category_id', this.newPost.categories),
          file.append('avaliable_status', '1')

        await this.$store
          .dispatch('api/admin/createNewPost', file, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((res) => {
            console.log(res)
            if (res.status == 200) {
              this.title = 'Well done black man'
              this.message = 'regis complete'
              this.dialog = true
            } else {
              this.title = 'Register completed'
              this.message = 'You can login now'
              this.dialog = true
              this.clearInfo()
              this.registerDialog = false
              this.$nuxt.refresh()
            }
          })
      } catch (err) {
        console.log(err)
      }
    },
    clearInfo() {
      this.newPost.news_name = ''
      this.newPost.categories = ''
      this.newPost.file = null
      this.newPost.news_details = ''
    },
    clearNewPost() {
      this.email = ''
      this.password = ''
      this.first_name = ''
      this.last_name = ''
      this.displayname = ''
      this.registerDialog = false
    },
    handleImageAdded: function(file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)

      let formData = new FormData();
      formData.append("file", file);
        this.$store.dispatch('api/file/uploadPicture',formData)
        .then(result => {
          const url = result; // Get url from response
          console.log('this is url', result);
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    },
  },
}
</script>
<style></style>