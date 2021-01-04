export default function getToken(){
	return new Promise((resolve,reject)=>{
		uni.getStorage({
			key:'token',
			success: (res) => {
				resolve(res.data)
			},
			fail: () => {
				resolve(null)
			}
		})
	})
}