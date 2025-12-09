<!-- src/components/AppLayout.vue -->
<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar />
    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>

    <!-- 可选：页脚 -->
    <footer class="border-t border-gray-200 mt-12 py-6">
      <div class="container mx-auto px-4 text-center text-gray-600 text-sm">
        <p>© 2025 合同模版智能生成系统. MSE 项目管理课程(四朵花小组).</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from './Navbar.vue'
</script>
