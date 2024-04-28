<!--
 * @Author: yz
 * @Date: 2023-02-06 17:15:20
 * @Description: 
 * 
-->
<template>
  <div>
    <!-- 注意，如果需要兼容微信小程序，最好通过setRules方法设置rules规则 -->
    <u--form labelPosition="left" :model="form" :rules="rules" ref="uForm">
      <u-form-item label="姓名" prop="userInfo.name" borderBottom >
        <u--input v-model="form.name" border="none"></u--input>
      </u-form-item>

      <u-form-item label="爱好" prop="userInfo.like" borderBottom >
        <uni-data-select v-model="form.like" :localdata="range"></uni-data-select>
      </u-form-item>

      <formDate :form="form" field="accountDate" label="收费时间" @update="updateFormFieldValue" format="yyyy-MM-dd HH:mm:ss" :required="true">
      </formDate>

    </u--form>

    <u-button @click="submit">提交</u-button>
  </div>
</template>

<script>
export default {
  data() {
    let self = this
    return {
      form: {
          name: 123,
          like: 2,
          accountDate:""

      },
      range: [
      { value: 0, text: "篮球" },
        { value: 1, text: "足球" },
        { value: 2, text: "游泳" },
      ],
      rules: {
        name: [
          {
            type: 'any',
            required: true,
            message: '请填写姓名',
            trigger: ['blur', 'change']
          },
          {
            validator: self.$validator.zhNUmEng,
            trigger: ['blur']
          }
        ],
        like: [
          {
            type: 'any',
            required: true,
            message: '请填写姓名',
            trigger: ['blur', 'change']
          }
        ],
        accountDate: [
          {
            type: 'any',
            required: true,
            message: '请填写姓名',
            trigger: ['blur', 'change']
          }
        ],
      }
    };
  },
  
  onReady() {
    //如果需要兼容微信小程序，并且校验规则中含有方法等，只能通过setRules方法设置规则。
    this.$refs.uForm.setRules(this.rules)
  },
  methods: {
    updateFormFieldValue(e) {
      this.form[e.field] = e.value
            console.log(e,this.form)
        },
    submit() {

			this.$refs.uForm.validate().then(res => {
        uni.$u.toast('校验通过')
      
			}).catch(errors => {
				uni.$u.toast('校验失败')
			})
		}
  },
};
</script>
