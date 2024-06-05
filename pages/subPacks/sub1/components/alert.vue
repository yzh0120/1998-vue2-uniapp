<template>
  <div>
    <u-button @click="showToast">uni.showToast 消息提示框</u-button>
    <u-button @click="showLoading">uni.showLoading 显示loading 提示框,</u-button>
    <u-button @click="showModal">uni.showModal 显示模态弹窗</u-button>
  </div>
</template>

<script>
export default {
  methods: {
    showToast() {
      //https://zh.uniapp.dcloud.io/api/ui/prompt.html
      //uni.hideToast()
      uni.showToast({
        title: '标题',
        duration: 2000
      });
    },
    showLoading() {
      //需主动调用 uni.hideLoading 才能关闭提示框。
      uni.showLoading({
        title: '加载中',
        success: () => {
          setTimeout(() => {
            uni.hideLoading()
          }, 2 * 1000)
        }
      });
    },
    showModal() {
      uni.showModal({
        title: '提示',
        content: '这是一个模态弹窗',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          } else if (res.cancel) {
            console.log('用户点击取消');
          }
        }
      });
    },
  },
}
</script>

<style lang="scss" scoped></style>
