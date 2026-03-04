<template>
  <div class="box">
    <u-steps :current="computed_active" activeColor="#D02135">
      <u-steps-item :error="bhdata.financialAuditStatus == -1">
        <text
          :class="[`slot-icon`, computed_active === 0 ? `activeColor` : (computed_active > 0 ? `preactiveColor` : ``)]"
          slot="icon" @click="go(0)">1</text>
        <div slot="desc">
          <div class="item" @click="go(0)">
            <div :class="[`title`, computed_active >= 0 ? `activeColor_title` : ``]">
              {{ titleFn(0) }}
            </div>
            <div :class="[`desc`, computed_active >= 0 ? `activeColor_desc` : ``]">
              {{ descFn(0) }}
            </div>
          </div>
        </div>
      </u-steps-item>

      <u-steps-item :error="bhdata.financialAuditStatus == -1">
        <text
          :class="[`slot-icon`, computed_active === 1 ? `activeColor` : (computed_active > 1 ? `preactiveColor` : ``)]"
          slot="icon" @click="go(1)">2</text>
        <div slot="desc">
          <div class="item" @click="go(1)">
            <div :class="[`title`, computed_active >= 1 ? `activeColor_title` : ``]">
              {{ titleFn(1) }}
            </div>
            <div :class="[`desc`, computed_active >= 1 ? `activeColor_desc` : ``]">
              {{ descFn(1) }}
            </div>
          </div>
        </div>
      </u-steps-item>

      <u-steps-item :error="bhdata.financialAuditStatus == -1">
        <text
          :class="[`slot-icon`, computed_active === 2 ? `activeColor` : (computed_active > 2 ? `preactiveColor` : ``)]"
          slot="icon" @click="go(2)">3</text>
        <div slot="desc">
          <div class="item" @click="go(2)">
            <div :class="[`title`, computed_active >= 2 ? `activeColor_title` : ``]">
              {{ titleFn(2) }}
            </div>
            <div :class="[`desc`, computed_active >= 2 ? `activeColor_desc` : ``]">
              {{ descFn(2) }}
            </div>
          </div>
        </div>
      </u-steps-item>

      <u-steps-item :error="bhdata.financialAuditStatus == -1">
        <text
          :class="[`slot-icon`, computed_active === 3 ? `activeColor` : (computed_active > 2 ? `preactiveColor` : ``)]"
          slot="icon" @click="go(3)">4</text>
        <div slot="desc">
          <div class="item" @click="go(3)">
            <div :class="[`title`, computed_active >= 3 ? `activeColor_title` : ``]">
              {{ titleFn(3) }}
            </div>
            <div :class="[`desc`, computed_active >= 3 ? `activeColor_desc` : ``]">
              {{ descFn(3) }}
            </div>
          </div>
        </div>
      </u-steps-item>
    </u-steps>
  </div>
</template>

<script>
import { union } from 'xe-utils'

export default {
  props: {
    active: {
      type: Number,
      default: 0
    },
    bhdata: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  options: {
    styleIsolation: 'shared', // 解除样式隔离
  },
  computed: {
    computed_active() {
      return this.active
    }
  },
  data() {
    return {

    }
  },
  methods: {
    go(index) {
      // console.log("事件")
      if (index > this.computed_active) {
        uni.$u.toast("不是历史流程")
      } else if (index == this.computed_active) {
        this.$emit("clearlook")
      } else {
        this.$emit("look", { index: index })
      }
    },
    titleFn(index) {
      let str = ''
      if (index === 0) {
        str = "填写项目信息"
      }
      if (index === 1) {
        str = "金融机构审核"
      }
      if (index === 2) {
        str = "支付保费"
      }
      if (index === 3) {
        str = "开具保函"
      }
      // if (index === this.computed_active) {
      //   return str
      // } else {
      //   return ""
      // }
      return str
    },
    descFn(index) {
      // if (this.bhdata.financialAuditStatus == -1) {
      //   return "失败"
      // }else if (index < this.computed_active) {
      //   return "已完成"
      // } else if (index == this.computed_active){
      //   return "进行中"
      // }else {
      //   return "待完成"
      // }
      if (index < this.computed_active) {
        return "已完成"
      } else if (index == this.computed_active) {

        if (this.bhdata.financialAuditStatus == -1) {
          return "待跟进"
        } else if (this.bhdata.guaranteeStatus == 2) {
          return "已完成"
        }
        else {
          return "进行中"
        }


      } else {
        return "待完成"
      }

    },
  },
}
</script>

<style lang="scss">
.box {
  background-color: white;
  padding: 20rpx 0rpx 20rpx 0rpx;

  ::v-deep {
    .u-steps-item__wrapper {
      // background-color: #F5F6FA !important;
    }
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #909399;

    .title {
      font-size: 24rpx;

    }

    .activeColor_title {
      color: #D02135;
      ;
    }

    .activeColor_desc {
      color: #D02135;
      ;
    }

    .desc {
      font-size: 20rpx;
    }
  }

  .slot-icon {
    width: 30rpx;
    /* 圆圈的宽度 */
    height: 30rpx;
    /* 圆圈的高度 */
    border: 2rpx solid #909399;
    /* 边框的宽度、样式和颜色 */
    border-radius: 50%;
    /* 使得边框变成圆形 */
    background-color: transparent;
    /* 背景颜色设为透明 */
    color: #909399;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 20rpx;
  }

  .activeColor {
    background-color: #D02135 !important;
    border-color: #D02135 !important;
    color: white !important;
  }

  .preactiveColor {
    background-color: transparent !important;
    /* 背景颜色设为透明 */
    color: #D02135 !important;
    border-color: #D02135 !important;
  }
}
</style>
