//只要是未登录状态，想要跳转到名单内的路径时，直接跳到登录页
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
import store from "@/store/index.js" //'../store/index.js'

function hasPermission(url) {
	let islogin = true
	if (uni.getStorageSync("token")) {
		return true
	} else {
		if (whiteList.includes(url)) {
			return true
		} else {
			return false
		}
	}
}

uni.addInterceptor('navigateTo', {
  invoke(e) {
    if (!hasPermission(e.url)) {
			store.commit("user/setUserInfo", {});
      uni.redirectTo({
        url: "/subPages/sub1/login"
      })
      return false // 阻止原跳转
    }
    return true // 允许跳转
  },
  success(e) {
    console.log('跳转成功:', e)
  },
  fail(err) {
    console.log('跳转失败:', err)
  }
})
// uni.addInterceptor('navigateTo', {
	// 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
	// invoke: async (e) => {
	// 	if (hasPermission(e.url)) { //有token
	// 		if (store.state.gm.dataItem.length == 0) {
	// 			// const http = uni.$u && uni.$u.http
	// 			let data1 = await indexApi.listAllDictDataEnd().catch((e) => {
	// 				console.log(e, "errrrrrrr")
	// 			})
	// 			console.log(data1, 'data1')
	// 			store.state.gm.dataItem = data1.data //obj
	// 		}
	// 		if (!store.state.user.userInfo.nickname) {
	// 			let data2 = await indexApi.getPermissionInfo().catch(() => {})
	// 			store.state.user.userInfo = data2.data.user //obj
	// 		}
	// 		return true
	// 	} else {
	// 		return false
	// 	}
	// },
	//  invoke(e) {
		// return new Promise( async (resolve, reject) => {
		// 	if (hasPermission(e.url)) { //有token
		// 		if (store.state.gm.dataItem.length == 0) {
		// 			// const http = uni.$u && uni.$u.http
		// 			let data1 = await indexApi.listAllDictDataEnd().catch((e) => {console.log(e,"errrrrrrr")})
		// 			console.log(data1, 'data1')
		// 			store.state.gm.dataItem = data1.data //obj
		// 		}
		// 		if (!store.state.user.userInfo.nickname) {
		// 			let data2 = await indexApi.getPermissionInfo().catch(() => {})
		// 			store.state.user.userInfo = data2.data.user //obj
		// 		}
		// 		return resolve(e);
		// 	} else {
		// 		return reject(e)
		// 	}
		// });
		// if (!hasPermission(e.url)) {
		// 	uni.redirectTo({
		// 			url: "/subPages/sub1/login"
		// 	})
		// 	return false; 
		// }else{
		// 	return true;
		// }
		// return new Promise(  (resolve, reject) => {
		// 	 resolve(e);
		// });
// 	},
// 	success(e) {
// 		console.log(e, "navigateTo")
// 	}
// })

uni.addInterceptor('switchTab', {
	// tabbar页面跳转前进行拦截
	invoke(e) {
		if (!hasPermission(e.url)) {
			store.commit("user/setUserInfo", {});
			uni.redirectTo({
				url: "/subPages/sub1/login"
			})
			return false
		}
		return true
	},
	success(e) {
		console.log(e, "switchTab")
	}
})
