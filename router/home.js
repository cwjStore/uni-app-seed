/* 主页模块 */
const home = [{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/index/index',
		name: 'index',
		meta: {
			title: '主页',
		},
	},
	{
		path: '/pages/index_details/index_details',
		name: 'details',
		meta: {
			title: '主页-机台详情',
		},
	},
	{
		path: '/pages/index_contrast/index_contrast',
		name: 'contrast',
		meta: {
			title: '主页-机台对比',
		},
	},
	{
		path: '/pages/index_monitoring/index_monitoring',
		name: 'monitoring',
		meta: {
			title: '主页-工艺监控',
		},
	},
	{
		path: '/pages/index_statistics/index_statistics',
		name: 'statistics',
		meta: {
			title: '主页-品种统计',
		},
	},
]
export default home
