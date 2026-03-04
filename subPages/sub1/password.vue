<template>
	<view class="content">
		<u-form :model="formData" ref="form" label-width="180rpx">
			<u-form-item prop="mobile" label="手机号码" required="true">
				<u-input v-model="formData.mobile" placeholder="请输入手机号码" />
			</u-form-item>

			<u-form-item prop="imgCode" label="图形验证码" required="true">
				<u-input v-model="formData.imgCode" placeholder="请输入图形验证码" clearable />
				<image slot="right" class="img-btn" :src="`data:image/gif;base64,${imgUrl}`" @click="initImage"></image>
			</u-form-item>

			<u-form-item prop="code" label="手机验证码" required="true">
				<u-input v-model="formData.code" placeholder="请输入手机验证码" clearable />
				<view slot="right" class="code-btn">
					<u-button :disabled="countdown > 0" @tap="getSmsCode">
						{{ countdown > 0 ? `${countdown}s后重试` : '获取验证码' }}
					</u-button>
				</view>
			</u-form-item>

			<u-form-item prop="password" label="输入密码" required="true">
				<u-input v-model="formData.password" :password="!showPassword" placeholder="8-20位字母或者数字组合">
					<template slot="suffix">
						<u-icon :name="showPassword ? 'eye-fill' : 'eye-off'" @click="togglePassword" size="28"></u-icon>
					</template>
				</u-input>
			</u-form-item>

			<u-form-item prop="confirmPassword" label="确认密码" required="true">
				<u-input v-model="formData.confirmPassword" :password="!showPassword" placeholder="请输入新密码" />
			</u-form-item>
		</u-form>
		<!-- 密码规则提示 -->
		<view class="password-tips">
			<image src="@/subPages/sub1/static/check.png" style="width: 35rpx;height: 30rpx; align-self: center;"></image>
			<view>密码长度为8-20位，需包含大写字母、小写字母、数字，不允许有空格。</view>
		</view>

		<!-- 注册按钮 -->
		<button class="register-btn" @tap="updatePassword">
			确定重置密码
		</button>
	</view>
</template>

<script>
import * as userApi from '@/subPages/sub1/api/user.js';

export default {
	data() {
		return {
			formData: {
				mobile: '',
				imgCode: '',
				code: '',
				password: '',
				confirmPassword: ''
			},
			imgUrl: '',
			showPassword: false,
			countdown: 0,
			rules: {
				mobile: [
					{
						required: true,
						message: '请输入手机号码',
						trigger: 'blur'
					},
					{
						validator: (rule, value, callback) => {
							const phoneReg = /^1[3-9]\d{9}$/;
							if (!phoneReg.test(value)) {
								callback(new Error('请输入正确的手机号码'));
							} else {
								callback();
							}
						},
						trigger: 'blur'
					}
				],
				imgCode: [
					{
						required: true,
						message: '请输入图形验证码',
						trigger: 'blur'
					},
				],
				code: [
					{
						required: true,
						message: '请输入手机验证码',
						trigger: 'blur'
					},
				],
				password: [
					{ required: true, message: '请输入密码' },
					{
						validator: (rule, value, callback) => {
							if (value.length < 8 || value.length > 20) {
								callback(new Error('密码长度为8-20位'))
							} else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/.test(value)) {
								callback(new Error('密码需包含大写字母、小写字母、数字'))
							} else {
								callback()
							}
						}
					}
				],
				confirmPassword: [
					{
						required: true,
						message: '请确认密码',
						trigger: 'blur'
					},
					{
						validator: (rule, value, callback) => {
							if (value !== this.formData.password) {
								callback(new Error('两次输入的密码不一致'));
							} else {
								callback();
							}
						},
						trigger: 'blur'
					}
				]
			}
		}
	},

	created() {
		this.initImage();
	},

	onReady() {
		this.$refs.form.setRules(this.rules);
	},

	methods: {
		togglePassword() {
			this.showPassword = !this.showPassword;
		},
		initImage() {
			userApi.getcode({ type: 'char' }).then(res => {
				this.imgUrl = res.data.img;
				this.formData.uuid = res.data.uuid;
			})
		},
		getSmsCode() {
			if (this.countdown > 0) return;
			if (!this.formData.mobile) {
				this.$u.toast('请先输入手机号');
				return;
			}
			if (!this.formData.imgCode) {
				this.$u.toast('请先输入图形验证码');
				return;
			}
			userApi.sendSms({
				name: this.formData.mobile,
				code: this.formData.imgCode,
				uuid: this.formData.uuid,
				scene: 22,
			}).then(res => {
				this.$u.toast('短信验证码已发送');
				this.countdown = 60;
				this.timer = setInterval(() => {
					this.countdown--;
					if (this.countdown <= 0) {
						clearInterval(this.timer);
					}
				}, 1000);
			}).catch(err => {
				this.initImage();

			})
		},
		updatePassword() {
			this.$refs.form.validate().then(valid =>
				userApi.resetPassword(this.formData).then(res => {
					if (res.data) {
						this.$u.toast('密码重置成功');
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							});
						}, 1000);
					} else {
						this.$u.toast(res.msg);
					}
				})
			).catch(err => {
				this.$u.toast('请完善信息');

			})
		}
	}
}

</script>

<style scoped lang="scss">
page {
	background-color: #f5f7fb;
}

.content {
	width: 90%;
	padding: 0 40rpx 40rpx 40rpx;
	background-color: #fff;
}

.u-form-item {
	border-bottom: 1rpx solid #e0e0e0;
	padding-bottom: 20rpx;
}

.img-btn {
	width: 180rpx;
	height: 75rpx;
	margin-left: 10rpx;
}

.code-btn {
	background-color: #f8f8f8;
	margin-left: 10rpx;
	white-space: nowrap;

	&:disabled {
		color: #999;
		background-color: #f0f0f0;
	}
}

.password-tips {
	display: flex;
	flex-direction: row;
	font-size: 24rpx;
	color: #999;
	margin-top: 10rpx;
	margin-bottom: 30rpx;
	line-height: 1.5;

	>image {
		margin-right: 10rpx;
	}
}


.register-btn {
	width: 95%;
	height: 88rpx;
	background-color: #cf2135;
	color: #fff;
}
</style>
