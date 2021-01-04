export default {
	tooltip: {
		trigger: 'axis',
		axisPointer: { // 坐标轴指示器，坐标轴触发有效
			type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
		}
	},
	grid: {
		left: '3%',
		right: '4%',
		bottom: '3%',
		containLabel: true
	},
	xAxis: {
		type: 'value',
		axisLine: {
			show: true
		},
		splitLine: {
			show: false
		}
	},
	yAxis: {
		type: 'category',
		data: [],
		axisTick: {
			alignWithLabel: true
		}
	},
}
