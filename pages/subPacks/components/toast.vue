<template>
  <div>
    <u-toast ref="uToast"></u-toast>
  </div>
</template>

<script>
  export default {
    methods: {
      default(obj = {}) { 
        this.$refs.uToast.show({
          type: 'default',
          message: obj.msg,
          iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/default.png'
        })
      },
      success(obj = {}) { 
        this.$refs.uToast.show({
          type: 'success',
          message: obj.msg,
          iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/success.png'
        })
      },
      error(obj = {}) { 
        this.$refs.uToast.show({
          type: 'error',
          message: obj.msg,
          iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/error.png'
        })
      }
    },
  }
</script>

<style lang="scss" scoped>

</style>
