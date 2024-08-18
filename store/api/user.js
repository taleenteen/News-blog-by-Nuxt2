export const actions = {
  //register
  async addNewUser({ getters }, data) {
    return await this.$axios
      .post('/api/auth/userRegister', data)
      .then((res) => res)
  },

  async getUserInfo({ getters }, data) {
    return await this.$axios
      .post('/api/auth/getUserInfo', data)
      .then((res) => res.data)
  },
}
