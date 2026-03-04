// router.js
import { RouterMount, createRouter } from 'uni-simple-router';
import store from "@/store/index.js" //'../store/index.js'
// import * as bigIndexApi from "@/api/index"
import apiConfig from '@/utils/ip.js';
// 页面白名单，不受拦截
const whiteList = [
  "/subPages/sub1/login",
  "/mainPage/home",
  "/subPages/sub1/register",
  "/subPages/sub1/password",
  "/subPages/center/introduce",
  "/subPages/center/companyIndroduce",
  "/subPages/center/business",
  "/subPages/center/branch",
]
const router = createRouter({
  platform: process.env.VUE_APP_PLATFORM,
  routes: [...ROUTES]
});
//全局路由前置守卫
router.beforeEach(async (to, from, next) => {
    console.log(to, "路由",process.env.VUE_APP_PLATFORM,)
  const http = uni.$u.http
  if (!store.state.gm.dataItemFlag) { //没有数据字典
    let data1 = await http.get('/system/dict-data/list-all-dictData', {})//bigIndexApi.listAllDictDataEnd()
    store.state.gm.dataItem = data1.data;
    store.state.gm.dataItemFlag = true
    console.log(store.state.gm.dataItem ,"store.state.gm.dataItem ")
  }

  if (uni.getStorageSync("token")) {
      if (!store.state.user.userInfo.id) {
        let data2 = await http.get('/system/user/profile/get', {})//bigIndexApi.getUserInfo()
        store.commit("user/setUserInfo", data2.data);
        console.log(store.state.user.userInfo,"store.state.user.userInfo ")
      }
    next();// return true
  } else {
    if (whiteList.includes(to.path)) {//白名单
      next();// return true
    } else {//去登录页面
      // return false
      next({ path: '/subPages/sub1/login' })
    }
  }
  // next();
});
// 全局路由后置守卫
router.afterEach((to, from) => {
  console.log(to, from, "路由")
  console.log('跳转结束')
})

export {
  router,
  RouterMount
}
