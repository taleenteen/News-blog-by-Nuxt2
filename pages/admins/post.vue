<template>
  <div>
    <adminAddPost />
    <adminPostTable />
  </div>
</template>

<script>
export default {
  middleware: 'admin-auth',
  head() {
    return {
      title: 'จัดการโพสข่าว',
    }
  },
  data() {
    return {}
  },
}
</script>
