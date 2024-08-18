import axios from 'axios'

export const actions = {
  async getLevel({ getters }, data) {
    return await this.$axios.post('/api/auth', data).then((res) => res.data)
  },
  async getAdminLevel({ getters }, data) {
    return await this.$axios
      .post('/api/adminAuth', data)
      .then((res) => res.data)
  },
  async getUserLevel({ getters }, data) {
    return await this.$axios.post('/api/userAuth', data).then((res) => res.data)
  },
  async login(ctx,data){
    return await this.$axios.post('/api/auth/userLogin', data).then((res) => res.data)
  }
}
