<template>
  <div>
    <button
      class="font-bold cursor-pointer mt-6 w-48 mb-6 text-fuchsia"
      @click="logout"
    >
      Log Out
    </button>
  </div>
</template>

<script setup>
import { useUserStore } from "../store/user";
import { Session, Provider } from "@supabase/gotrue-js/dist/main/lib/types";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import router from "../router";

//LogOut function
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
  color: white;
  font-weight: bold;
  border-radius: 10px;
  background-color: rgb(226, 43, 195);
}
button {
  border: solid rgb(226, 43, 195) 2px;
}
</style>