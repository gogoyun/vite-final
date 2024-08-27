
<script setup>
  import TodoList from '@/components/TodoList.vue'
</script>

<template>
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <RouterLink to="/"><li class="todo_sm"><a href="#"><span>王小明的代辦</span></a></li></RouterLink>
        <RouterLink to="#"><li><a href="#loginPage">登出</a></li></RouterLink>
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
