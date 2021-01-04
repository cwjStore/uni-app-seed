import httpClient from './lib/httpClient.js'
import enumAuth from './lib/auth.js'
import {auth_url,api_url} from './lib/baseUrl.js'

let API = {};

API.getCode = (params)=>{
	return httpClient.post('/lujin',{
		data:params
	})
}


export default API