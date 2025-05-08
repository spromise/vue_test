<template>
  <el-container class="layout-container">
    <el-header>
      <div class="logo">系统LOGO</div>
      <el-menu
        :default-active="activeMenu"
        mode="horizontal"
        @select="handleSelect">
        <el-menu-item index="1">首页</el-menu-item>
        <el-sub-menu index="2">
          <template #title>产品</template>
          <el-menu-item index="2-1">产品列表</el-menu-item>
          <el-menu-item index="2-2">产品分类</el-menu-item>
        </el-sub-menu>
        <el-menu-item index="3">关于</el-menu-item>
      </el-menu>
    </el-header>
    
    <el-container>
      <el-aside width="200px">
        <el-menu
          :default-active="activeSubMenu"
          class="side-menu"
          @select="handleSubSelect">
          <el-sub-menu index="1">
            <template #title>
              <el-icon><setting /></el-icon>
              <span>系统设置</span>
            </template>
            <el-menu-item index="1-1">用户管理</el-menu-item>
            <el-menu-item index="1-2">权限设置</el-menu-item>
          </el-sub-menu>
          <el-menu-item index="2">
            <el-icon><document /></el-icon>
            <span>文档中心</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    
    <el-footer>© 2023 公司名称</el-footer>
  </el-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Setting, Document } from '@element-plus/icons-vue'

const router = useRouter()
const activeMenu = ref('1')
const activeSubMenu = ref('1-1')

const handleSelect = (index) => {
  console.log('选中菜单:', index)
  // 实际项目中这里会跳转到对应路由
}

const handleSubSelect = (index) => {
  console.log('选中子菜单:', index)
  // 实际项目中这里会跳转到对应路由
}
</script>

<style scoped>
.layout-container {
  height: 100vh;
}
.logo {
  float: left;
  width: 120px;
  line-height: 60px;
  text-align: center;
  font-weight: bold;
}
.el-header {
  display: flex;
  justify-content: space-between;
  background-color: #409EFF;
  color: white;
}
.side-menu {
  height: 100%;
}
</style>
