<script setup>
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	import { signUp, signIn } from '@/utils/api'
	const router = useRouter()
	const data = ref({
		email: '',
		nickname: '',
		password: '',
		password_confirm: '',
	})
	const handleSubmit = async() => {
		if (data.value.password !== data.value.password_confirm) {
			alert('密碼不一致請重新輸入');
			return false;
		}else{
			await signUp({
				email: data.value.email,
				password: data.value.password,
				nickname: data.value.nickname,
			})
			.then(async(res) => {
				if (res.data.status) {
					alert('註冊成功');
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
							console.log(err);
						});
				}else{
					alert(res.data.message);
				}
			}).catch(err => {
				console.log(err);
			});
		}
	}
</script>
<template>
	<form class="formControls" @submit.prevent="handleSubmit">
		<h2 class="formControls_txt">註冊帳號</h2>
		<label class="formControls_label" for="email">Email</label>
		<input class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required v-model="data.email">
		<label class="formControls_label" for="name">您的暱稱</label>
		<input class="formControls_input" type="text" name="name" id="name" placeholder="請輸入您的暱稱" v-model="data.nickname">
		<label class="formControls_label" for="pwd">密碼</label>
		<input class="formControls_input" type="password" name="pwd" id="pwd" minlength="6" placeholder="請輸入密碼" required v-model="data.password">
		<label class="formControls_label" for="pwd2">再次輸入密碼</label>
		<input class="formControls_input" type="password" name="pwd2" id="pwd2" minlength="6" placeholder="請再次輸入密碼" required v-model="data.password_confirm">
		<input class="formControls_btnSubmit" type="submit" value="註冊帳號">
		<a class="formControls_btnLink" @click="router.push({name: 'login'})">登入</a>
	</form>
</template>