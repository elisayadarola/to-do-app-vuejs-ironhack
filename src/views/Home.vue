<template>
  <!-- <NewTask @newTaskAddTodo="addTodo" /> -->

  <TaskItem />
  <!-- <User /> -->
  <div
    @submit.prevent=""
    class="flex-row items-center gap-x-8 mt-8 ml-6 space-between"
  >
    <!-- <router-link class="cursor-pointer" :to="'/auth'"> LogIn </router-link> -->

    <button class="font-bold cursor-pointer mt-6 w-48 mb-6" @click="logout">
      Log Out
    </button>
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import router from "../router";
import { useUserStore } from "../store/user";
import TaskItem from "../components/TaskItem.vue";
import { Session, Provider } from "@supabase/gotrue-js/dist/main/lib/types";
import { useTaskStore } from "../store/task";
import { ref, reactive, computed, onMounted } from "vue";
import User from "./User.vue";
import Footer from "../components/Footer.vue";
// let tasks = ref([]);
// //Fetching data from SB
// async function fetchingTasks() {
//   tasks.value = await useTaskStore().fetchTasks();
// }
// fetchingTasks();
//Add tasks from NewTask Component
// async function addTodo(newTask) {
//   await useTaskStore().insertTasks(newTask);
//   fetchingTasks();
// }

//LogOut function
const user = useUserStore();
const logout = async () => {
  await user.signOut();
  router.push({
    path: "/auth",
  });
};
// /* */
</script>
<style scoped>
button:hover {
  color: white;
  font-weight: bold;
  border-radius: 10px;
  background-color: rgb(226, 43, 195);
}
button {
  color: rgb(226, 43, 195);
  border: solid rgb(226, 43, 195) 2px;
}
</style>