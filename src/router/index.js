// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register.vue'),
      meta: { guestOnly: true }
    },
    {
      path: '/documents',
      name: 'documents',
      component: () => import('@/views/Documents.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/documents/:id',
      name: 'editor',
      component: () => import('@/views/Editor.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/documents/new',
      name: 'new-document',
      component: () => import('@/views/Editor.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/Profile.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('@/views/Settings.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Home.vue'),  // 改为Home页面
      meta: { requiresAuth: true }
    },
    {
      path: '/documents',
      name: 'documents',
      component: () => import('@/views/Documents.vue'),  // 保留原文档列表页
      meta: { requiresAuth: true }
    },
  ],
});

// 路由守卫
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  // 检查是否需要认证
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
    return;
  }

  // 检查是否只允许游客访问（如登录/注册页）
  if (to.meta.guestOnly && authStore.isAuthenticated) {
    next('/');
    return;
  }

  next();
});

export default router;
