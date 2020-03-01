import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login'
import Register from '../views/Register'
import TodoApp from '../views/TodoApp'

import * as firebase from "firebase/app";
import "firebase/auth";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/todoapp',
    name: 'todoapp',
    component: TodoApp,
    meta:{requiresAuth: true}
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next)=>{
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = firebase.auth().currentUser;
  if(requiresAuth && !isAuthenticated){
    next("/login");
  } else{
    next()
  }
})

export default router
