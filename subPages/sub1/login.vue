<template>
  <view class="container">
    <view :style="{ height: `${statusBarHeight}px`, 'background-color': ' #cf2135' }"></view>
    <view :style="{
      height: `${barHeight}px`,
      'line-height': `${barHeight}px`,
      'text-align': 'center',
      'color': '#fff',
      'font-size': '26rpx',
      'background-color': ' #cf2135'
    }">
      <view class="back-btn" @tap="handleBack">
        <image src="./static/left.svg" class="back-icon"></image>
      </view>
      <text>登录</text>
    </view>

    <image :showLoading="true" style="width: 100vw;" src="@/subPages/sub1/static/logo.png"></image>

    <!-- 登录内容区域 -->
    <view class="content">
      <view class="login-tabs">
        <view class="tab-item" :class="{ active: activeTab === 'account' }" @tap="switchTab('account')">
          账号密码登录
        </view>
        <view class="tab-item" :class="{ active: activeTab === 'sms' }" @tap="switchTab('sms')">
          短信验证码登录
        </view>
      </view>

      <!-- 账号密码登录表单 -->
      <view class="login-form">
        <view v-if="activeTab === 'account'" class="form-content">
          <view class="input-group">
            <u-input class="input-field" type="number" placeholder="请输入账号" v-model="loginForm.username" border="none" />
          </view>
          <view class="input-group code-group">
            <u-input class="input-field code-input" v-model="loginForm.password" :password="!showPassword"
              placeholder="请输入密码" border="none">
              <template slot="suffix">
                <u-icon :name="showPassword ? 'eye-fill' : 'eye-off'" @click="togglePassword" size="28"></u-icon>
              </template>
            </u-input>
          </view>

          <view class="forgot-password">
            <text @click="toPassword">忘记密码?</text>
          </view>
        </view>

        <!-- 短信验证码登录表单 -->
        <view v-if="activeTab === 'sms'" class="form-content">
          <view class="input-group">
            <input class="input-field" type="number" placeholder="请输入手机号" v-model="smsForm.mobile" />
          </view>
          <view class="input-group code-group">
            <input class="input-field code-input" type="number" placeholder="请输入验证码" v-model="smsForm.code" />
            <button class="code-btn" :disabled="countdown > 0" @tap="getSmsCode">
              {{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}
            </button>
          </view>
        </view>

        <!-- 隐私协议 -->
        <view class="privacy-agreement">
          <view class="checkbox" @tap="toggleAgreement">
            <view class="checkbox-icon" :class="{ checked: agreementChecked }">
              <text v-if="agreementChecked" class="checkmark">✓</text>
            </view>
            <view class="agreement-text">我已阅读并同意
              <text style="color: red;" @click="getFile" catchtouchmove="preventD">《民信惠用户隐私协议》</text>
            </view>
          </view>
        </view>

        <!-- 登录按钮 -->
        <view class="login-btn" :class="{ 'noCheck': !agreementChecked }" @click="handleLogin" type="primary">
          立即登录
        </view>
      </view>


      <view class="bottom-section">
        <view class="register-link">
          <text>还没有账号?</text>
          <text class="register-text" @click="toResigter">立即注册</text>
          <!-- <button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">微信注册测试</button> -->
        </view>

      </view>

      <!-- #ifdef MP-WEIXIN -->
      <button v-if="!agreementChecked" @click="showAgreementTip" class="phone-btn icon-btn">
        <image :src="require(`@/subPages/sub1/static/wechat.svg`)" class="img-icon"></image>
        <text class="btn-text" style="color: #07c160;">微信登录</text>
      </button>

      <button v-else open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" class="phone-btn icon-btn">
        <image :src="require(`@/subPages/sub1/static/wechat.svg`)" class="img-icon"></image>
        <text class="btn-text" style="color: #07c160;">微信登录</text>
      </button>
      <!-- #endif-->
    </view>
  </view>
</template>

<script>
import * as userApi from './api/user'
import * as bigIndexApi from "@/api/index"
import * as fileApi from '@/api/file'
export default {
  data() {
    return {
      activeTab: 'account',
      loginForm: {
        username: '',
        password: '',
        captchaVerification: '',
        socialType: '',
        socialCode: '',
        code: '',
        socialState: '',
      },
      smsForm: {
        mobile: '',
        code: '',
      },
      showPassword: false,
      agreementChecked: false,
      countdown: 0,
      url: '',
      wechatCode: null,
      phoneObj: {},
      statusBarHeight: 0,
      barHeight: 0,
    }
  },
  mounted() {
    this.getList();
  },

  onLoad() {
    this.initNavigationHeight();
  },

  methods: {
    initNavigationHeight() {
      this.statusBarHeight = uni.getSystemInfoSync().statusBarHeight;
      // #ifdef H5
      this.barHeight = 44;
      //#endif

      //#ifdef MP-WEIXIN
      const { top, height } = wx.getMenuButtonBoundingClientRect();
      this.barHeight = height ? height + (top - this.statusBarHeight) * 2 : 38;
      // #endif
    },

    handleBack() {
      // 完全自定义的返回逻辑
      uni.switchTab({
        url: '/mainPage/home'
      });
    },
    showAgreementTip() {
      uni.showToast({ title: '请先同意用户隐私协议', icon: 'none' })
    },

    // 获取用户手机号
    getPhoneNumber(e) {
      console.log('chufa1')
      this.phoneObj = e
      if (e.detail.errMsg == "getPhoneNumber:ok") {                // 用户允许或去手机号
        this.wxlogin()
      }

    },
    async wxlogin() {
      if (!this.agreementChecked) {
        uni.showToast({
          title: '请先同意用户协议',
          icon: 'none'
        })
        return
      }
      let that = this //保存当前作用域
      // 展示加载框
      uni.showLoading({
        title: '加载中',
      });
      uni.login({ //直接用这个调用微信接口
        onlyAuthorize: true,
        success: function (response) { // 用微信登录的话就要去微信开发工具
          console.log("获取微信code")
          console.log(response) //这里打印就说明接口调用成功了，然后看message login ：ok
          //微信登录就完了，后面就是获取用户信息
          that.wechatCode = response.code
          // console.log(e.detail, "e.detail.")
          let data = {
            rawData: that.phoneObj.detail.rawData,
            signature: that.phoneObj.detail.signature,
            encryptedData: that.phoneObj.detail.encryptedData,
            iv: that.phoneObj.detail.iv,
            code: that.wechatCode
          }
          userApi.wxLogin(data).then((res) => {
            uni.setStorageSync("token", res.data.accessToken);
            bigIndexApi.getUserInfo().then((res) => {
              that.$store.state.user.userInfo = res.data
              uni.$u.toast("登录成功",)
              uni.switchTab({
                url: '/mainPage/home'
              })
            })
          }).catch((err) => {
            let str = err.msg ? err.msg : err.info
            // uni.$u.toast(str)
            //   uni.showModal({
            //   title: '错误提示2', //提示标题
            //   content: `${str}`, //提示内容
            //   showCancel: true, //是否显示取消按钮
            //   success: function (res) {
            //     if (res.confirm) { //confirm为ture，代表用户点击确定
            //       console.log('点击了确定按钮');
            //     } else if (res.cancel) { //cancel为ture，代表用户点击取消
            //       console.log('点击了取消按钮');
            //     }
            //   }
            // })
            if (err.msg && err.msg.includes("注册")) {
              uni.navigateTo({
                url: '/subPages/sub1/register'
              })
            }
          })
          console.log(data, "data")

        }
      });
    },
    //测试微信手机号
    handleGetPhoneNumber(e) {
      console.log('授权事件回调:', e);
      if (e.detail.errMsg !== 'getPhoneNumber:ok') {
        uni.showToast({ title: '授权失败', icon: 'none' });
        return;
      }
      const { code } = e.detail;
      // uni.request({
      //   url: '你的服务器域名/api/loginByPhone',
      //   method: 'POST',
      //   data: { code },
      //   success: (res) => {
      //     console.log('登录成功:', res.data);
      //     uni.showToast({ title: '登录成功' });
      //   }
      // });
    },



    getList() {
      // bigIndexApi.listAllDictDataEnd().then((res) => {
      //   this.$store.state.gm.dataItem = res.data;
      //   this.$store.state.gm.dataItemFlag = true
      // })
    },

    switchTab(tab) {
      this.activeTab = tab
    },

    toResigter() {
      uni.navigateTo({
        url: '/subPages/sub1/register'
      })
    },

    toPassword() {
      uni.navigateTo({
        url: '/subPages/sub1/password'
      })
    },

    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    toggleAgreement() {
      this.agreementChecked = !this.agreementChecked
    },

    // 获取短信验证码
    getSmsCode() {
      if (!this.smsForm.mobile) {
        uni.showToast({
          title: '请输入手机号',
          icon: 'none'
        })
        return
      } else {
        let data = {
          name: this.smsForm.mobile,
          scene: 24,
        }
        userApi.sendSms(data).then(res => {
          if (res.data) {
            uni.showToast({
              title: '验证码已发送',
              icon: 'success'
            })
            this.countdown = 60
            const timer = setInterval(() => {
              this.countdown--
              if (this.countdown <= 0) {
                clearInterval(timer)
              }
            }, 1000)
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
      }
    },

    getFile() {
      this.$fn.dataItem_list("info_file_url").forEach((e, index) => {
        if (e.text == "用户服务协议") {
          this.url = e.remark;
          fileApi.download_url_pre({ downurl: e.remark }).then((res) => {
            console.log(res, 'res');
          });
        }
      })
    },


    // 处理登录
    handleLogin() {
      if (!this.agreementChecked) {
        uni.showToast({
          title: '请先同意用户协议',
          icon: 'none'
        })
        return
      }
      if (this.activeTab === 'account') {
        if (!this.loginForm.username || !this.loginForm.password) {
          uni.showToast({
            title: '请输入账号和密码',
            icon: 'none'
          })
          return
        }
        let data = {
          "username": this.loginForm.username,
          "password": this.loginForm.password,
        };
        userApi.login(data).then((res) => {
          if (res.data) {
            uni.setStorageSync("token", res.data.accessToken);
            uni.setStorageSync("expiresTime", res.data.expiresTime);
            // bigIndexApi.listAllDictDataEnd().then((res) => {
            //   this.$store.state.gm.dataItem = res.data
            //   this.$store.state.gm.dataItemFlag = true
            //   bigIndexApi.getUserInfo().then((res) => {
            //     this.$store.state.user.userInfo = res.data
            //     uni.showToast({
            //       title: '登录成功',
            //       icon: 'success'
            //     })
            //     uni.switchTab({
            //       url: '/mainPage/home'
            //     })
            //   })
            // })
            uni.showToast({
              title: '登录成功',
              icon: 'success'
            })
            uni.switchTab({
              url: '/mainPage/home'
            })
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
      } else {
        if (!this.smsForm.mobile || !this.smsForm.code) {
          uni.showToast({
            title: '请输入手机号和验证码',
            icon: 'none'
          })
          return
        }
        userApi.loginBySms(this.smsForm).then((res) => {
          if (res.data) {
            uni.setStorageSync("token", res.data.accessToken);
            uni.setStorageSync("expiresTime", res.data.expiresTime);
            // bigIndexApi.listAllDictDataEnd().then((res) => {
            //   this.$store.state.gm.dataItem = res.data
            //   this.$store.state.gm.dataItemFlag = true
            //   bigIndexApi.getUserInfo().then((res) => {
            //     this.$store.state.user.userInfo = res.data
            //     uni.showToast({
            //       title: '登录成功',
            //       icon: 'success'
            //     })
            //     uni.switchTab({
            //       url: '/mainPage/home'
            //     })
            //   })
            // })
            uni.showToast({
              title: '登录成功',
              icon: 'success'
            })
            uni.switchTab({
              url: '/mainPage/home'
            })
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none'
            })
          }
        })
      }

    },
  },
}
</script>

<style lang="scss" scoped>
.back-btn {
  position: absolute;
  left: 0rpx;
  width: 80rpx;
  height: 80rpx;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.back-icon {
  width: 36rpx;
  height: 36rpx;
}

.aaa {
  position: absolute;
  bottom: 50rpx;
  left: 50%;
  transform: translateX(-50%);
  // width: 750rpx;
  display: flex;
  justify-content: center;

  .wx {
    width: 60px;
    height: 80px;
    // background-color: red;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .top {}

    .bottom {
      color: #909399;
      font-size: 20rpx;
      margin-top: 6rpx
    }
  }
}

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  background-color: #fff;
  border-top-left-radius: 30rpx;
  border-top-right-radius: 30rpx;
  position: relative;
  top: -30rpx;
  padding: 40rpx 50rpx;
  display: flex;
  flex-direction: column;
}

.login-tabs {
  display: flex;
  border-bottom: 2rpx solid #f0f0f0;
  margin-bottom: 50rpx;
}

.tab-item {
  flex: 1;
  text-align: center;
  padding: 20rpx 0;
  font-size: 32rpx;
  color: #666;
  position: relative;

  &.active {
    color: #e60012;
    font-weight: bold;

    &::after {
      content: '';
      position: absolute;
      bottom: -2rpx;
      left: 50%;
      transform: translateX(-50%);
      width: 80rpx;
      height: 4rpx;
      background-color: #e60012;
      border-radius: 2rpx;
    }
  }
}

.input-group {
  position: relative;
  margin-bottom: 40rpx;
  border-bottom: 1rpx solid #e0e0e0;
  padding-bottom: 20rpx;
}

.input-field {
  width: 100%;
  height: 60rpx;
  font-size: 30rpx;
  padding: 0;
  border: none;
  outline: none;
}


.code-group {
  display: flex;
  align-items: center;
}

.code-input {
  flex: 1;
}

.code-btn {
  background-color: #f8f8f8;
  border-radius: 8rpx;
  padding: 12rpx 20rpx;
  font-size: 24rpx;
  color: #e60012;
  margin-left: 20rpx;

  &:disabled {
    color: #999;
    background-color: #f0f0f0;
  }
}

.forgot-password {
  text-align: right;
  margin-top: 10rpx;
  margin-bottom: 30rpx;

  text {
    font-size: 26rpx;
    color: #e60012;
  }
}

.privacy-agreement {
  margin: 40rpx 0 60rpx;
}

.checkbox {
  display: flex;
  align-items: center;
}

.checkbox-icon {
  width: 32rpx;
  height: 32rpx;
  border: 2rpx solid #ccc;
  border-radius: 6rpx;
  margin-right: 15rpx;
  display: flex;
  align-items: center;
  justify-content: center;

  &.checked {
    border-color: #e60012;
    background-color: #e60012;
  }
}

.checkmark {
  color: #fff;
  font-size: 24rpx;
  font-weight: bold;
}

.agreement-text {
  font-size: 26rpx;
  color: #666;
}

.login-btn {
  width: 100%;
  height: 88rpx;
  background-color: #e60012;
  color: #fff;
  border-radius: 44rpx;
  font-size: 32rpx;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.login-btn.u-btn.noCheck {
  background-color: #818181 !important;
  color: #818181 !important;
}

.noCheck {
  background-color: #f0f0f0 !important;
  color: #ccc !important;
}

.bottom-section {
  margin-top: 40rpx;
  text-align: center;
}


.register-link {

  text {
    font-size: 28rpx;
    color: #666;
  }

  .register-text {
    color: #e60012;
    margin-left: 10rpx;
  }
}

/////////
/// 
/* pages/phone/phone.wxss */
/* 1. 清除原生 button 默认样式（关键） */
.phone-btn {
  /* 清除默认边框/背景 */
  border: none;
  margin-top: 50rpx;
  background: none;
  /* 清除默认内边距 */
  padding: 0;
  /* 清除默认圆角 */
  border-radius: 0;
  /* 去除点击高亮 */
  -webkit-tap-highlight-color: transparent;
  height: 150rpx;
}

/* 2. 自定义按钮主体样式 */
.phone-btn::after {
  /* 清除小程序 button 自带的伪元素边框 */
  border: none;
}

.img-icon {
  width: 80rpx;
  height: 80rpx;
  display: block;
}

.icon-btn {
  /* 调整布局，适配图标+文字 */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 12rpx;
  /* 图标与文字间距 */
}

.btn-icon {
  /* 图标样式微调 */
  display: block;
}

.btn-text {
  margin-top: -32rpx;
  /* 文字单独样式（可选） */
  font-size: 28rpx;
}
</style>
