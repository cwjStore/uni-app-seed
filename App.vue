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
</style>
