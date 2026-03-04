<template>
	<!-- 
		https://blog.csdn.net/abs625/article/details/138715359
	 -->
	<view class='layout-column'>
		<view id="parent" style="width:100%;">
			<slot></slot>
		</view>
		<view
			:style="'width:'+slotW+';max-height: '+getListContentHei+'rpx;z-index: 9999;position: absolute;margin-top:'+slotH+';'+(isShow ? '' : 'display:none;')"
			:class="(dataList.length > 0 ? 'data-box-shadow ' : 'data-box ') + animate">
			<block v-if="dataList.length > 0">
				<view class="data-box-scroll"
					:style="'height:'+dataList.length*(itemHeight-1)+'rpx;max-height: '+max*(itemHeight-1)+'rpx;'">
					<text v-for="(item,index) in dataList" :key="item[identifier]"
						:class="'ellipsis layout-row less-center list-item '+(item.enable === false ? '' : 'active')"
						:style="'color:'+(item.enable === false ? '#dedede' : (checkedIndex.indexOf(index) >= 0 ? itemSelectColor : itemColor))+';font-size:'+itemFontsize+'rpx;'"
						@click="handleListItem(index, item)">{{item[showKey]}}</text>
				</view>
				<view class="layout-row opera-btns less-center" v-if="mode == 'multiple'">
					<view class="opera-cancel layout-row center" @click='handelCancel'>取消</view>
					<view class="opera-sure layout-row center" @click='handelSure'>确定</view>
				</view>
			</block>
			<view v-else :style="'width:'+slotW+';'" class='status-text'>暂无数据</view>
		</view>
		<view class="mask" v-show="isShow" @click="handelCancel"></view>
	</view>
</template>

<script>
	export default {
		name: "down-select",
		props: {
			//要显示的字段
			showKey: {
				type: String,
				default: '',
			},
			mode: {
				type: String,
				default: 'single', //multiple
				// default: 'multiple'
			},
			dataList: {
				type: Array,
				default: []
			},
			//选中的列表，用作显示列表是展示已选中项
			checkedDataList: {
				type: Array,
				default: ()=>{
					return []
				}
			},
			//最多展示几项后开始滑动
			max: {
				type: Number,
				default: 4
			},
			//数据项每个item高度rpx
			itemHeight: {
				type: Number,
				default: 80
			},
			//唯一标识符字段，用来比对选中项和维持v-for列表中的key,不填此项无选中效果
			identifier: {
				type: String,
				default: ''
			},
			itemSelectColor: {
				type: String,
				default: '#00aaff'
			},
			itemColor: {
				type: String,
				default: 'black'
			},
			itemFontsize: {
				type: Number,
				default: 30
			}
		},
		computed: {
			getListContentHei() {
				let len = this.dataList.length
				let signleH = len < this.max ? this.itemHeight * len : this.itemHeight * this.max
				if (this.mode == 'single') {
					return len <= 0 ? this.itemHeight : signleH
				} else {
					return len <= 0 ? this.itemHeight : (signleH + this.itemHeight)
				}
			}
		},
		watch: {
			dataList: {
				handler: function(newVal, oldVal) {
					if (this.checkedDataList.length >= 0 && this.identifier) {
						this.checkedIndex = []
						this.checkedDataList.forEach(ele => {
							let index = newVal.findIndex(ele1 => ele[this.identifier] === ele1[this
								.identifier])
							if (index >= 0) {
								this.checkedIndex.push(index)
							}
						})
					}
				},
				immediate: true, // 组件创建时立即触发
				deep: true // 对象内部属性变化时也触发
			},
			checkedDataList: {
				handler: function(newVal, oldVal) {
					if (newVal.length >= 0 && this.identifier) {
						this.checkedIndex = []
						newVal.forEach(ele => {
							let index = this.dataList.findIndex(ele1 => ele[this.identifier] === ele1[this
								.identifier])
							if (index >= 0) {
								this.checkedIndex.push(index)
							}
						})
					}
				},
				immediate: true, // 组件创建时立即触发
				deep: true // 对象内部属性变化时也触发
			}
		},
		mounted() {
			this.$nextTick(() => {
				uni.createSelectorQuery().in(this).select('#parent').boundingClientRect(res => {
					if (res.width) {
						this.slotW = `${res.width}px`
						this.slotH = `${res.height+5}px`
					}
				}).exec()
			})
		},
		data() {
			return {
				slotW: '0px',
				slotH: '0px',
				isShow: false,
				checkedIndex: [],
				animate: '',
				//传进来选中项，后又改成未选中并确认，多选模式生效
				checkedDels: []
			};
		},
		methods: {
			open() {
				if (this.checkedDataList.length >= 0 && this.identifier) {
					this.checkedIndex = []
					this.checkedDataList.forEach(ele => {
						let index = this.dataList.findIndex(ele1 => ele[this.identifier] === ele1[this
							.identifier])
						if (index >= 0) {
							this.checkedIndex.push(index)
						}
					})
				}
				this.isShow = true
				this.animate = 'show-animate'
			},
			close() {
				this.animate = 'hide-animate'
				this.checkedIndex = []
				this.checkedDels = []
				this.isShow = false
			},
			handleListItem(index, obj) {
				// console.log(obj,"obj")
				// if(obj.enable === false){
				// 	return
				// }
				if (this.mode === 'single') {
					this.checkedIndex = []
					this.checkedIndex.push(index)
					this.handelSure()
				} else {
					let sindex = this.checkedIndex.indexOf(index)
					if (sindex >= 0) {
						if (this.identifier) {
							//判断未选中的项在传进来的已选项中是否存在
							let contain = this.checkedDataList.filter(ele => ele[this.identifier] === this.dataList[index][
								this.identifier
							])
							if (contain.length > 0) {
								//传进来的已选项中是否存在选择为未选中的内容
								let contain1 = this.checkedDels.filter(ele => ele[this.identifier] === contain[0][this
									.identifier
								])
								if (contain1.length <= 0) {
									this.checkedDels.push(contain[0])
								}
							}
						}
						this.checkedIndex.splice(sindex, 1);
					} else {
						if (this.identifier) {
							let contain2 = this.checkedDels.filter(ele => ele[this.identifier] === this.dataList[index][
								this.identifier
							])
							if (contain2.length > 0) {
								let tempIndex = this.checkedDels.findIndex(ele => ele[this.identifier] === this.dataList[
									index][this.identifier])
								if (tempIndex >= 0) {
									this.checkedDels.splice(tempIndex, 1)
								}
							}
						}
						this.checkedIndex.push(index)
					}
				}
			},
			handelCancel() {
				this.close()
				this.$emit('cancelDimss', '')
			},
			handelSure() {
				let results = []
				if (this.checkedIndex.length <= 0) {
					uni.showToast({
						title: '请选择至少一项',
						icon: 'none'
					});
					return
				}

				this.checkedIndex.forEach(ele => {
					if (this.dataList[ele]) {
						results.push(this.dataList[ele])
					}
				})
				//将本次选中结果清除
				this.checkedIndex = []
				this.$emit('resultBack', results, this.checkedDels)
				this.close()
			}
		}
	}
</script>

<style scoped>
	.active {}

	.active:active {
		opacity: 0.6;
	}

	.layout-row {
		display: flex;
		/* flex-direction: row; */
	}

	.layout-column {
		/* height: 35px !important; */
		display: flex;
		flex-direction: column;
	}

	/* 整体方向居中 */
	.center {
		align-items: center;
		justify-content: center;
	}

	/* 主轴方向居中 */
	.main-center {
		justify-content: center;
	}

	/* 侧轴方向居中 */
	.less-center {
		align-items: center;
	}

	.data-box-scroll {
		width: 100%;
		overflow-y: scroll;
	}

	.data-box-scroll::-webkit-scrollbar {
		display: none
	}

	.data-box {
		background: white;
		border-radius: 8rpx;
		box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);
		z-index: 9999;
	}

	.data-box-shadow {
		background: white;
		border-radius: 8rpx;
		box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);
		z-index: 9999;
	}

	.list-item {
		width: 90%;
		min-height: 80rpx;
		margin-left: 20rpx;
		margin-right: 20rpx;
		border-bottom: 1rpx solid #D8DFEC;
		/* text-align: right; */
	}

	.opera-btns {
		width: 100%;
		height: 80rpx;
		justify-content: flex-end;
	}

	.opera-cancel {
		width: 100rpx;
		height: 50rpx;
		background-color: white;
		box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);
		border-radius: 5rpx;
		font-size: 26rpx;
	}

	.opera-sure {
		width: 100rpx;
		height: 50rpx;
		background-color: #58a2e4;
		box-shadow: 0px 0px 3px 1px rgba(0, 0, 0, 0.1);
		border-radius: 5rpx;
		font-size: 26rpx;
		color: white;
		margin-right: 30rpx;
		margin-left: 30rpx;
	}

	.status-text {
		text-align: center;
		font-size: 28rpx;
		font-weight: 600;
		color: #c2c2c2;
		padding-top: 20rpx;
		padding-bottom: 20rpx;
	}

	.mask {
		position: fixed;
		background: transparent;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
	}

	.show-animate {
		animation-name: open;
		animation-duration: 0.1s;
		animation-iteration-count: 1;
	}

	@keyframes open {
		0% {
			height: 0rpx;
		}

		100% {
			height: 100%;
		}
	}

	.hide-animate {
		animation-name: close;
		animation-duration: 0.1s;
		animation-iteration-count: 1;
		animation-fill-mode: forwards;
	}

	@keyframes close {
		0% {
			height: 100%;
		}

		100% {
			height: 0rpx;
		}
	}

	.ellipsis {

}

</style>
