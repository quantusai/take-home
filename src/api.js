import Vue from 'vue'
import axios from 'axios'

const client = axios.create({
  baseURL: 'http://192.168.0.3:8081/',
  json: true
})

export default {
  async execute (method, resource, data) {
    // inject the accessToken for each request
    let accessToken = await Vue.prototype.$auth.getAccessToken()
    return client({
      method,
      url: resource,
      data,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
      return req.data
    })
  },
  getMessages () {
    return this.execute('get', '/posts')
  },
  getMessage (id) {
    return this.execute('get', `/posts/${id}`)
  },
  createMessage (data) {
    return this.execute('post', '/posts', data)
  },
  updateMessage (id, data) {
    return this.execute('put', `/posts/${id}`, data)
  },
  deleteMessage (id) {
    return this.execute('delete', `/posts/${id}`)
  },
  getResources () {
    return this.execute('get', '/resources')
  },
  getResource (id) {
    return this.execute('get', `/resources/${id}`)
  },
  createResource (data) {
    return this.execute('post', '/resources', data)
  },
  updateResource (id, data) {
    return this.execute('put', `/resources/${id}`, data)
  },
  deleteResource (id) {
    return this.execute('delete', `/resources/${id}`)
  }
}
