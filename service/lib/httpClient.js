import qs from 'qs'
import enumAuth from './auth'
import getToken from '@/utils/token.js'
import {auth_url} from './baseUrl.js'
class httpClient{
	constructor() {
	    this.headers = {};//预留字段
		this.token = '';
	}

	/* 请求拦截器
	 功能：请求配置，鉴权*/
	async interceptorsRequest(url,{auth,method,data}){
	    let headers = null;
		//获取token
		await getToken().then(res=>{
			if(res){
				this.token = res;
			}
		})
		//通过鉴权产出headers
		switch(auth){
			case enumAuth.Level01: //需要token
			headers = Object.assign({},this.headers,{
				Authorization:`Basic ${this.token}`
			});
			break;
			case enumAuth.Level02: //前端固定token
			headers = Object.assign({},this.headers,{
				Authorization:`Basic 22222`
			});
			break;
			case enumAuth.Level03: //不需要token
			headers = Object.assign({},this.headers);
			break;
		}
		
		if(method ==='GET'||method==='HEAD'||method==='DELETE'){
			data= qs.stringify(data,{arrayFormat:'repeat'});
			url=`${url}?${data}`
		}
		/* 登录接口使用formData数据格式 */
		if(url===`${auth_url}/oauth/token`){
			Object.assign(headers,{
				'content-type': 'application/x-www-form-urlencoded'
			})
		}
		uni.showLoading({
			title:'加载中',
			mask:true
		})
		return {url,method,data,headers}
	}
	/* uni请求 */
	httpRequst(req){
		return new Promise((resolve,reject)=>{
			uni.request({
				url:req.url,
				method:req.method || 'GET',
				data:req.data || {},
				header:req.headers || {},
				success: (res) => {
					uni.hideLoading()
					resolve(res.data);
				},
				fail: (err) => {
					uni.hideLoading()
					uni.showToast({
						icon:'none',
						title:'网络出现异常',
						duration:3000
					})
					resolve(err)
				}
			})
		})
	}
	
	/* 请求工厂 */
	async httpFactory(url='',{data=null,auth=enumAuth.Level01,method}){
		let req = await this.interceptorsRequest(url,{auth,method,data});
		let res = await this.httpRequst(req);
		return res
	}
	async get(url,params){
		return await this.httpFactory(url,{...params,method:'GET'})
	}
	async put(url,params){
		return await this.httpFactory(url,{...params,method:'PUT'})
	}
	async delete(url,params){
		return await this.httpFactory(url,{...params,method:'DELETE'})
	}
	async post(url,params){
		return await this.httpFactory(url,{...params,method:'POST'})
	}
}

export default new httpClient()

