<template>
  <h4 class="mb-2 font-bold underline text-pink-600">
    ✨ Welcome {{ username() }} ✨
  </h4>
  <form @submit.prevent="">
    <NewTask @addTodoChild="addTodo2" />
    <h1 class="font-bold mb-6">Insert your tasks below</h1>

    <input
      class="text-center w-2/5 h-8 border border-gray-special/50 rounded p-2"
      v-model="newTodo"
      placeholder="You can also press enter"
      @keyup.enter="addTodo"
    />
    <button
      id="button_one"
      @click="addTodo(todo)"
      class="text-white rounded w-32 p-1 mb-5 font-bold"
    >
      Add Task
    </button>
    <button
      id="button_one"
      class="text-white rounded w-32 p-1 mb-5 font-bold"
      @click="clean"
    >
      Clean
    </button>
    <p @click="notFilled" class="font-bold pink-600 underline">
      {{ errorInput }}
    </p>
  </form>

  <ul>
    <li v-for="todo in tasks" :key="todo.id">
      <input
        class="mr-2 p-5"
        type="checkbox"
        v-model="todo.done"
        @keyup.enter="saveTodo"
      />
      <input
        :class="{ done: todo.is_complete }"
        v-model="todo.title"
        :disabled="!editingTodo"
        @keyup.enter="editTask(todo)"
      />
      <!-- <button class="ml-2" @click="deleteTask(todo)">✖️</button> -->
      <button
        class="rounded-lg text-pink-600 font-bold p-2 mt-2 ml-2"
        @click="deleteTask(todo)"
      >
        🧹
      </button>
      <button
        class="rounded-lg text-pink-600 font-bold p-2 mt-2 ml-2"
        @click="editTask(todo)"
      >
        📝
      </button>
    </li>
  </ul>
  <p class="mt-6 text-pink-600 font-bold underline" v-if="tasks.length === 0">
    Looks like you've been productive! 💯
  </p>
  <!-- <input
    id="toggle-all"
    class="toggle-all mr-2 accent-pink-500"
    type="checkbox"
    :checked="remaining === 0"
    @click="toggleAll"
  />
  <label class="mr-4" for="toggle-all mb-4">Mark all as complete</label> -->
  <button
    class="bg-white w-48 h-10 mt-5 rounded font-bold"
    id="button_two"
    @click="hideCompleted = !hideCompleted"
  >
    {{ hideCompleted ? "Show all" : "Hide completed" }}
  </button>
  <footer>
    <button
      class="
        clear-completed
        block
        mt-12
        bg-pink-400
        rounded
        p-3
        text-white
        font-bold
        w-2/5
      "
      @click="removeCompleted"
      v-show="todos.length > remaining"
    >
      🧹 Clear completed 🧹
    </button>
  </footer>
</template>

<script setup>
import { ref, computed } from "vue";
import { supabase } from "../supabase";
import { useTaskStore } from "../store/task";

//For welcoming user with first part of email until the @
let id = 0;
const user_data = supabase.auth.user();
function username() {
  const user_name = user_data.email;
  const index = user_name.indexOf("@");
  return user_name.slice(0, index);
}
//Warning for leaving empty task field
function notFilled() {
  if (newTask.value === true) {
    errorInput.value === false;
  } else {
    errorInput === "You must insert a task ";
  }
}

//Functions tasks
const newTodo = ref("");
const todos = ref([{ id: id++, text: "", done: true }]);

function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value, done: false });
  newTodo.value = "";
  console.log("hola");
}
//For cleaning placeholder
function clean() {
  newTodo.value = "";
}

// Function addtoDo 2 - USING PINIA
async function addTodo2(newTodo) {
  await useTaskStore().insertTasks(newTodo);
  fetchingTasks();
  console.log("holhol");
}

async function deleteTask(todo) {
  await useTaskStore().deleteTask(todo.id);
  await fetchingTasks();
  console.log("hello");
}
// for toggling
function toggleAll(e) {
  todos.value.forEach((todo) => (todo.completed = e.target.checked));
}
//for filtering
const hideCompleted = ref(false);
const filteredTodos = computed(() => {
  return hideCompleted.value ? todos.value.filter((t) => !t.done) : todos.value;
  console.log("holahola");
});

//for removing completed
const filters = {
  active: (todos) => todos.filter((todo) => !todo.completed),
};
// function removeCompleted() {
//   todos.value = filters.active(todos.value);
// }

async function isCompleted(i) {
  const task_index_id = i.id;
  const doneTask = !hideCompleted.value[i].is_completed;
  await useTaskStore().isCompleted(task_index_id, doneTask);
  await fetchingTasks();
}
//

//for editing task

const editingTodo = ref(false);
const beforeEditCache = ref("");
async function editTask(todo) {
  if (editingTodo.value === false) {
    beforeEditCache.value = todo.title;
    editingTodo.value = true;
  } else {
    const res = await useTaskStore().editTask(todo.title, todo.id);
    console.log(res);
    editingTodo.value = false;
  }
}
</script>
<style scoped>
.done {
  text-decoration: line-through;
}
#button_one {
  background-color: rgb(226, 43, 195);
  margin-left: 10px;
}
#button_two {
  color: rgb(226, 43, 195);
  border: solid rgb(226, 43, 195) 2px;
}
</style>