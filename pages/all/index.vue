<!--
 * @Author: yz
 * @Date: 2023-02-06 14:52:03
 * @Description: 
 * 
-->
<template>
  <div>
  </div>
</template>

<script>
export default {
  onLoad() {
    console.log("页面加载")
   },
  onShow() {
    console.log("页面在页面栈最前面")
    // uni.navigateTo({
		// 					// url: '/pages/subPacks/sub1/list'
    //           url:"pages/all/home"
    // })
    uni.switchTab({
      url:"/pages/all/home"
    })
   },
  onHide() { 
    console.log("页面隐藏")
  },
  onUnload() { 
    console.log("页面卸载")
  },
}
</script>

<style lang="scss" >

</style>
