<template>
  <div>
    <ModalsConfirmDialogModal
      :open="confirmDialog"
      :method="saveCategory"
      :message="confirmDialogMessage"
      :confirmDialog.sync="confirmDialog"
    />
    <v-data-table
      :headers="headers"
      :items="allCategories"
      sort-by="id"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-icon class="mr-2" large>mdi-note-multiple</v-icon>
          <v-toolbar-title> ประเภทข่าวทั้งหมด</v-toolbar-title>
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
            mdi-trash-can
          </v-icon></v-btn
        >
      </template>
    </v-data-table>
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
          ><v-icon justify="left" class="mr-3" size="50">mdi-note</v-icon>
          แก้ไขชื่อประเภทข่าว
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
                      label="รหัสประเภทข่าว"
                      prepend-inner-icon="mdi-note"
                      class="rounded-1"
                      outlined
                      v-model="category.id"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      required
                      label="ชื่อประเภทข่าว"
                      name="ชื่อประเภทข่าว"
                      prepend-inner-icon=""
                      :rules="[(v) => !!v || 'โปรดระบุชื่อประเภทข่าว']"
                      class="rounded-1"
                      outlined
                      v-model="category.category_name"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
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
            @click="clearCategory()"
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
          ><v-icon justify="left" class="mr-3" size="50">mdi-trash-can</v-icon>
          ยืนยันการลบประเภทข่าว
        </v-card-title>

        <v-divider class="mb-3"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            @click="deleteUser()"
            class="font-weight-medium mt-3"
          >
            <v-icon class="mr-1" medium> mdi-trash-can </v-icon> ลบ
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
  async fetch() {
    this.allCategories = await this.$store.dispatch('api/public/getAllCategory')
  },
  data() {
    return {
      valid: true,
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      confirmDialog: false,
      confirmDialogMessage: '',
      allCategories: [],
      search: '',
      category: {},
      headers: [
        {
          text: 'ชื่อประเภท',
          value: 'category_name',
          sortable: true,
          align: 'start',
        },

        { text: 'แก้ไข', value: 'edit', sortable: false, align: 'center' },
        {
          text: 'ลบประเภทข่าว',
          value: 'delete',
          sortable: false,
          align: 'center',
        },
      ],
    }
  },
  methods: {
    async openEditDialog(id) {
      try {
        await this.$store
          .dispatch('api/admin/getSingleCategory', { id: id })
          .then(async (res) => {
            this.category = res
          })
        this.editDialog = true
      } catch (error) {
        this.editDialog = false
        this.$errorDialog.open({
          message: error,
        })
      }
    },
    async openDeleteDialog(id) {
      try {
        await this.$store
          .dispatch('api/admin/getSingleCategory', { id: id })
          .then(async (res) => {
            this.category = res
          })
        this.deleteDialog = true
      } catch (error) {
        this.deleteDialog = false
        this.$errorDialog.open({
          message: error,
        })
      }
    },
    clearCategory() {
      this.editDialog = false
    },
    async saveCategory() {
      try {
        this.loadingDialog = true
        await this.$store
          .dispatch('api/admin/editCategory', this.category)
          .then((res) => {
            if (res.status === 201) {
              this.editDialog = false
              this.$completeDialog.open({
                message: 'แก้ไขข้อมูลผู้ใช้งานเรียบร้อย',
                resolver: async (result) => {
                  try {
                    this.loadingDialog = false
                    this.$nuxt.refresh()
                  } catch (error) {
                    this.loadingDialog = false
                    this.editDialog = false
                    this.$errorDialog.open({
                      message: error,
                    })
                  }
                },
              })
            } else {
              this.editDialog = false
              this.loadingDialog = false
              this.$nuxt.refresh()
            }
          })
      } catch (error) {
        this.editDialog = false
        this.loadingDialog = false
        this.$errorDialog.open({
          message: error,
        })
      }
    },
    async confirmDeleteUser(id) {
      await this.$store
        .dispatch('api/admin/getSingleCategory', { id: id })
        .then((res) => {
          this.category.id = res.id
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
      await this.$store.dispatch('api/admin/deleteCategory', {
        id: this.category.id,
      })
      this.$nuxt.refresh()
      this.deleteDialog = false
    },
  },
}
</script>