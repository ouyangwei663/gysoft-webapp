const path = require('path');
const webpack = require('webpack');
module.exports = {
  entry: {
    vendor: ['vue', 'vue-router', 'axios','vant','vue-touch'] //这里把vue,vue-router,axios提取出来，可以再添加
  },
  output: {
    path: path.join(__dirname, '../static/build'),
    filename: '[name].dll.js',
    library: "[name]_library" //这个名称和下面的name值必须一样
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "../static/build/vendor-manifest.json"),
      name: "[name]_library" //这个名称和上面的library值必须一样
    })
  ]
}