<template>
	<view style="width: 100%;">
		<!-- 
流程
	<myUpload :isAudit="true" :itemName="item.nodeName" :item="item" :projectId="projectId"
				v-if="item.checked && item.checked[0]" @success="(e) => { upSuccess(e, item, index) }"
				@error="upError">
			</myUpload>
		 -->
		<!-- 

			普通
			      <myUpload :projectId="bhdata.id" taskName="上载保函扫描件" :del="true">
      </myUpload>
		-->
		<filelistshow :fileList="fileList1" :del="del" @del="delFn"></filelistshow>

		<view>
			<u-upload accept="all" @afterRead="(e) => { afterRead(e, itemName, item) }" name="1" multiple :maxCount="10"
				v-if="isAudit">
			</u-upload>

			<u-upload accept="all" @afterRead="(e) => { afterRead(e, taskName) }" name="1" multiple :maxCount="10" v-else>
			</u-upload>
		</view>
	</view>

</template>

<script>
import apiConfig from '@/pages/subPacks/utils/ip.js';
import filelistshow from "@/pages/subPacks/components/file/filelistshow.vue"
import * as fileApi from "@/pages/subPacks/api/file"
export default {
	components: {
		filelistshow
	},
	data() {
		return {
			fileList1: [],
		}
	},
	mounted() {
		if (!this.isAudit) {
			this.getFiles()
		}
	},
	props: {
		del: {
			type: Boolean,
			default: false
		},
		//流程
		itemName: {
			type: [String, Number],
			default: ""
		},
		//流程
		item: {
			type: Object,
			default: () => { }
		},
		projectId: {
			type: [String, Number],
			default: ""
		},
		taskName: {
			type: [String, Number],
			default: ""
		},
		isAudit: {
			type: Boolean,
			default: false
		},
	},
	methods: {
		delFn(e) {
			this.fileList1.splice(e, 1);
		},
		getFiles() {
			fileApi.getFileListByFolderId({
				folderId: this.projectId,
				taskName: this.taskName,
			}).then((res) => {
				this.fileList1 = res.data
				// console.log(this.fileList1, "this.fileList1")
			})
		},
		// 新增图片
		async afterRead(event, taskName, item) {
			// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
			let lists = [].concat(event.file)

			for (let i = 0; i < lists.length; i++) {
				console.log(lists[i], "lists[i]")
				const result = await this.uploadFilePromise(lists[i].url, taskName, item, lists[i]).catch(() => { })


			}
		},
		//
		//上传文件请求
		uploadFilePromise(url, taskName, item, fileObj) {
			console.log(url, "taskName___url")
			let BASE_URL;
			let path;
			BASE_URL = apiConfig.VUE_APP_BASE_API  //测试
			path = BASE_URL + `v1/base/file/applet/uploadFileDes`;

			return new Promise((resolve, reject) => {
				let a = uni.uploadFile({
					url: path, // 仅为示例，非真实的接口地址
					filePath: url,
					name: 'file',
					header: {
						Authorization: "Bearer " + uni.getStorageSync('token'),
					},
					formData: {
						folderId: this.projectId,
						taskName: taskName,
						fileDes: fileObj.name
					},
					success: (res) => {
                        this.$refs.toast.primary({msg:"成功!"})
						let data = JSON.parse(res.data)
						if (this.isAudit) {
							this.$emit("success", { item: this.item, id: data.data.id })
						} else {
							this.$emit("success", { id: data.data.id })
						}
						// this.$emit("success",{item:this.item,id:data.data.id})
						this.fileList1.push(data.data)
						resolve(data.data.fileUrl + data.data.filePath)
					},
					error: (err) => {
						this.$emit("error")
                        this.$refs.toast.error({msg:"上传失败!"})
						reject()
					}
				});
			})
		},
	}
}
</script>

<style>

</style>
