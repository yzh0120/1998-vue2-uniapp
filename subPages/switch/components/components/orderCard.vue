<template>
  <view class="guarantee-card" @click="go">

    <view class="header-section">{{ guaranteeData.projectName }}</view>
    <view class="progress-section">
      <view class="progress-tag" style="background-color: #e9f6fe; color: #4985F6; border: 1rpx solid #4985F6;">
        {{ guaranteeData.applyNo || guaranteeData.serialNumber }}</view>

      <view class="progress-tag" style="background-color: #FEF0F0; color: #D02135; border: 1rpx solid #FFAFAF;">
        {{ this.$fn.dataItem_text('GuaranteeType', guaranteeData.applyType) || this.$fn.dataItem_text('GuaranteeType',
          guaranteeData.guaranteeType, true) }}</view>

      <view class="progress-tag" v-if="guaranteeData.auditStatus"
        style="background-color: #EBFFF9; color: #07C17E; border: 1rpx solid #C3FFE8;">
        {{ this.$fn.dataItem_text("audit_status", guaranteeData.auditStatus, true) }}</view>
    </view>

    <view class="progress-section">
      <view class="progress-tag" v-if="guaranteeData.applyProcessStatus"
        style="background-color: #ffefdf; color: #F59163 ; border: 1rpx solid #F59163 ;">
        步骤{{ step[guaranteeData.applyProcessStatus].text || '' }} {{ step[guaranteeData.applyProcessStatus].name }}
      </view>

      <view v-if="guaranteeData.projectType" class="progress-tag"
        style="background-color: #C3FFE8; color: #07C17E; border: 1rpx solid #07C17E;">
        {{ guaranteeData.projectType }}</view>

    </view>

    <!-- 详细信息 -->
    <view class="info-section">
      <view class="info-row">
        <text class="info-label">出函机构</text>
        <text class="info-value">{{ guaranteeData.platformName || this.$fn.dataItem_text('GuaranteeBankPlatform',
          guaranteeData.guaranteeBankPlatform, true) }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">申请企业</text>
        <text class="info-value">{{ guaranteeData.insureCompanyName || guaranteeData.companyName }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">受益人</text>
        <text class="info-value">{{ guaranteeData.bidCompanyName || guaranteeData.beneficiaryName }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">保函金额(元)</text>
        <text class="info-value">{{ guaranteeData.bidAmount || guaranteeData.guaranteeAmount }}</text>
      </view>
      <view class="info-row">
        <text class="info-label">保函期限(月)</text>
        <text class="info-value">{{ guaranteeData.guaranteeValidity || guaranteeData.guaranteeTimeLimit || '' }}</text>
      </view>
    </view>

  </view>
</template>

<script>
export default {
  name: "GuaranteeInfoCard",
  props: {
    // 组件可配置的属性
    guaranteeData: {
      type: Object,
      default: () => ({
        projectType: "",
        applyType: "",
        projectName: "",
        applyNo: "",
        applyProcessStatus: null,
        platformName: "",
        insureCompanyName: "",
        bidCompanyName: "",
        bidAmount: "",
        guaranteeValidity: ""
      })
    }
  },
  data() {
    return {
      step: [
        { text: '一', name: '填写项目信息' },
        { text: '二', name: '金融机构审核' },
        { text: '三', name: '支付保费' },
        { text: '四', name: '出具保函' },
      ]
    }
  },
  computed: {
    // 计算进度标签文本
    progressText() {
      return `步骤${this.guaranteeData.step} ${this.guaranteeData.stepText}`;
    }
  },
  methods: {
    go() {
      if (!this.guaranteeData.applyNo) {
        uni.$u.route('/subPages/liucheng/index2', {
          sdbId: this.guaranteeData.id,
        })
      } else {
        uni.$u.route('/subPages/liucheng/index', {
          applyNo: this.guaranteeData.applyNo
        });
      }
    },
    // 查看详情事件
    handleViewDetail() {
      this.$emit('view-detail', this.guaranteeData);
    },

    // 下载保函事件
    handleDownload() {
      this.$emit('download', this.guaranteeData);
    }
  }
}
</script>

<style lang="scss" scoped>
.guarantee-card {
  margin: 16rpx;
  background: #ffffff;
  padding: 35rpx;
  box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.08);
}

/* 标签区域 */
.tag-section {
  display: flex;
  margin: 0 0 20rpx 0;
}

.btn {
  color: #fff;
  padding: 12rpx 24rpx;
  border-radius: 30rpx;
  font-size: 26rpx;
  font-weight: 500;
}

/* 头部信息 */
.header-section {
  font-size: 32rpx;
  font-weight: bolder;
  color: #333;
  padding: 15rpx 0;
}

.serial-number {
  display: block;
  font-size: 26rpx;
  color: #666;
}

/* 进度状态 */
.progress-section {
  margin-bottom: 10rpx;
}

.progress-tag {
  display: inline-block;
  color: #fff;
  margin: 10rpx 10rpx 0 0;
  padding: 5rpx 12rpx;
  border-radius: 25rpx;
  font-size: 24rpx;
}


.info-row {
  display: flex;
  // justify-content: space-between;
  // align-items: center;
  margin-bottom: 20rpx;

  &:last-child {
    margin-bottom: 0;
  }
}

.info-label {
  font-size: 28rpx;
  color: #909399;
  flex-shrink: 0;
  margin-right: 30rpx;
}

.info-value {
  font-size: 28rpx;
  color: #303133;
  font-weight: 500;
  text-align: left;
}
</style>
