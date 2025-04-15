<template>
    <view style="width: 100%;margin-bottom: 50rpx;" class="box">
      <!-- 显示 v-for="(item, index) in uploadObj.detail"-->
      <view class="myrow-box">
        <view class="pubrow">
          <text class="tit">资料名称 <text v-if="uploadObj.require" style="color:red">*</text></text>
          <text class="txt">{{ uploadObj.name }}</text>
        </view>
        <!-- 当前taskname 有文件的情况 -->
        <template v-if="uploadObj.detail.length">
          <view v-for="(file, fileIndex) in uploadObj.detail" :key="fileIndex">
            <view class="pubrow">
              <view class="tit">文件名称 </view>
              <view class="txt download" style="display: flex;flex-wrap: wrap;">
                <view v-if="canDel" @click="delFile(file.id, fileIndex)" style="color:red;margin-right: 20rpx;">点击删除
                </view>
                <view @click="choose(file.id)">{{ file.fileName }}</view>
              </view>
            </view>
  
            <view class="pubrow">
              <text class="tit">上传时间</text>
              <text class="txt">{{ file.createTime }}</text>
            </view>
  
            <view class="pubrow" v-if="showRemark">
              <text class="tit">备注</text>
              <text class="txt">{{ file.remarks  }}</text>
            </view>
  
            <view class="pubrow" v-if="showHis">
              <text class="tit">历史文件</text>
              <text class="txt active" @click="checkHistoryFile(file)">查看历史文件</text>
            </view>
  
          </view>
        </template>
        <!-- 没有文件的情况 -->
        <template v-else>
          <view class="pubrow">
            <text class="tit">暂无文件</text>
            <text class="txt">-</text>
          </view>
  
        </template>
      </view>
      <!-- 显示上传按钮 -->
      <view v-if="canUp">
        <u-upload accept="all" @afterRead="(e) => { afterRead(e) }" name="1" multiple :maxCount="10">
          <view class="myrow-box">
            <view class="pubrow">
              <text class="tit">操作</text>
              <text class="txt" style="color: #409eff;">点击上传</text>
            </view>
          </view>
  
        </u-upload>
      </view>
    </view>
  
  </template>
  
  <script>
  import * as fileApi from "@/pages/subPacks/api/file"
  export default {
    components: {
    },
    data() {
      return {
      }
    },
    mounted() {
        this.getFiles()
    },
    props: {
        // 展示备注
      showRemark: {
        type: Boolean,
        default: false
      },
      //展示历史
      showHis: {
        type: Boolean,
        default: false
      },
      //允许删除
      canDel: {
        type: Boolean,
        default: false
      },
      //项目编号
      projectId: {
        type: [String, Number],
        default: "",
      },

      //允许上传
      canUp: {
        type: Boolean,
        default: false
      },
      uploadObj: {
        type: Object,
        default: () => {
          return {
            detail: []
          };
        },
      },
       //等于uploadObj的变量的字符串
        obj: {
        type: [String, Number],
        default: "",
      },
    },
    methods: {
        //删除文件
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
                this.$emit("del", { obj: this.obj, value: index })
                this.uploadObj.detail.splice(index, 1);
            } else {
                this.$refs.toast.error({msg:"失败!"})
            }
          })
        }
  
  
      },
      // 查看历史文件 只是一个跳转
      checkHistoryFile(item) {
        uni.navigateTo({
          url: `/pagesA/pages/projectDetail/lishi?projectId=${this.projectId}&taskName=${item.taskName}`
        })
      },
      async choose(id) {
        let res = await uni.showModal({
          title: "提示",
          content: "请选择下载还是预览",
          confirmText: "下载",
          cancelText: "预览"
        })
        if (res[1].confirm) {
          fileApi.download({ id: id }, "filedownload")
        } else if (res[1].cancel) {
            fileApi.download({ id: id }, "filedownload")
        }
      },
      //预览
      look(item, index) {
        fileApi.onlinePreviewUrl({ id: item.id }).then((res) => {
          if (res.data) {
            // window.open(res.data); // h5端预览
            let url = "/pagesA/pages/preview/preview";
            let fileUrl = res.data; //encodeURIComponent()
            uni.navigateTo({ url: `${url}?fileUrl=${fileUrl}` });
          } else {
            uni.$u.toast("文件正在转码，请稍后点击预览");
          }
        })
      },
      //5 如何下载
      downloadFile(item) {
        fileApi.download({ fileId: item.id }, "filedownload");
      },
      //获取文件
      getFiles() {
        fileApi.getFileListByFolderId({
          folderId: this.projectId,
          taskName: this.uploadObj.taskName,
        }).then((res) => {
          this.$emit("update", { obj: this.obj, value: res.data })
        })
      },
        //上传
      async afterRead(event) {
        // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
        let lists = [].concat(event.file)
        for (let i = 0; i < lists.length; i++) {
        //   console.log(lists[i], "lists[i]")
          const result = await this.uploadFilePromise(lists[i].url, lists[i]).catch(() => { })
        }
      },
      //上传文件请求
      uploadFilePromise(url, fileObj) {
        let BASE_URL = apiConfig.VUE_APP_BASE_API  //测试
        let path = "";
        // BASE_URL = apiConfig.VUE_APP_BASE_API  //测试
        path = BASE_URL + `/v1/base/file/applet/uploadFileDes`;//`/v1/base/file/uploadFileDes`;
  
        return new Promise((resolve, reject) => {
          uni.uploadFile({
            url: path, // 仅为示例，非真实的接口地址
            filePath: url,
            name: 'file',
            header: {
              Authorization: "Bearer " + uni.getStorageSync('token'),
            },
            formData: {//参数
              folderId: this.projectId,
              taskName: this.uploadObj.taskName,
              fileDes: fileObj.name
            },
            success: (res) => {
                this.$refs.toast.primary({msg:"上传成功!"})
                let data = JSON.parse(res.data)
                this.uploadObj.detail.push(data.data)
                this.getFiles()
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
  
  <style lang="scss">
  .box {
    background-color: #fff;
    // padding: 0rpx 0px 20rpx;
  
    .myrow-box {
      margin: 10rpx 26rpx;
      padding-left: 0rpx;
      padding-top: 10rpx;
      padding-bottom: 10rpx;
      border-bottom: 1rpx solid #E7E6E4;
  
      &:last-child {
        border-bottom: none;
      }
    }
  }
  
  
  
  .pubrow {
    position: relative;
    font-size: 28rpx;
    line-height: 40rpx;
    margin-bottom: 16rpx;
    clear: both;
    display: flex;
  
    .tit {
      padding-right: 20rpx;
      float: left;
      color: #909399;
      height: 100%;
      min-width: 4em;
      width: 160rpx;
    }
  
    .txt {
      float: left;
      color: #303133;
    }
  
    .download,
    :active {
      color: #409eff;
    }
  }
  </style>
  