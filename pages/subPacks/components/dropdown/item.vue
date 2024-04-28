<!--
 * @Author: pmf
 * @Date: 2022-07-27 11:20:18
 * @Description: 
 * 
-->
<template>

  <div v-show="isShow">



    <view class="dropdown--more-item-box" v-if="item.type === `more`">
      <scroll-view class="con-box" scroll-y="true">
        <view class="con" v-for="(oneItem, cIndex) in checkList">
          <!-- {{ oneItem }}--- -->
          <view class="selectTit" v-if="oneItem.children && oneItem.children.length">
            <text class="tit">{{  oneItem[item.text]   }}</text>
            <text class="clear" @click="clearMoreOne(oneItem)">清空</text>
          </view>
          <view class="items">
            <text :class="['txt', twoItem.isCheck ? 'active' : '']" v-for="(twoItem, index) in oneItem.children"
              @click="selectMore(oneItem,oneItem.children,twoItem)">{{
              twoItem[oneItem.text] 
              }}</text>
          </view>
        </view>
      </scroll-view>
      <view class="btns">
        <text class="btn" type="primary" @click="clear(checkList)">重置</text>
        <text class="btn confirm" type="primary" @click="confirm">确定</text>
      </view>

      <div class="overlay" @click="closeAll"></div>
    </view>



		<view  v-else>
			<scroll-view class="dropdown-item-box"  scroll-y="true">
				<view class="con-box" v-if="checkList.length">
					<text @click="clearOne(checkList)" v-show="!item.showClear">清空</text>

					<view class="inline_items" v-show="item.type === `inline`" >
						<text :class="['txt', oneItem.isCheck ? 'active' : '']" v-for="(oneItem, index) in checkList" :key="index"
							@click="selectItem(oneItem, index)">{{
							oneItem[item.text] 
							}}</text>
					</view>

					<view class="block_items" v-show="item.type === `block`" >
						<div :class="['txt', oneItem.isCheck ? 'active' : '']" v-for="(oneItem, index) in checkList" :key="index"
							@click="selectItem(oneItem, index)">{{
							oneItem[item.text] 
							}}</div>
					</view>

				</view>

				<div class="overlay" @click="closeAll"></div>

			</scroll-view>
	</view>
</div>
</template>

<script>
export default {
	props: {
		//计数
		// count: {
		// 	type: [String, Number],
		// 	// 
		// 	default: ""
		// },
		// 展示的字段
		// label: {
		// 	type: String,
		// 	default: "label"
		// },
		// // 所要取的取
		// value: {
		// 	type: String,
			
		// 	default: "value"
    // },
    //item
    item: {
			type: Object,
			
			default: () => {
        return {};
			}
    },
		// 传入字段
		list: {
			type: Array,
			
			default: () => {
				return [];
			}
    },
    //索引
    index: {
      type: Number,
      required:true,
    },
		// 是否显示
		isShow: {
			type: Boolean,
			default: true
		},
		// 是否多选
		// multiple: {
		// 	type: Boolean,
			
		// 	default: false
		// },
		// 是否显示清空按钮
		// showClear: {
		// 	type: Boolean,
			
		// 	default: true
		// },
	},
	data() {
		return {
			// 因为小程序不支持修改传入的prop值，所以使用新的字段渲染列表
			checkList: [],
		}
	},
	created() {

	},
	mounted() {
	},
	watch: {
		list:
		{
			immediate: true,
			deep: true,
			handler: function (val, oldVal) {
        this.$set(this, "checkList", this.$fn.deepClone(this.list));
			},
		}
	},
	methods: {
		////////////////////////////////////两层数据
		selectMore(oneItem,oneList,twoItem) { 
			let isCheck = twoItem.isCheck;
			if (oneItem.multiple) {
				twoItem.isCheck = !isCheck;
			} else {
				// 单选时先全部清空选择
				oneList.forEach(twoItem => {
					twoItem.isCheck = false;
				})
				twoItem.isCheck = !isCheck;
			}
			this.$emit('select', { field: oneItem.field, value: this.getValueMore(oneItem, oneList) });
			this.$emit("check", {index:this.index,list:this.checkList})//同步父组件的index的item
		},
		getValueMore(oneItem,oneList) { 
			let values = [];
			let list = oneList.filter((item) => {
				return item.isCheck;
			})
			list.forEach(item => {
				values.push(item[oneItem.value]);
			});
			return oneItem.multiple ? values : values[0] || "";
		},
    //more 的确认方法
    confirm() { },
    //清空默认的单个项目数据
    clearMoreOne(oneItem) { 
      oneItem.children.forEach((e) => { 
        e.isCheck = false
			})
			this.$emit('select', {field:oneItem.field,value:""});
    },
    ////////////////////////////////////////////////////////////////////////////////////////////一层数据
    //关闭所有弹窗
		closeAll() {
			this.$emit('closeAll');
    },
    //单层数据选择成员事件
		selectItem(oneItem) {
			let isCheck = oneItem.isCheck;
			if (this.item.multiple) {
				oneItem.isCheck = !isCheck;
			} else {
				// 单选时先全部清空选择
				this.checkList.forEach(oneItem => {
					oneItem.isCheck = false;
				})
				oneItem.isCheck = !isCheck;
			}
			this.$emit('select', { field: this.item.field, value: this.getValue() });//修改父组件的valueobj
			this.$emit("check", {index:this.index,list:this.checkList})//同步父组件的index的item
		
    },
    //单层数据清空数据
    clearOne() {
      this.checkList.forEach(item => {
        item.isCheck = false;
			})
			this.$emit('select', {field:this.item.field,value:this.getValue()});
		},

		//单层数据获取值
    getValue() {
			let values = [];
			let list = this.checkList.filter((item) => {
				return item.isCheck;
			})
			list.forEach(item => {
				values.push(item[this.item.value]);
			});
			return this.item.multiple ? values : values[0] || "";
		},
		// getLabel() {
		// 	let labels = [];
		// 	let list = this.checkList.filter((item) => {
		// 		return item.isCheck;
		// 	})
		// 	list.forEach(item => {
		// 		labels.push(item[this.label]);
		// 	});
		// 	return this.item.multiple ? labels : labels[0] || "";
		// },
		
		// getAllList() {
		// 	return this.$fn.deepClone(this.checkList);
		// },
	
	}
}
</script>

<style lang="scss">
.dropdown-item-box {
	position: relative;
	background-color: #fff;
	// padding: 20rpx 42rpx 50rpx;
	height: calc(50vh);
	overflow-y: scroll;
	border-radius: 0rpx 0rpx 25rpx 25rpx;

	.overlay {
		position: fixed;
		left: 0px;
		top: 0px;
		width: calc(100vw);
		height: calc(100vh);
		z-index: -1;
		background-color: transparent;
	}

	&::after {
		position: fixed;
		left: 0px;
		top: 0px;
		width: calc(100vw);
		height: calc(100vh);
		content: "";
		background-color: rgba(0, 0, 0, 0.6);
		z-index: -2;
	}

	.con-box {
		position: relative;
		z-index: 3;
		padding: 10rpx 42rpx 50rpx;

		.inline_items {
			.txt {
				display: inline-block;
				padding: 10rpx 44rpx;
				margin: 14rpx 6rpx;
				font-size: 24rpx;
				color: #909399;
				line-height: 38rpx;
				background-color: #F3F4F6;
				border: 1px solid #F3F4F6;
				border-radius: 100rpx;

				&.active {
					color: #4985F6;
					border: 1px solid #4985F6;
					background-color: #fff;
				}
			}

			// &.blockBtn {
			// 	margin: 0px -48rpx;

			// 	.txt {
			// 		display: block;
			// 		color: #303133;
			// 		background-color: #fff;
			// 		border: none;
			// 		font-size: 28rpx;
			// 		border-radius: 0px;

			// 		&.active {
			// 			background-color: #F3F4F6;
			// 			color: #4985F6;
			// 		}

			// 	}
			// }
		}

    .block_items {
			.txt {
				display: block;
				padding: 10rpx 44rpx;
				margin: 14rpx 6rpx;
				font-size: 24rpx;
				color: #909399;
				line-height: 38rpx;
				background-color: #F3F4F6;
				border: 1px solid #F3F4F6;
				// border-radius: 100rpx;

				&.active {
					color: #4985F6;
					border: 1px solid #4985F6;
					background-color: #fff;
				}
			}
		}
	}
}


.dropdown--more-item-box{
  
	position: relative;
	box-sizing: border-box;
	background-color: #fff;
	padding: 20rpx 42rpx 90rpx;
	border-radius: 0rpx 0rpx 25rpx 25rpx;

	// &::after {
	.overlay {
		position: fixed;
		left: 0px;
		top: 0px;
		width: calc(100vw);
		height: calc(100vh);
		z-index: -1;
		background-color: transparent;
	}

	&::after {
		position: fixed;
		left: 0px;
		top: 0px;
		width: calc(100vw);
		height: calc(100vh);
		content: "";
		background-color: rgba(0, 0, 0, 0.6);
		z-index: -2;
	}

	.selectTit {
		font-size: 28rpx;
		color: #303133;
		line-height: 40rpx;

		.tit {
			display: inline-block;
			width: 566rpx;
		}

		.clear {
			display: inline-block;
			width: 100rpx;
			text-align: right;
		}
	}

	.con-box {
		height: calc(50vh);
		overflow-y: scroll;
		position: relative;
		z-index: 3;
		margin-bottom: 30rpx;

		.items {
			.txt {
				display: inline-block;
				padding: 10rpx 44rpx;
				margin: 14rpx 6rpx;
				font-size: 24rpx;
				color: #909399;
				line-height: 38rpx;
				background-color: #F3F4F6;
				border: 1px solid #F3F4F6;
				border-radius: 100rpx;

				&.active {
					color: #4985F6;
					border: 1px solid #4985F6;
					background-color: #fff;
				}
			}
		}
	}

	.btns {
		z-index: 20;
		position: absolute;
		left: 0px;
		bottom: 0rpx;
		width: 750rpx;
		justify-content: space-between;
		background-color: #fff;
		text-align: center;
		padding: 10rpx 0px 40rpx;

		.btn {
			display: inline-block;
			width: 296rpx;
			height: 68rpx;
			line-height: 68rpx;
			border: 1rpx solid #4985F6;
			color: #4985F6;
			border-radius: 10rpx;

			&.confirm {
				margin-left: 40rpx;
				color: #fff;
				background-color: #4985F6;
			}
		}
	}
}
</style>
