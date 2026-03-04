<template>
  <view class="container">

    <view class="search-filter-section">
      <MoreText :row="10" :size="28" :isMore="show" @edit="editShow">
        <template v-slot:content>
          <uni-forms :modelValue="formData" ref="form">
            <uni-forms-item prop="projectName">
              <view class="form-item">
                <uni-easyinput style="width: 80%;" v-model="formData.projectName" placeholder="请输入项目名称" />
                <button class="search-btn" @click="submit">搜索</button>
              </view>
            </uni-forms-item>
          </uni-forms>
        </template>

        <!-- 展开部分（搜索条件） -->
        <template v-slot:expand>
          <uni-forms :modelValue="formData" ref="form">
            <view class="form-grid">
              <uni-forms-item prop="serialNumber">
                <uni-easyinput v-model="formData.serialNumber" placeholder="请输入申请编号" />
              </uni-forms-item>
              <uni-forms-item prop="companyName">
                <uni-easyinput v-model="formData.companyName" placeholder="请输入申请企业名称" />
              </uni-forms-item>
              <uni-forms-item name="guaranteeType">
                <uni-data-select v-model="formData.guaranteeType" :localdata="range1" placeholder="保函品种"
                  @change="event1"></uni-data-select>
              </uni-forms-item>
              <uni-forms-item name="guaranteeBankPlatform">
                <uni-data-select v-model="formData.guaranteeBankPlatform" :localdata="range2" placeholder="开函机构"
                  @change="event2"></uni-data-select>
              </uni-forms-item>
              <uni-forms-item name="isFinancialPost">
                <uni-data-select v-model="formData.isFinancialPost" :localdata="payTypes" placeholder="保费支付情况"
                  @change="event3"></uni-data-select>
              </uni-forms-item>
              <uni-forms-item name="functionalState">
                <uni-data-select v-model="formData.functionalState" :localdata="issueStatusType" placeholder="出函情况"
                  @change="event4"></uni-data-select>
              </uni-forms-item>
              <uni-forms-item name="invoiceStatus">
                <uni-data-select v-model="formData.invoiceStatus" :localdata="invoiceStatusType" placeholder="发票出具情况"
                  @change="event5"></uni-data-select>
              </uni-forms-item>
            </view>
          </uni-forms>
        </template>
      </MoreText>
    </view>

    <view class="content">
      <u-list @scrolltolower="loadMore" :preLoadScreen="1.5">
        <u-list-item v-for="(item, index) in indexList" :key="index">
          <orderCard :guaranteeData="item" />
        </u-list-item>
        <template #loading>
          <view class="loading-footer">
            <view v-if="loading" class="loading-more">
              <u-loading-icon size="18"></u-loading-icon>
              <text style="margin-left: 8rpx;">加载中...</text>
            </view>
            <view v-else-if="noMore" class="no-more">
              <text>--- 我是有底线的 ---</text>
            </view>
          </view>
        </template>
      </u-list>
    </view>

  </view>
</template>

<script>
import orderCard from './orderCard.vue';
import MoreText from './searchCompany.vue';
import * as projectApi from '@/subPages/switch/api/index';

export default {
  components: {
    orderCard,
    MoreText
  },
  options: {
    styleIsolation: 'shared' // 允许样式穿透
  },
  data() {
    return {
      formData: {
        projectName: '',
        serialNumber: '',
        companyName: '',
        guaranteeType: '',
        guaranteeBankPlatform: '',
        isFinancialPost: '',//	是否过财务岗(false=待支付 true=已支付)
        functionalState: '',	//出函状态(0=待出函 1=已出函)
        invoiceStatus: '',//	发票开具情况(-1作废 0正常，1正常已开具已推送金蝶 ,2 推送失败)
      },
      indexList: [],
      range1: [],
      range2: [],
      payTypes: [
        { value: false, text: '待支付' },
        { value: true, text: '已支付' },
      ],
      issueStatusType: [
        { value: '0', text: '待出函' },
        { value: '1', text: '已出函' }
      ],
      invoiceStatusType: [
        { value: 0, text: '未申请' },
        { value: 1, text: '已开具' },
        { value: 2, text: '推送失败' },
      ],
      loading: false,
      noMore: false,
      pageParams: {
        pageNo: 1,
        pageSize: 10,
      },
      show: false,
    }
  },
  mounted() {
    console.log('触发2')
    this.getList({});
    this.setrange1();
    this.setrange2();
  },
  methods: {
    setrange1() {
      this.range1 = []
      this.$fn.dataItem_list("mini_guarantee_type").forEach((e) => {
        this.range1.push(e);
      })
    },
    setrange2() {
      //机构列表
      let data = {
        pageNo: 1,
        pageSize: 999
      }
      this.range2 = []
      this.$fn.dataItem_list("GuaranteeBankPlatform").forEach((e) => {
        this.range2.push(e);
      })
    },
    getList(params) {
      this.pageParams.pageNo = 1;
      this.indexList = [];
      this.setrange1();
      this.setrange2();
      this.noMore = false;
      let data = {
        pageNo: 1,
        pageSize: 10,
        ...params
      };
      projectApi.projectList2(data).then(res => {
        this.indexList = res.data.list;
        this.pageParams.pageNo++;
        if (res.data.total && this.indexList.length >= res.data.total) {
          console.log('已加载所有数据-----------', res.data.total, this.indexList.length);
          this.noMore = true;
        }
      }).catch(err => {
        console.error('获取列表失败:', err.message);
      });
    },

    async loadData() {
      if (this.loading) return;

      if (this.noMore) {
        uni.$u.toast('已加载所有数据');
        return;
      }

      this.loading = true;

      try {
        const params = {
          pageNo: this.pageParams.pageNo,
          pageSize: this.pageParams.pageSize,
          ...this.formData,
        };

        projectApi.projectList2(params).then(res => {
          if (res.data.list && res.data.list.length > 0) {
            const newList = res.data.list || [];
            this.indexList = [...new Set([...this.indexList, ...newList])];
            this.pageParams.pageNo++;
            if (res.data.total && this.indexList.length >= res.data.total) {
              console.log('已加载所有数据-----------', res.data.total, this.indexList.length);
              this.noMore = true;
            }
          }
        }).catch(err => {
          console.error('获取列表失败:', err.message);
        });
      } finally {
        this.loading = false;
      }
    },

    loadMore() {
      this.loadData();
    },

    submit() {
      // this.show = false;
      this.getList(this.formData);
    },

    editShow() {
      this.show = !this.show;
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  background-color: #f5f5f5;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.search-filter-section {
  background: #fff;
  padding: 20rpx;
  width: 94%;
  flex-shrink: 0;
  z-index: 999;
  box-shadow: 0 2rpx 10rpx rgba(0, 0, 0, 0.1);
}

.content {
  flex: 1;
  overflow: hidden;
  position: relative;
}

/* 确保u-list占满content */
::v-deep .u-list {
  height: 90% !important;
}

/* 调整底部加载区域 */
.loading-footer {
  padding: 30rpx 0;
  background: #f5f5f5;
  position: relative;
  z-index: 1;
}


.form-item {
  display: flex;
  align-items: flex-start;
  gap: 20rpx;
}

.search-btn {
  background-color: #cf2135;
  height: 70rpx;
  font-size: 30rpx;
  color: #fff;
  text-align: center;
  line-height: 70rpx;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300rpx, 1fr));
  gap: 20rpx;
  margin-top: 20rpx;
}

::v-deep {
  .uni-forms-item {
    margin-bottom: 0 !important;
  }
}
</style>
