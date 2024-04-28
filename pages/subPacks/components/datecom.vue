<!--
 * @Author: yz
 * @Date: 2022-08-17 10:08:05
 * @Description: 
 * 
-->
<template>
  <div>
    <u-form-item :label="label" borderBottom @click="click" :required="required" :prop="field">

      <u--input v-model="form[field]" disabled border="surround" v-if="disabled">
      </u--input>

      <u--input v-model="form[field]" disabled disabledColor="#ffffff" border="surround" v-else>
      </u--input>
      <view slot="right">
        <view style="display: flex;margin-left: 10rpx;">
          <u-icon name="close-circle-fill" @click.native.stop="clearFn"></u-icon>
          <u-icon name="arrow-right"></u-icon>
        </view>
      </view>

      <!-- <u-datetime-picker ref="datetimePicker" :show="show" v-model="form[field]" :mode="mode" @confirm="confirm"
        @cancel="close">
      </u-datetime-picker> -->
      <u-datetime-picker ref="datetimePicker" :show="show" v-model="dateSpan" :mode="mode" @confirm="confirm"
        @cancel="close">
      </u-datetime-picker>
    </u-form-item>
  </div>
</template>

<script>
export default {
  computed: {
    dateSpan: {
      get() {
        if (this.form[this.field]) {
          return new Date(this.form[this.field]).getTime()
        } else {
          return new Date().getTime()
        }

      },
      set(val) {
        // console.log(val, "-------------")
        this.form[this.field] = val
      }
    },
  },
  data() {
    return {
      show: false,
    }
  },
  onReady() {
    // 微信小程序需要用此写法
    // this.$refs.datetimePicker.setFormatter(this.formatter)
  },
  methods: {
    clearFn(e) {
      if (this.disabled) {
        return
      }
      this.$emit("update", {
        value: undefined,
        field: this.field,
        index:this.index
      })
    },
    confirm(e) {
      // console.log(this.$fn.formatDate(e.value, this.format))
      this.$emit("update", {
        value: this.$fn.formatDate(e.value, this.format),
        field: this.field,
        index:this.index
      })
      this.close()
    },
    close() {
      this.show = false
    },
    click() {
      if (this.disabled) {
        // this.$refs.uToast.error("不可编辑")
        uni.showToast({
          title: "不可编辑",
          icon: "error",
          duration: 1 * 1000
        })
      } else {
        this.show = true
      }
    },
    // formatter(type, value) {
    //   console.log(type, value, "type, value")
    //   if (type === 'year') {
    //     return `${value}年`
    //   }
    //   if (type === 'month') {
    //     return `${value}月`
    //   }
    //   if (type === 'day') {
    //     return `${value}日`
    //   }
    //   return value
    // },
  },
  props: {
    /*
    update(e) {
      this.dataArr[e.index][e.field] = e.value
    },
    */
    index: {
      type: [String, Number],
      default: 0,
    },
    //时间格式
    format: {
      type: String,
      default: "yyyy-MM-dd",
    },
    //必填样式
    required: {
      type: Boolean,
      default: false,
    },
    //禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    //表单对象
    form: {
      type: Object,
      default: () => { return {} },
    },
    //模式  date为日期选择，time为时间选择，year-month为年月选择
    mode: {
      type: String,
      default: "date",
    },
    //描述
    label: {
      type: String,
      default: "",
    },
    //字段
    field: {
      type: String,
      default: "",
    },
  },
}
</script>

<style lang="scss" scoped>
</style>
