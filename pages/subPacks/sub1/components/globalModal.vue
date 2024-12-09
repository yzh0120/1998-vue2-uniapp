<template>
  <!-- 全局组件第三步 -->
  <div>
    <u-button @click="base">基础使用</u-button>
    <u-button @click="cancel">带取消</u-button>
    <u-button @click="cb">回调函数</u-button>
    <u-button @click="asyncClose">异步关闭</u-button>

    <!-- 自定义 -->
    <u-modal :show="show" :title="title" :content='content'>
      <template #confirmButton>
        <button type="primary" open-type="launchApp" app-parameter="wechat" @click="()=>{show = false}">返回OA</button>
        <!-- <button type="primary" open-type="launchApp" app-parameter="wechat" style="border: 1px solid transparent;position: absolute;top: 10rpx;right: 10rpx;" size="mini">返回OA</button> -->
      </template>
    </u-modal>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        show:false,
        title:"标题",
        content:"content"
      }
  },
    mounted() {
      console.log(this.$refs.gm,"globalModal")
  },
    methods: {
      base() { 
        this.$refs.gm.msg({content:"测试"})
      },
      cancel() { 
        this.$refs.gm.choose({content:"测试"})
      },
      cb() { 
        this.$refs.gm.msg({ content: "测试",cb1:"gmConfirm" })
      },
      asyncClose() {
        this.$refs.gm.asyncCloseFn({ cb1: "asyncGmConfirm"})
      },
      gmConfirm() { 
        console.log("回执")
        
      },
      asyncGmConfirm() { 
setTimeout(() => { 
          this.$refs.gm.show = false
        },500)
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>
