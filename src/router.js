import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import HomeProfile from '@/components/HomeProfile.vue'
import Messagerie from '@/components/Messagerie.vue'
import Parametre from '@/components/Parametre.vue'

Vue.use(Router)
const vueRouter = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/HomeProfile',
      name: 'HomeProfile',
      component: HomeProfile,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/Messagerie',
      name: 'Messagerie',
      component: Messagerie,
      meta: {
        requiredAuth: true
      }
    },
    {
      path: '/Parametre',
      name: 'Parametre',
      component: Parametre,
      meta: {
        requiredAuth: true
      }
    }
  ]
});

vueRouter.beforeEach((to, from, next) => {
  const ema = sessionStorage.getItem('email')
  if (to.matched.some((record) => record.meta.requiredAuth) && !ema) {
    console.log('uuuuizz')
    next({
      name: 'home'
    })
  } else if (to.matched.some((record) => !record.meta.requiredAuth) && ema) {
    console.log('ee')
    next({
      name: 'HomeProfile'
    })
  } else {
    
    
    
    next()
  }
})

export default vueRouter
