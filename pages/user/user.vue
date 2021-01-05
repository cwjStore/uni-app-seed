<template>
	<view class="user">
		<view class="userInfo">
			<image src="../../static/images/user-default.png" class="userHead"></image>
			<view class="text username">{{userInfo.username}}</view>
			<view class="text">{{userInfo.mobile | phone}}</view>
		</view>
		<list v-for="(item,index) in arr" :key="index" :src="item.src" :middle="item.middle" :right="item.right"></list>
		<list-click src="../../../static/images/password.png" middle="密码修改" @click.native="changePass">
			<image src="../../static/images/jump.png" style="width: 11rpx;height: 22rpx;"></image>
		</list-click>
		<button class="long_button" style="width: 700rpx;" @click="logOut">退出登录</button>
	</view>
</template>

<script>
	import list from '@/components/base/list/index.vue'
	import listClick from "@/components/base/listClick/index.vue"
	import API from "@/service/index.js"
	export default {
		components: {
			list,
			listClick
		},
		data() {
			return {
				arr: [{
					src: '../../../static/images/name.png',
					middle: '姓名',
					right: '曹先生'
				}, {
					src: '../../../static/images/phone.png',
					middle: '手机号码',
					right: '18351071268'
				}, {
					src: '../../../static/images/post.png',
					middle: '角色',
					right: '管理员'
				}],
				userInfo: {
					username:'曹先生',
					mobile:'18351071268',
					id:'123'
				}
			};
		},
		onLoad() {
			// this.getUserInfo()
		},
		methods: {
			getUserInfo() {
				API.userMsg().then(res => {
					if (!res.errMsg) {
						this.userInfo = res
						this.arr[0].right = this.userInfo.username;
						this.arr[1].right = this.userInfo.mobile;
						this.arr[2].right = this.userInfo.roleName;
						uni.getStorage({
							key: 'userInfo',
							fail: () => {
								uni.setStorage({
									key: 'userInfo',
									data: this.userInfo
								})
							}
						})
					} else {
						uni.getStorage({
							key: 'userInfo',
							success: (res) => {
								this.userInfo = res.data;
								this.arr[0].right = this.userInfo.username;
								this.arr[1].right = this.userInfo.mobile;
								this.arr[2].right = this.userInfo.roleName;
							}
						})
					}
				})
			},
			logOut() {
				uni.removeStorage({
					key: 'token',
					success: () => {
						this.$Router.replaceAll({
							name: 'login'
						})
					}
				})
			},
			changePass() {
				this.$Router.push({
					name: 'changePass',
					params: {
						userId: this.userInfo.id
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.user {
		font-size: 30rpx;
		background-color: $bg-default-color;
		height: 100vh;
		.userInfo {
			width: 750rpx;
			height: 375rpx;
			background-color: $bg-primary-color;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.userHead {
				width: 120rpx;
				height: 120rpx;
				margin-bottom: 20rpx;
			}
		}
	}
</style>
