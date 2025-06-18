<!-- StatCard.vue -->
<template>
  <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
    <div :class="['text-2xl font-bold', colorClasses[color]]">
      {{ value }}
    </div>
    <div class="text-sm text-gray-600 dark:text-gray-400">
      {{ label }}
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  value: string;
  label: string;
  color: "blue" | "red" | "green" | "purple" | "yellow" | "indigo";
}>();

const colorClasses = {
  blue: "text-blue-600 dark:text-blue-400",
  red: "text-red-600 dark:text-red-400",
  green: "text-green-600 dark:text-green-400",
  purple: "text-purple-600 dark:text-purple-400",
  yellow: "text-yellow-600 dark:text-yellow-400",
  indigo: "text-indigo-600 dark:text-indigo-400",
};
</script>
