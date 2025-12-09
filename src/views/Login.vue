<template>
  <div class="glassmorphism-login-page">
    <!-- 动态背景容器 -->
    <div class="background-container">
      <!-- 动态渐变背景 -->
      <div class="gradient-bg"></div>
      <!-- 装饰性网格线 -->
      <div class="grid-overlay"></div>
      <!-- 浮动装饰粒子（通过CSS实现） -->
      <div class="floating-particle p1"></div>
      <div class="floating-particle p2"></div>
      <div class="floating-particle p3"></div>
      <div class="floating-particle p4"></div>
    </div>
    <!-- 先简化背景 -->
    <div class="background-container" style="background: #1e293b"></div>

    <!-- 主登录卡片 -->
    <div class="login-container">
      <!-- 左栏：品牌信息和欢迎语 -->
      <div class="brand-section">
        <div class="brand-logo">
          <svg class="logo-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M12 15V17M6 21H18C19.1046 21 20 20.1046 20 19V13C20 11.8954 19.1046 11 18 11H6C4.89543 11 4 11.8954 4 13V19C4 20.1046 4.89543 21 6 21Z"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
            <path
              d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div class="brand-content">
          <h1 class="brand-title">合同模版智能生成系统器</h1>
          <p class="brand-subtitle">安全 · 高效 · 智能</p>
          <div class="brand-features">
            <div class="feature-item">
              <svg
                class="feature-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>企业级安全</span>
            </div>
            <div class="feature-item">
              <svg
                class="feature-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13 10V3L4 14H11V21L20 10H13Z"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <span>实时协作</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 右栏：登录表单 -->
      <div class="login-glass-card">
        <!-- 卡片头部 -->
        <div class="card-header">
          <h2 class="welcome-title">欢迎回来</h2>
          <p class="welcome-subtitle">登录您的账户继续工作</p>
        </div>

        <!-- 登录表单 -->
        <form class="login-form" @submit.prevent="handleLogin">
          <!-- 用户名/邮箱输入组 -->
          <div class="input-group">
            <div class="input-wrapper">
              <svg
                class="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.5" />
                <path
                  d="M6 21V19C6 16.7909 7.79086 15 10 15H14C16.2091 15 18 16.7909 18 19V21"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              <input
                id="identifier"
                v-model="form.identifier"
                type="text"
                required
                placeholder="用户名或邮箱"
                class="glass-input"
                @focus="inputFocusEffect"
                @blur="inputBlurEffect"
              />
              <div class="input-focus-indicator"></div>
            </div>
            <div class="input-hint">请输入注册时使用的用户名或邮箱</div>
          </div>

          <!-- 密码输入组 -->
          <div class="input-group">
            <div class="input-wrapper">
              <svg
                class="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="3"
                  y="10"
                  width="18"
                  height="12"
                  rx="3"
                  stroke="currentColor"
                  stroke-width="1.5"
                />
                <path
                  d="M7 10V6C7 3.79086 8.79086 2 11 2H13C15.2091 2 17 3.79086 17 6V10"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
              </svg>
              <input
                :id="`password-${_uid}`"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="密码"
                class="glass-input"
                @focus="inputFocusEffect"
                @blur="inputBlurEffect"
              />
              <div class="input-focus-indicator"></div>
              <button
                type="button"
                class="password-toggle"
                @click="togglePasswordVisibility"
                :aria-label="showPassword ? '隐藏密码' : '显示密码'"
              >
                <svg
                  class="eye-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    v-if="showPassword"
                    d="M3 12C3 12 6.27273 5 12 5C17.7273 5 21 12 21 12C21 12 17.7273 19 12 19C6.27273 19 3 12 3 12Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    v-if="showPassword"
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    v-if="!showPassword"
                    d="M4 4L20 20M12 17C8.13401 17 5 12 5 12C5 12 6.47715 9.00001 9 7.5M12 7C15.866 7 19 12 19 12C19 12 17.5228 15 15 16.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div class="input-hint">请输入您的登录密码</div>
          </div>

          <!-- 表单选项 -->
          <div class="form-options">
            <label class="remember-me">
              <input type="checkbox" v-model="form.rememberMe" class="checkbox-input" />
              <span class="custom-checkbox"></span>
              <span class="option-text">在此设备记住我</span>
            </label>
            <a href="#" class="forgot-password" @click.prevent="handleForgotPassword">忘记密码？</a>
          </div>

          <!-- 登录按钮 -->
          <button
            type="submit"
            class="login-button"
            :disabled="loading"
            :class="{ loading: loading }"
          >
            <span class="button-text">{{ loading ? '登录中...' : '立即登录' }}</span>
            <svg v-if="loading" class="loading-spinner" viewBox="0 0 50 50">
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
            </svg>
          </button>

          <!-- 快速登录 -->
          <div class="quick-login-section">
            <div class="section-title">
              <span class="title-line"></span>
              <span class="title-text">快速登录</span>
              <span class="title-line"></span>
            </div>
            <div class="social-login">
              <button
                type="button"
                class="social-button google"
                @click="handleSocialLogin('google')"
              >
                <svg viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
              </button>
              <button
                type="button"
                class="social-button github"
                @click="handleSocialLogin('github')"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- 注册链接 -->
          <div class="register-prompt">
            还没有账户？
            <router-link to="/register" class="register-link">立即注册</router-link>
          </div>
        </form>

        <!-- 玻璃卡片的装饰性光泽边缘 -->
        <div class="glass-highlight"></div>
      </div>
    </div>

    <!-- 页面底部信息 -->
    <div class="page-footer">
      <p>
        © 2025 智能文档编辑器 · 探索无限创作可能 · <a href="#" class="footer-link">隐私政策</a> ·
        <a href="#" class="footer-link">服务条款</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

// 表单数据
const form = ref({
  identifier: '',
  password: '',
  rememberMe: false,
})

const loading = ref(false)
const showPassword = ref(false)

// 切换密码可见性
const togglePasswordVisibility = () => {
  showPassword.value = !showPassword.value
}

// 输入框焦点效果
const inputFocusEffect = (event) => {
  const wrapper = event.target.parentElement
  wrapper.classList.add('focused')
}

const inputBlurEffect = (event) => {
  const wrapper = event.target.parentElement
  if (!event.target.value) {
    wrapper.classList.remove('focused')
  }
}

// 处理登录
const handleLogin = async () => {
  loading.value = true
  // 模拟网络请求延迟，展示加载效果
  await new Promise((resolve) => setTimeout(resolve, 1500))

  try {
    const credentials = {
      password: form.value.password,
    }

    if (form.value.identifier.includes('@')) {
      credentials.email = form.value.identifier
    } else {
      credentials.username = form.value.identifier
    }

    const result = await authStore.login(credentials)

    if (result.success) {
      // 登录成功，添加一个平滑的过渡效果
      document.querySelector('.login-container').style.opacity = '0'
      document.querySelector('.login-container').style.transform = 'translateY(20px)'

      setTimeout(() => {
        router.push('/')
      }, 300)
    } else {
      // 这里可以添加错误提示动画
      console.error('登录失败:', result.error)
    }
  } catch (err) {
    console.error('登录异常:', err)
  } finally {
    loading.value = false
  }
}

// 处理忘记密码
const handleForgotPassword = () => {
  alert('忘记密码功能开发中，请联系管理员重置。')
}

// 处理社交登录（示例）
const handleSocialLogin = (provider) => {
  alert(`${provider} 登录集成开发中。`)
}
</script>

<style scoped>
/* 基础页面样式 */
.glassmorphism-login-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, 'PingFang SC',
    'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  color: #e2e8f0;
  padding: 2rem;
}

/* 动态背景 */
.background-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.gradient-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    #0f172a 0%,
    #1e293b 25%,
    #334155 50%,
    #475569 75%,
    #64748b 100%
  );
  background-size: 400% 400%;
  animation: gradientShift 20s ease infinite;
}

@keyframes gradientShift {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.grid-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  opacity: 0.3;
}

.floating-particle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  filter: blur(2px);
  animation: float 15s infinite linear;
}
.p1 {
  width: 80px;
  height: 80px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}
.p2 {
  width: 120px;
  height: 120px;
  top: 60%;
  left: 80%;
  animation-delay: -5s;
}
.p3 {
  width: 60px;
  height: 60px;
  top: 80%;
  left: 20%;
  animation-delay: -10s;
}
.p4 {
  width: 100px;
  height: 100px;
  top: 20%;
  left: 70%;
  animation-delay: -7.5s;
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  25% {
    transform: translate(20px, -30px) scale(1.05);
  }
  50% {
    transform: translate(-15px, 10px) scale(0.95);
  }
  75% {
    transform: translate(10px, 20px) scale(1.02);
  }
}

/* 主要布局容器 */
.login-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  align-items: center;
}

/* 品牌信息区域 */
.brand-section {
  padding: 2rem;
  position: relative;
}

.brand-logo {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  margin-bottom: 2rem;
}

.logo-icon {
  width: 40px;
  height: 40px;
  color: #60a5fa;
}

.brand-content {
  max-width: 400px;
}

.brand-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #f8fafc;
  margin-bottom: 0.75rem;
  line-height: 1.2;
  letter-spacing: -0.02em;
}

.brand-subtitle {
  font-size: 1.125rem;
  color: #94a3b8;
  margin-bottom: 2rem;
  font-weight: 400;
}

.brand-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #cbd5e1;
  font-size: 0.95rem;
}

.feature-icon {
  width: 20px;
  height: 20px;
  color: #60a5fa;
}

/* 毛玻璃登录卡片 */
.login-glass-card {
  position: relative;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(12px) saturate(180%);
  -webkit-backdrop-filter: blur(12px) saturate(180%);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  z-index: 10;
  transition:
    transform 0.4s ease,
    box-shadow 0.4s ease;
}

.glass-highlight {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 24px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.2) 0%,
    transparent 30%,
    transparent 70%,
    rgba(255, 255, 255, 0.1) 100%
  );
  pointer-events: none;
  z-index: -1;
}

/* 卡片头部 */
.card-header {
  text-align: left;
  margin-bottom: 2.5rem;
}

.welcome-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 0.5rem;
  letter-spacing: -0.025em;
}

.welcome-subtitle {
  font-size: 0.875rem;
  color: #94a3b8;
}

/* 表单样式 */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 1rem;
  width: 20px;
  height: 20px;
  color: #94a3b8;
  pointer-events: none;
  z-index: 2;
}

.glass-input {
  width: 100%;
  padding: 0.875rem 1rem 0.875rem 3rem;
  background: rgba(255, 255, 255, 0.07);
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #f1f5f9;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  outline: none;
}
.glass-input::placeholder {
  color: #94a3b8;
}
.glass-input:hover {
  border-color: rgba(255, 255, 255, 0.2);
  background: rgba(255, 255, 255, 0.09);
}
.glass-input:focus {
  border-color: #60a5fa;
  background: rgba(255, 255, 255, 0.1);
}

.input-hint {
  font-size: 0.75rem;
  color: #64748b;
  padding-left: 0.5rem;
}

.input-focus-indicator {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  box-shadow: 0 0 0 0px rgba(96, 165, 250, 0);
  pointer-events: none;
  transition: box-shadow 0.3s ease;
}
.input-wrapper.focused .input-focus-indicator {
  box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.25);
}

.password-toggle {
  position: absolute;
  right: 1rem;
  background: transparent;
  color: #94a3b8;
  padding: 0.25rem;
  border-radius: 6px;
  transition:
    color 0.2s ease,
    background 0.2s ease;
}
.password-toggle:hover {
  color: #60a5fa;
  background: rgba(255, 255, 255, 0.05);
}
.eye-icon {
  width: 20px;
  height: 20px;
}

/* 表单选项 */
.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  margin-top: -0.5rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #cbd5e1;
}

.checkbox-input {
  display: none;
}
.custom-checkbox {
  width: 18px;
  height: 18px;
  border: 1.5px solid rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}
.checkbox-input:checked + .custom-checkbox {
  background: #60a5fa;
  border-color: #60a5fa;
}
.checkbox-input:checked + .custom-checkbox::after {
  content: '✓';
  color: white;
  font-size: 0.75rem;
}

.forgot-password {
  color: #60a5fa;
  text-decoration: none;
  transition: color 0.2s ease;
}
.forgot-password:hover {
  color: #93c5fd;
  text-decoration: underline;
}

/* 登录按钮 */
.login-button {
  position: relative;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  border: none;
  border-radius: 12px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
}
.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.4);
}
.login-button:active:not(:disabled) {
  transform: translateY(0);
}
.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.login-button.loading .button-text {
  visibility: hidden;
}
.login-button.loading .loading-spinner {
  visibility: visible;
}

.loading-spinner {
  position: absolute;
  width: 24px;
  height: 24px;
  visibility: hidden;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* 快速登录区域 */
.quick-login-section {
  margin: 1.5rem 0;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  color: #94a3b8;
  font-size: 0.875rem;
  margin-bottom: 1.5rem;
}

.title-line {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.1);
}

.title-text {
  padding: 0 0.5rem;
}

.social-login {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.social-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  color: #e2e8f0;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}
.social-button:hover {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-1px);
}
.social-button svg {
  width: 20px;
  height: 20px;
}

/* 注册提示 */
.register-prompt {
  text-align: center;
  font-size: 0.875rem;
  color: #94a3b8;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}
.register-link {
  color: #60a5fa;
  font-weight: 600;
  text-decoration: none;
  margin-left: 0.5rem;
  transition: color 0.2s ease;
}
.register-link:hover {
  color: #93c5fd;
  text-decoration: underline;
}

/* 页面底部 */
.page-footer {
  margin-top: 3rem;
  text-align: center;
  font-size: 0.75rem;
  color: #64748b;
}

.footer-link {
  color: #94a3b8;
  text-decoration: none;
  margin: 0 0.5rem;
  transition: color 0.2s ease;
}
.footer-link:hover {
  color: #60a5fa;
}

/* 响应式设计 */
@media (max-width: 1024px) {
  .login-container {
    grid-template-columns: 1fr;
    gap: 3rem;
    max-width: 500px;
  }

  .brand-section {
    text-align: center;
    padding: 1rem;
  }

  .brand-logo {
    margin: 0 auto 1.5rem;
  }
}

@media (max-width: 480px) {
  .glassmorphism-login-page {
    padding: 1rem;
  }

  .login-glass-card {
    padding: 1.75rem;
    border-radius: 20px;
  }

  .social-login {
    grid-template-columns: 1fr;
  }

  .brand-title {
    font-size: 2rem;
  }

  .welcome-title {
    font-size: 1.5rem;
  }
}
</style>
