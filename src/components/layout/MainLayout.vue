<template>
    <el-container class="layout-container">
      <el-aside width="200px">
        <div class="logo">LOGO</div>
        <el-menu
          router
          :default-active="$route.path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="/">
            <el-icon><House /></el-icon>
            <span>首页</span>
          </el-menu-item>
          <el-sub-menu index="2">
            <template #title>
              <el-icon><Document /></el-icon>
              <span>内容管理</span>
            </template>
            <el-menu-item index="/article">文章管理</el-menu-item>
            <el-menu-item index="/category">分类管理</el-menu-item>
          </el-sub-menu>
        </el-menu>
      </el-aside>
      
      <el-container>
        <el-header>
          <div class="header-right">
            <el-dropdown>
              <span class="user-info">
                <el-avatar :size="30" src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png" />
                <span>管理员</span>
              </span>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>个人中心</el-dropdown-item>
                  <el-dropdown-item divided @click="handleLogout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </template>
  
  <script setup>
  import { House, Document } from '@element-plus/icons-vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const handleLogout = () => {
    router.push('/login')
  }
  </script>
  
  <style scoped>
  .layout-container {
    height: 100vh;
  }
  
  .el-aside {
    background-color: #545c64;
  }
  
  .el-menu {
    border-right: none;
  }
  
  .logo {
    height: 60px;
    line-height: 60px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    font-weight: bold;
    background-color: #434a50;
  }
  
  .el-header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background-color: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  }
  
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  
  .user-info span {
    margin-left: 10px;
  }
  
  .el-main {
    background-color: #f0f2f5;
    padding: 20px;
  }
  </style>
  2. 更新App.vue
  vue
  <template>
    <router-view />
  </template>
  
  <style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }
  </style>
  