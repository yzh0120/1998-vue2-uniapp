<template>
	<view class="container">
		<!-- 固定顶部选项卡 -->
		<view class="top">
			<view class="topItem" :class="type ? 'btn1' : 'btn2'" @click="switchTab(true)">闪电保</view>
			<view class="topItem" v-if="this.$store.state.user.userInfo.nickname.includes('-')"
				:class="!type ? 'btn1' : 'btn2'" @click="switchTab(false)">业务系统</view>
		</view>

		<!-- 内容区域 -->
		<view class="content">
			<dingdan1 v-if="type" ref="dingdan"></dingdan1>
			<dingdan2 v-else ref="dingdan"></dingdan2>
		</view>
	</view>
</template>
<script>
import dingdan1 from '../components/components/dingdan1.vue'
import dingdan2 from '../components/components/dingdan2.vue'
export default {
	components: {
		dingdan1,
		dingdan2
	},
	data() {
		return {
			type: true,
		}
	},
	methods: {
		switchTab(value) {
			console.log(value, '切换')
			this.type = value;
		},
	}
}
</script>
<style lang="scss" scoped>
.container {
	background-color: #f5f5f5;
	height: 100vh;
	display: flex;
}

.top {
	display: flex;
	background: #fff;
	align-items: center;
	justify-content: center;
	margin: 20rpx auto;
	background-color: red;
	width: 80%;
	flex-shrink: 0;
	z-index: 1000;

	position: fixed;
	left: 50%;
	transform: translateX(-50%);
}

.content {
	flex: 1;
	overflow: hidden;
	margin-top: 120rpx;
}

.topItem {
	flex: 1;
	height: 80rpx;
	text-align: center;
	line-height: 80rpx;
}

.btn1 {
	background-color: #cf2135;
	color: #fff;
}

.btn2 {
	background-color: #fff;
}
</style>
