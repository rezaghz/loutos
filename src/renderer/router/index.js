import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
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
      path: '/convert-dates',
      name: 'convert-dates',
      component: require('@/components/Pages/ConvertDates').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
