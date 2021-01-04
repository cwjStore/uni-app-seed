export default {
	title: {
		text: "",
	},
	legend: {
		top:"5%"
	},
	tooltip: {
		trigger: "axis",
		// formatter: "{b}\r\n{c0}人",
		axisPointer: {
			type: "line",
			axis: "x",
			label: {
				backgroundColor: "#000000"
			}
		}
	},
	grid: {
		left: "6%",
		right: "6%",
		top: "16%",
		bottom: "6%",
		containLabel: true
	},
	xAxis: {
		type: "category",
		boundaryGap: false,
		data: [],
		axisLine: {
			show: true
		},
		axisTick: {
			show: false
		},
		splitLine: {
			show: false
		}
	},
	yAxis: {
		type: "value",
		axisLine: {
			show: true
		},
		axisTick: {
			// y轴刻度线
			show: false
		},
		splitLine: {
			// 网格线
			show: false
		}
	},
}
