<!--
 * @Author: pmf
 * @Date: 2022-07-21 11:08:43
 * @Description: 
 * 
-->
<template>
	<view class="wrap-box">

		<myUp :projectId="id" v-if="id" :uploadObj="uploadObj1" @update="upUp" obj="uploadObj1" canUp @del="delFn">
		</myUp>

		<myUp :projectId="id" v-if="id" :uploadObj="uploadObj2" @update="upUp" obj="uploadObj2" canUp @del="delFn">
		</myUp>

		<!-- <myUp :projectId="id" v-if="id" :uploadObj="uploadObj3" @update="upUp" obj="uploadObj3" canUp @del="delFn">
		</myUp>

		<myUp :projectId="id" v-if="id" :uploadObj="uploadObj4" @update="upUp" obj="uploadObj4" canUp @del="delFn">
		</myUp>

		<myUp :projectId="id" v-if="id" :uploadObj="uploadObj5" @update="upUp" obj="uploadObj5" canUp @del="delFn">
		</myUp> -->


	</view>
</template>

<script>
export default {
	props: {

	},
	data() {
		return {
			uploadObj1: {
				name: "诉讼授权查询函",
				taskName: "诉讼授权查询函",
				detail: [],
				require: 1,
			},
			uploadObj2: {
				name: "诉讼情况说明",
				taskName: "中标通知书",
				detail: [],
				require: 0,
			},
			// uploadObj3: {
			// 	name: "其他辅助资料",
			// 	taskName: "其他辅助资料",
			// 	detail: [],
			// 	require: 0,
			// },
			// uploadObj4: {
			// 	name: "项目现场照片",
			// 	taskName: "项目现场照片",
			// 	detail: [],
			// 	require: 0,
			// },
			// uploadObj5: {
			// 	name: "调查工作底稿",
			// 	taskName: "调查工作底稿",
			// 	detail: [],
			// 	require: 0,
			// },
			id: "",
		}
	},
	onLoad(e) {
		this.id = e.id || "";
	},
	methods: {
        //删除的事件
		delFn(e) {
			this[e.obj].detail.splice(e.value, 1);
			console.log(e, this[e.obj].detail)
		},
        //获取完文件的事件
		upUp(e) {
			this[e.obj].detail = e.value
			console.log(this[e.obj], e, "12312312")
		},
	},
}
</script>

<style lang="scss">
page {
	background-color: #F3F4F6;
	padding: 20rpx;
	box-sizing: border-box;
}

.wrap-box {
	// background-color: #fff;
	padding: 20rpx 0px;
}
</style>
