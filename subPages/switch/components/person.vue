<template>
	<view>
		<view class="bcg">
			<image class="bgImg" src="@/subPages/switch/static/mine.png" mode="widthFix"></image>
			<view class="person">
				<image src="@/subPages/switch/static/avatar.png" mode="" style="width: 108rpx;height: 108rpx;"></image>
				<view class="user">
					<view>{{ personInfo.nickname }}</view>
					<view class="account" v-if="personInfo.username">id:{{ personInfo.username }}</view>
				</view>
			</view>
		</view>
		<u-cell-group>
			<u-cell icon="setting-fill" title="申请企业信息" :isLink="true" url="/subPages/mine/company"
				titleStyle="color:#606266;">
				<image slot="icon" src="../static/mine/company.svg" mode=""
					style="width: 48rpx;height: 48rpx;margin-right: 8px;">
				</image>
			</u-cell>
			<u-cell icon="setting-fill" title="个人信息" :isLink="true" url="/subPages/mine/userInfo" titleStyle="color:#606266;">
				<image slot="icon" src="../static/mine/person.svg" mode=""
					style="width: 48rpx;height: 48rpx;margin-right: 8px;">
				</image>
			</u-cell>

			<u-cell icon="setting-fill" v-if="show" title="我的推荐码" :isLink="true" url="/subPages/mine/qrcode"
				titleStyle="color:#606266;">
				<image slot="icon" src="../static/mine/code.svg" mode="" style="width: 48rpx;height: 48rpx;margin-right: 8px;">
				</image>
			</u-cell>

			<u-cell icon="setting-fill" title="专属客服" :isLink="true" @click="btnClick" titleStyle="color:#606266;">
				<image slot="icon" src="../static/mine/customer.svg" mode=""
					style="width: 48rpx;height: 48rpx;margin-right: 8px;">
				</image>
			</u-cell>

			<u-cell icon="setting-fill" title="客服热线" :isLink="true" url="/subPages/mine/phone?phone"
				titleStyle="color:#606266;">
				<image slot="icon" src="../static/mine/phone.svg" mode="" style="width: 48rpx;height: 48rpx;margin-right: 8px;">
				</image>
			</u-cell>

			<u-cell icon="setting-fill" title="修改密码" :isLink="true" url="/subPages/mine/password" titleStyle="color:#606266;">
				<image slot="icon" src="../static/mine/password.svg" mode=""
					style="width: 48rpx;height: 48rpx;margin-right: 8px;">
				</image>
			</u-cell>

			<u-cell title="设置" :isLink="true" url="/subPages/mine/setting" titleStyle="color:#606266;">
				<image slot="icon" src="../static/mine/setting.svg" mode=""
					style="width: 48rpx;height: 48rpx;margin-right: 8px;">
				</image>
			</u-cell>

		</u-cell-group>

		<view class="loginOut">
		</view>
	</view>
</template>

<script>
import apiConfig from '@/utils/ip.js';
import * as userApi from '@/api/index.js'
import store from '../../../store';
export default {
	data() {
		return {
			personInfo: {
				nickname: '',
				username: '',
			},
			code: "",
			show: false,
		}
	},

	mounted() {
		this.getAppSession();
		console.log(this.$store.state.user.userInfo, "this.personInfo---------")

	},

	created() {

	},
	methods: {
		// 功能按钮导航
		async btnClick() {
			let res = await uni.showModal({
				title: "提示",
				content: " 确认联系在线客服吗？",
				confirmText: "确定",
				cancelText: "取消"
			})
			console.log(res, "res")
			if (res.confirm) {
				//#ifdef WEB
				window.open("https://work.weixin.qq.com/kfid/kfc5a0f7ae35c4a1d7a")
          //#endif
        //#ifdef MP-WEIXIN
        wx.openCustomerServiceChat({
          extInfo: { url: 'https://work.weixin.qq.com/kfid/kfc5a0f7ae35c4a1d7a' },
          corpId: apiConfig.corpId,
          success(res) {
            console.log(res, "1")
          },
          fail(res) {
            // console.log(res,"1")
            uni.showModal({
              title: '错误提示2', //提示标题
              content: `${res.errMsg}`, //提示内容
              showCancel: false, //是否显示取消按钮
              success: function (res) {
              }
            })
          },
        });
        //#endif
			}
		},
		// 获取用户信息
		getAppSession() {
			userApi.getUserInfo().then(res => {
				this.personInfo = this.$store.state.user.userInfo;
				if (this.personInfo.nickname.includes('-')) {
					this.show = true;
				}
			})
		},

	},
}
</script>

<style lang="scss" scoped>
.bgImg {
	width: 100%;
	height: auto;
}

.bcg {
	position: relative;

	.person {
		position: absolute;
		display: flex;
		flex-direction: row;
		top: 200rpx;
		left: 50rpx;

		.user {
			font-size: 34rpx;
			margin-left: 20rpx;
			color: #ffffff;
			overflow: hidden;

			.account {
				font-size: 26rpx;
				margin-top: 10rpx;
			}
		}
	}
}
</style>
