<template>
  <div class="glassmorphism-auth-page register-page">
    <div class="background-container">
      <div class="gradient-bg"></div>
      <div class="grid-overlay"></div>
      <div class="floating-particle p1"></div>
      <div class="floating-particle p2"></div>
      <div class="floating-particle p3"></div>
      <div class="floating-particle p4"></div>
    </div>
    <div class="background-container" style="background: #1e293b"></div>

    <div class="auth-container">
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
          <p class="eyebrow">WELCOME TO DOCS</p>
          <h1 class="brand-title">开启你的智能创作之旅</h1>
          <p class="brand-subtitle">一套账号，畅享多端协同、AI 辅助写作与安全存储。</p>
          <div class="brand-highlights">
            <div class="highlight-chip">AI 文档助手</div>
            <div class="highlight-chip">实时协作</div>
            <div class="highlight-chip">企业级安全</div>
          </div>
          <div class="brand-metrics">
            <div>
              <p class="metric-value">10K+</p>
              <p class="metric-label">创作者正在使用</p>
            </div>
            <div>
              <p class="metric-value">1M+</p>
              <p class="metric-label">已生成文档</p>
            </div>
          </div>
        </div>
      </div>

      <div class="auth-glass-card" ref="cardRef">
        <div class="card-header">
          <p class="badge">SIGN UP</p>
          <h2 class="welcome-title">创建新账户</h2>
          <p class="welcome-subtitle">填写以下信息，几秒内完成注册</p>
        </div>

        <form class="auth-form" @submit.prevent="handleRegister">
          <div class="form-row">
            <div class="input-group">
              <label for="username" class="input-label">用户名</label>
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
                  id="username"
                  v-model="form.username"
                  type="text"
                  placeholder="取一个独特的 ID"
                  class="glass-input"
                  @focus="inputFocusEffect"
                  @blur="inputBlurEffect"
                />
                <div class="input-focus-indicator"></div>
              </div>
              <p class="input-hint">可用于登录与展示</p>
            </div>
            <div class="input-group">
              <label for="email" class="input-label">邮箱地址</label>
              <div class="input-wrapper">
                <svg
                  class="input-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8L10.89 3.74C11.58 3.35 12.42 3.35 13.11 3.74L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  placeholder="name@company.com"
                  class="glass-input"
                  @focus="inputFocusEffect"
                  @blur="inputBlurEffect"
                />
                <div class="input-focus-indicator"></div>
              </div>
              <p class="input-hint">将用于接收通知与安全验证</p>
            </div>
          </div>

          <div class="input-group">
            <label for="password" class="input-label">密码</label>
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
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                required
                placeholder="至少 8 个字符，包含数字和字母"
                class="glass-input"
                @focus="inputFocusEffect"
                @blur="inputBlurEffect"
              />
              <div class="input-focus-indicator"></div>
              <button
                type="button"
                class="password-toggle"
                @click="togglePasswordVisibility('primary')"
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
            <div class="password-strength" v-if="form.password">
              <div class="strength-bar">
                <div
                  class="strength-progress"
                  :class="passwordStrengthClass"
                  :style="{ width: passwordStrength + '%' }"
                ></div>
              </div>
              <p class="strength-label">密码强度：{{ passwordStrengthLabel }}</p>
            </div>
          </div>

          <div class="input-group">
            <label for="confirmPassword" class="input-label">确认密码</label>
            <div class="input-wrapper">
              <svg
                class="input-icon"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <input
                id="confirmPassword"
                v-model="form.confirmPassword"
                :type="showConfirmPassword ? 'text' : 'password'"
                required
                placeholder="再次输入密码"
                class="glass-input"
                @focus="inputFocusEffect"
                @blur="inputBlurEffect"
              />
              <div class="input-focus-indicator"></div>
              <button
                type="button"
                class="password-toggle"
                @click="togglePasswordVisibility('confirm')"
                :aria-label="showConfirmPassword ? '隐藏密码' : '显示密码'"
              >
                <svg
                  class="eye-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    v-if="showConfirmPassword"
                    d="M3 12C3 12 6.27273 5 12 5C17.7273 5 21 12 21 12C21 12 17.7273 19 12 19C6.27273 19 3 12 3 12Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    v-if="showConfirmPassword"
                    d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    v-if="!showConfirmPassword"
                    d="M4 4L20 20M12 17C8.13401 17 5 12 5 12C5 12 6.47715 9.00001 9 7.5M12 7C15.866 7 19 12 19 12C19 12 17.5228 15 15 16.5"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
            <p v-if="passwordMismatch" class="error-inline">两次输入的密码不一致</p>
          </div>

          <label class="agreement">
            <input type="checkbox" v-model="form.agreeTerms" class="checkbox-input" />
            <span class="custom-checkbox"></span>
            <span class="agreement-text">
              我已阅读并同意
              <a href="#" @click.prevent>服务条款</a>
              与
              <a href="#" @click.prevent>隐私政策</a>
            </span>
          </label>

          <div v-if="submitError" class="error-banner">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 8V13"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M12 16H12.01"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
              />
              <path
                d="M10.29 3.85998L1.82002 18C1.42332 18.6868 1.69546 19.5667 2.3823 19.9634C2.60303 20.0926 2.85083 20.1613 3.10494 20.1613H20.8951C21.6649 20.1613 22.2951 19.5311 22.2951 18.7613C22.2951 18.5072 22.2264 18.2594 22.0972 18.0386L13.63 3.89862C13.2308 3.21724 12.3458 2.98518 11.6644 3.38438C11.4909 3.48561 11.3341 3.62221 11.2024 3.78702"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p>{{ submitError }}</p>
          </div>

          <button type="submit" class="primary-button" :disabled="loading">
            <span class="button-text">{{ loading ? '创建账户中...' : '立即注册' }}</span>
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

          <div class="switch-auth">
            已有账户？
            <router-link to="/login" class="switch-link">立即登录</router-link>
          </div>
        </form>

        <div class="glass-highlight"></div>
      </div>
    </div>

    <div class="page-footer">
      <p>
        © 2025 合同模版智能生成器 · 创作与协作一站式完成 ·
        <a href="#" class="footer-link">隐私政策</a>
        ·
        <a href="#" class="footer-link">服务条款</a>
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const cardRef = ref(null)
const loading = ref(false)
const submitError = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const form = ref({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  agreeTerms: false,
})

const passwordMismatch = computed(() => {
  return (
    form.value.password &&
    form.value.confirmPassword &&
    form.value.password !== form.value.confirmPassword
  )
})

const passwordStrength = computed(() => {
  const password = form.value.password || ''
  if (!password) return 0

  let strength = 0
  if (password.length >= 8) strength += 35
  if (/[A-Z]/.test(password)) strength += 20
  if (/[a-z]/.test(password)) strength += 20
  if (/[0-9]/.test(password)) strength += 15
  if (/[^A-Za-z0-9]/.test(password)) strength += 10

  return Math.min(strength, 100)
})

const passwordStrengthLabel = computed(() => {
  if (passwordStrength.value < 30) return '弱'
  if (passwordStrength.value < 60) return '中'
  if (passwordStrength.value < 85) return '良好'
  return '非常强'
})

const passwordStrengthClass = computed(() => {
  if (passwordStrength.value < 30) return 'weak'
  if (passwordStrength.value < 60) return 'medium'
  if (passwordStrength.value < 85) return 'good'
  return 'strong'
})

const togglePasswordVisibility = (target) => {
  if (target === 'primary') {
    showPassword.value = !showPassword.value
  } else {
    showConfirmPassword.value = !showConfirmPassword.value
  }
}

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

const handleRegister = async () => {
  if (passwordMismatch.value) {
    submitError.value = '请确认两次输入的密码一致'
    return
  }

  if (!form.value.agreeTerms) {
    submitError.value = '请先阅读并勾选同意相关条款'
    return
  }

  submitError.value = ''
  loading.value = true

  try {
    const payload = {
      email: form.value.email,
      password: form.value.password,
    }

    if (form.value.username.trim()) {
      payload.username = form.value.username.trim()
    }

    const result = await authStore.register(payload)

    if (result.success) {
      if (cardRef.value) {
        cardRef.value.classList.add('card-success')
      }

      setTimeout(() => {
        router.push('/')
      }, 350)
    } else {
      submitError.value = result.error || '注册失败，请稍后再试'
    }
  } catch (error) {
    submitError.value = error.response?.data?.error || '注册失败，请稍后再试'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.glassmorphism-auth-page {
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
  inset: 0;
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
  inset: 0;
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
  animation-delay: -7s;
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

.auth-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  max-width: 1200px;
  width: 100%;
  align-items: center;
}

.brand-section {
  padding: 2rem;
}

.brand-logo {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  margin-bottom: 2rem;
}

.logo-icon {
  width: 40px;
  height: 40px;
  color: #60a5fa;
}

.brand-content {
  max-width: 420px;
}

.eyebrow {
  letter-spacing: 0.3em;
  font-size: 0.75rem;
  color: #94a3b8;
  margin-bottom: 0.75rem;
}

.brand-title {
  font-size: 2.5rem;
  font-weight: 800;
  color: #f8fafc;
  margin-bottom: 0.75rem;
  line-height: 1.2;
}

.brand-subtitle {
  color: #cbd5e1;
  font-size: 1rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.brand-highlights {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.highlight-chip {
  padding: 0.35rem 0.85rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-size: 0.85rem;
  color: #cbd5e1;
  background: rgba(255, 255, 255, 0.08);
}

.brand-metrics {
  display: flex;
  gap: 2rem;
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  color: #f1f5f9;
}

.metric-label {
  color: #94a3b8;
  font-size: 0.85rem;
}

.auth-glass-card {
  position: relative;
  padding: 2.5rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(12px) saturate(180%);
  box-shadow:
    0 20px 40px rgba(0, 0, 0, 0.35),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  transition: transform 0.3s ease;
}

.auth-glass-card.card-success {
  transform: translateY(12px);
  opacity: 0.3;
}

.glass-highlight {
  position: absolute;
  inset: 0;
  border-radius: 24px;
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.15) 0%,
    transparent 30%,
    transparent 70%,
    rgba(255, 255, 255, 0.08) 100%
  );
  pointer-events: none;
  z-index: -1;
}

.card-header {
  margin-bottom: 2rem;
}

.badge {
  display: inline-flex;
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  background: rgba(96, 165, 250, 0.15);
  color: #93c5fd;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
}

.welcome-title {
  font-size: 1.8rem;
  font-weight: 700;
  color: #f8fafc;
  margin: 0.75rem 0 0.35rem;
}

.welcome-subtitle {
  color: #94a3b8;
  font-size: 0.95rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.25rem;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.input-label {
  font-size: 0.9rem;
  color: #cbd5e1;
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
  z-index: 2;
  pointer-events: none;
}

.glass-input {
  width: 100%;
  padding: 0.9rem 1rem 0.9rem 3rem;
  background: rgba(255, 255, 255, 0.07);
  border: 1.5px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #f1f5f9;
  transition: all 0.3s ease;
  outline: none;
}

.glass-input::placeholder {
  color: #94a3b8;
}

.glass-input:hover {
  border-color: rgba(255, 255, 255, 0.2);
}

.glass-input:focus {
  border-color: #60a5fa;
  background: rgba(255, 255, 255, 0.1);
}

.input-hint {
  font-size: 0.75rem;
  color: #64748b;
  padding-left: 0.25rem;
}

.input-focus-indicator {
  position: absolute;
  inset: 0;
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
  border: none;
  color: #94a3b8;
  padding: 0.25rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.password-toggle:hover {
  color: #60a5fa;
  background: rgba(255, 255, 255, 0.05);
}

.eye-icon {
  width: 20px;
  height: 20px;
}

.password-strength {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.strength-bar {
  width: 100%;
  height: 6px;
  background: rgba(148, 163, 184, 0.2);
  border-radius: 999px;
  overflow: hidden;
}

.strength-progress {
  height: 100%;
  border-radius: 999px;
  transition: width 0.3s ease;
}

.strength-progress.weak {
  background: #f87171;
}

.strength-progress.medium {
  background: #fbbf24;
}

.strength-progress.good {
  background: #34d399;
}

.strength-progress.strong {
  background: #22d3ee;
}

.strength-label {
  font-size: 0.8rem;
  color: #94a3b8;
}

.error-inline {
  color: #fda4af;
  font-size: 0.8rem;
  padding-left: 0.25rem;
}

.agreement {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.85rem;
  color: #cbd5e1;
}

.checkbox-input {
  display: none;
}

.custom-checkbox {
  width: 18px;
  height: 18px;
  border: 1.5px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.8rem;
  transition: all 0.2s ease;
}

.checkbox-input:checked + .custom-checkbox {
  background: #60a5fa;
  border-color: #60a5fa;
}

.checkbox-input:checked + .custom-checkbox::after {
  content: '✓';
}

.agreement-text a {
  color: #60a5fa;
  text-decoration: none;
}

.agreement-text a:hover {
  text-decoration: underline;
}

.error-banner {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.8rem 1rem;
  border-radius: 12px;
  background: rgba(248, 113, 113, 0.15);
  border: 1px solid rgba(248, 113, 113, 0.2);
  color: #fecdd3;
  font-size: 0.85rem;
}

.error-banner svg {
  width: 20px;
  height: 20px;
}

.primary-button {
  position: relative;
  width: 100%;
  padding: 1rem;
  border: none;
  border-radius: 14px;
  background: linear-gradient(135deg, #6366f1 0%, #4338ca 30%, #2563eb 100%);
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: 0 15px 35px rgba(79, 70, 229, 0.35);
  transition: transform 0.3s ease;
}

.primary-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.primary-button:not(:disabled):hover {
  transform: translateY(-3px);
}

.loading-spinner {
  width: 22px;
  height: 22px;
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

.switch-auth {
  text-align: center;
  color: #94a3b8;
  font-size: 0.9rem;
}

.switch-link {
  color: #93c5fd;
  margin-left: 0.35rem;
  font-weight: 600;
  text-decoration: none;
}

.switch-link:hover {
  text-decoration: underline;
}

.page-footer {
  margin-top: 3rem;
  text-align: center;
  font-size: 0.75rem;
  color: #64748b;
}

.footer-link {
  color: #94a3b8;
  text-decoration: none;
  margin: 0 0.35rem;
}

.footer-link:hover {
  color: #60a5fa;
}

@media (max-width: 1100px) {
  .auth-container {
    grid-template-columns: 1fr;
    gap: 3rem;
    max-width: 520px;
  }

  .brand-section {
    text-align: center;
    padding: 1rem;
  }

  .brand-logo {
    margin: 0 auto 1.5rem;
  }

  .form-row {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .glassmorphism-auth-page {
    padding: 1rem;
  }

  .auth-glass-card {
    padding: 1.75rem;
    border-radius: 20px;
  }
}
</style>
