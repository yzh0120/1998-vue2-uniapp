<template>
  <div>\
    <div class="panel" :class="addType">
      <div class="panel-heading" @click="bodyHandle">
        <div class="flex-head">
          <div class="left">
            <slot name="header">{{title}}</slot>
          </div>
          <div class="right">
            <u-icon :name="showBody ? 'arrow-up' : 'arrow-down'" color="#fff"></u-icon>
          </div>
        </div>
      </div>
      <div class="panel-body" :style="{display:showBody==true?'block':'none'}">
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
    title: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "info",
    },
    open: {
      default: true,
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
    if (!this.open) {
      this.showBody = false;
    }
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

$--primary: white ;
$--primary-bgc: #409eff ;

$--success: white ;
$--success-bgc: #67c23a ;

$--warning: white ;
$--warning-bgc: #e6a23c ;


$--danger: white ;
$--danger-bgc: #f56c6c ;

$--info:white; //#909399 ;
$--info-bgc:#909399; //#909399 ;
.panel {
  margin-bottom: 20rpx;
  background-color: #fff;




  &.panel-primary {
	  > .panel-heading {
	    color: $--primary;
      background-color: $--primary-bgc
	  }
  }

  &.panel-success {
    // border-color: #d6e9c6;
    > .panel-heading {
      color: $--success;
      background-color: $--success-bgc;
    }
  }

  &.panel-info {
    // border-color: #DCDFE6;
    > .panel-heading {
      color: $--info;
      background-color:$--info-bgc;
    }
  }

  &.panel-warning {
    // border-color: #faebcc;
    > .panel-heading {
      color: $--warning;
      background-color: $--warning-bgc;

    }
  }

  &.panel-danger {
    // border-color: #ebccd1;
    > .panel-heading {
      color: $--danger;
      // background-color: #f2dede;
      background-color:$--danger-bgc;
      // border-color: #ebccd1;
    }
  }

  .panel-heading {
    padding: 10rpx 15rpx;
  }
  .panel-body {
    padding: 20rpx;
  }
}


.flex-head{
  display: flex;
  .left{
    flex-grow:999;
  }
  .right{
    flex-grow:0;
    flex-basis:40rpx;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
