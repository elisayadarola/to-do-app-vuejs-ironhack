<template>
  <div class="NavTab">
    <router-link class="cursor-pointer" :to="'/'">
      <h1>TaskAble</h1></router-link
    >
    <blockquote
      class="text-2xl font-semibold italic text-center text-slate-900 mb-6 mt-4"
    >
      When you write
      <span
        class="
          before:block
          before:absolute
          before:-inset-1
          before:-skew-y-3
          before:bg-fuchsia
          relative
          inline-block
        "
      >
        <span class="relative text-white">to-dos</span>
      </span>
      all the time, people think that you're busy.
    </blockquote>
  </div>
</template>
<style scoped>
/* .header {
    display:flex;
    flex-direction: column;
    justify-content: center;
} */
h1 {
  color: rgb(226, 43, 195);
  font-size: 50px;
  font-weight: bold;
}
/* img {
  height: 200px;
  width: 200px;
  align-items: flex-start;
  margin-top: 0px;
  position: center;
} */
</style>