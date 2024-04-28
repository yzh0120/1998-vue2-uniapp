<!--
 * @Author: yz
 * @Date: 2023-02-06 16:29:43
 * @Description: 
 * 
-->
<template>
  <div>
    <uni-section title="默认 (info)" type="line">
      <panel>
        <template #header>
          <div>
            头部
          </div>
        </template>
        主体
      </panel>
    </uni-section>

    <uni-section title="primary" type="line">
      <panel type="primary">
        <template #header >
          <div>
            头部
          </div>
        </template>
        主体
      </panel>
    </uni-section>

    <uni-section title="success" type="line">
      <panel type="success">
        <template #header >
          <div>
            头部
          </div>
        </template>
        主体
      </panel>
    </uni-section>

    <uni-section title="warning" type="line">
      <panel type="warning">
        <template #header >
          <div>
            头部
          </div>
        </template>
        主体
      </panel>
    </uni-section>

    <uni-section title="danger" type="line">
      <panel type="danger">
        <template #header >
          <div>
            头部
          </div>
        </template>
        主体
      </panel>
    </uni-section>


  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" >

</style>
