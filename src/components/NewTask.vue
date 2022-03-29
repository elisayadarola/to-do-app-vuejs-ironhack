<template>
  <div>
    <input v-model="task" placeholder="enter task" @keyup.enter="addTodo" />
    <button
      class="rounded w-32 p-1 mb-5 font-bold"
      type="submit"
      @click.prevent="addTodo"
    >
      Add Task
    </button>
    <p v-if="errorContainer">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from "vue";

let task = ref("");
const errorContainer = ref(false);
const errorMessage = ref("");

//Variable that contains name of function that are going to be emitted 2 parent component
const emit = defineEmits(["addTodoChild"]);

//Function that adds new ToDo and is emitted to parent component
function addTodo() {
  if (task.value === "") {
    errorContainer.value = true;
    errorMessage.value = "Don't be lazy, insert a task...";
    setTimeout(() => {
      errorContainer.value === false;
    }, 3000);
  } else {
    errorContainer.value === false;
    emit("addTodoChild", task.value);
    task.value = "";
  }
}
</script>

<style scoped>
button {
  font-family: Georgia, "Times New Roman", Times, serif;
  background-color: rgb(226, 43, 195);
  color: white;
  /* margin-left: 30%; */
}
button:hover {
  border: solid rgb(226, 43, 195) 2px;
  background-color: white;
  color: rgb(226, 43, 195);
}
a:hover {
  color: rgb(226, 43, 195);
  font-weight: bold;
  border-radius: 10px;
}
</style>