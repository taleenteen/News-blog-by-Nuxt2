<template>
  <div>
    <ModalsConfirmDialogModal
      :open="confirmDialog"
      :method="saveUser"
      :message="confirmDialogMessage"
      :confirmDialog.sync="confirmDialog"
    />
    <v-data-table
      :headers="headers"
      :items="allUser"
      sort-by="id"
      class="elevation-1"
      :search="search"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-icon class="mr-2" large>mdi-account-multiple</v-icon>
          <v-toolbar-title> ผู้ใช้งานทั้งหมด</v-toolbar-title>
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
          <v-icon medium> mdi-account-edit </v-icon>
        </v-btn>
      </template>
      <template v-slot:[`item.delete`]="{ item }">
        <v-btn text @click="openDeleteDialog(item.id)"
          ><v-icon class="mr-2" medium color="error">
            mdi-account-remove
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
          ><v-icon justify="left" class="mr-3" size="50">mdi-account</v-icon>
          แก้ไขข้อมูลผู้ใช้งาน
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
                      label="รหัสผู้ใช้งาน"
                      prepend-inner-icon="mdi-account-circle"
                      class="rounded-1"
                      outlined
                      v-model="user.id"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-text-field
                      required
                      label="อีเมล"
                      prepend-inner-icon="mdi-email"
                      class="rounded-1"
                      :rules="[
                        (v) => !!v || 'โปรดระบุรหัสผู้ใช้งาน',
                        (v) => /.+@.+/.test(v) || 'โปรดระบุรูปแบบที่ถูกต้อง',
                      ]"
                      outlined
                      v-model="user.email"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      required
                      label="ชื่อ"
                      name="firstname"
                      prepend-inner-icon=""
                      :rules="[(v) => !!v || 'โปรดระบุชื่อจริง']"
                      class="rounded-1"
                      outlined
                      v-model="user.firstname"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      required
                      label="นามสกุล"
                      name="lastname"
                      prepend-inner-icon=""
                      class="rounded-1"
                      outlined
                      :rules="[(v) => !!v || 'โปรดระบุนามสกุล']"
                      v-model="user.lastname"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-row> </v-row>
                <v-row>
                  <v-col cols="12">
                    <v-text-field
                      required
                      label="displayname"
                      name="displayname"
                      prepend-inner-icon=""
                      :rules="[(v) => !!v || 'โปรดระบุที่อยู่']"
                      class="rounded-1"
                      outlined
                      v-model="user.displayname"
                    >
                    </v-text-field>
                  </v-col>
                </v-row>
                <v-switch
                  v-model="user.available_status"
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
            >mdi-account-remove</v-icon
          >
          ยืนยันการลบผู้ใช้งาน
        </v-card-title>

        <v-divider class="mb-3"></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="error"
            @click="deleteUser()"
            class="font-weight-medium mt-3"
          >
            <v-icon class="mr-1" medium> mdi-account-remove </v-icon> ลบ
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
    this.allUser = await this.$store.dispatch('api/admin/getAllUser')
  },
  data() {
    return {
      valid: true,
      allUser: [],
      search: '',
      headers: [
        {
          text: 'email',
          value: 'email',
          sortable: true,
          align: 'start',
        },
        {
          text: 'ชื่อ',
          value: 'firstname',
          sortable: true,
          align: 'start',
        },
        {
          text: 'นามสกุล',
          value: 'lastname',
          sortable: true,
          align: 'start',
        },
        {
          text: 'Display name',
          value: 'displayname',
          sortable: true,
          align: 'start',
        },

        { text: 'แก้ไข', value: 'edit', sortable: false, align: 'center' },
        {
          text: 'ลบผู้ใช้งาน',
          value: 'delete',
          sortable: false,
          align: 'center',
        },
      ],
      user: {},
      loadingDialog: false,
      editDialog: false,
      deleteDialog: false,
      confirmDialog: false,
      confirmDialogMessage: '',
    }
  },
  methods: {
    async openEditDialog(id) {
      try {
        await this.$store
          .dispatch('api/admin/getSingleUser', { id: id })
          .then(async (res) => {
            this.user = res
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
          .dispatch('api/admin/getSingleUser', { id: id })
          .then(async (res) => {
            this.user = res
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
    async saveUser() {
      try {
        this.loadingDialog = true
        await this.$store
          .dispatch('api/admin/editUserInfo', this.user)
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
        .dispatch('api/admin/getSingleUsers', { id: id })
        .then((res) => {
          this.user.id = res.id
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
      await this.$store.dispatch('api/admin/deleteUser', { id: this.user.id })
      this.$nuxt.refresh()
      this.deleteDialog = false
    },
  },
}
</script>