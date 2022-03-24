<template>
  <NewTask />

  <div class="flex items-center gap-x-4">
    <!-- <router-link class= "cursor-ponter" :to="'/auth'" > LogIn </router-link> -->
    <button class="font-bold cursor-pointer mt-6" @click="logout">
      Log Out
    </button>
  </div>
</template>

<script setup>
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import router from "../router";
import { useUserStore } from "../store/user";
import NewTask from "../components/NewTask.vue";

const user = useUserStore();
const logout = async () => {
  await user.signOut();
  router.push({
    path: "/auth",
  });
};
</script>
<style scoped>
button:hover {
  color: rgb(226, 43, 195);
  font-weight: bold;
  border-radius: 10px;
}
</style>