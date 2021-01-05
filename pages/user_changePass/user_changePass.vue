<template>
	<view class="changePass">
		<view class="input_border">
			<input v-model="form.newPass" maxlength="6" placeholder="请输入新密码" :password="showPassword" placeholder-class="placeholderClass"/>
			<view :class="[showPassword?'icon iconfont icon-yanjing1':'icon iconfont icon-yanjing']" @click="showPass" class="icon"></view>
		</view>
		<view class="input_border">
			<input v-model="form.rePass" maxlength="6" placeholder="再次输入新密码" :password="showRePassword" placeholder-class="placeholderClass" />
			<view :class="[showRePassword?'icon iconfont icon-yanjing1':'icon iconfont icon-yanjing']" @click="showRePass" class="icon"></view>
		</view>
		<button class="long_button" style="width: 650rpx;" @click="save">保存</button>
		<u-toast ref="uToast" />
	</view>
</template>

<script>
	import {
		pass
	} from "@/utils/rules.js";
	import API from "@/service/index.js"
	export default {
		data() {
			return {
				form: {
					newPass: "",
					rePass: "",
					id: ''
				},
				showPassword: true,
				showRePassword: true
			};
		},
		onLoad() {
			this.form.id = this.$Route.query.userId
		},
		methods: {
			save() {
				if (pass(this.form.newPass)) {
					if (this.form.newPass === this.form.rePass) {
						let params = {
							id: this.form.id,
							loginFirst: '1',
							newPassword: this.form.rePass
						}
						API.password(params).then(res => {
							this.$refs.uToast.show({
								title: '密码修改成功',
								type: 'success',
							})
							this.$Router.pushTab({
								name: 'user'
							})
						})
					} else {
						this.$refs.uToast.show({
							title: '两次密码输入不一致',
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
			},
			showPass() {
				this.showPassword = !this.showPassword
			},
			showRePass() {
				this.showRePassword = !this.showRePassword
			}
		}
	}
</script>

<style lang="scss">
	.changePass {
		padding: 50rpx;
		height: 100vh;
		background-color: $bg-default-color;
	}

	.input_border {
		background-color: #fff;
		padding: 0 10px;
		text-align: left;
		border-radius: 10rpx;
		border: 1px solid #dcdfe6;
		box-shadow: 0px 1px 4px 0px rgba(0, 23, 165, 0.18);
		font-size: 28rpx;
		color: #303133;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		input {
			min-height: 35px;
			line-height: 35px;
			width: 100%;
		}

		.icon {
			font-size: 28rpx;
			width: 70rpx;
			text-align: center;
		}
	}
</style>
