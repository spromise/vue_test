<template>
  <div class="container">
      <!-- 添加任务表单 -->
      <el-form :inline="true" @submit.prevent="addTask">
          <el-form-item label="任务名称">
              <el-input v-model="newTask.name" placeholder="请输入任务名称"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" native-type="submit">添加任务</el-button>
          </el-form-item>
      </el-form>
      <!-- 筛选任务下拉框 -->
      <el-form :inline="true">
          <el-form-item label="筛选状态">
              <el-select v-model="filterStatus" @change="filterTasks">
                  <el-option label="全部" value=""></el-option>
                  <el-option label="进行中" value="进行中"></el-option>
                  <el-option label="已完成" value="已完成"></el-option>
              </el-select>
          </el-form-item>
      </el-form>
      <!-- 任务表格 -->
      <div v-if="!loading && filteredTasks.length > 0">
          <el-table :data="filteredTasks" stripe>
              <el-table-column prop="id" label="ID"></el-table-column>
              <el-table-column prop="name" label="任务名称"></el-table-column>
              <el-table-column label="状态">
                  <template #default="scope">
                      <el-tag :type="scope.row.status === '进行中'? 'info' : 'success'">
                          {{ scope.row.status }}
                      </el-tag>
                  </template>
              </el-table-column>
              <el-table-column prop="createDate" label="创建日期"></el-table-column>
              <el-table-column label="操作">
                  <template #default="scope">
                      <el-button size="mini" @click="toggleStatus(scope.row)">
                          {{ scope.row.status === '进行中'? '标记为已完成' : '标记为进行中' }}
                      </el-button>
                      <el-button size="mini" type="danger" @click="confirmDelete(scope.row)">
                          删除
                      </el-button>
                  </template>
              </el-table-column>
          </el-table>
          <!-- 表格分页 -->
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="filteredTasks.length"
          >
          </el-pagination>
      </div>
      <div v-else-if="!loading && filteredTasks.length === 0">
          暂无任务数据
      </div>
      <div v-else>
          数据加载中，请稍候...
      </div>
      <!-- 统计信息 -->
      <div class="statistics">
          <p>总任务数: {{ totalTasks }}</p>
          <p>已完成任务数: {{ completedTasks }}</p>
          <p>任务完成比例: {{ completionRate }}%</p>
          <el-progress :percentage="completionRate"></el-progress>
      </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 加载状态
const loading = ref(true)

// 生成模拟任务数据
const generateMockData = () => {
  const tasks = []
  const statuses = ['进行中', '已完成']
  for (let i = 1; i <= Math.floor(Math.random() * 11) + 20; i++) {
      tasks.push({
          id: i,
          name: `任务 ${i}`,
          status: statuses[Math.floor(Math.random() * 2)],
          createDate: new Date().toLocaleDateString(),
          responsiblePerson: '负责人'
      })
  }
  return tasks
}

// 初始化任务数据
const tasks = ref(generateMockData())
// 新任务
const newTask = ref({ name: '' })
// 筛选状态
const filterStatus = ref('')
// 当前页码
const currentPage = ref(1)
// 每页显示数量
const pageSize = ref(10)

// 过滤后的任务
const filteredTasks = computed(() => {
  if (filterStatus.value === '') {
      return tasks.value
  }
  return tasks.value.filter(task => task.status === filterStatus.value)
})

// 总任务数
const totalTasks = computed(() => tasks.value.length)
// 已完成任务数
const completedTasks = computed(() =>
  tasks.value.filter(task => task.status === '已完成').length
)
// 任务完成比例
const completionRate = computed(() =>
  totalTasks.value === 0? 0 : ((completedTasks.value / totalTasks.value) * 100).toFixed(2)
)

// 添加任务
const addTask = () => {
  if (newTask.value.name) {
      const newId = tasks.value.length + 1
      const newTaskObj = {
          id: newId,
          name: newTask.value.name,
          status: '进行中',
          createDate: new Date().toLocaleDateString(),
          responsiblePerson: '负责人'
      }
      tasks.value.push(newTaskObj)
      newTask.value.name = ''
      ElMessage.success('任务添加成功')
  } else {
      ElMessage.warning('请输入任务名称')
  }
}

// 删除任务
const confirmDelete = (task) => {
  console.log('confirmDelete task:', task)
  ElMessageBox.confirm('确定要删除此任务吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
  }).then(() => {
      tasks.value = tasks.value.filter(t => t.id!== task.id)
      ElMessage.success('任务删除成功')
  }).catch(() => {
      ElMessage.info('取消删除')
  })
}

// 切换任务状态
const toggleStatus = (task) => {
  console.log('toggleStatus task:', task)
  task.status = task.status === '进行中'? '已完成' : '进行中'
  ElMessage.success('任务状态更新成功')
}

// 筛选任务
const filterTasks = () => {
  currentPage.value = 1
}

// 每页数量改变
const handleSizeChange = (newSize) => {
  pageSize.value = newSize
}

// 当前页码改变
const handleCurrentChange = (newPage) => {
  currentPage.value = newPage
}

// 模拟数据加载完成
setTimeout(() => {
  loading.value = false
}, 500)
</script>

<style scoped>
.container {
  padding: 20px;
}
.statistics {
  margin-top: 20px;
}
</style>