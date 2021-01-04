import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
		phone:"183", 
	},
    mutations: {
		SET_PHONE(state,data){
			state.phone = data
		},
	},
    actions: {}
})
export default store