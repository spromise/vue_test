import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import LoginView from '@/views/LoginView.vue'
import ValidateForm from '@/views/ValidateForm.vue'
import AppLayout from '@/views/AppLayout.vue'
import TaskManager from '@/views/TaskManager.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component:AboutView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/validate',
    name: 'validate',
    component: ValidateForm
  },  
  {
    path: '/layout',
    name: 'layout',
    component: AppLayout
  },
  {
    path: '/task',
    name: 'task',
    component: TaskManager
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
