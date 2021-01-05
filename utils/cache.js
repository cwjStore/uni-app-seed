export default function cache(key,data,time) {
	var timestamp = Date.parse(new Date()) / 1000;
	if(!time){
		var expire = timestamp + (3600 * 24 * 30);
	}else{
		var expire = timestamp + time;
	}
	data = data + "|" + expire;
	uni.setStorage({
		key,
		data
	})
}
