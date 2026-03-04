<template>
    <div>
      <infoUpload :projectId="projectId" :uploadList="uploadList" @updatefile="updatefile" @delfile="delfile" towx
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
        this.projectId = "12312312"
        this.uploadList = [
          {
            name:"保函格式模板",
            taskName:"zdymb",
            detail: [],
            num: "1",
            require: 1,
            // type: ["doc", "docx"]
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