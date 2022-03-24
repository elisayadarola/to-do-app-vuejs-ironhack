<template>
  <section class="todoapp">
    <header class="header">
      <h4 class="mb-2 font-bold underline text-pink-600">
        ✨ Welcome {{ filter() }} ✨
      </h4>
      <h1 class="font-bold underline mb-6">Tasks</h1>
      <input
        class="new-todo text-center font-bold text-xl mb-4"
        autofocus
        placeholder="Insert tasks"
        @keyup.enter="addTodo"
      />
    </header>
    <section class="main" v-show="todos.length">
      <input
        id="toggle-all"
        class="toggle-all accent-pink-500"
        type="checkbox"
        :checked="remaining === 0"
        @change="toggleAll"
      />
      <label for="toggle-all mb-4">Mark all as complete</label>
      <ul class="todo-list">
        <li
          v-for="todo in filteredTodos"
          class="todo mb-1"
          :key="todo.id"
          :class="{ completed: todo.completed, editing: todo === editedTodo }"
        >
          <!-- <button class="text-white font-bold" @click="removeTodo(todo)">
            Delete task
          </button> -->
          <!-- <button title="Edit your task" @click="editTask(index)">
            <svg
              
              viewBox="0 0 24 24"
              width="16"
              height="16"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M6.414 16L16.556 5.858l-1.414-1.414L5 14.586V16h1.414zm.829 2H3v-4.243L14.435 2.322a1 1 0 0 1 1.414 0l2.829 2.829a1 1 0 0 1 0 1.414L7.243 18zM3 20h18v2H3v-2z"
                fill="rgba(0,0,0,1)"
              />
            </svg>
          </button> -->
          <div class="view">
            <input
              class="toggle accent-pink-500 mr-2"
              type="checkbox"
              v-model="todo.completed"
            />
            <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
            <button
              class="rounded-lg text-pink-600 font-bold p-2 mt-2 ml-2"
              @click="removeTodo(todo)"
            >
              Delete
            </button>
          </div>
          <input
            v-if="todo === editedTodo"
            class="edit"
            type="text"
            v-model="todo.title"
            @vnode-mounted="({ el }) => el.focus()"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.escape="cancelEdit(todo)"
          />
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length">
      <div class="mb-4">
        <span class="todo-count font-bold">
          <strong>{{ remaining }}</strong> <br />
          <span>{{ remaining === 1 ? "item" : "items" }} left</span>
        </span>
      </div>
      <ul class="filters">
        <li>
          <a href="#/all" :class="{ selected: visibility === 'all' }">All</a>
        </li>
        <br />
        <li>
          <a href="#/active" :class="{ selected: visibility === 'active' }"
            >In Progress</a
          >
        </li>
        <br />
        <li>
          <a
            href="#/completed"
            :class="{ selected: visibility === 'completed' }"
            >Completed</a
          >
        </li>
      </ul>
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
  </section>
</template>

<script setup>
import { supabase } from "../supabase";
import { ref, computed, watchEffect } from "vue";

const STORAGE_KEY = "vue-todomvc";

/*después de hora y pico experimentando como locas, Rocío ha hallado la solución con el indexOf, mientras
que yo pensaba que era más fácil integrar el nombre en la database de supabase y filtrarlo desde allá , OLÉEE*/
const user_data = supabase.auth.user();
function filter() {
  const user_name = user_data.email;
  const index = user_name.indexOf("@");
  return user_name.slice(0, index);
}
/**/
const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.completed),
  completed: (todos) => todos.filter((todo) => todo.completed),
};
/**/

// const allTasks = filters.all;
// const editIndex = ref(-1);
// function editTask(index) {
//   editIndex.value = index;
//   newTask.value = todos.value[index].title;
//   todos.value.splice(index, 1);
// }
// state
const todos = ref(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
const visibility = ref("all");
const editedTodo = ref();

// derived state
const filteredTodos = computed(() => filters[visibility.value](todos.value));
const remaining = computed(() => filters.active(todos.value).length);

// handle routing
window.addEventListener("hashchange", onHashChange);
onHashChange();

// persist state
watchEffect(() => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value));
});

function toggleAll(e) {
  todos.value.forEach((todo) => (todo.completed = e.target.checked));
}

function addTodo(e) {
  const value = e.target.value.trim();
  if (value) {
    todos.value.push({
      id: Date.now(),
      title: value,
      completed: false,
    });
    e.target.value = "";
  }
}

function removeTodo(todo) {
  todos.value.splice(todos.value.indexOf(todo), 1);
}

let beforeEditCache = "";
function editTodo(todo) {
  beforeEditCache = todo.title;
  editedTodo.value = todo;
}

function cancelEdit(todo) {
  editedTodo.value = null;
  todo.title = beforeEditCache;
}

function doneEdit(todo) {
  if (editedTodo.value) {
    editedTodo.value = null;
    todo.title = todo.title.trim();
    if (!todo.title) removeTodo(todo);
  }
}

function removeCompleted() {
  todos.value = filters.active(todos.value);
}

function onHashChange() {
  const route = window.location.hash.replace(/#\/?/, "");
  if (filters[route]) {
    visibility.value = route;
  } else {
    window.location.hash = "";
    visibility.value = "all";
  }
}
</script>

<style scoped>
button:hover {
  font-family: Georgia, "Times New Roman", Times, serif;
  background-color: rgb(226, 43, 195);
  color: white;
  /* margin-left: 30%; */
}
a:hover {
  color: rgb(226, 43, 195);
  font-weight: bold;
  border-radius: 10px;
}
</style>