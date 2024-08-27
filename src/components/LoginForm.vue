<script setup>
	import { ref } from 'vue'
	import { useRouter } from 'vue-router'
	const router = useRouter()
	const data = ref({
		email: '',
		pwd: '',
	})
	const handleSubmit = () => {
		console.log(data.value);
	}
</script>
<template>
	<form class="formControls" @submit.prevent="handleSubmit">
		<h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
		<label class="formControls_label" for="email">Email</label>
		<input class="formControls_input" type="text" id="email" name="email" placeholder="請輸入 email" required>
		<span>此欄位不可留空</span>
		<label class="formControls_label" for="pwd">密碼</label>
		<input class="formControls_input" type="password" name="pwd" id="pwd" placeholder="請輸入密碼" required>
		<input class="formControls_btnSubmit" type="button" onclick="javascript:location.href='#todoListPage'" value="登入">
		<a href="#" class="formControls_btnLink" @click="router.push({name: 'register'})">註冊帳號</a>
	</form>
</template>