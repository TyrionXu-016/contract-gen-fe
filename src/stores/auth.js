// src/stores/auth.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import api from '@/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    accessToken: localStorage.getItem('access_token') || null,
    refreshToken: localStorage.getItem('refresh_token') || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
    currentUser: (state) => state.user,
  },

  actions: {
    async login(credentials) {
      try {
        const response = await api.post('/login/', credentials);

        const { user, access, refresh } = response.data;

        // 保存到localStorage
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('user', JSON.stringify(user));

        // 更新store
        this.user = user;
        this.accessToken = access;
        this.refreshToken = refresh;

        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error.response?.data?.error || '登录失败'
        };
      }
    },

    async register(userData) {
      try {
        const response = await api.post('/register/', userData);

        const { user, access, refresh } = response.data;

        // 保存到localStorage
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
        localStorage.setItem('user', JSON.stringify(user));

        // 更新store
        this.user = user;
        this.accessToken = access;
        this.refreshToken = refresh;

        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error.response?.data?.error || '注册失败'
        };
      }
    },

    logout() {
      // 清除localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');

      // 重置store
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
    },

    async fetchCurrentUser() {
      try {
        const response = await api.get('/me/');
        this.user = response.data;
        localStorage.setItem('user', JSON.stringify(response.data));
      } catch (error) {
        console.error('获取用户信息失败:', error);
        this.logout();
      }
    }
  },
}, {
  persist: true, // 持久化存储
});
