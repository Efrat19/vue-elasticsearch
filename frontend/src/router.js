import Vue from 'vue'
import Router from 'vue-router'
import Search from './components/Search.vue'
import Create from './components/Create.vue'
import Delete from './components/Delete.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'search',
      component: Search
    },
    {
      path: '/',
      name: 'create',
      component: Create
    },
    {
      path: '/',
      name: 'delete',
      component: Delete
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
