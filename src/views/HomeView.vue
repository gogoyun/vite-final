
<script setup>
  import { ref, onMounted } from 'vue'
  import TodoList from '@/components/TodoList.vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/index'
  import { storeToRefs } from 'pinia'
  import { signOut, getTodos, postTodo, delTodo, toggleTodo } from '@/utils/api'
  const userStore = useUserStore()
  const { userInfo } = storeToRefs(userStore)
  const router = useRouter()
  const loading = ref(false)
  const logout = () => {
    signOut(userInfo.value.token)
      .then(res => {
        if(res.data.status) {
          localStorage.clear();
          router.push({name: 'login'});
        }
      }).catch(err => {
        console.log(err)
      })
  }
  const newContent = ref('')
  const getLists = ref([])
  const getItems = ref([])
  const filter = ref('')
  const itemLengthText = ref('')
  // 取得待辦事項數量, 判斷文字顯示
  const getItemLength = (itemNonLength) => {
    if(itemNonLength){
      itemLengthText.value = `${itemNonLength} 個待完成項目`
    }else{
      itemLengthText.value = '目前尚無待辦事項'
    }
  }
  // 新增待辦事項
  const addItem = () => {
    loading.value = true
    if(!newContent.value.trim()) {
      alert('請輸入待辦事項')
      loading.value = false
      return
    }
    postTodo(userInfo.value.token, {
      content: newContent.value
    }).then(res => {
      if(res.data.status) {
        // 回吐的資料中沒有id，toogle會有問題，改更新列表
        getTodoList()
        newContent.value = ''
        filterStatus(filter.value);
        const itemNonLength = getLists.value.filter(item => !item.status).length
        getItemLength(itemNonLength)
        loading.value = false
      }
    }).catch(err=>{
      console.log(err)
      loading.value = false
    })
  }
  // 刪除待辦事項
  const delItem = async(item) => {
    await delTodo(userInfo.value.token, item.id)
      .then(res=>{
        if(res.data.status) {
          alert(res.data.message)
          getLists.value = getLists.value.filter(list => item.id !== list.id)
          filterStatus(filter.value);
          const itemNonLength = getLists.value.filter(item => !item.status).length
          getItemLength(itemNonLength)
        }
      }).catch(err => {
        console.log(err)
      })
  }
  // 切換待辦事項狀態
  const toggleStatus = async(item) => {
    await toggleTodo(userInfo.value.token, item.id)
      .then(()=> {
        getTodoList()
        const itemNonLength = getLists.value.filter(item => !item.status).length
        getItemLength(itemNonLength)
      }).catch(err => {
        console.log(err)
      })
  }
  // 篩選待辦事項列表
  const filterStatus = (status) => {
		if(status == 'wait') {
			getItems.value = getLists.value.filter(item => !item.status)
      filter.value = 'wait'
		}else if(status =='finish') {
			getItems.value = getLists.value.filter(item => item.status)
      filter.value = 'finish'
		}else{
      getItems.value = getLists.value.sort((a, b) => a.status - b.status)
      filter.value = ''
    }
	}
  const getTodoList = async() => {
    // 取得待辦事項列表
		await getTodos(userInfo.value.token)
			.then(res => {
				if(res.data.status) {
					getLists.value = res.data.data;
          filterStatus(filter.value);
          const itemNonLength = getLists.value.filter(item => !item.status).length
          getItemLength(itemNonLength)
				}
			}).catch(err => {
        console.log(err)
      })
  }
  onMounted(async() => {
    getTodoList()
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
          <a @click="addItem" :class="loading?'disabled':''">
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <TodoList
          v-if="getLists.length"
          :getItems="getItems"
          :itemLengthText="itemLengthText"
          v-on:filter-status="filterStatus"
          v-on:del-item="delItem"
          v-on:toggle-status="toggleStatus" />
        <div class="no-data" v-else>
          <p>目前尚無待辦事項</p>
          <img src="https://s3-alpha-sig.figma.com/img/7465/9ab1/8911ab6dcbda98df56e26aa23c6643ac?Expires=1725840000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BmQcA76gk9l2y3s7vsRdmBkTjO8lYemchgz2fvvQqd6vEzKKoIKpTWxR5Iz6gkNQvICzQzSjfpXqRAiCmhCNaAQ6Nh7~7r0wEuxTCVOUzW8CGb7FlmUhs6GheqqJYxcxGV-lXtINwxY64LwHtFEXuKVwtdn2SiYuHNupWiTlTN77sAjR8vDZyjkSsuq4CXGVik3UGeHkJnsNAa-6eQ~QB-7HcW4F914N17QBifY47i8f~-AxsoBQ4OAmEM7uO-Jv1g1Wu7FEvy8-otCk79O2XZv6BpUsFTUyvDTR113J0ksi79QkwpeD8I6W4wZ1NxKwmvrxER6-COl7hStdVP1-QQ__" alt="目前尚無待辦事項">
        </div>
      </div>
    </div>
  </div>
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
