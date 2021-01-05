<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	@import url("./assets/icon/iconfont.css");

	/*每个页面公共css */
	/* 全局字体样式 */
	.text {
		color: #FFFFFF;
		font-family: PingFang-SC-Bold;
		font-size: 36rpx;
		font-weight: normal;
		font-stretch: normal;
		letter-spacing: 0px;
	}
	.long_button{
		margin-top: 80rpx;
		background-color: $button-primary-color;
		color: #fff;
		height: 72rpx;
		width: 600rpx;
		line-height: 72rpx;
		font-family: PingFang-SC-Medium;
		font-size: 32rpx;
		font-weight: bold;
		font-stretch: normal;
		letter-spacing: 0px;
	}
	.placeholderClass{
		color: #c0c4cc;
	}
</style>
