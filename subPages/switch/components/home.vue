<template>
  <view class="container">
    <image class="top-section" style="width: 100vw;" src="@/subPages/switch/static/top.png"></image>
    <image src="@/subPages/switch/static/text.svg" class="textIcon"></image>

    <view class="top" v-if="fb1[0]">
      <view class="topItem1" @tap="navigateTo(fb1[0].route)">
        <view class="iconText1">
          <image :src="require(`@/subPages/switch/static/${fb1[0].iconKey}`)" style="width: 100rpx;height: 100rpx;"
            mode="aspectFit">
          </image>
          <view>{{ fb1[0].text }}</view>
        </view>
      </view>

      <view class="topItem2">
        <view class="item2" @tap="navigateTo(fb1[1].route, 'baohan')"
          style=" background: linear-gradient(to bottom right, #87C8FF, #2E7DF3);">
          <view class="iconText1">
            <image :src="require(`@/subPages/switch/static/${fb1[1].iconKey}`)" style="width: 100rpx;height: 100rpx;"
              mode="aspectFit">
            </image>
            <view>{{ fb1[1].text }}</view>
          </view>
        </view>
        <view class="item2" @tap="navigateTo(fb1[2].route)"
          style=" background: linear-gradient(to bottom right, #FFAD81, #FF4512);">
          <view class="iconText1">
            <image :src="require(`@/subPages/switch/static/${fb1[2].iconKey}`)" style="width: 100rpx;height: 100rpx;"
              mode="aspectFit">
            </image>
            <view>{{ fb1[2].text }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 功能按钮区域 -->
    <view class="function-section">
      <view class="function-grid">
        <view v-for="(item, index) in fb2" v-if="fb2.length" :key="item.text">
          <view class="function-item" @tap="navigateTo(item.route, item.text)">
            <view class="function-icon">
              <image :src="require('../static/' + item.iconKey)" mode="aspectFit"></image>
            </view>
            <view class="function-text">{{ item.text }}</view>
          </view>
        </view>
      </view>
    </view>

    <!-- 活动中心 -->
    <uni-section class="title" title="公告中心" type="line" style="margin-top: 30rpx;"></uni-section>
    <swiper class="activity-content" circular :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval"
      :duration="duration">
      <swiper-item v-for="item in activity" :key="item.path">
        <image :src="require(`@/subPages/switch/static/active${item.url}.png`)" @click="navigateTo(item.path, 'active')"
          mode="scaleToFill"></image>
      </swiper-item>
    </swiper>

    <!-- 保函申请区域 -->
    <uni-section class="title1" :title="text" type="line"></uni-section>
    <view>
      <bhc style="width: 100%; " v-for="(item, index) in arr" :key="index" :item="item"></bhc>
    </view>

    <footc></footc>
  </view>
</template>

<script>
import footc from "@/components/footc";
import apiConfig from '@/utils/ip.js';
import bhc from "@/subPages/switch/components/components/bhc"
export default {
  components: {
    footc,
    bhc,
  },
  options: {
    styleIsolation: 'shared' // 允许样式穿透
  },
  data() {
    return {
      currentTab: 'home',
      indicatorDots: true,
      autoplay: true,
      interval: 2000,
      duration: 500,
      activity: [
        { url: '1', path: 'introduce', },
        { url: '2', path: 'companyIndroduce' },
      ],
      arr: [],//保函申请
      fb1: [],//前三个大功能模块
      fb2: [],
      text: '',
    }
  },
  mounted() {
    //#ifdef WEB
    this.getFb()
    //#endif

    //#ifdef MP-WEIXIN
    this.setTimeDataItem();
    //#endif

  },

  methods: {
    setTimeDataItem() {
      if (this.$store.state.gm.dataItemFlag == false) {
        setTimeout(() => {
          this.setTimeDataItem();
        }, 500)
      } else {
        this.getFb()
      }
    },
    getFb() {
      // console.log(this.$store.state.gm.dataItem ,"数字字典")
      // return 

      this.$fn.dataItem_list("king_kong_district").forEach((e, index) => {
        if (e.value == 1) {
          const list = JSON.parse(e.remark).menuItems;
          this.fb1 = list.slice(0, 3) || [];
          this.fb2 = list.slice(3, list.length) || [];
        } else if (e.value == 2) {
          this.text = e.text;
          this.arr = JSON.parse(e.remark).businessItems || [];
        }
      });
    },

    // 功能按钮导航
    async btnClick() {
      let res = await uni.showModal({
        title: "提示",
        content: " 确认联系在线客服吗？",
        confirmText: "确定",
        cancelText: "取消"
      })
      console.log(res, "res")
      if (res.confirm) {
        //#ifdef WEB
        window.open("https://work.weixin.qq.com/kfid/kfc5a0f7ae35c4a1d7a")
          //#endif
        //#ifdef MP-WEIXIN
        wx.openCustomerServiceChat({
          extInfo: { url: 'https://work.weixin.qq.com/kfid/kfc5a0f7ae35c4a1d7a' },
          corpId: apiConfig.corpId,
          success(res) {
            console.log(res, "1")
          },
          fail(res) {
            // console.log(res,"1")
            uni.showModal({
              title: '错误提示2', //提示标题
              content: `${res.errMsg}`, //提示内容
              showCancel: false, //是否显示取消按钮
              success: function (res) {
              }
            })
          },
        });
        //#endif
      }
    },

    navigateTo(page, text) {
      if (text == '在线客服') {
        this.btnClick();
      } else if (text == '更多') {
        uni.showToast({
          title: '敬请期待~',
          icon: 'none'
        });
      } else if (text == 'active') {
        uni.navigateTo({
          url: `/subPages/center/${page}`,
        });
      } else if (text == 'baohan') {
        uni.switchTab({ url: '/mainPage/baohan' });
      } else {
        uni.navigateTo({
          url: page
        });
      }
    },

    // 保函申请
    applyGuarantee(type) {
      uni.$u.route('/subPages/liucheng/bank', {
        applyType: type
      });
    },

    // 切换底部标签
    switchTab(tab) {
      this.currentTab = tab;
      // 实际项目中这里会有页面跳转逻辑
      // 例如：uni.switchTab({url: `/pages/${tab}/index`})
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  position: relative;
  display: flex;
  flex-direction: column;
}

.top {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: -300rpx;
  gap: 25rpx;
}

.textIcon {
  width: 245rpx;
  height: 100rpx;
  position: relative;
  top: -300rpx;
  left: 464rpx;
}

.topItem1 {
  width: 92%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 240rpx;
  border-radius: 16rpx;
  box-shadow: 8rpx 8rpx 9rpx #cacaca;
  background: linear-gradient(to bottom right, #FF8686, #E62D2D);
}

.iconText1 {
  color: #FFFFFF;
  font-weight: 500;
  font-size: 36rpx;
  text-align: center;
}

.topItem2 {
  width: 92%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: stretch;
  gap: 25rpx;

  image {
    width: 50%;
    height: 200rpx;
  }
}

.item2 {
  flex: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 240rpx;
  border-radius: 16rpx;
  box-shadow: 8rpx 8rpx 9rpx #cacaca;
}

.function-section {
  margin-top: 34rpx;
}

.function-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  row-gap: 28rpx;
  column-gap: 90rpx;
}

.function-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}

.function-icon {
  width: 100rpx;
  height: 100rpx;
  margin-bottom: 10rpx;
  display: flex;
  align-items: center;
  justify-content: center;
}

.function-icon image {
  width: 100%;
  height: 100%;
}

.function-text {
  font-size: 24rpx;
  font-weight: bold;
  color: #333;
  text-align: center;
}

.text {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 600rpx;
}

.guarantee-icon {
  width: 100rpx;
  height: 100rpx;
}

.guarantee-text {
  font-size: 28rpx;
  color: #1D2129;
  flex: 1;
  display: flex;
  flex-direction: column;

  .title {
    display: block;
    font-weight: bold;
    font-size: 28rpx;
    color: #1D2129;
    text-align: left;
    font-style: normal;
    text-transform: none;
  }

  .des {
    color: #4E5969;
    font-size: 24rpx;
    font-weight: 400;
    text-align: left;
  }
}

::v-deep {
  .uni-section .uni-section-header__content .distraction {
    font-size: 32rpx !important;
    color: #303133 !important;
    font-weight: bold;
  }
}

.btn {
  background-color: #d02135;
  margin-left: auto;
  width: 150rpx;
  height: 60rpx;
  font-size: 23rpx;
  line-height: 60rpx;
  text-align: center;
}

.activity-content {
  width: calc(100% - 60rpx);
  height: 320rpx;
  /* 根据图片调整 */
  margin: 20rpx auto 40rpx auto;
  border-radius: 20rpx;
}

.activity-content image {
  margin-left: 1%;
  width: 98%;
  height: 250rpx;
  display: block;
}

.title1 {
  margin-top: -80rpx;
}
</style>
