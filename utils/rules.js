/* 校验手机号 */
export function phone(value){
	let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
	return reg.test(value)
}

/* 校验6为密码 */
export function pass(value){
	let reg = /^[A-Za-z0-9]{6}$/;
	return reg.test(value)
}

/* 校验6位数字验证码 */
export function code(value){
	let reg = /^\d{6}$/;
	return reg.test(value)
}