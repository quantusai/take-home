import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MessagesManager from '@/components/MessagesManager'
import ResourcesManager from '@/components/ResourcesManager'
import Auth from '@okta/okta-vue'

// Dynamic Loading Modules

// Views
// const Dashboard = resolve => { require.ensure(['../views/Dashboard.vue'], ()=>{ resolve(require('../views/Dashboard.vue')) }) }

// UI Components
// const Buttons = resolve => { require.ensure(['../components/Buttons.vue'], () =>{ resolve(require('../components/Buttons.vue')) }) }
// const Badges = resolve => { require.ensure(['../components/Badges.vue'], () => { resolve(require('../components/Badges.vue')) }) }
// const Alerts = resolve => { require.ensure(['../components/Alerts.vue'], () => { resolve(require('../components/Alerts.vue')) }) }
// const ProgressBars = resolve => { require.ensure(['../components/ProgressBars.vue'], () => { resolve(require('../components/ProgressBars.vue')) }) }

// const BasicForms = resolve => { require.ensure(['../components/forms/BasicForms.vue'], () => { resolve(require('../components/forms/BasicForms.vue')) }) }
// const Grids = resolve => { require.ensure(['../components/Grids.vue'], () => { resolve(require('../components/Grids.vue')) }) }
// const Widgets = resolve => { require.ensure(['../components/Widgets.vue'], () =>{ resolve(require('../components/Widgets.vue')) }) }
// const Typography = resolve => { require.ensure(['../components/Typography.vue'], () => { resolve(require('../components/Typography.vue')) }) }
// const Icons = resolve => { require.ensure(['../components/icons/Icons.vue'], () => { resolve(require('../components/icons/Icons.vue')) }) }
// const SetsList = resolve => { require.ensure(['../components/icons/SetsList.vue'], () => { resolve(require('../components/icons/SetsList.vue')) }) }
// const Sets = resolve => { require.ensure(['../components/icons/Set.vue'], () => { resolve(require('../components/icons/Set.vue')) }) }
// const Tables = resolve => { require.ensure(['../components/tables/Tables.vue'], () => { resolve(require('../components/tables/Tables.vue')) }) }

// Charts
// const ChartJS = resolve => { require.ensure(['../components/charts/ChartJS.vue'], () => { resolve(require('../components/charts/ChartJS.vue')) }) }

// Maps
// const GoogleMapsPage = resolve => { require.ensure(['../components/maps/google-maps/GoogleMapsPage.vue'], () => { resolve(require('../components/maps/google-maps/GoogleMapsPage.vue')) }) }
// const LeafletMapsPage = resolve => { require.ensure(['../components/maps/leaflet-maps/LeafletMapsPage.vue'], () => { resolve(require('../components/maps/leaflet-maps/LeafletMapsPage.vue')) }) }

// // User Info
// const User = resolve => { require.ensure(['../layouts/User.vue'], ()=>{ resolve(require('../layouts/User.vue')) }) }

// Pages
// const Login = resolve => { require.ensure(['../pages/login/Login.vue'], () => { resolve(require('../pages/login/Login.vue')) }) }
// const Register = resolve => { require.ensure(['../pages/register/Register.vue'], () => { resolve(require('../pages/register/Register.vue')) }) }
// const Page404 = resolve => { require.ensure(['../pages/Page404.vue'], () => { resolve(require('../pages/Page404.vue')) }) }
// const Page500 = resolve => { require.ensure(['../pages/Page500.vue'], () => { resolve(require('../pages/Page500.vue')) }) }

Vue.use(Auth, {
  issuer: 'https://dev-108751.okta.com/oauth2/default',
  client_id: '0oalccuta0fx2kHFl356',
  redirect_uri: 'http://localhost:8888/implicit/callback',
  scope: 'openid profile email'
})

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/implicit/callback',
      component: Auth.handleCallback()
    },
    {
      path: '/posts-manager',
      name: 'MessagesManager',
      component: MessagesManager,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/resources-manager',
      name: 'ResourcesManager',
      component: ResourcesManager,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

router.beforeEach(Vue.prototype.$auth.authRedirectGuard())

export default router
