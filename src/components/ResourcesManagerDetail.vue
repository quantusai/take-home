<!-- Learn about this default example from the source https://bootstrap-vue.js.org/docs/components/table/#complete-example --> 
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
                       <h2 style="white-space:nowrap">{{ this.$route.params.resource.name }}</h2>
                          
      <h3 style="white-space:nowrap">{{ this.$route.params.resource.environment }}</h3>

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
                      <div class="col-sm-12">
        <b-card header-text="Bar Chart" class="mb-4">
          <div class="chart-wrapper mb-4">
            <bar-chart-js v-if="status.error" :statusError="status.error" :statusFinished="status.finished" :statusProcessing="status.processing" :statusEnqueued="status.enqueued" style="height:175px"/>
          </div>
        </b-card>
      </div>
            </div>
      </b-card>
      </b-col>
   </b-row>
   <b-row>
     <b-container fluid> 
      <b-card>
    <!-- User Interface controls -->
    <b-row>
      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Sort" class="mb-0">
          <b-input-group>
            <b-form-select v-model="sortBy" :options="sortOptions">
              <option slot="first" :value="null">-- none --</option>
            </b-form-select>
            <b-form-select v-model="sortDesc" :disabled="!sortBy" slot="append">
              <option :value="false">Asc</option> <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Sort direction" class="mb-0">
          <b-form-select v-model="sortDirection">
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
            <option value="last">Last</option>
          </b-form-select>
        </b-form-group>
      </b-col>

      <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
          <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>
    </b-row>

    <!-- Main table element -->
    <b-table
      show-empty
      stacked="md"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :filter="filter"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      :sort-direction="sortDirection"
      @filtered="onFiltered"
    >

      <template slot="isActive" slot-scope="row">
        {{ row.value ? 'Yes :)' : 'No :(' }}
      </template>

      <template slot="actions" slot-scope="row">
        <b-button size="sm" @click="info(row.item, row.index, $event.target)" class="mr-1">
          Info modal
        </b-button>
        <b-button size="sm" @click="row.toggleDetails">
          {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
        </b-button>
      </template>

      <template slot="row-details" slot-scope="row">
        <b-card>
          <ul>
            <li v-for="(value, key) in row.item" :key="key">{{ key }}: {{ value }}</li>
          </ul>
        </b-card>
      </template>
    </b-table>

    <b-row>
      <b-col md="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          class="my-0"
        ></b-pagination> Total Records: {{totalRows}}
      </b-col>
    </b-row>

    <!-- Info modal -->
    <b-modal :id="infoModal.id" :title="infoModal.title" ok-only @hide="resetInfoModal">
      <pre>{{ infoModal.content }}</pre>
    </b-modal>
    </b-card>
  </b-container>

    </b-row>
  </div>
</template>

<script>
// todo: implement this kind of a search Table https://vuejs.org/v2/examples/grid-component.html
import BarChartJs from './charts/chartjs/scripts/BarChartJs.vue'
import api from '@/api'
export default {
  data () {
    return {
      loading: false,
      status: {error: 0, enqueued: 0, finished: 0, processing: 0},
      model: {},
      posts: [],
      items: [],
      fields: [
        { key: 'id', label: 'Id' },
        { key: 'guid', label: 'guid', sortable: true, class: 'text-center' },
        { key: 'status', label: 'status', sortable: true, class: 'text-center' },
        { key: 'createdat', label: 'Created', sortable: true, sortDirection: 'desc' },
        { key: 'updatedat', label: 'Updated', sortable: true, sortDirection: 'desc' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15, 25, 50, 75, 100, 1000, 5000, 10000],
      sortBy: null,
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      infoModal: {
        id: 'info-modal',
        title: '',
        content: ''
      }
    }
  },
  async created () {
    this.refreshMessages()
  },
  computed: {
    sortOptions () {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => {
          return { text: f.label, value: f.key }
        })
    }
  },
  mounted () {
    // Set the initial number of items
  },
  methods: {
    async refreshMessages () {
      this.loading = true
      this.loading = false
      this.filteredList()
    },
    async filteredList () {
      let resourceId = this.$route.params.resource.id
      this.items = await api.getMessagesBySourceId(resourceId)
      this.totalRows = this.items.length
      // console.log(this.items)
      return this.items.filter(item => {
        if (item.source_id === resourceId) {
          this.items.push(item)
          for (var key in this.status) {
            if (key === item.status) {
              this.status[key] = this.status[key] + 1
            }
          }
        }
      })
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
    },
    info (item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal () {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered (filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    }
  },
  components: {
    BarChartJs
  }
}
</script>
