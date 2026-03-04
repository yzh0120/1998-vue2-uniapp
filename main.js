import App from './App'


// #ifndef VUE3
import Vue from 'vue'
/////////////
import {router,RouterMount} from './utils/simpleRouter.js'  //路径换成自己的
Vue.use(router)

import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
import store from './store/index.js'
const app = new Vue({
  store,
  ...App
})
// export const EventBus = new Vue();
const EventBus = new Vue();
Vue.prototype.$EventBus = EventBus;
/**************************************************************************
为了内置的uni.$u.http
*/
require('./utils/http.js')(app)


// app.$mount()
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,router,'#app')
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
////////////
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)

/**************************************************************************
原型链
*/
import * as fn from "@/utils/fn.js"
Vue.prototype.$fn = fn;

import * as validator from "@/utils/validate"
Vue.prototype.$validator = validator

/**************************************************************************
全局组件
*/
// import citycom from "@/components/city.vue"
// Vue.component('citycom', citycom)

// import dateTime from "@/components/dateTime.vue"
// Vue.component('dateTime', dateTime)

import {
  formatMoney,
  numberFormatter,
  formatDate
} from '@/utils/fn.js'

Vue.filter("formatDate", (value, format) => {
  if (value != "0001-01-01 00:00:00" && value != "0001-01-01T00:00:00" && value) {
    return formatDate(value, format)
  } else {
    return "";
  }
})

Vue.filter("fileSize", (value) => {
  if (value) {
    return numberFormatter(value);
  } else {
    return "";
  }
})
Vue.filter("formatMoney", (value, num) => {
  if (value != "undefined" && value != undefined && value != null) {
    return formatMoney(value, num || 2)
  }
})
Vue.filter("numFilter", (value, num) => {
  if (value != "undefined" && value != undefined && value != null) {
    return formatMoney(value, num || 2)
  }
})
Vue.filter("null1", (value, num) => {
  if (value === null || value === undefined) {
    return ""
  } else {
    return value
  }
})

// import './utils/router.js'

// 配置toast全局默认参数
Vue.prototype.$u.config.toast = {
  wrap: true, // 全局开启换行
  width: '80%', // 全局默认宽度
  // position: 'bottom',
  duration: 3000
}
