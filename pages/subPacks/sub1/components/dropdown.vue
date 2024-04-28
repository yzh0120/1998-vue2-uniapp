<template>
  <div>
    <myDropdown :alldata="alldata" @upalldata="upalldata"></myDropdown>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        alldata: {
        titData: [
          {
            isCheck: false,
            tit: "项目A角",
            arrowUp: false,
          },
          {
            isCheck: false,
            tit: "操作方式",
            arrowUp: false,
          },
          {
            isCheck: false,
            tit: "更多",
            arrowUp: false,
          },

        ],
        itemObj: [
          {
            type: "block",
            field: "roleId",
            text: "label",
                value:"value",
            list: [
              {
                isCheck: false,
                label: 1,
                value: 1,
              },
              {
                isCheck: false,
                label: 11,
                value: 11,
              },
              {
                isCheck: false,
                label: 111,
                value: 111,
              },
              {
                isCheck: false,
                label: 1111,
                value: 1111,
              },
              {
                isCheck: false,
                label: 11111,
                value: 11111,
              },
              {
                isCheck: false,
                label: 11111,
                value: 11111,
              },
              {
                isCheck: false,
                label: 11111,
                value: 11111,
              },
              {
                isCheck: false,
                label: 11111,
                value: 11111,
              },
              {
                isCheck: false,
                label: 11111,
                value: 11111,
              },
              {
                isCheck: false,
                label: 11111,
                value: 11111,
              },
              {
                isCheck: false,
                label: 11111,
                value: 11111,
              },
              {
                isCheck: false,
                label: 11111,
                value: 11111,
              },
              {
                isCheck: false,
                label: 11111,
                value: 11111,
              }
            ],
          },
          {
            multiple:true,
            type: "inline",
            field: "planId",
            text: "label",
                value:"value",
            list: [
              {
                isCheck: false,
                label: 10,
                value: 10,
              },
              {
                isCheck: false,
                label: 110,
                value: 110,
              },
              {
                isCheck: false,
                label: 1110,
                value: 1110,
              },
              {
                isCheck: false,
                label: 11110,
                value: 11110,
              },
              {
                isCheck: false,
                label: 111110,
                value: 111110,
              }
            ],
          },
          {
            type: "more",
      
            list: [
              {
                field: "more1",
                isCheck: false,
                text: "label",
                value:"value",
                children: [
                  {
                    isCheck: false,
                    label: 2221110,
                    value: 2221110,
                  },
                  {
                    isCheck: false,
                    label: 22211110,
                    value: 22211110,
                  },
                  {
                    isCheck: false,
                    label: 222111110,
                    value: 222111110,
                  }
                ]
              },
              {
                field: "more2",
                isCheck: false,
                text: "label",
                value:"value",
                multiple:true,
                children: [
                  {
                    isCheck: false,
                    label: 4441110,
                    value: 4441110,
                  },
                  {
                    isCheck: false,
                    label: 44411110,
                    value: 44411110,
                  },
                  {
                    isCheck: false,
                    label: 444111110,
                    value: 444111110,
                  }
                ]
              },

            ],
          }
        ]
      }
      }
    },
    methods: {
      upalldata(e) { 
        this.alldata = e
      },
    },
  }
</script>

<style lang="scss" >

</style>
