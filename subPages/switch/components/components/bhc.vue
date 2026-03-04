<template>
  <div :class="[`box`, `a${item.order}`]" @click="go">
    <div>
      <image style="width: 100rpx; height: 100rpx; " :src="require(`@/subPages/switch/static/${item.iconKey}`)">
      </image>
    </div>
    <div class="left">
      <div class="divtext">
        <text class="title">{{ item.text }}</text>
        <text class="des">{{ item.description }}</text>
      </div>
    </div>
    <!--  #ifdef  WEB -->
    <button class="btn">{{ item.buttonText }}</button>
    <!--  #endif-->
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      default: () => ({})
    },
  },
  data() {
    return {
      // src: require(`@/subPages/switch/static/1.png`)
    }
  },
  methods: {
    go(e) {
      if (uni.getStorageSync('token')) {
        // 带参数
        uni.$u.route('/subPages/liucheng/bank', {
          applyType: this.item.value
        });
      } else {
        // 带参数
        uni.$u.route('/subPages/sub1/login', {
        });
      }
      // uni.$u.route('/subPages/liucheng/bank');
      // 带参数

    },
    ff() {

    },
  },
}
</script>

<style lang="scss" scoped>
page {
  width: 100%;
}

.a1 {
  background: linear-gradient(180deg, #FFDCE1 0%, #FFFFFF 100%);
}

.a2 {
  background: linear-gradient(180deg, #FFE1D7 0%, #FFFFFD 100%);
}

.a3 {
  background: linear-gradient(180deg, #DDFFFD 0%, #FFFFFF 100%);
}

.a4 {
  background: linear-gradient(180deg, #CDE2FF 0%, #FFFFFD 100%);
}

.box {
  width: 90%;
  // margin-left: 5%;
  margin: 0 auto;
  height: 180rpx;
  display: flex;
  align-items: center;
  margin-top: 18rpx;
  padding: 20rpx;
  border-radius: 12rpx;
  border: 1px solid #f0efeff8;
  font-size: 28rpx;

  .left {
    font-size: 28rpx;
    color: #1D2129;

    .divtext {
      font-size: 28rpx;
      color: #1D2129;
      flex: 1;
      display: flex;
      flex-direction: column;
      width: 300rpx;

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

  .right {}
}
</style>
