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
import * as bigIndexApi from "@/api/index"

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
	// async invoke钩子：必须返回options对象（async会自动包裹为Promise<对象>）
	async invoke(options) {
		console.log("钩子函数:navigateTo")
		try {
			
			// 你的异步逻辑（比如校验登录、权限）
			// await checkTokenExpired(); // 加await完全没问题
			
			if (!store.state.gm.dataItemFlag) { //没有数据字典
				
				let data1 = await bigIndexApi.listAllDictDataEnd()
				
				store.state.gm.dataItem = data1.data;
				store.state.gm.dataItemFlag = true
				
			}
			if (uni.getStorageSync('token')) {
				if (!store.state.user.userInfo.id) {
					let data2 = await bigIndexApi.getUserInfo()
					store.state.user.userInfo = data2.data
				}
			}
			if (!hasPermission(options.url)) {
				store.commit("user/setUserInfo", {});
				uni.redirectTo({
					url: "/subPages/sub1/login"
				})
				// return false // 阻止原跳转
				throw new Error('拦截器异步校验失败：' );
			} else {
				// 关键：必须返回原始的options配置对象（或修改后的对象）
				return options;
			}


		} catch (err) {
			
			// 异步逻辑出错时，终止跳转并抛错（避免参数异常）
			throw new Error('拦截器异步校验失败：' );
		}
		
	},
	success(res) {
		
	},
	fail(err) {
		console.error('跳转失败', err);
	}
});
uni.addInterceptor('redirectTo', {
	// async invoke钩子：必须返回options对象（async会自动包裹为Promise<对象>）
	async invoke(options) {
		console.log("钩子函数:redirectTo")
		try {
			
			// 你的异步逻辑（比如校验登录、权限）
			// await checkTokenExpired(); // 加await完全没问题
			
			if (!store.state.gm.dataItemFlag) { //没有数据字典
				
				let data1 = await bigIndexApi.listAllDictDataEnd()
				
				store.state.gm.dataItem = data1.data;
				store.state.gm.dataItemFlag = true
				
			}
			if (uni.getStorageSync('token')) {
				if (!store.state.user.userInfo.id) {
					let data2 = await bigIndexApi.getUserInfo()
					store.state.user.userInfo = data2.data
				}
			}
			if (!hasPermission(options.url)) {
				store.commit("user/setUserInfo", {});
				uni.redirectTo({
					url: "/subPages/sub1/login"
				})
				// return false // 阻止原跳转
				throw new Error('拦截器异步校验失败：' );
			} else {
				// 关键：必须返回原始的options配置对象（或修改后的对象）
				return options;
			}


		} catch (err) {
			
			// 异步逻辑出错时，终止跳转并抛错（避免参数异常）
			throw new Error('拦截器异步校验失败：' );
		}
		
	},
	success(res) {
		
	},
	fail(err) {
		console.error('跳转失败', err);
	}
});
uni.addInterceptor('switchTab', {
	// async invoke钩子：必须返回options对象（async会自动包裹为Promise<对象>）
	async invoke(options) {
		console.log("钩子函数:switchTab")
		try {
			
			// 你的异步逻辑（比如校验登录、权限）
			// await checkTokenExpired(); // 加await完全没问题
			
			if (!store.state.gm.dataItemFlag) { //没有数据字典
				
				let data1 = await bigIndexApi.listAllDictDataEnd()
				
				store.state.gm.dataItem = data1.data;
				store.state.gm.dataItemFlag = true
				
			}
			if (uni.getStorageSync('token')) {
				if (!store.state.user.userInfo.id) {
					let data2 = await bigIndexApi.getUserInfo()
					store.state.user.userInfo = data2.data
				}
			}
			if (!hasPermission(options.url)) {
				store.commit("user/setUserInfo", {});
				uni.redirectTo({
					url: "/subPages/sub1/login"
				})
				// return false // 阻止原跳转
				throw new Error('拦截器异步校验失败：' );
			} else {
				// 关键：必须返回原始的options配置对象（或修改后的对象）
				return options;
			}


		} catch (err) {
			
			// 异步逻辑出错时，终止跳转并抛错（避免参数异常）
			throw new Error('拦截器异步校验失败：' );
		}
		
	},
	success(res) {
		
	},
	fail(err) {
		console.error('跳转失败', err);
	}
});
uni.addInterceptor('reLaunch', {
	// async invoke钩子：必须返回options对象（async会自动包裹为Promise<对象>）
	async invoke(options) {
		console.log("钩子函数:reLaunch")
		try {
			
			// 你的异步逻辑（比如校验登录、权限）
			// await checkTokenExpired(); // 加await完全没问题
			
			if (!store.state.gm.dataItemFlag) { //没有数据字典
				
				let data1 = await bigIndexApi.listAllDictDataEnd()
				
				store.state.gm.dataItem = data1.data;
				store.state.gm.dataItemFlag = true
				
			}
			if (uni.getStorageSync('token')) {
				if (!store.state.user.userInfo.id) {
					let data2 = await bigIndexApi.getUserInfo()
					store.state.user.userInfo = data2.data
				}
			}
			if (!hasPermission(options.url)) {
				store.commit("user/setUserInfo", {});
				uni.redirectTo({
					url: "/subPages/sub1/login"
				})
				// return false // 阻止原跳转
				throw new Error('拦截器异步校验失败：' );
			} else {
				// 关键：必须返回原始的options配置对象（或修改后的对象）
				return options;
			}


		} catch (err) {
			
			// 异步逻辑出错时，终止跳转并抛错（避免参数异常）
			throw new Error('拦截器异步校验失败：' );
		}
		
	},
	success(res) {
		
	},
	fail(err) {
		console.error('跳转失败', err);
	}
});
uni.addInterceptor('navigateBack', {
	// async invoke钩子：必须返回options对象（async会自动包裹为Promise<对象>）
	async invoke(options) {
		console.log("钩子函数:navigateBack")
		try {
			
			// 你的异步逻辑（比如校验登录、权限）
			// await checkTokenExpired(); // 加await完全没问题
			
			if (!store.state.gm.dataItemFlag) { //没有数据字典
				
				let data1 = await bigIndexApi.listAllDictDataEnd()
				
				store.state.gm.dataItem = data1.data;
				store.state.gm.dataItemFlag = true
				
			}
			if (uni.getStorageSync('token')) {
				if (!store.state.user.userInfo.id) {
					let data2 = await bigIndexApi.getUserInfo()
					store.state.user.userInfo = data2.data
				}
			}
			if (!hasPermission(options.url)) {
				store.commit("user/setUserInfo", {});
				uni.redirectTo({
					url: "/subPages/sub1/login"
				})
				// return false // 阻止原跳转
				throw new Error('拦截器异步校验失败：' );
			} else {
				// 关键：必须返回原始的options配置对象（或修改后的对象）
				return options;
			}


		} catch (err) {
			
			// 异步逻辑出错时，终止跳转并抛错（避免参数异常）
			throw new Error('拦截器异步校验失败：' );
		}
		
	},
	success(res) {
		
	},
	fail(err) {
		console.error('跳转失败', err);
	}
});
uni.addInterceptor('preloadPage', {
	// async invoke钩子：必须返回options对象（async会自动包裹为Promise<对象>）
	async invoke(options) {
		console.log("钩子函数:preloadPage")
		try {
			
			// 你的异步逻辑（比如校验登录、权限）
			// await checkTokenExpired(); // 加await完全没问题
			
			if (!store.state.gm.dataItemFlag) { //没有数据字典
				
				let data1 = await bigIndexApi.listAllDictDataEnd()
				
				store.state.gm.dataItem = data1.data;
				store.state.gm.dataItemFlag = true
				
			}
			if (uni.getStorageSync('token')) {
				if (!store.state.user.userInfo.id) {
					let data2 = await bigIndexApi.getUserInfo()
					store.state.user.userInfo = data2.data
				}
			}
			if (!hasPermission(options.url)) {
				store.commit("user/setUserInfo", {});
				uni.redirectTo({
					url: "/subPages/sub1/login"
				})
				// return false // 阻止原跳转
				throw new Error('拦截器异步校验失败：' );
			} else {
				// 关键：必须返回原始的options配置对象（或修改后的对象）
				return options;
			}


		} catch (err) {
			
			// 异步逻辑出错时，终止跳转并抛错（避免参数异常）
			throw new Error('拦截器异步校验失败：' );
		}
		
	},
	success(res) {
		
	},
	fail(err) {
		console.error('跳转失败', err);
	}
});


/*
try {
			
			// 你的异步逻辑（比如校验登录、权限）
			// await checkTokenExpired(); // 加await完全没问题
			
			if (!store.state.gm.dataItemFlag) { //没有数据字典
				
				let data1 = await bigIndexApi.listAllDictDataEnd()
				
				store.state.gm.dataItem = data1.data;
				store.state.gm.dataItemFlag = true
				
			}
			if (uni.getStorageSync('token')) {
				if (!store.state.user.userInfo.id) {
					let data2 = await bigIndexApi.getUserInfo()
					store.state.user.userInfo = data2.data
				}
			}
			if (!hasPermission(options.url)) {
				store.commit("user/setUserInfo", {});
				uni.redirectTo({
					url: "/subPages/sub1/login"
				})
				// return false // 阻止原跳转
				throw new Error('拦截器异步校验失败：' );
			} else {
				// 关键：必须返回原始的options配置对象（或修改后的对象）
				return options;
			}


		} catch (err) {
			
			// 异步逻辑出错时，终止跳转并抛错（避免参数异常）
			throw new Error('拦截器异步校验失败：' );
		}
*/