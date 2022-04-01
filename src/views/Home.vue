<template>
  <!-- <NewTask @newTaskAddTodo="addTodo" /> -->

  <TaskItem />

  <LogOut />
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
//To work on later
// import User from "./User.vue";
import LogOut from "../components/LogOut.vue";
</script>
<style scoped>
</style>