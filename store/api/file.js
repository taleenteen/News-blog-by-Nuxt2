import axios from 'axios'

export const actions = {
  async uploadPicture({ getters }, data) {
    return await this.$axios
      .post('/api/file/uploadPicture', data)
      .then((res) => res.data)
  },
}
