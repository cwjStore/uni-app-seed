import httpClient from './lib/httpClient.js'
import enumAuth from './lib/auth.js'
import {auth_url,api_url} from './lib/baseUrl.js'

let API = {};
/* 统一管理url */

/* GET请求 */
//无参
API.getList = () => {
	return httpClient.get(`${api_url}/contactList`)
}

//有参
API.getListParams = (params) => {
	return httpClient.get('/contactList', {
		data: params,
	})
}

/* PUT请求 */
API.updateList = (params) => {
	return httpClient.put('/contact/edit',{
		data:params
	})
}

/* POST请求 */
API.postList = (params) =>{
	return httpClient.post('/contact/new/json',{
		data:params
	})
}

/* DELETE请求 */
API.deleteItem = (params) =>{
	return httpClient.delete('/contact',{
		data:params
	})
}

export default API
