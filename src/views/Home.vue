<!-- src/views/Home.vue -->
<template>
  <AppLayout>
    <div class="flex gap-6 min-h-[calc(100vh-8rem)]">
      <aside
        :class="[
          'bg-white rounded-2xl border border-gray-200 shadow-sm p-4 transition-all duration-300 h-fit sticky top-24',
          isSidebarCollapsed ? 'w-20' : 'w-64'
        ]"
      >
        <div class="flex items-center justify-between mb-6">
          <div v-if="!isSidebarCollapsed">
            <p class="text-xs uppercase text-gray-400 tracking-[0.3em]">管理</p>
            <p class="text-lg font-semibold text-gray-900 mt-1">工作台</p>
          </div>
          <button
            class="w-10 h-10 rounded-xl border border-gray-200 text-gray-600 flex items-center justify-center hover:text-indigo-600"
            @click="toggleSidebar"
          >
            <svg class="w-4 h-4 transition-transform duration-300" :class="{ 'rotate-180': isSidebarCollapsed }" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        <nav class="space-y-2">
          <button
            v-for="item in menuItems"
            :key="item.id"
            @click="activeMenu = item.id"
            class="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200"
            :class="[
              activeMenu === item.id
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-600 hover:bg-gray-50'
            ]"
          >
            <component :is="item.icon" class="w-5 h-5" />
            <span v-if="!isSidebarCollapsed">{{ item.label }}</span>
          </button>
        </nav>
      </aside>

      <div class="flex-1">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <p class="text-sm text-gray-500">当前模块 · {{ activeMenuItem.label }}</p>
            <h1 class="text-2xl font-bold text-gray-900">智能文档控制台</h1>
            <p class="text-gray-500 mt-1" v-if="activeMenuItem.description">{{ activeMenuItem.description }}</p>
          </div>
        </div>

        <div v-if="activeMenu === 'home'" class="space-y-8">
          <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
            <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 class="text-3xl font-bold mb-2">欢迎回来，{{ authStore.user?.username || '用户' }}！</h2>
                <p class="text-indigo-100 opacity-90">今天准备创作什么精彩内容呢？</p>
                <div class="mt-4 flex items-center space-x-4 text-sm">
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {{ stats.totalDocuments || 0 }} 个文档
                  </span>
                  <span class="flex items-center">
                    <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {{ stats.todayDocuments || 0 }} 个今天创建
                  </span>
                </div>
              </div>
              <button
                @click="createNewDocument"
                class="mt-4 md:mt-0 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-indigo-50 transition-all duration-200 transform hover:-translate-y-0.5 shadow-lg flex items-center"
              >
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
                新建文档
              </button>
            </div>
          </div>

          <div class="flex flex-col lg:flex-row gap-8">
            <div class="lg:w-1/4">
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden sticky top-32">
                <div class="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                  <h2 class="text-lg font-semibold text-gray-900">管理面板</h2>
                  <p class="text-sm text-gray-600 mt-1">快速访问和管理你的内容</p>
                </div>

                <nav class="p-2">
                  <button
                    v-for="tab in tabs"
                    :key="tab.id"
                    @click="activeTab = tab.id"
                    class="w-full flex items-center px-4 py-3 mb-1 rounded-lg transition-all duration-200"
                    :class="[
                      activeTab === tab.id
                        ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-500'
                        : 'text-gray-700 hover:bg-gray-50'
                    ]"
                  >
                    <component :is="tab.icon" class="w-5 h-5 mr-3" />
                    <span class="font-medium">{{ tab.label }}</span>
                    <span
                      v-if="tab.count !== null"
                      class="ml-auto bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-full"
                    >
                      {{ tab.count }}
                    </span>
                  </button>
                </nav>

                <div class="p-4 border-t border-gray-200">
                  <h3 class="text-sm font-semibold text-gray-900 mb-3">快捷操作</h3>
                  <div class="space-y-2">
                    <button
                      @click="createNewDocument"
                      class="w-full flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                      新建文档
                    </button>
                    <button
                      @click="importDocument"
                      class="w-full flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                    >
                      <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      导入文档
                    </button>
                  </div>
                </div>
              </div>

              <div class="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">文档统计</h3>
                <div class="space-y-4">
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600">总文档数</span>
                    <span class="font-semibold text-gray-900">{{ stats.totalDocuments || 0 }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600">最近7天</span>
                    <span class="font-semibold text-green-600">+{{ stats.last7Days || 0 }}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="text-gray-600">存储空间</span>
                    <span class="font-semibold text-gray-900">{{ formatStorage(stats.totalCharacters || 0) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="lg:w-3/4">
              <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div class="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <div>
                    <h2 class="text-xl font-semibold text-gray-900">{{ activeTabData.label }}</h2>
                    <p class="text-sm text-gray-600 mt-1">{{ activeTabData.description }}</p>
                  </div>
                  <div class="flex items-center space-x-3">
                    <div class="relative">
                      <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="搜索文档..."
                        class="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent w-64"
                      />
                      <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <select
                      v-model="sortBy"
                      class="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    >
                      <option value="updated_at">最近更新</option>
                      <option value="created_at">创建时间</option>
                      <option value="title">标题</option>
                    </select>
                  </div>
                </div>

                <div class="p-6">
                  <div v-if="loading" class="text-center py-12">
                    <div class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    <p class="mt-4 text-gray-600">加载中...</p>
                  </div>

                  <div v-else-if="filteredDocuments.length === 0" class="text-center py-12">
                    <div class="mx-auto w-24 h-24 text-gray-300 mb-4">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 class="text-lg font-medium text-gray-900">暂无文档</h3>
                    <p class="mt-2 text-gray-600 max-w-md mx-auto">{{ activeTabData.emptyMessage }}</p>
                    <button
                      @click="createNewDocument"
                      class="mt-6 inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                      <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                      </svg>
                      创建第一个文档
                    </button>
                  </div>

                  <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      v-for="doc in paginatedDocuments"
                      :key="doc.id"
                      class="group bg-white border border-gray-200 rounded-xl hover:border-indigo-300 hover:shadow-lg transition-all duration-200 overflow-hidden"
                    >
                      <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                          <div>
                            <div class="flex items-center space-x-2 mb-2">
                              <span class="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                                {{ getDocumentType(doc) }}
                              </span>
                              <span class="text-xs text-gray-500">
                                {{ formatDate(doc.updated_at) }}
                              </span>
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                              {{ doc.title || '未命名文档' }}
                            </h3>
                          </div>
                          <div class="relative">
                            <button
                              @click="showDocumentMenu[doc.id] = !showDocumentMenu[doc.id]"
                              class="p-1 hover:bg-gray-100 rounded"
                            >
                              <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                              </svg>
                            </button>

                            <div
                              v-if="showDocumentMenu[doc.id]"
                              class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10"
                            >
                              <button
                                @click="openDocument(doc.id)"
                                class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                查看
                              </button>
                              <button
                                @click="editDocument(doc.id)"
                                class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                编辑
                              </button>
                              <button
                                @click="duplicateDocument(doc)"
                                class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                              >
                                <svg class="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                                复制
                              </button>
                              <div class="border-t border-gray-100">
                                <button
                                  @click="deleteDocument(doc.id)"
                                  class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                                >
                                  <svg class="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                  删除
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p class="text-gray-600 text-sm line-clamp-2 mb-4">
                          {{ doc.content ? stripHtml(doc.content).substring(0, 120) : '暂无内容' }}...
                        </p>

                        <div class="flex items-center justify-between pt-4 border-t border-gray-100">
                          <div class="flex items-center space-x-4 text-xs text-gray-500">
                            <span class="flex items-center">
                              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {{ formatRelativeTime(doc.updated_at) }}
                            </span>
                            <span class="flex items-center">
                              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                              </svg>
                              {{ countWords(doc.content) }} 字
                            </span>
                          </div>
                          <button
                            @click="openDocument(doc.id)"
                            class="text-sm font-medium text-indigo-600 hover:text-indigo-700 flex items-center"
                          >
                            查看详情
                            <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div v-if="filteredDocuments.length > itemsPerPage" class="mt-8 flex justify-center">
                    <nav class="flex items-center space-x-2">
                      <button
                        @click="currentPage--"
                        :disabled="currentPage === 1"
                        class="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        上一页
                      </button>
                      <span class="px-3 py-2 text-sm text-gray-700">
                        第 {{ currentPage }} 页 / 共 {{ totalPages }} 页
                      </span>
                      <button
                        @click="currentPage++"
                        :disabled="currentPage === totalPages"
                        class="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                      >
                        下一页
                      </button>
                    </nav>
                  </div>
                </div>
              </div>

              <div class="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 class="text-lg font-semibold text-gray-900 mb-4">最近活动</h3>
                <div class="space-y-4">
                  <div v-for="activity in recentActivities" :key="activity.id" class="flex items-start">
                    <div class="flex-shrink-0 mt-1">
                      <div :class="`w-8 h-8 rounded-full flex items-center justify-center ${activity.iconBg}`">
                        <component :is="activity.icon" class="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div class="ml-4 flex-1">
                      <p class="text-sm text-gray-900">
                        <span class="font-medium">{{ activity.user }}</span>
                        {{ activity.action }}
                        <span class="font-medium text-indigo-600">{{ activity.document }}</span>
                      </p>
                      <p class="text-xs text-gray-500 mt-1">{{ activity.time }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-sm">
          <div class="mx-auto w-16 h-16 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 mb-4">
            <component :is="activeMenuItem.icon" class="w-7 h-7" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900">{{ activeMenuItem.label }} 功能开发中</h3>
          <p class="text-gray-500 mt-2">该模块即将上线，敬请期待。</p>
        </div>
      </div>
    </div>
  </AppLayout>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import AppLayout from '@/components/AppLayout.vue';
import api from '@/api';

const DocumentIcon = {
  template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>'
};

const StarIcon = {
  template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>'
};

const ClockIcon = {
  template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>'
};

const TrashIcon = {
  template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>'
};

const FolderIcon = {
  template: '<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>'
};

const router = useRouter();
const authStore = useAuthStore();

const isSidebarCollapsed = ref(false);
const activeMenu = ref('home');
const menuItems = ref([
  { id: 'home', label: '首页', description: '查看核心概览与快捷操作', icon: DocumentIcon },
  { id: 'documents', label: '文档管理', description: '集中管理所有合同文档', icon: FolderIcon },
  { id: 'analytics', label: '效率洞察', description: '监控整体写作效率', icon: ClockIcon },
  { id: 'favorites', label: '收藏夹', description: '快速访问收藏内容', icon: StarIcon },
  { id: 'trash-bin', label: '回收站', description: '恢复或清理删除的文档', icon: TrashIcon },
]);
const activeMenuItem = computed(() => menuItems.value.find(item => item.id === activeMenu.value) || menuItems.value[0]);
const userInitial = computed(() => authStore.user?.username ? authStore.user.username.charAt(0).toUpperCase() : 'U');

const loading = ref(true);
const documents = ref([]);
const stats = ref({});
const searchQuery = ref('');
const sortBy = ref('updated_at');
const currentPage = ref(1);
const itemsPerPage = 8;
const showDocumentMenu = ref({});
const activeTab = ref('all');

const tabs = ref([
  { id: 'all', label: '全部文档', icon: DocumentIcon, count: null, description: '查看所有文档', emptyMessage: '还没有创建任何文档' },
  { id: 'recent', label: '最近编辑', icon: ClockIcon, count: null, description: '最近编辑的文档', emptyMessage: '最近没有编辑文档' },
  { id: 'starred', label: '已收藏', icon: StarIcon, count: 0, description: '你收藏的文档', emptyMessage: '还没有收藏文档' },
  { id: 'trash', label: '回收站', icon: TrashIcon, count: 0, description: '已删除的文档', emptyMessage: '回收站是空的' },
  { id: 'categories', label: '分类管理', icon: FolderIcon, count: 3, description: '按分类管理文档', emptyMessage: '暂无分类' },
]);

const activeTabData = computed(() => {
  return tabs.value.find(tab => tab.id === activeTab.value) || tabs.value[0];
});

const toggleSidebar = () => {
  isSidebarCollapsed.value = !isSidebarCollapsed.value;
};

const fetchDocuments = async () => {
  try {
    loading.value = true;
    const response = await api.get('/documents/');
    documents.value = response.data;
    updateStats();
    updateTabCounts();
  } catch (error) {
    console.error('获取文档失败:', error);
  } finally {
    loading.value = false;
  }
};

const updateStats = () => {
  const today = new Date().toISOString().split('T')[0];

  stats.value = {
    totalDocuments: documents.value.length,
    todayDocuments: documents.value.filter(doc =>
      doc.created_at.startsWith(today)
    ).length,
    last7Days: documents.value.filter(doc => {
      const docDate = new Date(doc.created_at);
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      return docDate > sevenDaysAgo;
    }).length,
    totalCharacters: documents.value.reduce((total, doc) =>
      total + (doc.content ? stripHtml(doc.content).length : 0), 0
    ),
  };
};

const updateTabCounts = () => {
  const allTab = tabs.value.find(t => t.id === 'all');
  const recentTab = tabs.value.find(t => t.id === 'recent');

  if (allTab) allTab.count = documents.value.length;

  if (recentTab) {
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    recentTab.count = documents.value.filter(doc => {
      const docDate = new Date(doc.updated_at);
      return docDate > sevenDaysAgo;
    }).length;
  }
};

const filteredDocuments = computed(() => {
  let filtered = [...documents.value];

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(doc =>
      doc.title?.toLowerCase().includes(query) ||
      stripHtml(doc.content || '').toLowerCase().includes(query)
    );
  }

  switch (activeTab.value) {
    case 'recent': {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      filtered = filtered.filter(doc => {
        const docDate = new Date(doc.updated_at);
        return docDate > sevenDaysAgo;
      });
      break;
    }
    case 'starred':
      filtered = filtered.filter(doc => doc.starred);
      break;
    case 'trash':
      filtered = filtered.filter(doc => doc.deleted);
      break;
    default:
      break;
  }

  filtered.sort((a, b) => {
    if (sortBy.value === 'title') {
      return (a.title || '').localeCompare(b.title || '');
    }
    return new Date(b[sortBy.value]) - new Date(a[sortBy.value]);
  });

  return filtered;
});

const paginatedDocuments = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredDocuments.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredDocuments.value.length / itemsPerPage);
});

const stripHtml = (html) => {
  return html?.replace(/<[^>]*>/g, '') || '';
};

const countWords = (content) => {
  return stripHtml(content || '').length;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const formatRelativeTime = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMins < 60) return `${diffMins}分钟前`;
  if (diffHours < 24) return `${diffHours}小时前`;
  if (diffDays < 7) return `${diffDays}天前`;
  return formatDate(dateString);
};

const formatStorage = (characters) => {
  const kb = characters / 1024;
  if (kb < 1024) return `${kb.toFixed(1)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

const getDocumentType = (doc) => {
  const content = doc.content || '';
  if (content.includes('<h1>')) return '文章';
  if (content.includes('<ul>') || content.includes('<ol>')) return '列表';
  if (content.length > 1000) return '长文档';
  return '笔记';
};

const createNewDocument = () => {
  router.push('/documents/new');
};

const openDocument = (id) => {
  router.push(`/documents/${id}`);
};

const editDocument = (id) => {
  router.push(`/documents/${id}/edit`);
};

const deleteDocument = async (id) => {
  if (!confirm('确定要删除这个文档吗？')) return;

  try {
    await api.delete(`/documents/${id}/`);
    documents.value = documents.value.filter(doc => doc.id !== id);
    updateStats();
    updateTabCounts();
  } catch (error) {
    console.error('删除文档失败:', error);
    alert('删除失败，请重试');
  }
};

const duplicateDocument = async (doc) => {
  try {
    const newDoc = {
      title: `${doc.title} (副本)`,
      content: doc.content,
    };

    const response = await api.post('/documents/', newDoc);
    documents.value.unshift(response.data);
    updateStats();
    updateTabCounts();
    router.push(`/documents/${response.data.id}`);
  } catch (error) {
    console.error('复制文档失败:', error);
    alert('复制失败，请重试');
  }
};

const importDocument = () => {
  alert('导入文档功能开发中...');
};

const recentActivities = ref([
  { id: 1, user: '你', action: '创建了文档', document: '项目计划书', time: '2小时前', icon: DocumentIcon, iconBg: 'bg-green-500' },
  { id: 2, user: '你', action: '编辑了文档', document: '会议记录', time: '昨天', icon: ClockIcon, iconBg: 'bg-blue-500' },
  { id: 3, user: '你', action: '收藏了文档', document: '产品需求文档', time: '3天前', icon: StarIcon, iconBg: 'bg-yellow-500' },
]);

watch(activeTab, () => {
  currentPage.value = 1;
});

watch([searchQuery, sortBy], () => {
  currentPage.value = 1;
});

onMounted(() => {
  fetchDocuments();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.sticky {
  position: -webkit-sticky;
  position: sticky;
}
</style>
