<!-- StatRow.vue -->
<template>
  <div class="flex justify-between items-center">
    <span class="text-gray-600 dark:text-gray-400">{{ label }}</span>
    <span
      :class="badgeClass || badgeColorClasses[badgeColor ?? 'green']"
      class="px-3 py-1 rounded-full text-sm font-medium"
    >
      {{ value }}
    </span>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value: string;
  badgeColor?: "green" | "blue" | "yellow" | "red";
  badgeClass?: string;
}>();

const badgeColorClasses = {
  green: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
  blue: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
  yellow:
    "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
  red: "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",
};
</script>
