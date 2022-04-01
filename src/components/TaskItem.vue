<template>
  <h4 class="mb-2 font-bold text-fuchsia">✨ Welcome {{ username() }} ✨</h4>

  <router-link to="/user-info">
    <button
      :class="accountInfo"
      class="
        cursor-pointer
        text-fuchsia
        font-bold
        mt-4
        mb-4
        hover:bg-fuchsia hover:text-white
        border-white
        p-2
      "
    >
      Account Info
    </button>
  </router-link>
  <form @submit.prevent="addTodo">
    <!-- <NewTask @newTaskAddTodo="addTodo" />-->
    <h1 class="font-bold mb-6">Insert your tasks below</h1>

    <input
      class="text-center w-2/5 h-8 border border-gray-special/50 rounded p-2"
      v-model="newTodo"
      placeholder="Your day begins here"
    />
    <!-- <p v-if="newTodo === false">You must insert a task</p> -->
    <button
      type="submit"
      class="
        button_one
        bg-fuchsia
        text-white
        rounded
        w-32
        p-1
        mb-5
        font-bold
        ml-4
        mr-2
      "
    >
      Add Task
    </button>
    <button
      class="button_one bg-fuchsia text-white rounded w-32 p-1 mb-5 font-bold"
      @click="clean"
    >
      Clean
    </button>
    <!-- <p v-if="newTodo.length < 5" class="mt-6 font-bold text-pink-600">
      The task must be longer than 5 characters
    </p> -->
  </form>

  <ul>
    <li v-for="todo in filteredTodos" :key="todo.id">
      <input
        class="mr-2 p-5 accent-fuchsia"
        type="checkbox"
        v-model="todo.is_complete"
        @click="completedTodo(todo)"
      />
      <input
        :class="{ done: todo.is_complete }"
        v-model="todo.title"
        :disabled="!editingTodo"
        @keyup.enter="editTask(todo)"
        type="text"
        class="
          border border-fuchsia/50
          hover:bg-grey hover:text-white hover:font-bold
        "
      />
      <button
        class="rounded-lg hover:text-fuchsia font-bold p-2 mt-2 ml-2"
        @click="editTask(todo)"
      >
        📝 Edit
      </button>

      <!-- <button class="ml-2" @click="deleteTask(todo)">✖️</button> -->
      <button
        class="rounded-lg hover:text-fuchsia font-bold p-2 mt-2 ml-2"
        @click="deleteTask(todo)"
      >
        🧹 Delete
      </button>
    </li>
  </ul>

  <p>
    <span class="font-bold" mt-4> {{ remaining }} </span>
    {{ remaining === 1 ? "item" : "items" }} left
  </p>

  <p class="mt-6 text-pink-600 font-bold underline" v-if="tasks.is_complete">
    Nice! Keep on going 💯
  </p>
  <div class="flex-col items-center">
    <input
      class="toggle-all mr-2 accent-fuchsia"
      type="checkbox"
      :checked="remaining === 0"
      @click="toggleAll"
    />
    <button
      class="
        button_two
        bg-white
        h-10
        mt-5
        rounded
        font-bold
        text-fuchsia
        border border-fuchsia/100
        w-26
        p-2
        mr-4
      "
      for="toggle-all mb-4"
      @click="toggleAll"
    >
      Mark all as complete
    </button>

    <button
      class="
        button_two
        bg-white
        h-10
        mt-5
        rounded
        font-bold
        text-fuchsia
        border border-fuchsia/100
        w-26
        p-2
      "
      @click="hideCompleted = !hideCompleted"
    >
      {{ hideCompleted ? "Show all" : "Hide completed" }}
    </button>
  </div>

  <footer>
    <button
      class="
        button_two
        clear-completed
        mt-12
        bg-fuchsia
        rounded
        p-3
        text-white
        w-54
        flex-col
        items-center
        font-bold
      "
      @click="
        removeCompleted();
        explode();
      "
    >
      🧹 Clear all completed tasks 🧹
    </button>
    <ConfettiExplosion
      v-if="visible"
      :force="1"
      :duration="2000"
      :particleSize="18"
      :particleCount="200"
      :stageWidth="3200"
    />
  </footer>
</template>

<script setup>
import { ref, computed, nextTick } from "vue";
import { supabase } from "../supabase";
import { useTaskStore } from "../store/task";
import ConfettiExplosion from "vue-confetti-explosion";

//Confetti woohoo
const visible = ref(true);

const explode = async () => {
  visible.value = false;
  await nextTick();
  visible.value = true;
};
//for showing/hiding completed tasks
const filters = {
  all: (todos) => todos,
  active: (todos) => todos.filter((todo) => !todo.is_complete),
  completed: (todos) => todos.filter((todo) => todo.is_complete),
};

//for marking all as completed
function toggleAll(e) {
  tasks.value.forEach((todo) => (todo.is_complete = e.target.checked));
}

const remaining = computed(() => filters.active(tasks.value).length);
//For welcoming user with first part of email until the @
let id = 0;
const user_data = supabase.auth.user();
function username() {
  const user_name = user_data.email;
  const index = user_name.indexOf("@");
  return user_name.slice(0, index);
}

//Warning for leaving empty task field
// function notFilled() {
//   if (newTask.value === true) {
//     errorInput.value === false;
//   } else {
//     errorInput === "You must insert a task ";
//   }
// }

//Fetching data from SB
let tasks = ref([]);
async function fetchingTasks() {
  const myTodos = await useTaskStore().fetchTasks();
  tasks.value = myTodos;
  console.log(myTodos);
}
fetchingTasks();

//Const tasks
let task = ref("");
const errorContainer = ref(false);
const errorMessage = ref("");
const newTodo = ref("");
const todos = ref([{ id: id++, text: "", done: true }]);

//For ADDING TODO
//Aqui o tenia que pasarle newTodo como parámetro y colocar .value
//Con un V-model, lo puedo usar en cualquier sitio, y portanto no hay necesidad de pasar parametro. Nada más el
async function addTodo() {
  await useTaskStore().insertTasks(newTodo.value);
  newTodo.value = "";
  fetchingTasks();
  console.log(newTodo);
}

//For cleaning placeholder
function clean() {
  newTodo.value = "";
}

//for deletion
async function deleteTask(todo) {
  await useTaskStore().deleteTask(todo.id);
  await fetchingTasks();
  console.log("hello");
}

//For completion
async function completedTodo(todo) {
  const pepe = todo.id;
  todo.is_complete = !todo.is_complete;
  await useTaskStore().isCompleted(pepe, todo.is_complete);
  await fetchingTasks();
  console.log(todo.is_complete);
}

//For removing completed
// //
async function removeCompleted(todo) {
  await fetchingTasks();
  tasks.value.forEach(async (todo) => {
    await deleteTask(todo);
  });
}
// function removeCompleted(todo) {
//   await fetchingTasks();
//   console.log('lololo')
//   tasks.value.forEach(async (todo) => {
//     await deleteTask(todo);
//   });
// //   const completadaTodo = todo.value;
// //   return completadaTodo;
// //   console.log("task");
// // }
// // async function removeAll() {
// //   await getTasks();
// //   tasks.value.forEach(async (task) => {
// //     await remove(task);
// //   });
// // }

//for filtering & hiding completed
const hideCompleted = ref(false);

const filteredTodos = computed(() => {
  return hideCompleted.value === false
    ? tasks.value
    : tasks.value.filter((t) => !t.is_complete === true);
  fetchingTasks();
  console.log("holahola");
});

//for editing task
const editingTodo = ref(false);
const beforeEditTodo = ref("");
async function editTask(todo) {
  if (editingTodo.value === false) {
    beforeEditTodo.value = todo.title;
    editingTodo.value = true;
  } else {
    const res = await useTaskStore().editTask(todo.title, todo.id);
    console.log(res);
    editingTodo.value = false;
  }
}
</script>



<style scoped>
* {
  text-align: center;
}
.done {
  text-decoration: line-through red px;
}
.button_one:hover {
  background-color: white;
  border: solid 2px fuchsia;
  color: fuchsia;
}
.button_two:hover {
  color: white;
  font-weight: bold;
  border-radius: 10px;
  background-color: rgb(226, 43, 195);
}
.accountInfo {
  border-radius: 10px;
}
</style>



