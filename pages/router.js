//只要是未登录状态，想要跳转到名单内的路径时，直接跳到登录页
// 页面白名单，不受拦截
const whiteList = [
	"/pages/state/login"
]

function hasPermission(url) {
  console.log("-1-")
	// let islogin = uni.getStorageSync("token") && (uni.getStorageSync("tokenTime") && uni.getStorageSync("tokenTime") >
	// 	new Date().getTime())
	let islogin = true

	// 在白名单中或有登录判断条件可以直接跳转
	if (whiteList.indexOf(url) !== -1 || islogin) {
		return true
	}
	return false
}
uni.addInterceptor('navigateTo', {
	// 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
	invoke(e) {
		if (!hasPermission(e.url)) {
			uni.redirectTo({
				url: "/pages/subPacks/login/login"
			})
			return false
		}
		return true
	},
  success(e) {
    console.log(e,"navigateTo")
  }
})

uni.addInterceptor('switchTab', {
	// tabbar页面跳转前进行拦截
	invoke(e) {
		if (!hasPermission(e.url)) {
			uni.redirectTo({
				url: "/pages/subPacks/login/login"
			})
			return false
		}
		return true
	},
  success(e) {
    console.log(e,"switchTab")
  }
})
