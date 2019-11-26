import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from "@/components/Login"
import HelloWorld from "@/components/HelloWorld"
import Dashboard from "@/components/Dashboard"
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "HelloWorld",
    component: HelloWorld
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard
}

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
