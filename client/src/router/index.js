import Vue from 'vue'
import VueRouter from 'vue-router'
import MainNavbar from '@/layout/MainNavbar.vue';
import MainFooter from '@/layout/MainFooter.vue';
import Login from '@/pages/Login.vue';
import Landing from '@/pages/Landing.vue';
// import Login from "@/components/Login"
// import HelloWorld from "@/components/HelloWorld"
import Index from '@/pages/Index.vue';
import Dashboard from "@/components/Dashboard"
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    components: { default: Index, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: 'black' }
    }
  },
  {
    path: '/login',
    name: 'login',
    components: { default: Login, header: MainNavbar },
    props: {
      header: { colorOnScroll: 400 }
    }
  },
  {
    path: '/landing',
    name: 'landing',
    components: { default: Landing, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: 'black' }
    }
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
