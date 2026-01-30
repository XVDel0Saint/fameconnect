import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomePage.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/RegisterLayout.vue'),
    children: [
      {
        path: 'step-1',
        name: 'RegisterStep1',
        component: () => import('../views/RegisterStep1.vue')
      },
      {
        path: 'step-2',
        name: 'RegisterStep2',
        component: () => import('../views/RegisterStep2.vue')
      },
      {
        path: 'step-3',
        name: 'RegisterStep3',
        component: () => import('../views/RegisterStep3.vue')
      }
    ]
  },
  {
    path: '/thank-you',
    name: 'ThankYou',
    component: () => import('../views/ThankYouPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
