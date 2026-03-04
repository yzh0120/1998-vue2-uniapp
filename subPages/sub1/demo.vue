<template>
  <div>
    <!-- <uploadc :projectId="projectId" :uploadObj="uploadObj" @updatefile="updatefile" @delfile="delfile" obj="uploadObj"></uploadc> -->
    <u-divider text="表单"></u-divider>
    <view class="">
      <uni-forms :modelValue="formData" ref="form">
        <uni-forms-item label="姓名" name="name">
          <uni-easyinput type="text" v-model="formData.name" placeholder="请输入姓名" />
        </uni-forms-item>
        <uni-forms-item label="年龄" name="age" :rules="[{ required: true, errorMessage: '年龄必填' }]">
          <uni-easyinput type="text" v-model="formData.age" placeholder="请输入年龄" />
        </uni-forms-item>
        <uni-forms-item label="爱好" name="age" :rules="[{ required: true, errorMessage: '必填' }]">
          <uni-data-checkbox v-model="formData.checkbox" :localdata="range"></uni-data-checkbox>
        </uni-forms-item>
        <uni-forms-item label="爱好" name="age" :rules="[{ required: true, errorMessage: '必填' }]">
          <uni-data-select v-model="formData.select" :localdata="range"></uni-data-select>
        </uni-forms-item>
        <uni-forms-item label="日期" name="accountDate" :rules="[{ required: true, errorMessage: '必填' }]">
          <uni-datetime-picker :type="date" v-model="formData.accountDate" />
        </uni-forms-item>
        <!-- <uni-forms-item label="城市" name="city" :rules="[{ required: true, errorMessage: '必填' }]"> -->
        <!-- <citycom :item="formData" province="province" city="city" areas="areas" required @update="updateForm"></citycom> -->
        <!-- </uni-forms-item> -->
      </uni-forms>
      <button @click="submitForm">提交</button>
    </view>
    <u-divider text="toast"></u-divider>
    <button @click="event1">展示toast</button>
    <u-divider text="loading"></u-divider>
    <button @click="event2">展示加载中</button>
    <u-divider text="模态弹窗"></u-divider>
    <button @click="event3">展示模态弹窗</button>
    <!-- 
	defaul 
	primary
	success
	info
	warning
	danger
	 -->
    <panel type="primary">
      <div slot="header">
        头部
      </div>
      <div>
        身体
      </div>
    </panel>

    <uni-section title="基础用法" type="line"></uni-section>
  </div>
</template>

<script>
// import citycom from "@/components/citycom"
// import uploadc from "@/components/uploadc"
// import panel from "@/components/panel"
export default {
  // components: {
  //   citycom,
  //   uploadc,
  //   panel
  // },
  data() {
    return {
      projectId: "000fabb891487e4199f4a52fce5d21f9",
      uploadObj: {
        name: "测试",
        taskName: "测试",
        detail: [],
        // type:["123"]
      },
      range: [{ "value": 0, "text": "篮球" }, { "value": 1, "text": "足球" }, { "value": 2, "text": "游泳" }],
      formData: {
        province: "河北省",
        city: "唐山市",
        areas: ""
      }
    }
  },
  methods: {
    updateForm(e) {
      if (e.field) {
        this.formData[e.field] = e.value
      }

    },
    // updateFormFieldValue(e) {
    //   this.formData[e.field] = e.value
    //   console.log(e, this.formData)
    // },
    submitForm() {
      this.$refs.form.validate().then(res => {

        console.log('表单数据信息：', res);
      }).catch(err => {

        console.log('表单错误信息：', err);
      })
    },
    event1() {
      uni.showToast({
        title: '打分成功！',//显示的文字
        duration: 2000,  //显示多少毫秒，默认1500毫秒，时间到自动隐藏
        icon: "success"  //自定义显示的图标，默认成功success，错误error,加载loading，不显示图标是none
      })
      //也可以手动隐藏消息提示框
      setTimeout(() => {
        uni.hideToast();
      }, 2000)
    },
    event2() {
      uni.showLoading({
        title: '加载中...',
        mask: true
      });
      setTimeout(() => {
        uni.hideLoading()
      }, 2000)
    },
    event3() {
      uni.showModal({
        title: '温馨提示',  //提示标题
        content: '这是一个模态弹窗',  //提示内容
        showCancel: true, //是否显示取消按钮
        success: function (res) {
          if (res.confirm) {  //confirm为ture，代表用户点击确定
            console.log('点击了确定按钮');
          } else if (res.cancel) {  //cancel为ture，代表用户点击取消
            console.log('点击了取消按钮');
          }
        }
      })
    },
    updatefile(e) {
      this[e.obj].detail = e.value
    },
    delfile(e) {
      this[e.obj].detail.splice(e.value, 1);
    },
  },
}
</script>

<style lang="scss"></style>
