<script setup>
import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	const router = useRouter()
	const data = ref({
		email: '',
		name: '',
		pwd: '',
		pwd2: '',
	})
	const handleSubmit = () => {
		console.log(data.value);
	}
</script>
<template>
	<form class="formControls" @submit.prevent="handleSubmit">
		<h2 class="formControls_txt">註冊帳號</h2>
		<label class="formControls_label" for="email">Email</label>
		<input class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required v-model="data.email">
		<label class="formControls_label" for="name">您的暱稱</label>
		<input class="formControls_input" type="text" name="name" id="name" placeholder="請輸入您的暱稱" v-model="data.name">
		<label class="formControls_label" for="pwd">密碼</label>
		<input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required v-model="data.pwd">
		<label class="formControls_label" for="pwd2">再次輸入密碼</label>
		<input class="formControls_input" type="password" name="pwd2" id="pwd2" placeholder="請再次輸入密碼" required v-model="data.pwd2">
		<input class="formControls_btnSubmit" type="button" value="註冊帳號" @click="handleSubmit">
		<a href="#" class="formControls_btnLink" @click="router.push({name: 'login'})">登入</a>
	</form>
</template>