<script>
export default {
	//在App.vue中没有data只有globalData
	globalData: {
		App:"1.2.2.2"
	},
	methods: {
		alert() { 
			console.log(1)
		},
	},
		onLaunch: function() {
			console.log('App 启动')
		},
		onShow: function() {
			console.log('App 在手机前台')
		},
		onHide: function() {
			console.log('App 在手机后台')
		}
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";

		/*每个页面公共css */
</style>
