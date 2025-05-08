const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = defineConfig({
  chainWebpack: (config) => {
    config.plugin('define').tap((args) => {
      args[0]['__VUE_PROD_HYDRATION_MISMATCH_DETAILS__'] = false;
      return args;
    });
  },
});

const webpack = require('webpack');

module.exports = {
  // 其他配置...
  plugins: [
    new webpack.DefinePlugin({
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false)
    })
  ]
};