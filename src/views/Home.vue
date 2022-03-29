<template>
  <!-- <NewTask @newTaskAddTodo="addTodo" /> -->
  <TaskItem />

  <div
    @submit.prevent=""
    class="flex-row items-center gap-x-8 mt-8 ml-6 space-between"
  >
    <!-- <router-link class="cursor-pointer" :to="'/auth'"> LogIn </router-link> -->

    <!-- <input
      type="email"
      class="
        block
        appearance-none
        bg-white
        border border-grey-light
        hover:border-grey
        py-2
        rounded
        shadow
        w-2/5
      "
      placeholder="Insert your new e-mail"
      v-model="email"
    />
    <a
      @click="handleUpdateUser({ email: email })"
      href="#"
      class="btn-black font-bold flex"
      tabindex="0"
    >
      Update Email
    </a> -->
    <input
      type="password"
      class="
        block
        appearance-none
        bg-white
        border border-grey-light
        hover:border-grey
        py-2
        rounded
        shadow
        w-2/5
      "
      placeholder="Insert your new password"
      v-model="password"
    />
    <a
      @click="UpdateUser({ password: password })"
      href="#"
      class="btn-black font-bold flex"
      tabindex="0"
    >
      Update password
    </a>

    <button
      class="font-bold cursor-pointer mt-6 :hover-pink-600 mt-6 mb-6"
      @click="logout"
    >
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

//Password Update function
async function UpdateUser(credentials) {
  try {
    const { error } = await supabase.auth.update(credentials);
    if (error) {
      alert("Error updating user info: " + error.message);
    } else {
      alert("Successfully updated user info!");
      window.location.href = "/";
    }
  } catch (error) {
    alert("Error updating user info: " + error.message);
  }
}

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
  color: rgb(226, 43, 195);
  font-weight: bold;
  border-radius: 10px;
}
</style>