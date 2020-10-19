'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // API_ROOT: '"https://wintop.36x.cn/"' //这是新增的代码
})
