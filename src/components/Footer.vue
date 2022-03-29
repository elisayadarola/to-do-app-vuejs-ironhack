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
    <p class="font-georgia">&copy; TaskAble App {{ currentYear }}</p>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>
