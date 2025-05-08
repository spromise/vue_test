<template>
    <div class="login-container">
      <el-card class="login-card">
        <h2 class="login-title">系统登录</h2>
        <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              prefix-icon="User"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              prefix-icon="Lock"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="handleLogin"
              :loading="loading"
              style="width: 100%"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { ElMessage } from 'element-plus'
  
  const router = useRouter()
  const loginFormRef = ref()
  const loading = ref(false)
  
  const loginForm = ref({
    username: '',
    password: ''
  })
  
  const loginRules = {
    username: [
      { required: true, message: '请输入用户名', trigger: 'blur' },
      { min: 3, max: 10, message: '长度在3到10个字符', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6, message: '密码长度至少6位', trigger: 'blur' }
    ]
  }
  
  const handleLogin = () => {
    loginFormRef.value.validate(valid => {
      if (valid) {
        loading.value = true
        // 模拟登录请求
        setTimeout(() => {
          ElMessage.success('登录成功')
          router.push('/')
          loading.value = false
        }, 1000)
      }
    })
  }
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f7fa;
  }
  
  .login-card {
    width: 400px;
    padding: 20px;
  }
  
  .login-title {
    text-align: center;
    margin-bottom: 20px;
    color: #409eff;
  }
  </style>
  