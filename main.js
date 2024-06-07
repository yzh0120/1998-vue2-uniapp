import App from './App'

// #ifndef VUE3
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'
import store from './store/index.js'
const app = new Vue({
    store,
    ...App
})
//为了内置的uni.$u.http
require('./pages/subPacks/utils/http.js')(app)
app.$mount()


// import './pages/router'; //引入路由拦截  感觉没必要所以注释掉了
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
//这是uni的扩展组件的演示地址
//https://hellouniapp.dcloud.net.cn/pages/extUI/badge/badge
//uView
import uView from '@/uni_modules/uview-ui'
Vue.use(uView)


/**************************************************************************
全局组件
*/
import myDropdown from '@/pages/subPacks/components/dropdown/index'
Vue.component('myDropdown', myDropdown)

import panel from '@/pages/subPacks/components/panel'
Vue.component('panel', panel)

import formDate from "@/pages/subPacks/components/datecom.vue"
Vue.component('formDate', formDate)
//全局组件第一步
import globalModal from "@/pages/subPacks/components/globalModal.vue"
Vue.component('globalModal', globalModal)
import toast from "@/pages/subPacks/components/toast.vue"
Vue.component('toast', toast)
/**************************************************************************
原型链
*/
// import XEUtils from 'xe-utils'
// Vue.prototype.$utils = XEUtils

import * as fn from "@/pages/subPacks/utils/fn.js"
Vue.prototype.$fn = fn;

import * as validator from "@/pages/subPacks/utils/validate"
Vue.prototype.$validator = validator;
