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

import apiConfig from '@/pages/subPacks/utils/ip.js';


module.exports = (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		/* config 为默认全局配置*/
    config.baseURL = apiConfig.url; /* 根域名 */
    config.timeout = 10000
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
    config.header['Authorization'] = "Bearer " + uni.getStorageSync('token')
		return config
	}, config => { // 可使用async await 做异步操作
		return Promise.reject(config)
	})

	// 响应拦截
  uni.$u.http.interceptors.response.use((response) => {
    const {
			statusCode,
			data,//包含 code 和data
		} = response;
		if (data.code != 200) {
			// 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
				uni.$u.toast(data.info)


			// if (data.code == 401) {
			// 	fungoPreviousPage()
			// 	uni.$u.route('/pages/subPacks/login/login')
			// }

		}
		return data === undefined ? {} : data
	}, (response) => {
		return Promise.reject(response)
	})
}
