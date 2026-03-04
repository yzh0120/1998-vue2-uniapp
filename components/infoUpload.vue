<template>
  <div>
    <div style="width: 100%;margin-bottom: 50rpx;" class="box" v-for="(uploadObj, index) in uploadList"
      :key="uploadObj.taskName">
      <!-- 显示 v-for="(item, index) in uploadObj.detail"-->
      <div class="myrow-box">
        <div class="pubrow">
          <text class="tit"><text v-if="uploadObj.require" style="color:red">*</text>资料名称 </text>
          <text class="txt">{{ uploadObj.name }}</text>
        </div>
        <div class="pubrow" v-if="uploadObj.desc">
          <text class="tit">注意事项</text>
          <text class="txt" style="color: red;">{{ uploadObj.desc }}</text>
        </div>
        <div class="pubrow" @click="down(uploadObj)" v-if="uploadObj.eVisaTemplateId">
          <text class="tit">下载模版</text>
          <text class="txt" style="color: #409eff;">下载</text>
        </div>
        <!-- 当前taskname 有文件的情况 -->
        <template v-if="uploadObj.detail.length">
          <div v-for="(file, fileIndex) in uploadObj.detail" :key="fileIndex">
            <div class="pubrow">
              <div class="tit">文件名称 </div>
              <div class="txt download" style="margin-left:20rpx;">
             
                <div @click="choose(file.fileurl)">{{ file.originalFilename || file.name || file.filename }}</div>
                <div v-if="canDel" @click="delFile(file.id, fileIndex, index)" style="color:red;padding-left: 20rpx;">
                  点击删除
                </div>
              </div>
            </div>

            <div class="pubrow">
              <text class="tit">上传时间</text>
              <text class="txt">{{ file.createTime | formatDate("yyyy-MM-dd HH:mm:ss") }}</text>
            </div>

            <!-- <div class="pubrow" v-if="showRemark">
            <text class="tit">备注</text>
            <text class="txt">{{ file.remarks }}</text>
          </div> -->

            <!-- <div class="pubrow" v-if="showHis">
            <text class="tit">历史文件</text>
            <text class="txt active" @click="checkHistoryFile(file)">查看历史文件</text>
          </div> -->

          </div>
        </template>
        <!-- 没有文件的情况 -->
        <template v-else>
          <div class="pubrow">
            <text class="tit">暂无文件</text>
            <text class="txt">-</text>
          </div>

        </template>
      </div>
      <!-- 显示上传按钮 -->
      <div v-if="canUpload">
        <class1 v-if="towx" :id1="projectId" :name="uploadObj.name" :taskName="uploadObj.taskName" :num="uploadObj.num" :type="uploadObj.type"></class1>
        <u-upload accept="all" @afterRead="(e) => { afterRead(e, index) }" @beforeRead="beforeRead(index)" name="1"
          use-before-read useBeforeRead multiple :maxCount="1" v-else>
          <div class="myrow-box">
            <div class="pubrow">
              <text class="tit">操作</text>
              <text class="txt" style="color: #409eff;">{{ loading[index] ? `上传中勿重复点击` : `点击上传` }}</text>
            </div>
          </div>

        </u-upload>
      </div>
    </div>
  </div>
</template>

<script>
import apiConfig from '@/utils/ip.js';
import * as fileApi from "@/api/file.js"
import class1 from "./class1.vue"
export default {
  components:{
    class1
  },
  props: {
    towx: {
      type: Boolean,
      default: false
    },
    url: {
      type: [String],
      default: "",
    },
    canUpload: {
      type: Boolean,
      default: true
    },
    canDel: {
      type: Boolean,
      default: true
    },
    //公司名字
    companyName: {
      type: String,
      default: "",
    },
    //项目编号
    projectId: {
      type: String,
      default: "",
    },
    //信息
    uploadList: {
      type: Array,
      default: () => [],
    },
    //等于uploadObj的变量的字符串
    obj: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      loading: this.uploadList.map(() => false)
    }
  },
  mounted() {
    this.uploadList.forEach((item, index) => {
      this.getFiles(index);
    })
  },

  watch: {
    projectId: {
      handler(newVal, oldVal) {
        if (newVal) {
          this.uploadList.forEach((item, index) => {
            this.getFiles(index);
          })
        }
      },
      deep: true,
    }

  },

  methods: {
    check() {
      let checkOK = true;
      try {
        this.uploadList.forEach((item) => {
          if (item.required || item.require) {
            if (!item.detail[0]) {
              // this.$message.error(`请上传${item.name}`);
              uni.$u.toast(`请上传${item.name}`)
              checkOK = false;
              throw new Error("EndIterative");
            }
          }
        });
      } catch (e) {
        if (e.message != "EndIterative") throw e;
      }
      if (!checkOK) {
        return false;
      } else {
        return true;
      }
    },
    down(item) {
      let data = {
        params: { projectId: this.projectId, templateId: item.eVisaTemplateId }
      }
      fileApi.miniReplaceTemplateByWord(data).then((res) => {
        if (res.data) {
          let fileurl = res.data
          // eleFileApi.downloadFile(fileUrl, item.name);
          fileApi.download_url({ downurl: fileurl })
        }
      })
    },
    beforeRead(index) {
      if (this.loading[index]) {
        uni.$u.toast("文件未上传完成")
        return false
      }
    },
    //1 上传
    async afterRead(event, index) {
      // uni.setStorageSync('token', '96fa43aefe4142b0a627a28cfade1059')
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file)
      for (let i = 0; i < lists.length; i++) {
            //#ifdef WEB
            const result = await this.uploadFilePromise(lists[i].name, lists[i], index).catch(() => { })
            //#endif

            //#ifdef MP-WEIXIN
            const result = await this.uploadFilePromise(lists[i].url, lists[i], index).catch(() => { })
            //#endif
        
        
      }
    },
    //2 上传文件请求
    async uploadFilePromise(filePath, fileObj, index) {
      let that = this
      var extIndex = filePath.lastIndexOf('.');
      var fileExt = extIndex >= -1 ? filePath.substr(extIndex + 1) : '';
      if (this.uploadList[index].type && !this.uploadList[index].type.includes(fileExt)) {
        return uni.$u.toast(`请上传正确的文件类型${this.uploadList[index].type}`)
      }
      if (this.uploadList[index].detail.length >= this.uploadList[index].num) {
        return uni.$u.toast(`最大文件数量${this.uploadList[index].num}`)
      }
      let size = fileObj.size / 1024 / 1024
      if (size > 50) {
        return uni.$u.toast(`最大文件不可超过50M`)
      }
      if (fileObj.name.length > 30) {
        return uni.$u.toast(`文件名不可超过30字`)
      }
      this.$set(this.loading, index, true)
      // 传入文件后缀名，服务端生成带签名的 url 获取签名
      this.getAuthorization({ ext: fileExt }, function (AuthData) {
        // 确认 AuthData 格式是否正确
        // 请求用到的参数
        var prefix = 'https://' + AuthData.serverUrl; // 请求 url
        ///////////////////////
        let tempArr = fileObj.name.split(".")
        tempArr[tempArr.length - 2] = `${tempArr[tempArr.length - 2]}_${new Date().getTime()}`
        let tempKey = tempArr.join(".")
        /////////////////////////
        var key = `${AuthData.key}${tempKey}`//AuthData.key;///AuthData.cosKey; // 让服务端来决定文件名更安全
        var formData = {
          key: key,
          success_action_status: 200,
          'Content-Type': '',
          'q-sign-algorithm': AuthData.qsignAlgorithm,///AuthData.qSignAlgorithm,
          'q-ak': AuthData.qak,
          'q-key-time': AuthData.qkeyTime,
          'q-signature': AuthData.qsignature,
          policy: AuthData.policy,
        };
        if (AuthData.securityToken)
          formData['x-cos-security-token'] = AuthData.securityToken;
        that.postFile({ prefix, filePath, key, formData, AuthData, fileObj, index });
      }, index);
    },
    camSafeUrlEncode(str) {
      return encodeURIComponent(str)
        .replace(/!/g, '%21')
        .replace(/'/g, '%27')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\*/g, '%2A');
    },
    // 获取签名
    getAuthorization(options, callback, index) {
      let data111 = {
        key: `${new Date().getTime()}`,
        expireTime: 60 * 1,
        maxSize: 1024 * 1024 * 1024
      }
      // this.loading[index] = true;
      //this.$set(this.loading, index, true)
      uni.request({
        header: {
          'Authorization': 'Bearer ' + uni.getStorageSync('token') // 在这里设置你的token
        },
        method: 'POST',
        // 替换为自己服务端地址 获取 post 上传签名
        url: `${apiConfig.url}/infra/file/uploadSign?ext=` + options.ext,
        dataType: 'json',
        data: data111,
        success: function (result) {
          var data = result.data;
          if (data) {
            callback(data.data);///callback(data);
          } else {
            uni.showModal({
              title: '临时密钥获取失败',
              content: JSON.stringify(data),
              showCancel: false,
            });
          }
        },
        error: function (err) {
          uni.showModal({
            title: '临时密钥获取失败',
            content: JSON.stringify(err),
            showCancel: false,
          });
        },
      });
    },
    //上传
    postFile({ prefix, filePath, key, formData, AuthData, fileObj, index }) {
      var that = this
      var requestTask = uni.uploadFile({
        url: prefix,
        name: 'file',
        filePath: filePath,
        formData: formData,
        success: function (res) {
          var url = prefix + '/' + that.camSafeUrlEncode(key).replace(/%2F/g, '/');
          if (res.statusCode === 200) {
            // uni.showModal({ title: '上传成功', content: url, showCancel: false });
            //同步到mxh
            that.createFile({ prefix, filePath, key, formData, AuthData, fileObj, index })
          } else {
            uni.showModal({
              title: '上传失败',
              content: JSON.stringify(res),
              showCancel: false,
            });
          }
        },
        fail: function (res) {
          uni.showModal({
            title: '上传失败',
            content: JSON.stringify(res),
            showCancel: false,
          });
        },
      });
      requestTask.onProgressUpdate(function (res) {
      });
    },
    //3同步到mxh
    createFile({ prefix, filePath, key, formData, AuthData, fileObj, index }) {
      // if (this.uploadObj.coverStar == undefined || this.uploadObj.coverStar == 'undefined') {
      //     this.uploadObj.coverStar = true;
      //   }
      let data = {
        fileUrl: `${AuthData.domain}/${key}`,
        key: key,
        fileSize: fileObj.size,
        filename: fileObj.name,
        oldName: fileObj.name,
        folderId: this.projectId,
        filenameCode: this.uploadList[index].taskName,
        companyName: this.companyName,
        coverStar: this.uploadList[index].coverStar === true ? true : false
      }
      let header = {
        // 'content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + uni.getStorageSync('token')
      }
      let url = "createFile"
      if (this.url) {
        url = this.url
      }
      fileApi[url](data, { header: header }).then(() => {
        // this.loading[index] = false
        this.$set(this.loading, index, false)
        // this.$refs.toast.primary({msg:"上传成功!"})
        uni.$u.toast("上传成功!")
        // let data = JSON.parse(res.data)
        // this.uploadObj.detail.push(data.data)
        this.getFiles(index)
      }).catch(() => {
        // this.loading[index] = false
        this.$set(this.loading, index, false)
      })
    },
    //4获取文件
    getFiles(index) {
      if (this.projectId) {
        fileApi.fileGetList({
          folderId: this.projectId,
          filenameCode: this.uploadList[index].taskName,
        }).then((res) => {
          this.uploadList[index].detail = res.data;
          this.$emit("updatefile", { index: index, value: res.data })
        })
      }

    },
    //
    //删除文件
    async delFile(id, index, listIndex) {
      let res = await uni.showModal({
        title: "提示",
        content: "确认删除此文件?",
        confirmText: "确定",
        cancelText: "取消"
      })

      if (res.confirm) {
        fileApi.fileDelete({}, { params: { id: id } }).then((res) => {
          // console.log(res,"res---")
          // if (res.code === 0) {
          //   // this.$refs.toast.primary({ msg: "成功!" })
          //   uni.$u.toast("成功!")
          //   this.$emit("delfile", { obj: this.obj, value: index })
          //   // this.uploadObj.detail.splice(index, 1);
          // } else {
          //   // this.$refs.toast.error({ msg: "失败!" })
          //   uni.$u.toast("失败!")
          // }

          uni.$u.toast("成功!", listIndex, index)
          this.$emit("delfile", { listIndex: listIndex, value: index })

        })
      }
    },
    async choose(fileurl) {
      let res = await uni.showModal({
        title: "提示",
        content: "确认下载吗",
        confirmText: "下载",
        cancelText: "取消"
      })

      // console.log(res,"res")
      if (res.confirm) {
        fileApi.download_url({ downurl: fileurl })
      } else if (res.cancel) {
        // fileApi.download_url({ downurl: fileurl })
      }
    },
  },
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
  // clear: both;
  display: flex;

  .tit {
    padding-right: 20rpx;
    // float: left;
    color: #909399;
    height: 100%;
    width: 200rpx;
  }

  .txt {
    flex-grow:0;
    display: flex;
    flex-wrap: wrap;
    // float: left;
    color: #303133;
  }

  .download,
  :active {
    color: #409eff;
  }
}
</style>
