<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Messages</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <b-card>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>GUID</th>
              <th>SOURCE ID</th>
              <th>Updated At</th>
              <th>Created At</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in posts" :key="post.id">
              <td>{{ post.id }}</td>
              <td>{{ post.guid }}</td>
              <td>{{ post.source_id }}</td>
              <td>{{ post.updatedat | formatDate }}</td>
              <td>{{ post.createdat | formatDate }}</td>
              <td class="text-right">
                <a href="#" @click.prevent="populateMessageToEdit(post)">Edit</a> -
                <a href="#" @click.prevent="deleteMessage(post.id)">Delete</a>
              </td>
            </tr>
          </tbody>
        </table>
        </b-card>
      </b-col>
      <b-col lg="3">
        <b-card :title="(model.id ? 'Edit Message ID#' + model.id : 'New Message')">
          <form @submit.prevent="saveMessage">
            <b-form-group label="Title">
              <b-form-input type="text" v-model="model.title"></b-form-input>
            </b-form-group>
            <b-form-group label="Body">
              <b-form-textarea rows="4" v-model="model.body"></b-form-textarea>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Message</b-btn>
            </div>
          </form>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data () {
    return {
      loading: false,
      posts: [],
      model: {}
    }
  },
  async created () {
    this.refreshMessages()
  },
  methods: {
    async refreshMessages () {
      this.loading = true
      this.posts = await api.getMessages()
      this.loading = false
    },
    async populateMessageToEdit (post) {
      this.model = Object.assign({}, post)
    },
    async saveMessage () {
      if (this.model.id) {
        await api.updateMessage(this.model.id, this.model)
      } else {
        await api.createMessage(this.model)
      }
      this.model = {} // reset form
      await this.refreshMessages()
    },
    async deleteMessage (id) {
      if (confirm('Are you sure you want to delete this post?')) {
        // if we are editing a post we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deleteMessage(id)
        await this.refreshMessages()
      }
    }
  }
}
</script>
