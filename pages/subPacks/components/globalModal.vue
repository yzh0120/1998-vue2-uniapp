<!--
 * @Author: yz
 * @Date: 2023-02-19 14:59:43
 * @Description: 
 * 
-->
<!--
 * @Author: yz
 * @Date: 2023-02-19 14:59:43
 * @Description: 
 * 
-->
<template>
  <div>
    <u-modal :show="show" :title="title" :content='content' :asyncClose="asyncClose" @confirm="innerConfirm" @cancel="innerCancel" :showCancelButton="showCancelButton"></u-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cb1: false,//确认函数
      cb2: false,//取消函数
      asyncClose:false,//异步关闭
      
      show: false,//展示
      title: '标题',
      content: '',
      showCancelButton:false,//显示取消按钮
    }
  },
//   computed:{
// 			title(){
// 				return this.$store.state.gm.title
// 			}
// },
  methods: {
    msg(obj = {}) { 
      this.show = true
      obj.title && (this.title = obj.title);
      obj.content && (this.content = obj.content);
      obj.cb1 && (this.cb1 = obj.cb1);
      obj.cb2 && (this.cb2 = obj.cb2);
    },
    choose(obj = {}) { 
      this.show = true
      this.showCancelButton = true
      obj.title && (this.title = obj.title);
      obj.content && (this.content = obj.content);
      obj.cb1 && (this.cb1 = obj.cb1);
      obj.cb2 && (this.cb2 = obj.cb2);
    },
    asyncCloseFn(obj = {}) { 
      this.show = true
      this.asyncClose = true
      this.showCancelButton = true
      obj.title && (this.title = obj.title);
      obj.content && (this.content = obj.content);
      obj.cb1 && (this.cb1 = obj.cb1);
      obj.cb2 && (this.cb2 = obj.cb2);
      
    },





    innerConfirm() { 
      if (this.cb1) { 
        this.$parent[this.cb1]()
      }
      if (this.asyncClose) {
        Object.assign(this.$data, this.$options.data(), {show:true})
      } else { 
        Object.assign(this.$data, this.$options.data())
      }
      
     
     
    },
    innerCancel() { 
      if (this.cb2) { 
        this.$parent[this.cb2]()
      }
      Object.assign(this.$data, this.$options.data())
     
      
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
