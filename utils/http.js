/*
 * @Author: yz
 * @Date: 2023-02-19 12:25:21
 * @Description: 
 * 
 */
/*
uView 2.0版本 http请求封装
https://blog.csdn.net/zhao949895887/article/details/121601533?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-0-121601533-blog-123294230.pc_relevant_recovery_v2&spm=1001.2101.3001.4242.1&utm_relevant_index=3


uni-app的http请求的全局配置及拦截器配置
https://blog.csdn.net/Y1_1Y1_1y1_1y/article/details/123294230


*/

import apiConfig from '@/utils/ip.js';
import store from '../store/index.js';


module.exports = (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		console.log(config,"config1")
		/* config 为默认全局配置*/
    config.baseURL = apiConfig.url; /* 根域名 */
		config.timeout = 10000
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作

		/**
		 * 
		 * 
		if(!token){
			uni.navigateTo({})
			return Promise.reject(config)
		}
		 */
    config.header['Authorization'] = "Bearer " + uni.getStorageSync('token')//"96fa43aefe4142b0a627a28cfade1059"
		return config
	}, error => { // 可使用async await 做异步操作
		return Promise.reject(error)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		
		const {
			statusCode,
			config,
			data,//包含 code 和data
		} = response;
		console.log(response, "repsDAta")
		// 判断如果是获取二维码的接口
		if (config.url.includes('/getMiniappQrCode')) {
				return {
					...response,
					isBinary: true, // 标记为二进制数据
					rawData: data   // 保留原始数据
				};
			}
		if (typeof data === "string") { 
			return uni.$u.toast("哎呀，服务器开小差了😞，我们正在紧急抢修，请稍等片刻后重试")
		}
		if ((config.url && !config.url.includes("proxy") && data.code == 401)||data.code==1002003003) { //账号未登录或者用户不存在的情况
			wx.removeStorageSync('token');
			store.state.user.userInfo={}
			uni.$u.toast("登录已过期，请重新登录")
			uni.$u.route('/subPages/sub1/login', {
			});
		}
		if (data.code === 0 || data.code === 200 || data.code === 1) {
			return data === undefined ? {} : data
		} else { 
			let str = ""
			if (data.info) {
				str = data.info
			} else { 
				str = data.msg
			}
			if (response.config.baseURL.includes(`user-behavior/collect`)) {

			} else { 
				uni.$u.toast(str)
			}
			return Promise.reject(data)
		}
		
		// if (data.code !== 0) {
		// 	// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
		// 		uni.$u.toast(data.info)


		// 	// if (data.code == 401) {
		// 	// 	fungoPreviousPage()
		// 	// 	uni.$u.route('/pages/subPacks/login/login')
		// 	// }

		// }
		// return data === undefined ? {} : data
	}, (response) => {
		return Promise.reject(response)
	})
}
