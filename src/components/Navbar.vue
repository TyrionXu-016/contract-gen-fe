<!-- src/components/Navbar.vue -->
<template>
  <nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <!-- 左侧：Logo和品牌 -->
        <div class="flex items-center space-x-4">
          <router-link to="/" class="flex items-center space-x-2">
            <div
              class="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <span class="text-xl font-bold text-gray-900 hidden md:inline"
              >合同模版智能生成系统</span
            >
          </router-link>

          <!-- 导航链接 -->
          <!-- 在 Navbar.vue 中更新导航链接 -->
          <div class="hidden md:flex space-x-4">
            <router-link
              to="/"
              class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="
                currentRoute === '/'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
              "
            >
              首页
            </router-link>
            <router-link
              to="/documents"
              class="px-3 py-2 rounded-md text-sm font-medium transition-colors"
              :class="
                currentRoute === '/documents'
                  ? 'text-indigo-600 bg-indigo-50'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
              "
            >
              文档列表
            </router-link>
          </div>
        </div>

        <!-- 右侧：用户信息和操作 -->
        <div class="flex items-center space-x-4">
          <!-- 通知图标（可选） -->
          <button
            class="relative p-2 text-gray-600 hover:text-gray-900 rounded-full hover:bg-gray-100"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span class="absolute top-1 right-1 block h-2 w-2 rounded-full bg-red-400"></span>
          </button>

          <!-- 用户菜单 -->
          <div class="relative" ref="userMenu">
            <button
              @click="toggleUserMenu"
              class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <div
                class="w-8 h-8 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold"
              >
                {{ userInitial }}
              </div>
              <div class="hidden md:block text-left">
                <p class="text-sm font-medium text-gray-900">
                  {{ authStore.user?.username || '用户' }}
                </p>
                <p class="text-xs text-gray-500">{{ authStore.user?.email || '' }}</p>
              </div>
              <svg
                class="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                :class="{ 'transform rotate-180': showUserMenu }"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            <!-- 下拉菜单 -->
            <div
              v-if="showUserMenu"
              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50"
              style="min-width: 200px"
            >
              <div class="px-4 py-3 border-b border-gray-100">
                <p class="text-sm font-medium text-gray-900">{{ authStore.user?.username }}</p>
                <p class="text-xs text-gray-500 truncate">{{ authStore.user?.email }}</p>
              </div>

              <div class="py-1">
                <router-link
                  to="/profile"
                  @click="showUserMenu = false"
                  class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <svg
                    class="w-4 h-4 mr-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  个人资料
                </router-link>

                <router-link
                  to="/settings"
                  @click="showUserMenu = false"
                  class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                >
                  <svg
                    class="w-4 h-4 mr-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  设置
                </router-link>
              </div>

              <div class="border-t border-gray-100 py-1">
                <button
                  @click="handleLogout"
                  class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  退出登录
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 移动端导航链接 -->
      <div class="md:hidden border-t border-gray-100 py-2">
        <div class="flex space-x-4">
          <router-link
            to="/"
            class="flex-1 text-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="
              currentRoute === '/'
                ? 'text-indigo-600 bg-indigo-50'
                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
            "
          >
            我的文档
          </router-link>
          <router-link
            to="/documents/new"
            class="flex-1 text-center px-3 py-2 rounded-md text-sm font-medium transition-colors"
            :class="
              currentRoute === '/documents/new'
                ? 'text-indigo-600 bg-indigo-50'
                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
            "
          >
            新建文档
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const showUserMenu = ref(false)
const userMenu = ref(null)

// 获取用户首字母（用于头像）
const userInitial = computed(() => {
  if (authStore.user?.username) {
    return authStore.user.username.charAt(0).toUpperCase()
  }
  return 'U'
})

// 获取当前路由
const currentRoute = computed(() => route.path)

// 切换用户菜单
const toggleUserMenu = () => {
  showUserMenu.value = !showUserMenu.value
}

// 点击外部关闭菜单
const handleClickOutside = (event) => {
  if (userMenu.value && !userMenu.value.contains(event.target)) {
    showUserMenu.value = false
  }
}

// 注销处理
const handleLogout = async () => {
  showUserMenu.value = false

  // 添加退出动画
  document.body.style.opacity = '0.8'

  setTimeout(() => {
    authStore.logout()
    router.push('/login')

    // 恢复透明度
    setTimeout(() => {
      document.body.style.opacity = '1'
    }, 300)
  }, 300)
}

// 监听外部点击
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.router-link-active {
  @apply text-indigo-600 bg-indigo-50;
}
</style>
