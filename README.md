## 目录结构
|-assets
  |-icon (字体图标)
  |-scss
    |-variable.scss (全局css变量)
|-components 
  |-base (项目组件)
  |-uni-ui (其他文件为uni-ui扩展组件)
|-node_modules
|-pages (页面)
  |-index
    |-index.vue (主页)
  |-index_contrast
    |-index_contrast.vue (主页-机台对比)
  |-login
    |-login.vue (授权与登录页)
  |-message
    |-message.vue (消息页)
  |-user
    |-user.vue (我的页)
|-platforms (条件编译平台)
  |-mp-weixin (运行在微信小程序环境才会编译的页面，只能放vue文件)
|-router
  |-lib (路由模块)
      |-index.js (注册路由)
  |-home.js (主页路由)
  |-index.js (合并路由并导出)
  |-login.js (登录路由)
  |-message.js (消息路由)
  |-user.js (我的路由)
|-service
  |-lib
    |-auth.js (鉴权)
    |-baseUrl.js (基础路径)
    |-httpClient.js (请求)
  |-example.js (接口请求示例)
  |-home.js (主页接口)
  |-index.js (合并接口并导出)
  |-login.js (登录接口)
  |-message.js (消息接口)
  |-user.js (我的接口)
|-static
  |-images (项目图片)
  |-mp-weixin (运行在微信小程序环境才会导出的静态资源文件)
|-store
  |-index.js (状态管理仓库)
|-utils (自定义js工具包)
  |-cache.js (缓存token)
  |-date.js (获取当前日期)
  |-filter.js (自定义全局过滤)
  |-rules.js (自定义校验规则)
  |-token.js (获取token)
|-uview-ui (uview组件)
|-wxcomponents (运行在微信小程序环境才会编译的组件)
  |-ec-canvas (echart适用于微信小程序组件)
  |-echart
    |-config (echart配置文件)
      |-line.js (折线图配置)
      |-pie.js (饼图配置)
      |-xbar.js (竖向柱状图)
      |-ybar.js (横向柱状图)
    |-index.vue (echart组件)
|-.gitignore
|-App.vue
|-main.js
|-manifest.json
|-package.json
|-package-lock.json
|-pages.json
|-uni.scss

## 文件命名规则

以小写字母开头驼峰命名
若页面与tabBar页面想关联，使用下划线_命名(如：index为主页,index_details为主页的详情页)

## 路由
新建页面时除了pages.json增加页面路径外，需要在router文件夹下找到相应模块并定义路由路径;
如果有新增模块，需新建js文件;

示例：
/* 主页模块 */
const home = [{
		//注意：path必须跟pages.json中的地址对应，最前面别忘了加'/'哦
		path: '/pages/index/index',
		name: 'index',
		meta: {
			title: '首页',
		},
	},
	{
		path: '/pages/index/list/list',
		name: 'list',
		meta: {
			title: '列表',
		},
	},
]
export default home

## 路由定义规则

对象中有path,name,meta字段，title要声明该路由代表的业务页面

## 页面跳转

this.$Router.push() 等同于 uni.navigateTo()
this.$Router.replace() 等同于 uni.redirectTo()
this.$Router.replaceAll() 等同于 uni.reLaunch()
this.$Router.pushTab() 等同于 uni.switchTab()
this.$Router.back(n) 等同于 uni.navigateBack()

## 页面跳转规则

使用命名路由跳转

示例：
无参：this.$Router.push({ name: 'router1'})
有参：this.$Router.push({ name: 'router1', params: { userId: '123' }})

接参：this.$Route.query

## 服务接口

定义服务接口，可在service/example.js文件中查看示例

使用服务接口

示例：

引入
import API from '@/service/index.js'

使用
let params = {
    id:1233
} //定义传参
API.getList(params).then(res=>{
    //接收数据
})