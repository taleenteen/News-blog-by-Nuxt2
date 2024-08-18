<template>
  <div>
    <adminUserRegister />
    <adminUserTable />
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
  data() {
    return {}
  },
}
</script>
<style></style>
