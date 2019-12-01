import Vue from 'vue'
import VueRouter from 'vue-router'

import NotFoundComponent from '@/views/error/404.vue'
import MainNavbar from '@/layouts/navi.vue'
import MainFooter from '@/layouts/footer.vue'

import Home from '@/views/Home.vue'
import parcel from '@/views/parcel.vue'
import login from '@/views/login.vue'
import logout from '@/views/Logout.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    components: { default: Home, header: MainNavbar },
    props: {
    }
  },
  {
    path: '/parcel',
    name: 'parcel',
    components: { default: parcel, header: MainNavbar },
    props: {
    }
  },
  {
    path: '/login',
    name: 'login',
    components: { default: login},
    props: {
    }
  },
  {
    path: '/logout',
    name: 'logout',
    components: { default: logout},
    props: {
    }
  },
  {
    path: '*',
    component: NotFoundComponent
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router 
