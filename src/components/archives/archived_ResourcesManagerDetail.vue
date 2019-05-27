<template>
  <div class="container-fluid mt-4">
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
            <b-col>
        <b-card>
                  <div class="card">
                    
                <div class="card-header">
                  <b-row>

                     <b-col>
                       <h2 style="white-space:nowrap">{{this.$route.params.resource.name}}</h2>
                          
      <h3 style="white-space:nowrap">{{this.$route.params.resource.environment}}</h3>

                       </b-col>

                     <b-col>
                       <h4 style="white-space:nowrap">{{this.$route.params.resource.id}}</h4>
                         <h5 style="white-space:nowrap">Encoding: {{this.$route.params.resource.encoding}}</h5>
      <h6 style="white-space:nowrap">Created: {{this.$route.params.resource.createdat | formatDate }}</h6>
      <h6 style="white-space:nowrap">Updated: {{this.$route.params.resource.updatedat | formatDate }}</h6>
                       </b-col>

                  </b-row>
                        
                </div>
                <div class="card-body">
                    <button type="button" class="btn btn-primary m-l-10 m-b-10">Processing <span class="badge badge-light">{{this.status.processing}}</span></button>
                    <button type="button" class="btn btn-success m-l-10 m-b-10">Finished <span class="badge badge-light">{{this.status.finished}}</span></button>
                    <button type="button" class="btn btn-info m-l-10 m-b-10">Enqueued <span class="badge badge-light">{{this.status.enqueued}}</span></button>
                    <button type="button" class="btn btn-danger m-l-10 m-b-10">Error <span class="badge badge-light">{{this.status.error}}</span></button>
                </div>
            </div>

      </b-card>
      </b-col>
   </b-row>
   <b-row>
   <b-col>
        <b-card>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>GUID</th>
              <th>MESSAGE</th>
              <th>STATUS</th>
              <th>UPDATED</th>
              <th>CREATED</th>
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="post in filteredList" :key="post.id">
              <td>{{ post.id }}</td>
              <td>{{ post.guid }}</td>
              <td>{{ post.message }}</td>
              <td v-if="post.status === 'error'" class='alert-danger'><span class="badge badge-pill badge-danger">{{ post.status }}</span></td>
              <td v-else-if="post.status === 'enqueued'" class='alert-info'><span class="badge badge-pill badge-info">{{ post.status }}</span></td>
              <td v-else-if="post.status === 'finished'" class='alert-success'><span class="badge badge-pill badge-success">{{ post.status }}</span></td>
              <td v-else-if="post.status === 'processing'" class='alert-primary'><span class="badge badge-pill badge-primary">{{ post.status }}</span></td>
              <td v-else>{{ post.status }}</td>
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
    </b-row>
  </div>
</template>

<script>
// todo: implement this kind of a search Table https://vuejs.org/v2/examples/grid-component.html
import api from '@/api'
export default {
  data () {
    return {
      loading: false,
      posts: [],
      status: {error: 0, enqueued: 0, finished: 0, processing: 0},
      model: {}
    }
  },
  async created () {
    this.refreshMessages()
  },
  computed: {
    filteredList () {
      return this.posts.filter(post => {
        let resourceId = this.$route.params.resource.id
        if (post.source_id === resourceId) {
          for (var key in this.status) {
            if (key === post.status) {
              this.status[key] = this.status[key] + 1
            }
          }
        }
        return post.source_id.toLowerCase().includes(resourceId)
      })
    }
  },
  methods: {
    async refreshMessages () {
      this.loading = true
      this.posts = await api.getMessages(this.guid)
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
