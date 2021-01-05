<template>
	<uni-ec-canvas :canvasId="canvasId" :ec="ec"></uni-ec-canvas>
</template>

<script>
	import uniEcCanvas from '../ec-canvas/uni-ec-canvas.vue'
	export default {
		components: {
			uniEcCanvas
		},
		props: {
			canvasId: {
				type: String,
				required: true
			},
			/* line,xbar,ybar,pie */
			type: {
				type: String,
				required: true
			},
			source: {
				type: Object,
				default: {}
			}
		},
		watch: {
			source: {
				handler(params) {
					/* 数据会被缓存，定义新的内容空间 */
					this.ec.option = Object.assign({},{...this.ec.option}, {
						series: params.series
					})
					/* 有标题传标题 */
					if (params.title) {
						this.ec.option.title = Object.assign({}, {
							text: params.title,
							...params.title
						})
					}
					/* 有X轴传X轴 */
					if (params.xAxis) {
						this.ec.option.xAxis = Object.assign({}, {
							data: params.xAxis
						})
					}
					/* 有Y轴传Y轴 */
					if (params.yAxis) {
						this.ec.option.yAxis = Object.assign({}, {
							data: params.yAxis
						})
					}
					// if (params.legend) {
					// 	this.ec.option.legend = Object.assign({}, this.ec.option.legend, params.legend)
					// }
				},
				deep: true,
			}
		},
		data() {
			return {
				ec: {
					option: {}
				},
			}
		},
		onReady() {
			switch (this.type) {
				case 'line':
					Object.assign(this.ec, {
						option: require('./config/line.js').default
					})
					break;
				case 'pie':
					Object.assign(this.ec, {
						option: require('./config/pie.js').default
					})
					break;
				case 'xbar':
					Object.assign(this.ec, {
						option: require('./config/xbar.js').default
					})
					break;
				case 'ybar':
					 Object.assign(this.ec, {
						option: require('./config/ybar.js').default
					})
					break;
				default:
					return;
					
			}
		},
	}
</script>

<style>

</style>
