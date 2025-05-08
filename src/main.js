import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
    ElButton,
    ElInput,
    ElForm,
    ElFormItem,
    ElMessage,
    // 其他需要的组件...
} from 'element-plus'

// 引入Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.use(store)
app.use(router)
app.use(ElementPlus)

const components = [
    ElButton,
    ElInput,
    ElForm,
    ElFormItem
    // 其他需要的组件...
]

components.forEach(component => {
    app.component(component.name, component)
})

// 挂载消息提示
app.config.globalProperties.$message = ElMessage
app.mount('#app')
