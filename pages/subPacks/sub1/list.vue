<!--
 * @Author: yz
 * @Date: 2023-02-06 14:52:03
 * @Description: 
 * 
-->
<!--
 * @Author: yz
 * @Date: 2023-02-06 14:52:03
 * @Description: 
 * 
-->
<template>
  <div>
    <!-- <u-list @scrolltolower="scrolltolower">
      <u-list-item v-for="(item, index) in list" :key="index">
        <u-cell :title="item.name"></u-cell>
      </u-list-item>
    </u-list> -->

    <u-cell-group>
      <u-cell @click="go(item.url)" :isLink="true" icon="setting-fill" :title="item.name" v-for="(item, index) in list" :key="index"></u-cell>
    </u-cell-group>

  </div>
</template>

<script>

export default {
  data() {
    return {
      list: [
        { name: "下拉框", url: "uni-ui-select" },
        { name: "标题栏", url: "uni-ui-section" },
        { name: "dropdown", url: "dropdown" },
        { name: "panel", url: "panel" },
        { name: "forms", url: "forms" },
        { name: "全局模态框", url: "globalModal" },
        { name: "提示", url: "alert" },
        { name: "toast", url: "toast" }
      ]
    }
  },
  methods: {
    go(url) { 
      uni.navigateTo({
        url : `/pages/subPacks/sub1/components/${url}`
      })
    }
  },
}
</script>

<style lang="scss" >

</style>
