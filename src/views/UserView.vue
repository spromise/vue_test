<template>
    <div class="user-container">
        <el-card>
            <div class="header">
                <el-button type="primary" @click="handleAdd">
                    <el-icon>
                        <Plus />
                    </el-icon>
                    新增用户
                </el-button>

                <el-input v-model="searchValue" placeholder="请输入搜索内容" style="width: 300px; margin-left: 20px" clearable
                    @clear="handleSearchClear" @keyup.enter="handleSearch">
                    <template #append>
                        <el-button @click="handleSearch">
                            <el-icon>
                                <Search />
                            </el-icon>
                        </el-button>
                    </template>
                </el-input>
            </div>

            <el-table :data="tableData" border stripe style="width: 100%; margin-top: 20px" v-loading="loading">
                <el-table-column prop="id" label="ID" width="80" align="center" />
                <el-table-column prop="name" label="姓名" width="120" />
                <el-table-column prop="gender" label="性别" width="80" align="center">
                    <template #default="scope">
                        {{ scope.row.gender === 1 ? '男' : '女' }}
                    </template>
                </el-table-column>
                <el-table-column prop="phone" label="手机号" width="150" />
                <el-table-column prop="email" label="邮箱" width="200" />
                <el-table-column prop="status" label="状态" width="100" align="center">
                    <template #default="scope">
                        <el-tag :type="scope.row.status ? 'success' : 'danger'">
                            {{ scope.row.status ? '启用' : '禁用' }}
                        </el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间" width="180" />
                <el-table-column label="操作" width="180" fixed="right" align="center">
                    <template #default="scope">
                        <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row)">
                            删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize"
                :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper" :total="total"
                @size-change="handleSizeChange" @current-change="handleCurrentChange" style="margin-top: 20px" />
        </el-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Search } from '@element-plus/icons-vue'

// 表格数据
const tableData = ref([])
const loading = ref(false)
const searchValue = ref('')
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 生成模拟数据
const generateMockData = () => {
    const mockData = []
    const genders = [0, 1] // 0:女, 1:男
    const statuses = [0, 1] // 0:禁用, 1:启用
    const names = ['张三', '李四', '王五', '赵六', '钱七']

    for (let i = 1; i <= 50; i++) {
        const randomGender = genders[Math.floor(Math.random() * genders.length)]
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)]
        const randomName = names[Math.floor(Math.random() * names.length)]

        mockData.push({
            id: i,
            name: `${randomName}${i}`,
            gender: randomGender,
            phone: `138${Math.floor(10000000 + Math.random() * 90000000)}`,
            email: `user${i}@example.com`,
            status: randomStatus,
            createTime: new Date().toLocaleString()
        })
    }

    return mockData
}

// 获取数据
const fetchData = () => {
    loading.value = true
    setTimeout(() => {
        const allData = generateMockData()

        // 模拟搜索
        let filteredData = allData
        if (searchValue.value) {
            filteredData = allData.filter(item =>
                item.name.includes(searchValue.value) ||
                item.phone.includes(searchValue.value) ||
                item.email.includes(searchValue.value)
            )
        }

        // 模拟分页
        total.value = filteredData.length
        const start = (currentPage.value - 1) * pageSize.value
        const end = start + pageSize.value
        tableData.value = filteredData.slice(start, end)

        loading.value = false
    }, 500)
}

// 搜索
const handleSearch = () => {
    currentPage.value = 1
    fetchData()
}

// 清空搜索
const handleSearchClear = () => {
    searchValue.value = ''
    fetchData()
}

// 分页大小变化
const handleSizeChange = (val) => {
    pageSize.value = val
    fetchData()
}

// 当前页变化
const handleCurrentChange = (val) => {
    currentPage.value = val
    fetchData()
}

// 新增
const handleAdd = () => {
    ElMessage.info('点击了新增按钮')
}

// 编辑
const handleEdit = (row) => {
    ElMessage.info(`编辑用户: ${row.name}`)
}

// 删除
const handleDelete = (row) => {
    ElMessageBox.confirm(`确定删除用户 ${row.name} 吗?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        ElMessage.success('删除成功')
        fetchData()
    }).catch(() => {
        ElMessage.info('取消删除')
    })
}

// 初始化加载数据
onMounted(() => {
    fetchData()
})
</script>

<style scoped>
.user-container {
    padding: 20px;
}

.header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
</style>
