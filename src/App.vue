<template>
  <div>
    <!-- <NewTask /> -->
    <!-- <TaskItem /> -->
    <!-- <Auth /> -->
    <Nav />
  </div>
  <router-view class="app-main" />
  <Footer />
  <!-- your routes will load inside of these tags -->
</template>

<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup

import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { supabase } from "./supabase";
import { useUserStore } from "./store/user.js";
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);
// declare a ref to hold the element reference
// the name must match template ref value
const input = ref(null);
onMounted(async () => {
  try {
    await userStore.fetchUser(); // here we call fetch user
    if (!user.value) {
      // redirect them to logout if the user is not there
      router.push({ path: "/auth" });
    } else {
      // continue to dashboard
      router.push({ path: "/" });
    }
  } catch (e) {
    console.log(e);
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  color: #2c3e50;
  margin-top: 60px;
}
</style>