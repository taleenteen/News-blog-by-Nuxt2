<template>
  <div>
    <adminAddCategory />
    <adminCategoryTable />
  </div>
</template>

<script>
export default {
  middleware: 'admin-auth',
  head() {
    return {
      title: 'จัดการประเภทข่าว',
    }
  },
  data() {
    return {}
  },
}
</script>