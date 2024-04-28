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

require('./pages/subPacks/utils/http.js')(app)
app.$mount()


import './pages/router'; //引入拦截
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
// import globalModal from "@/pages/subPacks/components/globalModal.vue"
// Vue.component('globalModal', globalModal)
/**************************************************************************
原型链
*/
import XEUtils from 'xe-utils'
Vue.prototype.$utils = XEUtils


// import * as fn from "@/utils/fn.js"
// Vue.prototype.$fn = fn;

// import * as validator from "@/utils/validate"
// Vue.prototype.$validator = validator;

import * as fn from "@/pages/subPacks/utils/fn.js"
Vue.prototype.$fn = fn;

import * as validator from "@/pages/subPacks/utils/validate"
Vue.prototype.$validator = validator;
