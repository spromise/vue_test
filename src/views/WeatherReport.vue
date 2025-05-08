<template>
    <div class="weather-app" :class="{ 'dark-mode': isDarkMode }">
      <!-- 主题切换开关 -->
      <el-switch v-model="isDarkMode" @change="toggleTheme" />
      <!-- 城市搜索 -->
      <el-form :inline="true" @submit.prevent="searchWeather">
        <el-form-item>
          <el-input
            v-model="cityName"
            placeholder="请输入城市名称"
            @keyup.enter="searchWeather"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchWeather" :loading="isSearching">
            搜索
          </el-button>
        </el-form-item>
      </el-form>
      <!-- 错误提示 -->
      <el-alert
        v-if="errorMessage"
        :title="errorMessage"
        type="error"
        closable
        @close="errorMessage = ''"
      />
      <!-- 天气信息展示 -->
      <el-card v-if="weatherData">
        <template #header>
          <div class="card-header">
            <h2>{{ weatherData.city }}</h2>
          </div>
        </template>
        <!-- 当前天气 -->
        <div class="current-weather">
          <h3>当前天气</h3>
          <p>温度: {{ weatherData.current.temperature }}°C</p>
          <p>天气状况: {{ weatherData.current.condition }}</p>
          <img :src="getWeatherIcon(weatherData.current.condition)" alt="天气图标" />
        </div>
        <!-- 未来3天天气预报 -->
        <div class="forecast">
          <h3>未来3天天气预报</h3>
          <el-table :data="weatherData.forecast" stripe>
            <el-table-column prop="date" label="日期" />
            <el-table-column prop="maxTemperature" label="最高温度(°C)" />
            <el-table-column prop="minTemperature" label="最低温度(°C)" />
            <el-table-column prop="condition" label="天气状况" />
            <el-table-column label="图标">
              <template #default="scope">
                <img :src="getWeatherIcon(scope.row.condition)" alt="天气图标" />
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  // 响应式数据
  const isDarkMode = ref(false);
  const cityName = ref('');
  const isSearching = ref(false);
  const errorMessage = ref('');
  const weatherData = ref(null);
  
  // 模拟天气数据
  const mockWeatherData = {
    北京: {
      current: {
        temperature: getRandomTemperature(),
        condition: getRandomCondition()
      },
      forecast: [
        {
          date: getNextDate(1),
          maxTemperature: getRandomTemperature(20, 30),
          minTemperature: getRandomTemperature(10, 20),
          condition: getRandomCondition()
        },
        {
          date: getNextDate(2),
          maxTemperature: getRandomTemperature(20, 30),
          minTemperature: getRandomTemperature(10, 20),
          condition: getRandomCondition()
        },
        {
          date: getNextDate(3),
          maxTemperature: getRandomTemperature(20, 30),
          minTemperature: getRandomTemperature(10, 20),
          condition: getRandomCondition()
        }
      ]
    },
    上海: {
      current: {
        temperature: getRandomTemperature(),
        condition: getRandomCondition()
      },
      forecast: [
        {
          date: getNextDate(1),
          maxTemperature: getRandomTemperature(22, 32),
          minTemperature: getRandomTemperature(12, 22),
          condition: getRandomCondition()
        },
        {
          date: getNextDate(2),
          maxTemperature: getRandomTemperature(22, 32),
          minTemperature: getRandomTemperature(12, 22),
          condition: getRandomCondition()
        },
        {
          date: getNextDate(3),
          maxTemperature: getRandomTemperature(22, 32),
          minTemperature: getRandomTemperature(12, 22),
          condition: getRandomCondition()
        }
      ]
    },
    // 可以添加更多城市
  };
  
  // 搜索天气
  const searchWeather = () => {
    if (!cityName.value) {
      errorMessage.value = '请输入城市名称';
      return;
    }
    isSearching.value = true;
    errorMessage.value = '';
    setTimeout(() => {
      const data = mockWeatherData[cityName.value];
      if (data) {
        weatherData.value = {
          city: cityName.value,
          ...data
        };
      } else {
        errorMessage.value = '未找到该城市的天气信息';
        weatherData.value = null;
      }
      isSearching.value = false;
    }, 500);
  };
  
  // 切换主题
  const toggleTheme = () => {
    isDarkMode.value =!isDarkMode.value;
    localStorage.setItem('isDarkMode', isDarkMode.value);
  };
  
  // 获取随机温度
  const getRandomTemperature = (min = 10, max = 30) => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  
  // 获取随机天气状况
  const getRandomCondition = () => {
    const conditions = ['晴', '阴', '雨'];
    return conditions[Math.floor(Math.random() * conditions.length)];
  };
  
  // 获取未来日期
  const getNextDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString();
  };
  
  // 获取天气图标
  const getWeatherIcon = (condition) => {
    switch (condition) {
      case '晴':
        return 'https://example.com/sunny.png';
      case '阴':
        return 'https://example.com/cloudy.png';
      case '雨':
        return 'https://example.com/rainy.png';
      default:
        return '';
    }
  };
  
  // 初始化主题
  const storedTheme = localStorage.getItem('isDarkMode');
  if (storedTheme) {
    isDarkMode.value = storedTheme === 'true';
  }
  
  // 初始化加载默认城市天气
  onMounted(() => {
    const defaultCity = '北京';
    cityName.value = defaultCity;
    searchWeather();
  });
  </script>
  
  <style scoped lang="scss">
  .weather-app {
    padding: 20px;
  
    .dark-mode {
      background-color: #1f1f1f;
      color: #fff;
  
      .el-input__inner {
        background-color: #333;
        color: #fff;
        border-color: #555;
      }
  
      .el-button {
        background-color: #555;
        border-color: #555;
        color: #fff;
  
        &:hover {
          background-color: #777;
          border-color: #777;
        }
      }
  
      .el-card {
        background-color: #333;
        border-color: #555;
        color: #fff;
      }
  
      .el-switch__core {
        background-color: #555;
      }
  
      .el-switch.is-checked .el-switch__core {
        background-color: #777;
      }
    }
  }
  </style>