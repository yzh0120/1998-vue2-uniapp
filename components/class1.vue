<template>
    <view class="container">
      <view class="title">uniapp H5 跳转小程序（微信内）</view>
  
      <!-- 仅在微信内置浏览器显示跳转按钮 -->
      <view v-if="isWechat" class="jump-btn-wrap">
        <wx-open-launch-weapp
          id="launch-weapp"
          :username="miniProgramOriginId"
          :path="miniProgramPath"
        >
          <!-- <script type="text/wxtag-template">
            <style>
              .weapp-btn {
                padding: 14px 32px;
                background: #07c160;
                color: #fff;
                border: none;
                border-radius: 8px;
                font-size: 16px;
                font-weight: 500;
                cursor: pointer;
              }
            </style>
            <button class="weapp-btn">立即进入小程序</button>
          </script> -->
          <template>
            <button style="width: 200px; height: 45px; text-align: center; font-size: 17px; display: block; margin: 0 auto; padding: 8px 24px; border: none; border-radius: 4px; background-color: #07c160; color:#fff;">打开小程序</button>
          </template>
        </wx-open-launch-weapp>
      </view>
  
      <!-- 非微信环境提示（可选，简化版可删除） -->
      <view v-else class="tips">
        <text>请在微信中打开本页面，体验小程序跳转功能</text>
      </view>
    </view>
  </template>
  
  <script>
  export default {
    name: 'WeappJumpPage',
    props:{
        id1:{
            type:String,
            default:""
        },
        name:{
            type:String,
            default:""
        },
        taskName:{
            type:String,
            default:""
        },
        num:{
            type:String,
            default:""
        },
        type:{
            type:String,
            default:""
        },
        // id:{
        //     type:String,
        //     default:""
        // },
        // id:{
        //     type:String,
        //     default:""
        // },
        // id:{
        //     type:String,
        //     default:""
        // },
    },
    data() {
      return {
        ua:"",
        isWechat: false, // 是否为微信内置浏览器
        miniProgramOriginId: 'gh_f0286ed60427', // 小程序原始ID（gh_开头，小程序后台获取）
        miniProgramPath: `/mainPage/index?id1=${this.id1}&name=${this.name}&taskName=${this.taskName}&num=${this.num}&type=${this.type}` // 跳转的小程序页面（带参数）
      }
    },
    mounted() {
        // alert(1)
      // 页面加载时判断环境
      this.isWechat = true//this.checkWechatEnv()
      // 仅在微信环境初始化JS-SDK
      if (this.isWechat) {
        this.initWxJsSdk()
      }
    },
    methods: {
      // 1. 判断是否为微信内置浏览器
      checkWechatEnv() {
        // console.log(navigator,"navigator")
        // this.ua = navigator.userAgent.toLowerCase()
        // var ua = navigator.userAgent.toLowerCase()
        // var isWXWork = ua.match(/wxwork/i) == 'wxwork'
        // var isWeixin = !isWXWork && ua.match(/micromessenger/i) == 'micromessenger'

        // return isWeixin
        const ua = navigator.userAgent.toLowerCase()
        // 排除企业微信，只匹配个人微信
        return ua.includes('micromessenger') && !ua.includes('wxwork')
      },
  
      // 2. 初始化微信JS-SDK（核心）
      async initWxJsSdk() {
        try {
          // 步骤1：获取当前页面URL（关键：去掉#后的hash，否则签名失败）
        //   const currentUrl = encodeURIComponent(window.location.href.split('#')[0])
        //   console.log()
          // 步骤2：请求后端获取微信签名配置（替换为你的后端接口）
        //   const [err, res] = await uni.request({
        //     url: '/api/wx/getJsSdkConfig', // 后端接口地址
        //     method: 'GET',
        //     data: { url: currentUrl }
        //   })
          
        //   if (err || res.data.code !== 200) {
        //     throw new Error('获取微信配置失败')
        //   }
        //   const wxConfig = res.data.data
        const wxConfig ={
            appId: 'wx4105c0c288da69f4', // <!-- replace -->
            timestamp: 0, // 必填，填任意数字即可
            nonceStr: 'nonceStr', // 必填，填任意非空字符串即可
            signature: 'signature', // 必填，填任意非空字符串即可
            // jsApiList: ['chooseImage'], // 必填，随意一个接口即可 
        }
  
          // 步骤3：动态加载微信JS-SDK（避免重复加载）
          console.log(wx,"wx1")
        //   console.log(wx.config,"wx")
          if (!wx) {
            await this.loadScript('https://res.wx.qq.com/open/js/jweixin-1.6.0.js')
          }
        //   uni.showToast({ title: '动态加载微信JS-SDK成功', icon: 'none' })
        uni.showToast({ title:  wx.config + "", icon: 'none' })
          // 步骤4：初始化JS-SDK
          wx.config({
            debug: false, // 生产环境改为false
            appId: wxConfig.appId, // 公众号AppID（不是小程序的）
            timestamp: wxConfig.timestamp, // 后端生成的时间戳
            nonceStr: wxConfig.nonceStr, // 后端生成的随机字符串
            signature: wxConfig.signature, // 后端生成的签名
            jsApiList: [], // 普通接口无需配置
            openTagList: ['wx-open-launch-weapp'] // 必须声明要使用的开放标签
          })
  
          // JS-SDK初始化成功
          wx.ready(() => {
            console.log('JS-SDK初始化成功，可跳转小程序')
          })
  
          // JS-SDK初始化失败
          wx.error((err) => {
            console.error('JS-SDK初始化失败：', err)
            // uni.showToast({ title: '跳转配置失败', icon: 'none' })
          })
        } catch (error) {
          console.error('初始化失败：', error)
        //   uni.showToast({ title: error, icon: 'none' })
        }
      },
  
      // 3. 动态加载JS脚本（加载微信SDK）
      loadScript(src) {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script')
          script.src = src
          script.onload = resolve
          script.onerror = reject
          document.head.appendChild(script)
        })
      }
    }
  }
  </script>
  
  <style scoped>
  .container {
    padding: 30px 20px;
    text-align: center;
  }
  .title {
    font-size: 20px;
    color: #333;
    margin-bottom: 40px;
  }
  .jump-btn-wrap {
    margin: 0 auto;
    width: 80%;
  }
  .tips {
    font-size: 14px;
    color: #999;
    margin-top: 40px;
  }
  </style>