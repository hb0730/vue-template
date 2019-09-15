'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

let params = process.argv[4]
let baseUrl = ''

switch (params) {
  case '--env=test':
    baseUrl = '"http://baidu.com"'
    break
  case '--env=prod':
    baseUrl = '"http://google.com"'
    break
  default:
    baseUrl = '"http://1213liaoliao.cn"'
}

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  baseUrl: baseUrl
})
