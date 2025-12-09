<!-- src/views/Editor.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- 顶部导航栏 -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center space-x-4">
            <router-link to="/" class="text-gray-600 hover:text-gray-900">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </router-link>
            <input
              v-model="title"
              type="text"
              placeholder="输入文档标题..."
              class="text-xl font-semibold border-none focus:outline-none focus:ring-0 w-full max-w-md"
              @input="autoSave"
            />
          </div>

          <div class="flex items-center space-x-4">
            <span v-if="saving" class="text-sm text-gray-500 flex items-center">
              <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
              保存中...
            </span>
            <span v-else-if="lastSaved" class="text-sm text-gray-500">
              已保存 {{ formatTime(lastSaved) }}
            </span>

            <button
              @click="saveDocument"
              :disabled="saving"
              class="px-4 py-2 bg-indigo-600 text-white font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {{ saving ? '保存中...' : '保存' }}
            </button>

            <button
              @click="logout"
              class="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              退出
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- 编辑器区域 -->
    <div class="container mx-auto px-4 py-8">
      <div class="max-w-4xl mx-auto">
        <!-- 工具栏 -->
        <div v-if="editor" class="mb-4 bg-white rounded-lg border border-gray-200 p-2">
          <div class="flex flex-wrap items-center gap-2">
            <button
              @click="editor.chain().focus().toggleBold().run()"
              :class="{ 'bg-gray-200': editor.isActive('bold') }"
              class="p-2 rounded hover:bg-gray-100"
              title="加粗"
            >
              <span class="font-bold">B</span>
            </button>
            <button
              @click="editor.chain().focus().toggleItalic().run()"
              :class="{ 'bg-gray-200': editor.isActive('italic') }"
              class="p-2 rounded hover:bg-gray-100"
              title="斜体"
            >
              <span class="italic">I</span>
            </button>
            <button
              @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
              :class="{ 'bg-gray-200': editor.isActive('heading', { level: 1 }) }"
              class="p-2 rounded hover:bg-gray-100"
              title="标题1"
            >
              H1
            </button>
            <button
              @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
              :class="{ 'bg-gray-200': editor.isActive('heading', { level: 2 }) }"
              class="p-2 rounded hover:bg-gray-100"
              title="标题2"
            >
              H2
            </button>
            <button
              @click="editor.chain().focus().toggleBulletList().run()"
              :class="{ 'bg-gray-200': editor.isActive('bulletList') }"
              class="p-2 rounded hover:bg-gray-100"
              title="无序列表"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H4a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z" clip-rule="evenodd" />
              </svg>
            </button>
            <button
              @click="editor.chain().focus().toggleOrderedList().run()"
              :class="{ 'bg-gray-200': editor.isActive('orderedList') }"
              class="p-2 rounded hover:bg-gray-100"
              title="有序列表"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M2 4a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 6a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1zm0 6a1 1 0 011-1h14a1 1 0 110 2H3a1 1 0 01-1-1z" clip-rule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Tiptap编辑器 -->
        <div class="bg-white rounded-lg border border-gray-200 shadow-sm">
          <div v-if="!editor" class="p-8 text-center text-gray-500">
            加载编辑器中...
          </div>
          <div v-else class="min-h-[500px] p-6 prose prose-lg max-w-none">
            <editor-content :editor="editor" />
          </div>
        </div>

        <!-- 错误提示 -->
        <div v-if="error" class="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p class="text-red-700">{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Editor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';
import { useAuthStore } from '@/stores/auth';
import api from '@/api';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const editor = ref(null);
const title = ref('');
const content = ref('');
const saving = ref(false);
const lastSaved = ref(null);
const error = ref('');
const documentId = ref(null);
const autoSaveTimer = ref(null);

// 初始化编辑器
const initEditor = () => {
  editor.value = new Editor({
    content: content.value,
    extensions: [
      StarterKit,
    ],
    onUpdate: () => {
      content.value = editor.value.getHTML();
      scheduleAutoSave();
    },
    editorProps: {
      attributes: {
        class: 'focus:outline-none min-h-[400px]',
      },
    },
  });
};

// 获取文档数据
const fetchDocument = async () => {
  const id = route.params.id;
  if (id === 'new') {
    documentId.value = null;
    title.value = '未命名文档';
    content.value = '<p>开始编写你的文档...</p>';
    if (editor.value) {
      editor.value.commands.setContent(content.value);
    }
    return;
  }

  try {
    const response = await api.get(`/documents/${id}/`);
    const doc = response.data;

    documentId.value = doc.id;
    title.value = doc.title;
    content.value = doc.content || '<p>开始编写你的文档...</p>';

    if (editor.value) {
      editor.value.commands.setContent(content.value);
    }
  } catch (err) {
    console.error('获取文档失败:', err);
    error.value = '获取文档失败';
    router.push('/');
  }
};

// 保存文档
const saveDocument = async () => {
  if (saving.value) return;

  saving.value = true;
  error.value = '';

  try {
    const data = {
      title: title.value || '未命名文档',
      content: content.value,
    };

    let response;
    if (documentId.value) {
      // 更新现有文档
      response = await api.put(`/documents/${documentId.value}/`, data);
    } else {
      // 创建新文档
      response = await api.post('/documents/', data);
      documentId.value = response.data.id;
      router.replace(`/documents/${documentId.value}`);
    }

    lastSaved.value = new Date();
  } catch (err) {
    console.error('保存文档失败:', err);
    error.value = '保存失败，请重试';
  } finally {
    saving.value = false;
  }
};

// 定时自动保存
const scheduleAutoSave = () => {
  if (autoSaveTimer.value) {
    clearTimeout(autoSaveTimer.value);
  }

  autoSaveTimer.value = setTimeout(() => {
    if (title.value.trim() || content.value.trim() !== '<p></p>') {
      saveDocument();
    }
  }, 3000); // 3秒后自动保存
};

// 自动保存标题变化
const autoSave = () => {
  scheduleAutoSave();
};

// 格式化时间显示
const formatTime = (date) => {
  const now = new Date();
  const diff = now - date;

  if (diff < 60000) { // 1分钟内
    return '刚刚';
  } else if (diff < 3600000) { // 1小时内
    return `${Math.floor(diff / 60000)}分钟前`;
  } else if (diff < 86400000) { // 24小时内
    return `${Math.floor(diff / 3600000)}小时前`;
  } else {
    return date.toLocaleTimeString('zh-CN', {
      hour: '2-digit',
      minute: '2-digit'
    });
  }
};

// 退出登录
const logout = () => {
  authStore.logout();
  router.push('/login');
};

// 组件挂载时初始化
onMounted(() => {
  initEditor();
  fetchDocument();
});

// 路由变化时重新获取数据
watch(() => route.params.id, () => {
  fetchDocument();
});

// 组件销毁前清理
onBeforeUnmount(() => {
  if (editor.value) {
    editor.value.destroy();
  }
  if (autoSaveTimer.value) {
    clearTimeout(autoSaveTimer.value);
  }
});
</script>

<style>
.ProseMirror {
  min-height: 400px;
}

.ProseMirror:focus {
  outline: none;
}

.ProseMirror p {
  margin-bottom: 1em;
}

.ProseMirror h1 {
  font-size: 2em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.ProseMirror h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}

.ProseMirror ul {
  list-style-type: disc;
  padding-left: 1.5em;
  margin-bottom: 1em;
}

.ProseMirror ol {
  list-style-type: decimal;
  padding-left: 1.5em;
  margin-bottom: 1em;
}

.ProseMirror li {
  margin-bottom: 0.5em;
}
</style>
