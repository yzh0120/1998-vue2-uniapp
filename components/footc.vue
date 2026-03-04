<template>
  <!--  :style="{marginTop: num + 'rpx'}" -->
  <div class="box" @click="go">
    <div class="fgh" >
      深圳市民信惠融资担保有限公司
    </div>
  </div>

</template>

<script>
import * as fileApi from "@/api/file.js"
export default {
  props: {
    num: {
      type: String,
      default: "20"
    },
  },
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    go() { 
      // fileApi.download_url({ downurl:"https://bid-guarantee.szcgc.com/resources/2022/04/123456.zip" })
      uni.$u.route('/mainPage/test', {
        });
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  // position: absolute;
  // bottom: 60rpx;
  margin-top: 60rpx;
  display: flex;
  justify-content: center;
  // width: 678rpx; //100%;

  .fgh {
    margin: 0 auto;
    color: #B1B3B8;
    font-size: 24rpx;
  }
}
</style>
