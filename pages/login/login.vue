<template>
	<!-- #ifdef MP-WEIXIN -->
	<view class="container" v-if="lock">
		<view v-show="isHide">
			<!-- 未授权页面 -->
			<view class="bgImg">
				<image src="../../static/images/authbg.jpg"></image>
			</view>
			<view class="auth">
				<view class="title-l text">打造纺织工业互联网</view>
				<view class="title-r text">助力企业数字化转型</view>
				<!-- 企业APPID才有权限获取用户手机号 -->
				<!-- <button open-type="getPhoneNumber" @getphonenumber="getphonenumber" class="long_button auth_button">
					微信登录
				</button> -->
				<!-- 模拟微信登录 -->
				<button class="long_button auth_button" @click="fake_auth">
					微信登录
				</button>
			</view>
			<!-- <official-account style="position: absolute;width: 100%;bottom: 0;"></official-account> -->
		</view>
		<view v-show="!isHide">
			<!-- 已授权页面 -->
			<view class="loginBg"></view>
			<view class="card">
				<view class="card-container">
					<view class="card-title">欢迎登录</view>
					<view class="card-content">
						<u-form :model="form" ref="uForm">
							<u-form-item>
								<input type="number" v-model="form.phone" maxlength="11" placeholder="请输入手机号" hold-keyboard="true"
								 placeholder-class="placeholderClass" />
							</u-form-item>
							<u-form-item>
								<view class="input_border">
									<input v-model="form.pass" maxlength="6" placeholder="请输入密码" :password="showPassword" placeholder-class="placeholderClass" />
									<view :class="[showPassword?'icon iconfont icon-yanjing1':'icon iconfont icon-yanjing']" @click="showPass"
									 class="icon"></view>
								</view>
							</u-form-item>
							<u-form-item>
								<view class="inputBox">
									<input type="number" v-model="form.code" placeholder="请输入手机验证码" class="input" maxlength="6" hold-keyboard="true"
									 placeholder-class="placeholderClass" />
									<u-button size="mini" slot="right" type="primary" @click="getCode">{{codeText}}</u-button>
								</view>
								<u-verification-code ref="uCode" @change="codeChange"></u-verification-code>
							</u-form-item>
						</u-form>
						<!-- <button class="long_button" @click="login">登录</button> -->
						<!-- 模拟登陆 -->
						<button class="long_button" @click="fake_login">登录</button>
					</view>
				</view>
			</view>
			<u-toast ref="uToast" />
		</view>
	</view>
	<view class="container" v-else>
		<!-- 缓存页面 -->
		<view class="bgImg">
			<image src="../../static/images/authbg.jpg"></image>
		</view>
		<view class="auth">
			<view class="title-l text">打造纺织工业互联网</view>
			<view class="title-r text">助力企业数字化转型</view>
		</view>
	</view>
	<!-- #endif -->
	<!-- #ifndef MP-WEIXIN -->
	<view>该框架版本为微信小程序版本，请使用微信开发工具查看效果</view>
	<!-- #endif -->
</template>

<script>
	import API from '@/service/index.js'
	import cache from "@/utils/cache.js"
	import {
		phone,
		pass,
		code
	} from "@/utils/rules.js"
	export default {
		data() {
			return {
				iv: '',
				encryptedData: '',
				code: '',
				isHide: false,
				lock: false,
				form: {
					phone: '',
					pass: "",
					code: ""
				},
				codeText: '发送验证码',
				showPassword: true
			}
		},
		async onLoad() {
			// #ifdef MP-WEIXIN
			await this.getLoginCode()
			await this.getStatus()
			// #endif
		},
		methods: {
			// #ifdef MP-WEIXIN
			getLoginCode() {
				let that = this
				return new Promise((resolve, reject) => {
					uni.login({
						provider: 'weixin',
						success: (loginRes) => {
							/* 获取code(登录凭证) */
							that.code = loginRes.code;
							resolve()
						}
					});
				})
			},
			getStatus() {
				return new Promise((resolve, reject) => {
					uni.getStorage({
						key: 'auth',
						success: () => {
							/* 授权 */
							this.isHide = false;
						},
						fail: () => {
							/* 未授权 */
							this.isHide = true;
						},
						complete: () => {
							/* 判断完再去加载页面 */
							this.lock = true
							resolve()
						}
					})
				})
			},
			fake_auth(){
				uni.setStorage({
					key: 'auth',
					data: true
				})
				this.isHide = false;
			},
			fake_login(){
				uni.setStorage({
					key:'token',
					data:'hello'
				})
				this.$Router.pushTab({
					name: 'index'
				})
			},
			getphonenumber(val) {
				if (val.detail.iv) {
					/* 获取偏移量 */
					this.iv = val.detail.iv;
					/* 获取加密数据 */
					this.encryptedData = val.detail.encryptedData;
					/* 获取手机号 */
					let params = {
						code: this.code,
						encryptedData: this.encryptedData,
						iv: this.iv
					}
					/* 解析出用户手机号 */
					API.weChat(params).then(res => {
						if (res.phone) {
							uni.setStorage({
								key: 'wxphone',
								data: res.phone
							})
						}
					})
					uni.setStorage({
						key: 'auth',
						data: true
					})
					this.isHide = false;
				} else {
					uni.showModal({
						title: '警告',
						content: '您点击了拒绝授权，将无法收到公众号消息!!!',
						confirmText: '确定',
						success: (res) => {
							if (res.confirm) {
								this.isHide = false;
								uni.setStorage({
									key: 'auth',
									data: true
								})
							}
						}
					})
				}
			},
			// #endif
			getCode() {
				if (phone(this.form.phone)) {
					if (this.$refs.uCode.canGetCode) {
						/* 获取验证码 */
						let params = {
							loginType: 'APP',
							telephone: this.form.phone
						}
						API.getCode(params).then(res => {
							this.$refs.uCode.start();
						})
					} else {
						this.$u.toast('倒计时结束后再发送');
					}
				} else {
					this.$refs.uToast.show({
						title: '请输入11位有效手机号',
						type: 'error',
						icon: false
					})
				}
			},
			codeChange(text) {
				this.codeText = text;
			},
			showPass() {
				this.showPassword = !this.showPassword
			},
			login() {
				if (phone(this.form.phone)) {
					if (pass(this.form.pass)) {
						if (code(this.form.code)) {
							let params = {
								phoneNumber: this.form.phone,
								code: this.form.code
							}
							/* 验证验证码 */
							API.checkoutCode(params).then(res => {
								if (res.msg === 'OK') {
									let params = {
										grant_type: 'password',
										username: `pr_${this.form.phone}`,
										password: this.form.pass
									}
									/* 获取token */
									API.token(params).then(res => {
										if (res.access_token) {
											/* 给token增加时间戳 */
											cache('token', res.access_token)
											uni.getStorage({
												key: 'auth',
												success: () => {
													/* 授权 ,绑定*/
													uni.getStorage({
														key: 'wxphone',
														success: (res) => {
															let params = {
																wxPhone: res.data
															}
															/* 后台绑定手机号 */
															API.bind(params)
														}
													})
												}
											})
											this.$Router.pushTab({
												name: 'index'
											})
										} else {
											this.$refs.uToast.show({
												title: '密码错误',
												type: 'error',
												icon: false
											})
										}
									})
								} else {
									this.$refs.uToast.show({
										title: res.msg,
										type: 'error',
										icon: false
									})
								}
							})
						} else {
							this.$refs.uToast.show({
								title: '验证码6位数',
								type: 'error',
								icon: false
							})
						}
					} else {
						this.$refs.uToast.show({
							title: '请输入由数字、字母组成的六位密码',
							type: 'error',
							duration:3000,
							icon: false
						})
					}
				} else {
					this.$refs.uToast.show({
						title: '请输入11位有效手机号',
						type: 'error',
						icon: false
					})
				}
			}
		}
	}
</script>

<style lang="scss">
	.container {
		position: relative;
		height: 100vh;


		.bgImg {
			position: absolute;
			top: 0;
			bottom: 0;
			left: 0;
			right: 0;
			z-index: -1;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.auth {
			padding: 75rpx;
			height: calc(100vh - 150rpx);

			.title-l {
				padding-left: 47rpx;
				font-size: 36rpx;
			}

			.title-r {
				margin-top: 34rpx;
				text-align: right;
				font-size: 36rpx;
			}

			.auth_button {
				color: #344ff9;
				position: absolute;
				bottom: 350rpx;
				background-color: #fff;
			}
		}

		.loginBg {
			width: 750rpx;
			height: 273rpx;
			background-color: $bg-primary-color;
		}

		.card-title {
			text-align: center;
			font-size: 42rpx;
			color: #182fbf;
			font-weight: bold;
		}

		.card-content {
			.list {
				border-bottom: 1px solid #344ff9;
			}

			.inputBox {
				display: flex;

				.input {
					width: 100%;
					height: 35px;
					line-height: 35px;
				}
			}
		}

		.input_border {
			display: flex;
			justify-content: space-between;
			align-items: center;

			input {
				height: 1.4rem;
				line-height: 1.4rem;
				width: 100%;
			}

			.icon {
				font-size: 28rpx;
				width: 70rpx;
				text-align: center;
			}
		}
		.card {
			margin: 0 auto;
			position: relative;
			top: -104rpx;
			background-color: #ffffff;
			box-shadow: 0px 1px 18px 0px rgba(7, 15, 70, 0.24);
			height: 638rpx;
			width: 700rpx;
			border-radius: 6rpx;
		}
		.card-container{
			padding: 60rpx;
		}
	}
</style>
