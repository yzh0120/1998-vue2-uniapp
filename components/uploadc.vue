<template>
  <div style="width: 100%;margin-bottom: 50rpx;" class="box">
    <!-- 显示 v-for="(item, index) in uploadObj.detail"-->
    <div class="myrow-box">
      <div class="pubrow">
        <text class="tit">资料名称<text v-if="uploadObj.require" style="color:red">*</text></text>
        <text class="txt">{{ uploadObj.name }}</text>
      </div>
      <div class="pubrow" @click="down(file)" v-if="uploadObj.eVisaTemplateId">
        <text class="tit">下载模版</text>
        <text class="txt" style="color: #409eff;">下载</text>
      </div>
      <!-- 当前taskname 有文件的情况 -->
      <template v-if="uploadObj.detail.length">
        <div v-for="(file, fileIndex) in uploadObj.detail" :key="fileIndex">
          <div class="pubrow">
            <div class="tit">文件名称 </div>
            <div class="txt download" style="display: flex;flex-wrap: wrap;">
              <div v-if="canDel" @click="delFile(file.id, fileIndex, file)" style="color:red;margin-right: 20rpx;">点击删除
              </div>
              <div @click="choose(file.fileurl)">{{ file.originalFilename || file.name || file.filename }}</div>
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
      <u-upload accept="all" @afterRead="(e) => { afterRead(e) }" @beforeRead="beforeRead" name="1" multiple
        :maxCount="1">
        <div class="myrow-box">
          <div class="pubrow">
            <text class="tit">操作</text>
            <text class="txt" style="color: #409eff;">{{ loading ? `上传中勿重复点击` : `点击上传` }}</text>
          </div>
        </div>

      </u-upload>
    </div>
  </div>
</template>

<script>
import apiConfig from '@/utils/ip.js';
import * as fileApi from "@/api/file.js"
export default {
  props: {
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
      type: [String],
      default: "",
    },
    //项目编号
    projectId: {
      type: [String],
      default: "",
    },
    //信息
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
  data() {
    return {
      // dataArr: [],
      loading: false
    }
  },
  mounted() {
    this.getFiles()//获取文件
  },
  methods: {
    down(item) {
      console.log(item)
      let data = {
        params: { keyValue: this.projectId, templateId: this.uploadObj.eVisaTemplateId, fileCode: "" }
      }
      fileApi.replaceTemplateSave({}, data).then((res) => {
        this.loading = false;
        if (res.data) {
          let fileurl = res.data.fileurl;
          // eleFileApi.downloadFile(fileUrl, item.name);
          fileApi.download_url({ downurl: fileurl })
        }
      })
    },
    beforeRead() {
      console.log(this.loading, "this.loading")
      if (this.loading) {
        return uni.$u.toast("文件未上传完成")
      }
    },
    //1 上传
    async afterRead(event) {
      console.log(this.loading, "this.loading2")
      // uni.setStorageSync('token', '96fa43aefe4142b0a627a28cfade1059')
      // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
      let lists = [].concat(event.file)
      for (let i = 0; i < lists.length; i++) {
        console.log(lists[i], "lists[i]")
        const result = await this.uploadFilePromise(lists[i].url, lists[i]).catch(() => { })
      }
    },
    //2 上传文件请求
    async uploadFilePromise(filePath, fileObj) {
      let that = this
      var extIndex = filePath.lastIndexOf('.');
      var fileExt = extIndex >= -1 ? filePath.substr(extIndex + 1) : '';
      console.log(fileExt, "fileExt")
      if (this.uploadObj.type && !this.uploadObj.type.includes(fileExt)) {
        return uni.$u.toast(`请上传正确的文件类型${this.uploadObj.type}`)
      }
      if (this.uploadObj.detail.length >= this.uploadObj.num) {
        return uni.$u.toast(`最大文件数量${this.uploadObj.num}`)
      }
      // 传入文件后缀名，服务端生成带签名的 url 获取签名
      this.getAuthorization({ ext: fileExt }, function (AuthData) {
        // 确认 AuthData 格式是否正确
        console.log(AuthData, "data111");
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
        console.log(prefix, filePath, key, formData, "canshu")
        that.postFile({ prefix, filePath, key, formData, AuthData, fileObj });
      });
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
    getAuthorization(options, callback) {
      let data111 = {
        key: `${new Date().getTime()}`,
        expireTime: 60 * 1,
        maxSize: 1024 * 1024 * 1024
      }
      this.loading = true
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
    postFile({ prefix, filePath, key, formData, AuthData, fileObj }) {
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
            that.createFile({ prefix, filePath, key, formData, AuthData, fileObj })
          } else {
            uni.showModal({
              title: '上传失败',
              content: JSON.stringify(res),
              showCancel: false,
            });
          }
          console.log(res.header['x-cos-request-id']);
          console.log(res.statusCode);
          console.log(url);
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
        console.log('正在进度:', res);
      });
    },
    //3同步到mxh
    createFile({ prefix, filePath, key, formData, AuthData, fileObj }) {
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
        filenameCode: this.uploadObj.taskName,
        companyName: this.companyName,
        coverStar: this.uploadObj.coverStar === true ? true : false
      }
      // this.dataArr.push(data)
      let header = {
        // 'content-type': 'multipart/form-data',
        'Authorization': 'Bearer ' + uni.getStorageSync('token')
      }
      let url = "createFile"
      if (this.url) {
        url = this.url
      }
      fileApi[url](data, { header: header }).then(() => {
        this.loading = false
        // this.$refs.toast.primary({msg:"上传成功!"})
        uni.$u.toast("上传成功!")
        // let data = JSON.parse(res.data)
        // this.uploadObj.detail.push(data.data)
        this.getFiles()
      }).catch(() => {
        this.loading = false
      })
    },
    //4获取文件
    getFiles() {
      if (this.projectId || this.companyName) {
        fileApi.fileGetList({
          folderId: this.projectId,
          filenameCode: this.uploadObj.taskName,
          companyName: this.companyName
        }).then((res) => {
          console.log(res, "res.data")
          this.$emit("updatefile", { obj: this.obj, value: res.data })
        })
      }

    },
    //
    //删除文件
    async delFile(id, index, file) {
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
          let fileurl = file.fileurl
          // let index = this.dataArr.findIndex((e) => { 
          //   return e.fileurl === fileurl
          // })
          // this.dataArr.splice(index,1)
          uni.$u.toast("成功!")
          this.$emit("delfile", { obj: this.obj, value: index })

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
