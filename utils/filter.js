export default function filters(Vue) {
    /* 影藏手机号中间四位 */
    Vue.filter('phone', function(value) {
    	if(typeof value !== "undefined"){
    		return value.substr(0,3)+'****'+value.substr(7);
    	}
    });
}