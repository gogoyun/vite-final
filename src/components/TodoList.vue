<script setup>
	import { ref, defineProps, defineEmits } from 'vue';
	const filter = ref('');
	const props = defineProps({
		getItems: Array,
		itemLengthText: String
	});
	const emit = defineEmits(['filterStatus', 'delItem', 'toggleStatus']);
	const changeStatus = (status) => {
		filter.value = status
		emit('filterStatus', status)
	}
	// 刪除待辦事項
	const delItem = (item) => {
		if(!item) return
		if(!confirm(`確定要刪除 ${item.content} 嗎?`)) return
		emit('delItem', item)
	}
	// 完成代辦事項
	const toggleStatus = (item) => {
		if(!item) return
		emit('toggleStatus', item)
		emit('filterStatus', filter.value)
	}
</script>
<template>
	<div class="todoList_list">
		<ul class="todoList_tab">
			<li><a :class="(filter=='') ? 'active' : ''" @click="changeStatus('')">全部</a></li>
			<li><a :class="(filter=='wait') ? 'active' : ''" @click="changeStatus('wait')">待完成</a></li>
			<li><a :class="(filter=='finish') ? 'active' : ''" @click="changeStatus('finish')">已完成</a></li>
		</ul>
		<div class="todoList_items">
			<ul class="todoList_item">
				<li v-for="(item, index) in getItems" :key="index">
					<label class="todoList_label">
						<input class="todoList_input" type="checkbox" value="true" v-model="item.status" @click="toggleStatus(item)">
						<span>{{ item.content }}</span>
					</label>
					<a @click="delItem(item)">
						<i class="fa fa-times"></i>
					</a>
				</li>
			</ul>
			<div class="todoList_statistics">
				<p> {{ itemLengthText }}</p>
			</div>
		</div>
	</div>
</template>