import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/todo',
      name: 'todo',
      component: HomeView
    },
    {
      path: '/',
      component: () => import('../views/LoginView.vue'),
      children: [
        {
          path: '',
          name: 'login',
          component: () => import('../components/LoginForm.vue'),
        },
        {
          path: '/register',
          name: 'register',
          component: () => import('../components/RegisterForm.vue'),
        }
      ]
    },
    {
      path: '/:catchAll(.*)', // 404
      redirect: '/' // 重定向到首頁
    }
  ]
})

export default router
