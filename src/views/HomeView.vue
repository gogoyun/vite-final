
<script setup>
  import TodoList from '@/components/TodoList.vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/index'
  import { storeToRefs } from 'pinia'
  import { signOut } from '@/utils/api'
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
          <input type="text" placeholder="請輸入待辦事項">
          <a href="#">
            <i class="fa fa-plus"></i>
          </a>
        </div>
        <TodoList />
      </div>
    </div>
  </div>
</template>
