# vue-profiles

> vue 多环境

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run profile

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

# 步骤
* 启动项目时，需要修改`/package.json`、`/config/dev.env.js`和`/src/main.js`文件
  + 在`/package.json`中，为启动命令设置不同的参数
 ```
	"scripts": {
		"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
		"dev_test": "webpack-dev-server --inline --progress --env=test --config build/webpack.dev.conf.js",
		"dev_prod": "webpack-dev-server --inline --progress --env=prod --config build/webpack.dev.conf.js",
		"start": "npm run dev",
		"e2e": "node test/e2e/runner.js",
		"test": "npm run unit && npm run e2e",
		"lint": "eslint --ext .js,.vue src test/unit test/e2e/specs",
		"build": "node build/build.js"
	}
 ```
  + 在`/config/dev.env.js`中，通过`process.argv`获取一个命令数组，并为其配置相应的接口地址
  ```
	'use strict'
	const merge = require('webpack-merge')
	const prodEnv = require('./prod.env')

	let params = process.argv[4]
	let baseUrl = ''
	switch (params) {
		case '--env=test':
		  baseUrl = '"http://a.com"'
		  break
		case '--env=prod':
		  baseUrl = '"http://b.com"'
		  break
		default:
		  baseUrl = '"http://c.com"'
	}
	module.exports = merge(prodEnv, {
	  NODE_ENV: '"development"',
	  
	　baseUrl: baseUrl
	})
  ```
  + 在`/src/main.js`中，通过`process.env.baseUrl` 获取`/config/dev.env.js`文件的`baseUrl`并将其挂载在Vue的原型上
  ```
	import Vue from 'vue'
	import App from './App'
	import router from './router'

	Vue.config.productionTip = false

	Vue.prototype.$baseUrl = process.env.baseUrl

	/* eslint-disable no-new */
	new Vue({
	  el: '#app',
	  router,
	  components: { App },
	  template: '<App/>'
	})
  ```
  在不同接口地址下启动项目的时候，直接用对应的命令`npm run dev`、`npm run dev_test`、`npm run dev_prod`就可以了，再也不用去文件中修改接口地址了。<br>
 * 打包项目时，需要修改`/config/prod.env.js`和`/src/main.js`文件<br>
	+ 在`/config/prod.env.js`中，通过process.argv获取一个命令数组，并为其配置相应的接口地址
	```
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
	module.exports = merge(prodEnv, {
	  NODE_ENV: '"production"',
	  
	　baseUrl: baseUrl
	})
	```
	+ 在`/src/main.js`中，通过`process.env.baseUrl` 获取`/config/prod.env.js`文件的baseUrl并将其挂载在Vue的原型上
	```
		import Vue from 'vue'
		import App from './App'
		import router from './router'

		Vue.config.productionTip = false

		Vue.prototype.$baseUrl = process.env.baseUrl

		/* eslint-disable no-new */
		new Vue({
		  el: '#app',
		  router,
		  components: { App },
		  template: '<App/>'
		})
	```
	在打包不同环境下项目的时候，直接用对应的命令`npm run build`、`npm run build test`、`npm run build prod`就可以了，再也不用去文件中修改接口地址了。<br>
	感谢`darkerXi` 参考地址 https://segmentfault.com/a/1190000016308995
