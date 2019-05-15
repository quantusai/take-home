import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MessagesManager from '@/components/MessagesManager'
import ResourcesManager from '@/components/ResourcesManager'
import Auth from '@okta/okta-vue'

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
