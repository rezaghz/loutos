import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'خانه',
      component: require('@/components/Home').default
    },
    {
      path: '/landing',
      name: 'landing-page',
      component: require('@/components/LandingPage').default
    },
    {
      path: '/notes',
      name: 'notes',
      component: require('@/components/Pages/Notes').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
