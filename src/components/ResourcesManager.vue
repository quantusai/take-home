<template>
  <div class="container-fluid mt-4">
    <h1 class="h1">Sources</h1>
    <b-alert :show="loading" variant="info">Loading...</b-alert>
    <b-row>
      <b-col>
        <b-card>
        <table class="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
                <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="resource in resources" :key="resource.id">
              <td>{{ resource.name }}</td>
              <td>
               <router-link size="sm" variant="primary" :to="{ name: 'ResourcesManagerDetail', params: { resource: resource, thing: thingValue } }">
                <b-button size="sm" variant="primary">view</b-button>
              </router-link>
              </td>
            </tr>
          </tbody>
        </table>
        </b-card>
      </b-col>
      <b-col lg="3">
        <b-card :name="(model.id ? 'Edit Resource ID#' + model.id : 'New Resource')">
          <form @submit.prevent="saveResource">
            <b-form-group label="Name">
              <b-form-input type="text" v-model="model.name"></b-form-input>
            </b-form-group>
            <div>
              <b-btn type="submit" variant="success">Save Resource</b-btn>
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
      thingValue: 'foo',
      resources: [],
      model: {}
    }
  },
  async created () {
    this.refreshResources()
  },
  methods: {
    async refreshResources () {
      this.loading = true
      this.resources = await api.getResources()
      this.loading = false
    },
    async populateResourceToEdit (resource) {
      this.model = Object.assign({}, resource)
    },
    async saveResource () {
      if (this.model.id) {
        await api.updateResource(this.model.id, this.model)
      } else {
        await api.createResource(this.model)
      }
      this.model = {} // reset form
      await this.refreshResources()
    },
    async deleteResource (id) {
      if (confirm('Are you sure you want to delete this resource?')) {
        // if we are editing a resource we deleted, remove it from the form
        if (this.model.id === id) {
          this.model = {}
        }
        await api.deleteResource(id)
        await this.refreshResources()
      }
    }
  }
}
</script>
