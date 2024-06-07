<template>
  <div>
    <u-button @click="uToast" type="primary">uToast</u-button>
    <!-- <u-button @click="showLoading">uni.showLoading 显示loading 提示框,</u-button>
    <u-button @click="showModal">uni.showModal 显示模态弹窗</u-button> -->
  </div>
</template>

<script>
export default {
  methods: {
    uToast() { 
      this.$refs.toast.$refs.uToast.show({
        type: 'default',
						title: '默认主题',
						message: "锦瑟无端五十弦",
						// iconUrl: 'https://cdn.uviewui.com/uview/demo/toast/default.png'
      })
      this.$refs.toast.success({msg:"123"})
      //uni.$u.toast(123123)
    },
  },
}
</script>

<style lang="scss" scoped></style>
