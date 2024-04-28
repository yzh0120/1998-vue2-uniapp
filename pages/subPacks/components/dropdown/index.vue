<!--
 * @Author: yz
 * @Date: 2023-02-07 11:06:34
 * @Description: 
 * 
-->
<template>
  <div>
    
    <tit :titData="alldata.titData" @titToggle="titToggle"></tit>
    <item v-for="(item, index) in alldata.itemObj" :key="index" :list="item.list" :index="index"
      :isShow="alldata.titData[index].arrowUp" :item="item" @closeAll="closeAll" @select="select" @check="check"></item>
  </div>
</template>

<script>
import tit from "./tit.vue"
import item from "./item.vue"
export default {
  components: {
    tit,
    item
  },
  props: {
    alldata: {
      type: Object,
      default: () => { 
        return {}
      }
    }
  },
  data() {
    return {
      valueObj: {},
      
    }
  },
  methods: {
    check(e) {
      // this.$emit("check",e)
      this.alldata.itemObj[e.index].list = e.list
      this.$emit("upalldata",this.alldata)
    },
    //select
    select(e) { 
      this.$set(this.valueObj, e.field, e.value)
      console.log(this.valueObj)
    },
    //关闭所有
    closeAll() {
      this.alldata.titData.forEach((e) => {
        e.arrowUp = false
      })
      this.$emit("upalldata",this.alldata)
    },
    //标题切换
    titToggle(e) {
      let temp = !this.alldata.titData[e.index].arrowUp
      this.alldata.titData.forEach((e) => {
        e.arrowUp = false
      })
      this.alldata.titData[e.index].arrowUp = temp

      this.$emit("upalldata",this.alldata)
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
