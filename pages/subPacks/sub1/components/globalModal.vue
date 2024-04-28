<template>
  <div>
    <u-button @click="base">基础使用</u-button>
    <u-button @click="cancel">带取消</u-button>
    <u-button @click="cb">回调函数</u-button>
    <u-button @click="asyncClose">异步关闭</u-button>
  </div>
</template>

<script>
  export default {
    data(){
      return {

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
