
<script setup>
  import { ref, onMounted } from 'vue'
  import TodoList from '@/components/TodoList.vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/index'
  import { storeToRefs } from 'pinia'
  import { signOut, getTodos, postTodo } from '@/utils/api'
  const userStore = useUserStore()
  const { userInfo } = storeToRefs(userStore)
  const router = useRouter()
  const logout = () => {
    signOut(userInfo.value.token)
      .then(res => {
        if(res.data.status) {
          localStorage.clear();
          router.push({name: 'login'});
        }
      })
  }
  const newContent = ref('')
  const getLists = ref([])
  const getItems = ref([])
  const addItem = () => {
    if(!newContent.value) return
    postTodo(userInfo.value.token, {
      content: newContent.value
    }).then(res => {
      if(res.data.status) {
        alert('新增成功')
        getLists.value.push = res.data.newTodo
        newContent.value = ''
      }
    })
  }
  const filterStatus = (status) => {
		if(status == 'wait') {
			getItems.value = getLists.value.filter(item => !item.status)
		}else if(status =='finish') {
			getItems.value = getLists.value.filter(item => item.status)
		}else{
      getItems.value = getLists.value
    }
	}
  onMounted(async() => {
		await getTodos(userInfo.value.token)
			.then(res => {
				if(res.data.status) {
					getLists.value = res.data.data;
          getItems.value = res.data.data;
				}
			});
	})
</script>

<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm"><a href="#"><span>{{ userInfo.name }}的代辦</span></a></li>
        <li><a @click="logout">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input type="text" placeholder="請輸入待辦事項" v-model="newContent">
          <a @click="addItem">
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <TodoList :getItems="getItems" v-on:filter-status="filterStatus" />
      </div>
    </div>
  </div>
</template>
