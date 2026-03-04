<template>
  <view class="container">
    <image :showLoading="true" src="@/subPages/sub1/static/logo.png" style="width: 100%;"></image>

    <!-- 登录内容区域 -->
    <view class="content">
      <view class="register-title">新用户注册</view>

      <u-form :model="formData" ref="registerForm" label-width="190rpx">
        <u-form-item prop="realName" label="姓名">
          <u-input v-model="formData.realName" placeholder="请输入姓名" border="none" clearable />
        </u-form-item>

        <u-form-item prop="mobile" label="手机号">
          <u-input v-model="formData.mobile" type="number" placeholder="请输入手机号" border="none" clearable />
        </u-form-item>

        <u-form-item prop="code" label="短信验证码">
          <u-input v-model="formData.code" placeholder="请输入短信验证码" border="none" clearable />
          <template slot="right">
            <button class="code-btn" :disabled="countdown > 0" @tap="getSmsCode">
              {{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}
            </button>
          </template>
        </u-form-item>

        <u-form-item prop="password" label="输入密码">
          <u-input v-model="formData.password" :password="!showPassword" placeholder="请输入密码" border="none">
            <template slot="suffix">
              <u-icon :name="showPassword ? 'eye-fill' : 'eye-off'" @click="togglePassword" size="28"></u-icon>
            </template>
          </u-input>
        </u-form-item>

        <u-form-item prop="confirmPassword" label="确认密码">
          <u-input v-model="formData.confirmPassword" :password="!showPassword" placeholder="请输入密码" border="none" />
        </u-form-item>
        <u-form-item prop="referrerPhone" label="推荐人手机号">
          <u-input v-model="formData.referrerPhone" placeholder="请输入推荐人手机号" border="none" :disabled="show" />
        </u-form-item>
      </u-form>

      <!-- 密码规则提示 -->
      <view class="password-tips">
        <image src="@/subPages/sub1/static/check.png" style="width: 35rpx;height: 35rpx;"></image>
        <view>密码长度为8-20位，需包含大写字母、小写字母、数字，不允许有空格。</view>
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

      <uni-popup ref="popup" type="dialog">
        <uni-popup-dialog mode="base" :duration="2000" title="请输入图形验证码" :before-close="true" @close="close"
          @confirm="confirm">
          <view class="captcha-container">
            <uni-easyinput v-model="smsForm.code" placeholder="请输入图形验证码" :clearable="true" class="captcha-input" />
            <image class="captcha-image" :src="`data:image/gif;base64,${smsForm.url}`" @click="getImage" />
          </view>
        </uni-popup-dialog>
      </uni-popup>

      <!-- 注册按钮 -->
      <button class="register-btn" :class="{ disabled: !agreementChecked }" :disabled="!agreementChecked"
        @click="handleRegister">
        提交注册
      </button>
    </view>
  </view>
</template>

<script>
import * as userApi from '@/subPages/sub1/api/user.js';
import * as bigIndexApi from "@/api/index";
import * as fileApi from '@/api/file'
export default {
  data() {
    return {
      formData: {
        realName: '',
        mobile: '',
        code: '',
        password: '',
        confirmPassword: '',
        referrerPhone: ''
      },
      smsForm: {
        code: '',
        uuid: '',
        url: '',
      },
      // 表单验证规则
      rules: {
        realName: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const nameReg = /^[\u4e00-\u9fa5·]{2,}$/;
              if (!nameReg.test(value)) {
                callback(new Error('只能填中文，至少2个中文字符'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const phoneReg = /^1[3-9]\d{9}$/;
              if (!phoneReg.test(value)) {
                callback(new Error('请输入正确的手机号'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              const passwordReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{8,20}$/;
              if (!passwordReg.test(value)) {
                callback(new Error('密码格式不符合要求'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ],
        confirmPassword: [
          { required: true, message: '请确认密码', trigger: 'blur' },
          {
            validator: (rule, value, callback) => {
              if (value !== this.formData.password) {
                callback(new Error('两次输入的密码不一致'));
              } else {
                callback();
              }
            },
            trigger: 'blur'
          }
        ]

      },
      showPassword: false,
      agreementChecked: false,
      countdown: 0,
      show: false,
    }
  },

  onReady() {
    this.$refs.registerForm.setRules(this.rules);
    if (uni.getStorageSync('referrerPhone')) {
      this.formData.referrerPhone = uni.getStorageSync('referrerPhone');
      this.show = true;
    }
  },

  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    toggleAgreement() {
      this.agreementChecked = !this.agreementChecked
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

    getImage() {
      userApi.getcode({ type: 'char' }).then(res => {
        if (res.data) {
          this.smsForm.url = res.data.img;
          this.smsForm.uuid = res.data.uuid;
        } else {
          uni.showToast({
            title: res.message,
            icon: 'none'
          })
        }
      })
    },

    // 获取图形验证码
    getSmsCode() {
      this.$refs.registerForm.validateField('mobile', (error) => {
        if (error.length === 0) {
          userApi.getcode({ type: 'char' }).then(res => {
            if (res.data) {
              this.smsForm.url = res.data.img;
              this.smsForm.uuid = res.data.uuid;
              this.$refs.popup.open();
            } else {
              uni.showToast({
                title: res.message,
                icon: 'none'
              })
            }
          })
        }

      })
    },

    close() {
      this.$refs.popup.close()
    },

    //根据图形获取短信
    confirm() {
      let data = {
        name: this.formData.mobile,
        scene: 23,
        code: this.smsForm.code,
        uuid: this.smsForm.uuid
      };
      userApi.sendSms(data).then(res => {
        uni.showToast({
          title: '验证码已发送',
          icon: 'success'
        })
        this.$refs.popup.close();
        this.countdown = 60
        const timer = setInterval(() => {
          this.countdown--
          if (this.countdown <= 0) {
            clearInterval(timer)
          }
        }, 1000)
      }).catch(err => {
        this.getImage();
      })
    },

    // 处理注册
    handleRegister() {
      if (!this.agreementChecked) {
        uni.showToast({
          title: '请先同意用户协议',
          icon: 'none'
        })
        return
      }

      // 使用uView表单验证
      this.$refs.registerForm.validate().then(valid => {
        userApi.register(this.formData).then(res => {
          if (res.data) {
            uni.setStorageSync("token", res.data.accessToken);
            uni.setStorageSync("expiresTime", res.data.expiresTime);
            // bigIndexApi.listAllDictDataEnd().then((res) => {
            //   this.$store.state.gm.dataItem = res.data
            //   this.$store.state.gm.dataItemFlag = true
            //   bigIndexApi.getUserInfo().then((res) => {
            //     this.$store.state.user.userInfo = res.data;
            //     uni.showToast({
            //       title: '登录成功',
            //       icon: 'success'
            //     })
            //     setTimeout(() => {
            //       uni.switchTab({
            //         url: '/mainPage/home'
            //       })
            //     }, 2000);
            //   })
            // })
            uni.showToast({
              title: '登录成功',
              icon: 'success'
            })
            setTimeout(() => {
              uni.switchTab({
                url: '/mainPage/home'
              })
            }, 2000);
          } else {
            uni.showToast({
              title: res.message,
              icon: 'none'
            })
          }

        })
      }).catch(errors => {
        uni.$u.toast('请注意完善信息')
      })
    }
  }
}
</script>

<style lang="scss">
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
  top: -50rpx;
  padding: 40rpx 50rpx 0;
  display: flex;
  flex-direction: column;
}

.register-title {
  font-size: 36rpx;
  font-weight: bold;
  text-align: center;
}

/* 表单样式调整 */
.u-form {
  width: 100%;
}

.u-form-item {
  border-bottom: 1rpx solid #e0e0e0;
  padding-bottom: 20rpx;
}



/* 验证码容器 */
.captcha-container {
  padding: 20rpx 0;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10rpx;
}

.captcha-input {
  width: 65%;
  height: 90rpx;
  font-size: 28rpx;
  border: 2rpx solid #e0e0e0;
  border-radius: 8rpx;
  box-sizing: border-box;
}

.captcha-image {
  width: 35%;
  height: 76rpx;
}


.code-group {
  border-bottom: none;
  padding-bottom: 0;
}

.code-input-wrapper {
  display: flex;
  align-items: center;
  border-bottom: 1rpx solid #e0e0e0;
  padding-bottom: 20rpx;
}

.code-btn {
  background-color: #f8f8f8;
  border-radius: 8rpx;
  padding: 12rpx 20rpx;
  font-size: 24rpx;
  color: #e60012;
  margin-left: 20rpx;
  white-space: nowrap;

  &:disabled {
    color: #999;
    background-color: #f0f0f0;
  }
}

.password-tips {
  display: flex;
  flex-direction: row;
  font-size: 24rpx;
  color: #999;
  margin-top: 10rpx;
  margin-bottom: 30rpx;
  line-height: 1.5;
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

.register-btn {
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

  &.disabled {
    background-color: #f0f0f0;
    color: #ccc;
  }
}
</style>
