<template>
	<view class="container" v-if="lock">
		<view class="bgImg"></view>
		<view class="auth" v-show="isHide">
			<view class="title-l text">打造纺织工业互联网</view>
			<view class="title-r text">助力企业数字化转型</view>
			<button open-type="getUserInfo" @getuserinfo="getuserinfo" class="auth-button">
				微信登录
			</button>
		</view>
		<view v-show="!isHide">
			已授权页面
			<form @submit="formSubmit">
				<u-form :model="form" ref="uForm">
					
					<u-form-item>
						<u-input v-model="form.name" placeholder="请输入手机号"></u-input>
					</u-form-item>
					<u-form-item>
						<u-input v-model="form.pass" placeholder="请输入密码" type="password" passwordIcon></u-input>
					</u-form-item>
					<u-form-item>
						<u-input v-model="form.code" placeholder="请输入手机验证码"></u-input>
					</u-form-item>
				</u-form>
				<button class="login-button bt" form-type="submit">登录</button>
			</form>
		</view>
	</view>
</template>

<script>
	import API from '@/service/index.js'
	export default {
		data() {
			return {
				iv: '',
				encryptedData: '',
				code: '',
			    isHide:true,
				lock:true,
				form:{
					name:'',
					pass:"",
					code:""
				}
			}
		},
		onLoad() {
			// uni.setStorage({
			// 	key:'token',
			// 	data:'hello'
			// })
			// API.getList()
			// #ifndef H5
			/* 获取用户当前设置 */
			this.getuserSet()
			/* 判断用户登录状态是否过期 
			微信不会把session_key的有效期告诉我们，
			用户越频繁使用微信，session_key的有效期就更长*/
			uni.checkSession({
				success: (res) => {
					console.log('checkSession', res)
				},
				fail: (err) => {
					console.log('checkSession', err)
				}
			})
			// #endif
		},
		methods: {
			// #ifndef H5
			/* 获取用户当前设置 */
			getuserSet(){
				uni.getSetting({
					success: (res) => {
						if (!res.authSetting['scope.userInfo']) {
							// 未授权
							this.isHide = true;
						} else {
							// 已授权 
							this.isHide = false;
						}
						/* 判断完再去加载页面 */
						this.lock = true
					},
				});
			},

			getuserinfo(res) {
				if (res.detail.userInfo) {
					/* 获取偏移量 */
					this.iv = res.detail.iv;
					/* 获取加密数据 */
					this.encryptedData = res.detail.encryptedData;
					/* 企业微信小程序不支持 */
					uni.getProvider({
						service: 'oauth',
						success: (res) => {
							if (~res.provider.indexOf('weixin')) {
								uni.login({
									provider: 'weixin',
									success: (loginRes) => {
										/* 获取code(登录凭证) */
										this.code = loginRes.code;
										this.isHide = false;
									}
								});
							}
						}
					});
					console.log(res.detail.userInfo);
					//授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
				} else {
					uni.showModal({
						title: '警告',
						content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
						showCancel: false,
						confirmText: '返回授权',
						success: function(res) {
							// 用户没有授权成功，不需要改变 isHide 的值
							if (res.confirm) {
								console.log('用户点击了“返回授权”');
							}
						}
					})
				}
			},
			// #endif
			click(){
				this.$Router.pushTab({name:'index'})
			},
			formSubmit(e){
				
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
			background-color: #254ad2;
			z-index: -1;
		}

		.auth {
			padding: 0 75rpx;
			.title-l{
				padding-left: 47rpx;
			}
			.title-r{
				
			}
			.auth-button {
				font-family: PingFang-SC-Medium;
				font-size: 32rpx;
				font-weight: normal;
				font-stretch: normal;
				letter-spacing: 0px;
				color: #344ff9;
				height: 60rpx;
				line-height: 60rpx;
			}
		}
	}
</style>
