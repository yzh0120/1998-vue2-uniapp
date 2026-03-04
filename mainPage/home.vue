<template>
  <div>
    <!-- <u-button type="primary" icon="map" text="跳转" @click="go"></u-button>
    <citycom></citycom> -->
    <!-- <image
    :showLoading="true"
    src="@/subPages/sub1/static/logo.png"
    width="80px"
    height="80px"

  ></image> -->
    <home ref="home"></home>
  </div>
</template>

<script>
// import citycom from "@/subPages/sub1/components/citycom" 
import home from "@/subPages/switch/components/home"
import * as bigIndexApi from "@/api/index"
export default {
  data() {
    return {
      scene: [],
    }
  },
  components: {
    // citycom,
    home
  },
  // 微信小程序：转发给好友的配置
  onShareAppMessage(res) {
    // res.from 可判断转发触发方式：button（自定义按钮）、menu（右上角菜单）
    return {
      title: '闪电保', // 转发标题
      path: '/mainPage/home', // 转发路径（必须是小程序内的合法路径，根路径开头）
      imageUrl: 'https://testfile-1253603100.cos.ap-guangzhou.myqcloud.com/202512/6fb2272db27b0a84bac1e0e528a6d3b0/封面_1766216356606.png' // 自定义转发图片（本地图片或网络图片，建议尺寸5:4）
    };
  },
  onLoad(options) {
    this.scene = this.urlParams(options.scene);
    console.log(this.scene, this.scene.length, "scene")
    if (this.scene.length > 0 && !uni.getStorageSync('token')) {
      uni.setStorageSync('referrerPhone', this.scene[0]);
      uni.navigateTo({
        url: '/subPages/sub1/register'
      })
    } else if (this.scene.length > 0 && uni.getStorageSync('token')) {
      uni.showToast({
        title: '您已注册，请到【我的-我的推荐码】绑定推荐人',
        icon: 'none',
        duration: 1500
      })
    }
    // bigIndexApi.listAllDictDataEnd().then((res) => {
    //   this.$store.state.gm.dataItem = res.data;
    //   this.$store.state.gm.dataItemFlag = true
    //   this.$refs.home && this.$refs.home.getFb();
    //   if (uni.getStorageSync('token')) {
    //     bigIndexApi.getUserInfo().then((res) => {
    //       this.$store.state.user.userInfo = res.data
    //     })
    //   } else {
    //   }

    // })
    // if (uni.getStorageSync('token')) {
    //   bigIndexApi.listAllDictDataEnd().then((res) => {
    //     this.$store.state.gm.dataItem = res.data
    //     bigIndexApi.getUserInfo().then((res) => {
    //       this.$store.state.user.userInfo = res.data
    //       // uni.switchTab({
    //       //   url: "/mainPage/home"
    //       // })
    //     })

    //   })
    // } else {
    //   // uni.switchTab({
    //   //   url: "/mainPage/home"
    //   // })
    // }
  },
  onShow() {
    this.collect({})
  },
  methods: {
    //处理二维码参数
    urlParams(scene) {
      if (scene) {
        const str = decodeURIComponent(scene).replace('?', '&')
        let strArr = str.split('&');
        return strArr;
      } else {
        return [];
      }
    },
    collect({ }) {
      let data = {
        // projectId: id ? id : this.bhdata.id,
        behaviorTime: this.$fn.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss"),
        behaviorType: "page_view",
        pageUrl: "mainPage/home",
        pageTitle: "首页",
        pageType: "home",
        // enterTime: this.fn.formatDate(new Date(),"yyyy-MM-dd HH:mm:ss"),
        // exitTime: this.$fn.formatDate(new Date(), "yyyy-MM-dd HH:mm:ss"),
        sourceChannel: "wechat_mini",
        // deviceType: "",
        // osType:"",
      }
      bigIndexApi.collect(data).then((res) => {

      })
    },
    go() {
      uni.navigateTo({
        url: "/subPages/sub1/demo"
      })
    },
  },
}
</script>

<style lang="scss"></style>
