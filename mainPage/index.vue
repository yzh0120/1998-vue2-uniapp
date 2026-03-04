<template>
  <div>
    <!-- :canUpload="!disabled" :canDel="!disabled" -->
    <infoUpload :projectId="projectId" :uploadList="uploadList" @updatefile="updatefile" @delfile="delfile" 
        ref="uploadList" v-if="projectId && uploadList.length" >
      </infoUpload>
  </div>
</template>

<script>
  import infoUpload from "@/components/infoUpload.vue"
  export default {
    components:{
      infoUpload
    },
    data(){
      return  {
        projectId:"",
        uploadList:[]
      }
    },
    onLoad(e){
      this.projectId = e.id1
      this.uploadList = [
        {
          name:e.name,// "保函格式模板",
          taskName:e.taskName,// "zdymb",
          detail: [],
          num: e.num,//1,
          require: 1,
          type: e.type ? this.fn1(e.type) : "" ,//["doc", "docx"]
        }
      ]
    },
    methods: {
      fn1(str){
        return str.split(",")
      },
      updatefile(e) {
      this.uploadList[e.index].detail = e.value
    },
    delfile(e) {
      this.uploadList[e.listIndex].detail.splice(e.value, 1);
    },
    },
  }
</script>

<style lang="scss" scoped>

</style>