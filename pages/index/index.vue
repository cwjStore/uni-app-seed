<template>
	<view class="container">
		首页
		<button @click="click">详情页面</button>
		<!-- #ifdef MP -->
		<!-- 封装的echart只适合小程序，H5与APP需另行开发 -->
		<uni-echart class="uni-ec-canvas" canvasId="line-1" type="line" :source="line_source"></uni-echart>
		<uni-echart class="uni-ec-canvas" canvasId="pie-1" type="pie" :source="pie_source"></uni-echart>
		<uni-echart class="uni-ec-canvas" canvasId="xbar-1" type="xbar" :source="xbar_source"></uni-echart>
		<uni-echart class="uni-ec-canvas" canvasId="ybar-1" type="ybar" :source="ybar_source"></uni-echart>
		<!-- #endif -->
	</view>
</template>

<script>
	import uniEchart from '@/wxcomponents/echart/index.vue'
	export default {
		components: {
			uniEchart
		},
		data() {
			return {
				line_source: {},
				pie_source: {},
				xbar_source: {},
				ybar_source: {}
			}
		},

		onReady() {
			/* 模拟接口数据 */
			setTimeout(() => {
				this.line_source = {
					title: '折线图',
					xAxis: ["2-12", "2-14", "2-16", "2-18", "2-20", "2-22", "2-24"],
					series: [{
						name: "浏览量",
						type: "line",
						smooth: true,
						areaStyle: {
							color: {
								type: "linear",
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
										offset: 0,
										color: "#E50113" // 0% 处的颜色
									},
									{
										offset: 1,
										color: "#fff" // 100% 处的颜色
									}
								],
								global: false // 缺省为 false
							}
						},
						lineStyle: {
							color: "#EF5959"
						},
						data: [120, 132, 101, 134, 90, 230, 210]
					}]
				}
			}, 1000);
			setTimeout(() => {
				this.pie_source = {
					title: '统计',
					series: [{
						name: "访问来源",
						type: "pie",
						center: ['50%', '60%'],
						labelLine: {
							normal: {
								show: false
							},
							emphasis: {
								show: true
							}
						},
						label: {
							show: false
						},
						data: [{
								value: 3321,
								name: "直销中心",
							},
							{
								value: 1148,
								name: "手动录入",
							},
							{
								value: 2532,
								name: "线上访客",
							},
							{
								value: 1148,
								name: "线下拓客",
							},
						]
					}]
				}
			}, 1000)
			setTimeout(() => {
				this.xbar_source = {
					xAxis: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
					series: [{
						name: '直接访问',
						type: 'bar',
						barWidth: '60%',
						data: [10, 52, 200, 334, 390, 330, 220]
					}]
				}
			}, 1000)
			setTimeout(() => {
				this.ybar_source = {
					yAxis: ['巴西', '印尼', '美国'],
					series: [{
							name: '2011年',
							type: 'bar',
							data: [180, 234, 290, 104]
						},
						{
							name: '2012年',
							type: 'bar',
							data: [19, 23, 310, 121]
						}
					]

				}
			})
		},
		methods: {
			click() {
				this.$Router.push({
					name: 'details',
					params: {
						userId: '123'
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.uni-ec-canvas {
		width: 750upx;
		height: 750upx;
		display: block;
	}
</style>
