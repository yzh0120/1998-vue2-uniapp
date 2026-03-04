<template>
  <div>
    <uni-section :title="text" type="line"></uni-section>
    <div class="box">
      <bhc style="" v-for="(item, index) in arr" :item="item" :key="index"></bhc>
    </div>
    <footc></footc>
  </div>
</template>

<script>
import bhc from "@/subPages/switch/components/components/bhc"
import footc from "@/components/footc"
import * as userApi from '@/api/index.js'
export default {
  components: {
    bhc,
    footc
  },
  options: {
    styleIsolation: 'shared' // 允许样式穿透
  },
  data() {
    return {
      arr: [],
      text: '',
    }
  },
  mounted() {
        //#ifdef WEB
        this.getAppSession()
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
        },500)
      } else { 
        this.getAppSession()
      }
    },
    getAppSession() {
      this.$fn.dataItem_list("king_kong_district").forEach((e, index) => {
        if (e.value == 2) {
          this.text = e.text;
          this.arr = JSON.parse(e.remark).businessItems || [];
        }
      });
      // userApi.getUserInfo().then(res => {
      // })
    },
  },
}
</script>

<style lang="scss" scoped>
// page{
// 	margin: 36rpx;
// }
::v-deep {
  .uni-section .uni-section-header__content .distraction {
    font-size: 32rpx !important;
    color: #303133 !important;
    font-weight: bold;
  }
}
</style>
