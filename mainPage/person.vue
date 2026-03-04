<template>
  <div>
    <person ref="person"></person>
  </div>
</template>

<script>
import person from "@/subPages/switch/components/person"
export default {
  // 微信小程序：转发给好友的配置
  onShareAppMessage(res) {
    // res.from 可判断转发触发方式：button（自定义按钮）、menu（右上角菜单）
    return {
      title: '闪电保', // 转发标题
      path: '/mainPage/home', // 转发路径（必须是小程序内的合法路径，根路径开头）
      imageUrl: 'https://testfile-1253603100.cos.ap-guangzhou.myqcloud.com/202512/6fb2272db27b0a84bac1e0e528a6d3b0/封面_1766216356606.png' // 自定义转发图片（本地图片或网络图片，建议尺寸5:4）
    };
  },
  data() {
    return {
    }
  },
  components: {
    person
  },
  mounted() {
  },
  onShow() {
    this.$refs.person && this.$refs.person.getAppSession({})
  },
  methods: {
  },
}
</script>

<style lang="scss"></style>
