<script setup>
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { signIn } from '@/utils/api'
	const router = useRouter()
	const data = ref({
		email: '',
		password: '',
	})
	const handleSubmit = async() => {
		await signIn({
			email: data.value.email,
			password: data.value.password,
		})
			.then((res) => {
				if (res.data.status) {
					localStorage.setItem('token', JSON.stringify({
						value: res.data.token,
						expiry: res.data.exp,
					}));
					localStorage.setItem('name', res.data.nickname);
					router.push({name: 'home'});
				}
			}).catch(err => {
				alert(err.response.data.message);
			});
	}
</script>
<template>
	<form class="formControls" @submit.prevent="handleSubmit">
		<h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
		<label class="formControls_label" for="email">Email</label>
		<input class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required v-model="data.email">
		<label class="formControls_label" for="pwd">密碼</label>
		<input class="formControls_input" type="password" name="pwd" id="pwd" minlength="6" placeholder="請輸入密碼" required v-model="data.password">
		<input class="formControls_btnSubmit" type="submit" value="登入">
		<a class="formControls_btnLink" @click="router.push({name: 'register'})">註冊帳號</a>
	</form>
</template>