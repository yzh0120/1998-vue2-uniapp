<template>

  <view class="more-container">
    <!-- 主要内容区域 -->
    <view class="main-content" :style="{ fontSize: size + 'rpx' }">
      <slot name="content">{{ text }}</slot>
    </view>

    <!-- 展开前按钮 - 显示在主要内容下方 -->
    <view class="more-btn-wrapper" v-if="hasExpandSlot && !isMore">
      <view class="more-btn" @click="toggleMore">
        展开查询条件
      </view>
    </view>

    <!-- 展开区域 -->
    <view class="expand-area" :class="{ 'expanded': isMore }" v-show="isMore">
      <view class="expand-content">
        <slot name="expand"></slot>
      </view>
    </view>

    <!-- 展开后按钮 - 显示在展开内容下方 -->
    <view class="more-btn-wrapper" v-if="hasExpandSlot && isMore">
      <view class="more-btn" @click="toggleMore">
        收起查询条件
      </view>
    </view>

  </view>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 28
    },
    isMore: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {

      hasExpandSlot: false
    }
  },
  mounted() {
    this.hasExpandSlot = !!this.$slots.expand;
  },
  methods: {
    toggleMore() {
      this.$emit('edit');
    }
  }
}
</script>

<style lang="scss" scoped>
.more-container {
  position: relative;
}

.main-content {
  line-height: 1.5;
  word-wrap: break-word;
}

.more-btn-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 20rpx;
}

.more-btn {
  color: #717172;
  font-size: 26rpx;
}

.expand-area {
  max-height: 0;
  transition: max-height 0.3s ease;

  &.expanded {
    max-height: 1000rpx;
  }
}
</style>
