/*
 * @Author: yz
 * @Date: 2023-02-19 14:56:48
 * @Description: 
 * 
 */



/*
uniapp中全局页面挂载组件（小程序）
https://huaweicloud.csdn.net/638eec12dacf622b8df8daa4.html?spm=1001.2101.3001.6650.5&utm_medium=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~activity-5-127603103-blog-128455931.pc_relevant_recovery_v2&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2~default~BlogCommendFromBaidu~activity-5-127603103-blog-128455931.pc_relevant_recovery_v2&utm_relevant_index=10

uni-app - 封装全局 API 调用弹框组件
https://blog.csdn.net/weixin_40466351/article/details/128455931
*/
const path = require('path')

module.exports = {
	configureWebpack: {
		module: {
			rules: [{
				test: /\.vue$/,
				use: {
					loader: path.resolve(__dirname, "./node_modules/vue-inset-loader")
				},
			}]
		},
	}
}
