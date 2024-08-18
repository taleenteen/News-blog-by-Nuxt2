import axios from 'axios'

export const actions = {
  async getAllPost({ getters }, data) {
    return await this.$axios
      .get('/api/public/getAllPost', data)
      .then((res) => res.data)
  },
  async getSinglePost({ getters }, data) {
    return await this.$axios
      .get('/api/public/getSinglePost', data)
      .then((res) => res.data)
  },
  async getAllComment({ getters }, data) {
    return await this.$axios
      .get('/api/public/getAllComment', data)
      .then((res) => res.data)
  },
  async getSearch({ getters }, data) {
    return await this.$axios
      .get('/api/public/getSearch', data)
      .then((res) => res.data)
  },
  async getAllCategory({ getters }, data) {
    return await this.$axios
      .get('/api/public/getAllCategory', data)
      .then((res) => res.data)
  },
  async getSinglePostforEdit({ getters }, data) {
    return await this.$axios
      .get('/api/public/getSinglePostforEdit/' + data)
      .then((res) => res.data)
  },
  async createComment({ getters }, data) {
    return await this.$axios
      .post('/api/public/createComment', data)
      .then((res) => res.data)
  },
  async getRelatedPosts({ getters }, data) {
    return await this.$axios
      .get('/api/public/getRelatedPosts', data)
      .then((res) => res.data)
  },
  async getAllPostByCategory({ getters }, data) {
    return await this.$axios
      .get('/api/public/getAllPostByCategory', data)
      .then((res) => res.data)
  },
}
