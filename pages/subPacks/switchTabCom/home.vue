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
import * as userApi from "@/pages/subPacks/api/user"
export default {
  data() {
    return {
      list: [
        { name: "子包1", url: "list" },
      ]
    }
  },
  mounted() {
    userApi.login({userName:"system", password:"123456"}).then((res) => {
      console.log(res,"0090909")
    })
  },
  methods: {
    go(url) { 
      uni.navigateTo({
        url : `/pages/subPacks/sub1/${url}`
      })
    }
  },
}
</script>

<style lang="scss" >

</style>
