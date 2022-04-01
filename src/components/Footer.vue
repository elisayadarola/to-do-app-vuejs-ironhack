<template>
  <footer>
    <div
      class="
        flex-row
        bg-fuchsia
        sm:flex-row
        items-center
        justify-center
        gap-x-10 gap-y-5
        py-5
        mt-4
      "
    >
      <p class="mb-4 mt-4 text-white font-bold">
        Enabling procrastinators to get their sh*t together since 2022 👊🏿
      </p>
      <p class="font-georgia mt-4 text-white">
        &copy; TaskAble App {{ currentYear }}
      </p>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>
