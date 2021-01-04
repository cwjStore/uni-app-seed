import modules from '../index.js'
import getToken from '@/utils/token.js'
import Vue from 'vue'
import Router from 'uni-simple-router'

Vue.use(Router)
//初始化
const router = new Router({
    routes: [...modules]//路由表
});

//全局路由前置守卫
router.beforeEach(async (to, from, next) => {
	// if(to.name == 'login'){
	// 	next()
	// 	return;
	// }
	// await getToken().then(res=>{
	// 	if(res){
	// 		next()
	// 	}else{
	// 		router.push({name:'login'})
	// 	}
	// })
	next()
})
// 全局路由后置守卫
router.afterEach((to, from) => {
})
export default router;