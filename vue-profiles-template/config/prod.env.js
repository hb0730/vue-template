'use strict'
let params = process.argv[2]
let baseUrl = ''
switch (params) {
  case 'test':
    baseUrl = '"http://a.com"'
    break
  case 'prod':
    baseUrl = '"http://b.com"'
    break
  default:
    baseUrl = '"http://c.com"'
}

module.exports = {
  NODE_ENV: '"production"',
  baseUrl: baseUrl
}
