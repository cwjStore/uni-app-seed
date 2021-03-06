import Vue from 'vue'
import App from './App'
import store from './store/index.js'
import {RouterMount} from 'uni-simple-router';
import router from './router/lib/index.js'
import filters from './utils/filter.js'
Vue.config.productionTip = false


App.mpType = 'app'
import uView from "uview-ui";
Vue.use(uView);
Vue.use(filters)


const app = new Vue({
    ...App,store
})
//v1.3.5起 H5端 你应该去除原有的app.$mount();使用路由自带的渲染方式
// #ifdef H5
	RouterMount(app,'#app');
// #endif

// #ifndef H5
	app.$mount(); //为了兼容小程序及app端必须这样写才有效果
// #endif
