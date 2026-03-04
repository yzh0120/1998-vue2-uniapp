<template>
  <div>
    <div class="panel" :class="addType">
      <div class="panel-heading" @click="bodyHandle">
        <div>
          <!-- <slot name="header">{{ title }}</slot> -->
          <uni-row>
            <uni-col :span="22">
              <slot name="header">{{ title }}</slot>
            </uni-col>
            <uni-col :span="2">
              <u-icon name="arrow-up" v-if="showBody"></u-icon>
              <u-icon name="arrow-down" v-else></u-icon>
            </uni-col>
          </uni-row>
        </div>
      </div>
      <div :class="[`panel-body`, bodybgc ? `bodybgc` : ``]" v-if="showBody">
        <slot></slot>
      </div>
    </div>
  </div>
</template>
<!-- 
	defaul 
	primary
	success
	info
	warning
	danger
	 -->
<script>
export default {
  props: {
    bodybgc: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "primary",
    },
    close: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    "close": {
      handler() {
        if (this.close) {
          this.showBody = false
        }
      },
      immediate: true
    },
  },
  computed: {
    addType() {
      return "panel-" + this.type;
    },
  },
  data() {
    return {
      showBody: true,
    };
  },
  created() {
    // if (!this.open) {
    //   this.showBody = false;
    // }
    // if (this.open) {

    // } else { 
    //   this.showBody = false;
    // }
  },
  methods: {
    bodyHandle() {
      this.showBody = !this.showBody;
    },
  },
};
</script>

<style scoped lang="scss">
$fanwei: 5rpx;
$--primary: #409eff !default;
$--success: #67c23a !default;
$--warning: #e6a23c !default;
$--danger: #f56c6c !default;
$--info: #909399 !default;

.panel {
  margin: 0 0rpx 36rpx 0rpx;
  // margin-bottom: 20rpx;
  background-color: #fff;
  border: 2rpx solid transparent;
  border-radius: 4rpx;
  // -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  //box-shadow: red 10px 10px 1px; //rgba(0, 0, 0, 0.05)

  &.panel-default {
    border-color: #ddd;

    // box-shadow: #ddd 0px 0px $fanwei;
    >.panel-heading {
      color: #333;
      background-color: #f5f5f5;
      border-color: #ddd;
    }
  }

  &.panel-primary {
    border-color: white; //#D02135;
    border-bottom: 1rpx solid white; //#D02135;
    >.panel-heading {
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      font-size: 32rpx;
      color: #303133;
      line-height: 40rpx;
      font-style: normal;
      text-transform: none;
    }
  }
  &.panel-primary2 {
    border-color: white; //#D02135;
    border-bottom: 1rpx solid white; //#D02135;
    >.panel-heading {
      background-color: #C9F6C8 ;
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      font-size: 32rpx;
      color: #303133;
      line-height: 40rpx;
      font-style: normal;
      text-transform: none;
    }
  }
  &.panel-primary3 {
    border-color: white; //#D02135;
    border-bottom: 1rpx solid white; //#D02135;
    >.panel-heading {
      background-color: #F6C8C8  ;
      font-family: PingFang SC, PingFang SC;
      font-weight: 500;
      font-size: 32rpx;
      color: #303133;
      line-height: 40rpx;
      font-style: normal;
      text-transform: none;
    }
  }


  &.panel-success {
    border-color: #d6e9c6;

    // box-shadow: #d6e9c6 0px 0px $fanwei;
    >.panel-heading {
      color: #3c763d;
      background-color: #dff0d8;
      border-color: #d6e9c6;
    }
  }

  &.panel-info {
    border-color: #DCDFE6;

    // box-shadow: #bce8f1 0px 0px $fanwei;
    >.panel-heading {
      color: #4E5969;
      background-color: #ECF5FF;
      border-color: #DCDFE6;
    }
  }

  &.panel-warning {
    border-color: #faebcc;

    // box-shadow: #faebcc 0px 0px $fanwei;
    >.panel-heading {
      color: #8a6d3b;
      background-color: #fcf8e3;
      border-color: #faebcc;
    }
  }

  &.panel-danger {
    border-color: #ebccd1;

    // box-shadow: #ebccd1 0px 0px $fanwei;
    >.panel-heading {
      padding: 15rpx 15rpx;
      color: #a94442;
      background-color: #f2dede;
      border-color: #ebccd1;
    }
  }

  .panel-heading {
    padding: 36rpx 15rpx;
    border-bottom: 2rpx solid transparent;
    // border-top-left-radius: rpx;
    // border-top-right-radius: 3px;

    // display: flex;
    // justify-content: space-between;
  }

  .panel-body {
    padding: 20rpx;
  }

  .bodybgc {
    background-color: #F0F0F0;
  }
}
</style>
