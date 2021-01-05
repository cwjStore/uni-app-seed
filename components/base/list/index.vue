<template>
	<view class="list">
		<view class="left">
			<image :src="src" class="icon"></image>
		</view>
		<view class="middle">{{middle}}</view>
		<view class="right" v-if="middle == '手机号码'">{{right | phone}}</view>
		<view class="right" v-else>{{right}}</view>
	</view>
</template>

<script>
	export default{
		props:['src','middle','right']
	}
</script>

<style lang="scss">
	.list {
		display: flex;
		height: 90rpx;
		border-bottom: 1rpx solid #eef3f7;
		align-items: center;
		background-color: #fff;
		.left {
			width: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.icon {
			width: 32rpx;
			height: 32rpx;
		}

		.middle {
			flex: 1;
		}

		.right {
			margin-right: 26rpx;
			font-size: 26rpx;
			color: #999;
		}
	}
</style>
