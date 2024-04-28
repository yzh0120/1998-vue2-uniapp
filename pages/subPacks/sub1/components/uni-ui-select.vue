<template>
  <div>
    <uni-section title="本地数据" type="line">
      <uni-data-select v-model="value" :localdata="range" @change="change"></uni-data-select>
    </uni-section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      value: 0,
      range: [
      ],
    }
  },
  onShow() {
    setTimeout(() => {
      this.range = [
        { value: 0, text: "篮球" },
        { value: 1, text: "足球" },
        { value: 2, text: "游泳" },
      ]
    }, 1000)
  },
  methods: {
    change(e) {
      console.log(e)
    }
  },
}
</script>

<style lang="scss" >

</style>
