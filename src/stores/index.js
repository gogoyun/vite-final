import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { checkToken } from '@/utils/api.js'
export const useUserStore = defineStore('user', () => {
	const router = useRouter();
	const userInfo = ref({
		token: '',
		expired: 0,
		name: '',
	})
	const tokenStr = localStorage.getItem('token')
	if (!tokenStr) {
		localStorage.clear();
		router.push({ name: 'login' });
	}else{
		// 檢查token是否過期
		const expiry = JSON.parse(tokenStr).expiry;
		if( new Date().getTime() < expiry ) {
			localStorage.clear();
			router.push({name: 'login'});
		}
		//檢查token是否有效
		checkToken(JSON.parse(tokenStr).value)
			.then(res => {
				if(!res.data.status) {
					localStorage.clear();
					router.push({name: 'login'});
				}
			}).catch(err => {
				if(!err.response.data.status) {
					alert('請重新登入');
					localStorage.clear();
					router.push({name: 'login'});
				}
			})
		//將token資訊存入userInfo
		userInfo.value = {
			token: JSON.parse(tokenStr).value,
			expired: JSON.parse(tokenStr).expiry,
			name: localStorage.getItem('name'),
		}
	}
	return { userInfo }
});