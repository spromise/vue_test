<template>
    <div class="notification-demo">
      <el-button @click="showMessage">消息提示</el-button>
      <el-button @click="showAlert">警告提示</el-button>
      <el-button @click="showConfirm">确认对话框</el-button>
      <el-button @click="showCustomDialog">自定义对话框</el-button>
      
      <el-dialog v-model="dialogVisible" title="自定义对话框">
        <p>这是一个自定义对话框内容</p>
        <template #footer>
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirm">确认</el-button>
        </template>
      </el-dialog>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import { ElMessage, ElMessageBox } from 'element-plus'
  
  const dialogVisible = ref(false)
  
  const showMessage = () => {
    ElMessage({
      message: '这是一条普通消息',
      type: 'info',
      showClose: true,
      duration: 2000
    })
  }
  
  const showAlert = () => {
    ElMessage.error('这是一条错误消息')
  }
  
  const showConfirm = () => {
    ElMessageBox.confirm(
      '确定要执行此操作吗？',
      '提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        beforeClose: (action, instance, done) => {
          if (action === 'confirm') {
            instance.confirmButtonLoading = true
            setTimeout(() => {
              done()
              ElMessage.success('操作成功')
            }, 1000)
          } else {
            done()
          }
        }
      }
    ).catch(() => {
      ElMessage.info('已取消操作')
    })
  }
  
  const showCustomDialog = () => {
    dialogVisible.value = true
  }
  
  const handleConfirm = () => {
    ElMessage.success('对话框操作确认')
    dialogVisible.value = false
  }
  </script>
  