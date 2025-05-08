<template>
  <el-form :model="form" :rules="rules" ref="formRef" label-width="120px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="form.username" placeholder="4-16位字母数字"/>
    </el-form-item>

    <el-form-item label="密码" prop="password">
      <el-input v-model="form.password" type="password" show-password/>
      <el-progress 
        :percentage="passwordStrength" 
        :status="strengthStatus"
        :show-text="false"/>
    </el-form-item>

    <el-form-item label="确认密码" prop="confirmPassword">
      <el-input v-model="form.confirmPassword" type="password" show-password/>
    </el-form-item>

    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" placeholder="请输入有效邮箱地址"/>
    </el-form-item>

    <el-form-item label="手机号" prop="phone">
      <el-input v-model="form.phone" placeholder="请输入11位手机号"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm" :loading="isLoading">提交</el-button>
      <el-button @click="resetForm">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus';

const formRef = ref()
const form = ref({
  username: '',
  password: '',
  confirmPassword: '',
  email: '',
  phone: ''
})

const isLoading = ref(false)

const validatePasswordConfirm = (rule, value, callback) => {
  if (value === form.value.password) {
    callback()
  } else {
    callback(new Error('两次输入的密码不一致'))
  }
}

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 4, max: 16, message: '长度在4到16个字符', trigger: 'blur' },
    { pattern: /^[a-zA-Z0-9]+$/, message: '只能包含字母和数字', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 8, message: '至少8位字符', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validatePasswordConfirm, trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
  ],
  phone: [
    { required: true, message: '请输入手机号', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入有效的11位手机号', trigger: 'blur' }
  ]
}

const passwordStrength = computed(() => {
  if (!form.value.password) return 0
  if (form.value.password.length < 8) return 30
  if (!/[A-Z]/.test(form.value.password)) return 50
  if (!/[!@#$%^&*]/.test(form.value.password)) return 70
  return 100
})

const strengthStatus = computed(() => {
  const strength = passwordStrength.value
  return strength < 50 ? 'exception' : strength < 80 ? 'warning' : 'success'
})

const submitForm = () => {
  isLoading.value = true
  formRef.value.validate(valid => {
    if (valid) {
      setTimeout(() => {
        ElMessage.success('提交成功!')
        isLoading.value = false
      }, 1000)
    } else {
      ElMessage.error('请检查表单')
      isLoading.value = false
    }
  })
}

const resetForm = () => {
  formRef.value.resetFields()
}
</script>
    