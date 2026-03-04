<script>
export default {
  onLaunch: function () {
    //#ifdef WEB
    function     parseQuery(queryStr) {
      if (!queryStr) return {};
      return queryStr.split('&').reduce((obj, item) => {
        const [key, value] = item.split('=');
        obj[key] = decodeURIComponent(value || ''); // 解码中文参数
        return obj;
      }, {});
    }
      let path = '';
      let query = {};

      // 1. 区分hash/history模式
      if (window.location.hash) {
        // hash模式（默认）：解析#后的路径和参数
        const hashStr = window.location.hash.slice(1); // 去掉#，得到 /pages/detail/detail?id=123
        const [hashPath, hashQuery] = hashStr.split('?');
        path = hashPath; // 路径：/pages/detail/detail
        query = parseQuery(hashQuery); // 解析参数
      } else {
        // history模式：解析pathname和search
        path = window.location.pathname; // 路径：/pages/detail/detail
        query = parseQuery(window.location.search.slice(1)); // 解析参数（去掉?）
      }

      // 完整的H5原生路由信息
      const nativeRoute = {
        fullUrl: window.location.href, // 完整URL：https://xxx.com/#/pages/detail/detail?id=123
        path: path, // 页面路径：/pages/detail/detail
        query: query, // 参数对象：{id: '123'}
        hash: window.location.hash, // hash值（hash模式下有值）
        host: window.location.host // 域名+端口：xxx.com:8080
      };

      console.log('H5原生API获取当前路由：', nativeRoute);

    //#endif
    //#ifdef MP-WEIXIN        
    const updateManager = uni.getUpdateManager();

    updateManager.onCheckForUpdate(function (res) {
      // 请求完新版本信息的回调
      console.log(res.hasUpdate, "请求完新版本信息的回调");
      // uni.$u.toast(res.hasUpdate)
      // if(res.hasUpdate === false){
      //   uni.$u.toast("已经是最新版本了")
      // }
    });

    updateManager.onUpdateReady(function (res) {
      console.log(res, "onUpdateReady_sucess");
      // uni.$u.toast(res.version)
      uni.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success(res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate();
          } else if (res.cancel) {
            console.log('用户点击取消，不更新');
          }
        }
      });

    });

    updateManager.onUpdateFailed(function (res) {
      // uni.$u.toast(res.version + "失败")
      // 新的版本下载失败
      uni.showModal({
        title: '已经有新版本了哟~',
        content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
      })
    });
    //#endif
    
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  }
}
</script>

<style lang="scss">
/*每个页面公共css */
/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
@import "@/uni_modules/uview-ui/index.scss";

page {
  // padding-bottom: 36rpx;
  box-sizing: border-box;
  font-family: PingFang SC, PingFang SC;
  background: #F5F6FA;
}

.uni-section {
  background: #F5F6FA !important;
}

div {
  box-sizing: border-box;
}

span {
  box-sizing: border-box;
}


.boxf {
  // margin-top: 36rpx;
  padding: 10rpx 36rpx 0rpx 36rpx;
  background-color: white;
}

.flex{
  display: flex;flex-direction: column;justify-content: center;align-items: center
}
.btn {
  color: #ffffff;
  background-color: #cf2135;
  border-color: #cf2135;
}

.btn2 {
  color: #D02135;
  background-color: #FEF0F0;
  border-color: #D02135;
  border: 2rpx solid #cf2135;
}

.btn3 {
  color: #E6A23C;
  background-color: #FDF6EC;
  border-color: #E6A23C;
  border: 2rpx solid #E6A23C;
}

.a {
  font-family: PingFang SC, PingFang SC;
  font-weight: 400;
  font-size: 28rpx;
  color: #4E5969;
  line-height: 28rpx;
  text-align: center;
  font-style: normal;
  text-transform: none;
  // background-color: #F5F6FA ;
  margin: 20rpx;
}

//////////////////////////////////////////////
.uni-select.uni-select--disabled {
  background-color: #F7F6F6 !important;
  border-color: #F7F6F6 !important;
  color: black !important;
}

.uni-date-editor--x.uni-date-editor--x__disabled {
  background-color: #F7F6F6 !important;
  border-color: #F7F6F6 !important;
  color: black !important;

  .uni-date-x{
  background-color: #F7F6F6 !important;
  border-color: #F7F6F6 !important;
  color: black !important;
}
}


.uni-easyinput__content.is-disabled {
  background-color: #F7F6F6 !important;
  border-color: #F7F6F6 !important;
  color: black !important;
  .uni-easyinput__placeholder-class{
    color: black !important;
  }
}

.uni-date-editor--x__disabled,.is-disabled,.uni-select--disabled{
  opacity:1 !important;
}

.u-textarea--disabled{
  background-color: #F7F6F6 !important;
  border-color: #F7F6F6 !important;
  color: black !important;
}
.u-textarea__field{
  font-size:14px !important;
}
/*  #ifdef MP-WEIXIN  */
.deviceClass{
  .u-textarea{
    padding: 0px 10px !important;
  }
}
/*  #endif  */
//////////////////////////////////////////////
.disabled-input {
  /* 禁止用户触摸交互 */
  pointer-events: none  !important;
}

/* 覆盖组件内部内容容器的样式 */
 .disabled-input .uni-easyinput__content {
  /* 禁止溢出滚动 */
  overflow: hidden !important;
  /* 禁止文字换行（可选，若需换行则保留 white-space: normal） */
  white-space: nowrap  !important;
  /* 禁止内容被拖动（可选） */
  user-select: none  !important;
}


/* App.vue 或页面样式（去掉scoped） */
uni-modal{
  z-index: 999999 !important;
}
.uni-modal{
  z-index: 999999 !important;
}
</style>
