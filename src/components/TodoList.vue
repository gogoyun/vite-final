<script setup>
  
</script>
<template>
	<div class="todoList_list">
		<ul class="todoList_tab">
			<li><a href="#" class="active">全部</a></li>
			<li><a href="#">待完成</a></li>
			<li><a href="#">已完成</a></li>
		</ul>
		<div class="todoList_items">
			<ul class="todoList_item">
				<li>
					<label class="todoList_label">
						<input class="todoList_input" type="checkbox" value="true">
						<span>把冰箱發霉的檸檬拿去丟</span>
					</label>
					<a href="#">
						<i class="fa fa-times"></i>
					</a>
				</li>
				<li>
					<label class="todoList_label">
						<input class="todoList_input" type="checkbox" value="true">
						<span>打電話叫媽媽匯款給我</span>
					</label>
					<a href="#">
						<i class="fa fa-times"></i>
					</a>
				</li>
				<li>
					<label class="todoList_label">
						<input class="todoList_input" type="checkbox" value="true">
						<span>整理電腦資料夾</span>
					</label>
					<a href="#">
						<i class="fa fa-times"></i>
					</a>
				</li>
				<li>
					<label class="todoList_label">
						<input class="todoList_input" type="checkbox" value="true">
						<span>繳電費水費瓦斯費</span>
					</label>
					<a href="#">
						<i class="fa fa-times"></i>
					</a>
				</li>
				<li>
					<label class="todoList_label">
						<input class="todoList_input" type="checkbox" value="true">
						<span>約vicky禮拜三泡溫泉</span>
					</label>
					<a href="#">
						<i class="fa fa-times"></i>
					</a>
				</li>
				<li>
					<label class="todoList_label">
						<input class="todoList_input" type="checkbox" value="true">
						<span>約ada禮拜四吃晚餐</span>
					</label>
					<a href="#">
						<i class="fa fa-times"></i>
					</a>
				</li>
			</ul>
			<div class="todoList_statistics">
				<p> 5 個已完成項目</p>
			</div>
		</div>
	</div>
	<!-- <div class="no-data">
		<p>目前尚無待辦事項</p>
		<img src="https://s3-alpha-sig.figma.com/img/7465/9ab1/8911ab6dcbda98df56e26aa23c6643ac?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BmQcA76gk9l2y3s7vsRdmBkTjO8lYemchgz2fvvQqd6vEzKKoIKpTWxR5Iz6gkNQvICzQzSjfpXqRAiCmhCNaAQ6Nh7~7r0wEuxTCVOUzW8CGb7FlmUhs6GheqqJYxcxGV-lXtINwxY64LwHtFEXuKVwtdn2SiYuHNupWiTlTN77sAjR8vDZyjkSsuq4CXGVik3UGeHkJnsNAa-6eQ~QB-7HcW4F914N17QBifY47i8f~-AxsoBQ4OAmEM7uO-Jv1g1Wu7FEvy8-otCk79O2XZv6BpUsFTUyvDTR113J0ksi79QkwpeD8I6W4wZ1NxKwmvrxER6-COl7hStdVP1-QQ__" alt="目前尚無待辦事項">
	</div> -->
</template>
<style>
	.no-data {
		text-align: center;
		font-size: 16px;
		color: #333;
		margin-top: 60px;
	}
	.no-data p {
		margin-bottom: 16px;
	}
	.no-data img {
		max-width: 240px;
	}
</style>