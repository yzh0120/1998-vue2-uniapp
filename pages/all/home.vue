<template>
  <div class="home">
    {{ title }}
    <homecom></homecom>
  </div>
</template>

<script>
import homecom from '@/pages/subPacks/components/home'
export default {
  computed: {
    //vuex不能直接在页面上 只能通过计算属性展示
    title() { 
      return  this.$store.state.gm.title
    }
  },
  data() { 
    return {

    }
  },
  onLoad() { 
    const app = getApp()//获取APP.vue
    console.log(app,"app")
    console.log(app.globalData,"app.globalData")//获取APP.globalData
    app.alert()//调用APP.vue的methods的方法
    //
    let pages = getCurrentPages()
    console.log(pages,"pages")
  },
  components: {
    homecom
  }
}
</script>

<style lang="scss" scoped>
//修改组件内的样式 外面只能包个当前组件的类型
.home{
  ::v-deep{

  }
}
</style>
