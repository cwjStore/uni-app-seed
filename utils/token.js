export default function getToken(){
	var timestamp = Date.parse(new Date()) / 1000;
	return new Promise((resolve,reject)=>{
		uni.getStorage({
			key:'token',
			success: (res) => {
				var tmp = res.data.split("|")
				if(timestamp > tmp[1]){
					/* token过期 */
					uni.removeStorage({
						key:'token',
						success: () => {
							resolve(null)
						}
					})
				}else{
					resolve(tmp[0])
				}
			},
			fail: () => {
				resolve(null)
			}
		})
	})
}