<!-- src/views/Documents.vue -->
<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">我的文档</h1>
      <button
        @click="createNewDocument"
        class="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        新建文档
      </button>
    </div>

    <!-- 加载状态 -->
    <div v-if="loading" class="text-center py-8">
      <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      <p class="mt-2 text-gray-600">加载中...</p>
    </div>

    <!-- 空状态 -->
    <div v-else-if="documents.length === 0" class="text-center py-12">
      <div class="mx-auto h-12 w-12 text-gray-400">
        <svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <h3 class="mt-2 text-sm font-medium text-gray-900">还没有文档</h3>
      <p class="mt-1 text-sm text-gray-500">开始创建你的第一个文档吧！</p>
      <div class="mt-6">
        <button
          @click="createNewDocument"
          class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg class="-ml-1 mr-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          新建文档
        </button>
      </div>
    </div>

    <!-- 文档列表 -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="doc in documents"
        :key="doc.id"
        @click="openDocument(doc.id)"
        class="bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-200 cursor-pointer"
      >
        <div class="p-6">
          <div class="flex justify-between items-start">
            <h3 class="text-lg font-medium text-gray-900 truncate">{{ doc.title || '未命名文档' }}</h3>
            <span class="text-xs text-gray-500">
              {{ formatDate(doc.updated_at) }}
            </span>
          </div>
          <p class="mt-2 text-gray-600 text-sm line-clamp-2">
            {{ doc.content ? doc.content.replace(/<[^>]*>/g, '').substring(0, 100) : '暂无内容' }}...
          </p>
          <div class="mt-4 flex justify-between items-center">
            <span class="text-xs text-gray-500">
              创建于 {{ formatDate(doc.created_at) }}
            </span>
            <button
              @click.stop="deleteDocument(doc.id)"
              class="text-red-600 hover:text-red-800 text-sm font-medium"
            >
              删除
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import api from '@/api';

const router = useRouter();

const documents = ref([]);
const loading = ref(true);
const error = ref('');

// 获取文档列表
const fetchDocuments = async () => {
  try {
    loading.value = true;
    const response = await api.get('/documents/');
    documents.value = response.data;
  } catch (err) {
    console.error('获取文档失败:', err);
    error.value = '获取文档失败，请重试';
  } finally {
    loading.value = false;
  }
};

// 创建新文档
const createNewDocument = () => {
  router.push('/documents/new');
};

// 打开文档
const openDocument = (id) => {
  router.push(`/documents/${id}`);
};

// 删除文档
const deleteDocument = async (id) => {
  if (!confirm('确定要删除这个文档吗？')) return;

  try {
    await api.delete(`/documents/${id}/`);
    documents.value = documents.value.filter(doc => doc.id !== id);
  } catch (err) {
    console.error('删除文档失败:', err);
    alert('删除失败，请重试');
  }
};

// 格式化日期
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

// 组件挂载时获取数据
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
</style>
