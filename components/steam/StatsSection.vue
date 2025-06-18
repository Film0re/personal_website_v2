<!-- StatsSection.vue -->
<template>
  <div>
    <h4
      class="font-medium text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide"
    >
      {{ title }}
    </h4>
    <div class="space-y-3">
      <div v-for="stat in stats" :key="stat.label" class="flex justify-between">
        <span class="text-gray-600 dark:text-gray-400 text-sm">{{
          stat.label
        }}</span>
        <span class="text-gray-900 dark:text-white font-medium text-sm">{{
          stat.value
        }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  stats: Array<{ label: string; value: string }>;
}>();
</script>
