import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router';
export const useUserStore = defineStore('user', () => {
	const tokenStr = localStorage.getItem('token')
	if (!tokenStr) {
		localStorage.clear();
		const router = useRouter();
		router.push({ name: 'login' });
	}
  const userInfo = ref({
		token: JSON.parse(tokenStr).value,
		expired: JSON.parse(tokenStr).expiry,
		name: localStorage.getItem('name'),
	})
	return { userInfo }
});