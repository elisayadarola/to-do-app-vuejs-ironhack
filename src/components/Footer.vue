<template>
  <footer
    class="
      flex flex-col
      sm:flex-row
      items-center
      justify-center
      gap-x-10 gap-y-5
      py-5
      bg-pink-400
    "
  >
    <router-link to="/User">
      <h4 class="cursor-pointer text-white font-bold">Account Info</h4>
    </router-link>
    <p class="font-georgia">&copy; TaskAble App {{ currentYear }}</p>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>
