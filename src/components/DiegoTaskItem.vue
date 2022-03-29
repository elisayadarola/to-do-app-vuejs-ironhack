<template>
  <div>
    <h2>
      {{ item.title }}
    </h2>
    <!-- Buttons to ontrol the task -->
    <div class="flex justify-between pt-4">
      <button
        v-if="!item.is_complete"
        class="text-white p-2 rounded bg-green-600 hover:bg-green-500"
        @click="toggleTodo()"
      >
        <CheckIcon class="w-6 h-6" />
      </button>
      <button
        v-if="item.is_complete"
        class="text-white p-2 rounded bg-indigo-400 hover:bg-indigo-500"
        @click="toggleTodo()"
      >
        <RewindIcon class="w-6 h-6" />
      </button>
      <button
        class="text-white p-2 rounded bg-yellow-400 hover:bg-yellow-500"
        @click="toggleEdit()"
      >
        <PencilIcon class="w-6 h-6" />
      </button>

      <button
        class="text-white p-2 rounded bg-rose-500 hover:bg-rose-400"
        @click="remove()"
      >
        <TrashIcon class="w-6 h-6" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["item"]);
const emit = defineEmits([
  "childToggle",
  "childRemove",
  "childEdit",
  "childToggleEdit",
]);
</script>

<style>
</style>