
<script setup>
  import TodoList from '@/components/TodoList.vue'
  import { useRouter } from 'vue-router'
  import { useUserStore } from '@/stores/index'
  import { storeToRefs } from 'pinia'
  const router = useRouter()
  const logout = () => {
    localStorage.clear();
    router.push({name: 'login'});
  }
  const userStore = useUserStore()
  const { userInfo } = storeToRefs(userStore)

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
