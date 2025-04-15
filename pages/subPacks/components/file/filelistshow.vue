<!--
 * @Author: yz
 * @Date: 2022-07-12 11:22:52
 * @Description: 
 * 
-->
<template>
	<view>
        <!-- 使用
        <filelistshow :fileList="item.attachmentList"></filelistshow> -->
		<view v-for="(item, index) in fileList" :key="index" class="file">
			<div style="margin-top: 20rpx;display: flex;">
				<text v-if="del" @click="delFile(item.id, index)" style="color:red;margin-right: 10rpx;">X</text>
				<view @click="choose(item.id)" style="margin-left: 20rpx;"> {{ item.fileName }}</view>
			</div>

		</view>


	</view>
</template>

<script>
  import * as fileApi from "@/pages/subPacks/api/file"
export default {
	data() {
		return {
			show: false,
		}
	},
	props: {
		fileList: {
			type: Array,
			default: () => []
		},
		del: {
			type: Boolean,
			default: false
		}
	},
	methods: {
		async delFile(id, index) {
			let res = await uni.showModal({
				title: "提示",
				content: "确认删除此文件?",
				confirmText: "确定",
				cancelText: "取消"
			})
			if (res[1].confirm) {
				fileApi.del([id], { a: true }).then((res) => {
					if (res.code == 200) {
						this.$refs.toast.primary({msg:"成功!"})
						this.$emit("del", index)
					} else {
						this.$refs.toast.error({msg:"失败!"})
					}
				})
			}


		},
		// cancel() {
		// 	this.show = false
		// },
		async choose(id) {
			let res = await uni.showModal({
				title: "提示",
				content: "请选择下载还是预览",
				confirmText: "下载",
				cancelText: "预览"
			})

			// console.log(res,"res")
			if (res[1].confirm) {
				fileApi.download({ id: id }, "filedownload")
			} else if (res[1].cancel) {
				fileApi.download({ id: id }, "filedownload")
			}
		}
	}
}
</script>

<style lang="scss">
.file {
	font-size: 24rpx;
	color: #909399;
}
</style>
