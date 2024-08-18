import axios from 'axios'

export const actions = {
  async getAllUser({ getters }, data) {
    return await this.$axios
      .post('/api/admins/getAllUser', data)
      .then((res) => res.data)
  },
  async editUserInfo({ getters }, data) {
    return await this.$axios
      .post('/api/admins/editUserInfo', data)
      .then((res) => res.data)
  },
  async deleteUser({ getters }, data) {
    return await this.$axios
      .post('/api/admins/deleteUser', data)
      .then((res) => res.data)
  },
  async getSingleUser({ getters }, data) {
    return await this.$axios
      .post('/api/admins/getSingleUser', data)
      .then((res) => res.data)
  },
  async createNewPost({ getters }, data) {
    return await this.$axios
      .post('/api/admins/createNewPost', data)
      .then((res) => res.data)
  },
  async getAllPost({ getters }, data) {
    return await this.$axios
      .post('/api/admins/getAllPost', data)
      .then((res) => res.data)
  },
  async editPostInfo({ getters }, data) {
    return await this.$axios
      .post('/api/admins/editPostInfo', data)
      .then((res) => res.data)
  },
  async deletePost({ getters }, data) {
    return await this.$axios
      .post('/api/admins/deletePost', data)
      .then((res) => res.data)
  },
  async createCategory({ getters }, data) {
    return await this.$axios
      .post('/api/admins/createCategory', data)
      .then((res) => res.data)
  },
  async editCategory({ getters }, data) {
    return await this.$axios
      .post('/api/admins/editCategory', data)
      .then((res) => res.data)
  },
  async getSingleCategory({ getters }, data) {
    return await this.$axios
      .post('/api/admins/getSingleCategory', data)
      .then((res) => res.data)
  },
  async deleteCategory({ getters }, data) {
    return await this.$axios
      .post('/api/admins/deleteCategory', data)
      .then((res) => res.data)
  },
}
