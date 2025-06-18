<template>
  <div class="max-w-6xl mx-auto p-6">
    <!-- Tab Navigation -->
    <div class="mb-8">
      <nav class="flex space-x-1 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          @click="activeTab = tab.id"
          :class="[
            'flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors duration-200 text-center',
            activeTab === tab.id
              ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
              : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-gray-700/50',
          ]"
        >
          {{ tab.label }}
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
    <div class="w-max">
      <KeepAlive>
        <SteamStats
          v-if="activeTab === 'main'"
          steam-id="76561198067007457"
          key="main-stats"
        />
        <SteamStats
          v-else-if="activeTab === 'alt'"
          steam-id="76561198221547276"
          key="alt-stats"
        />
      </KeepAlive>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const activeTab = ref("main");

const tabs = [
  { id: "main", label: "Main Account" },
  { id: "alt", label: "Alt Account" },
];
</script>

<style scoped>
.tab-content {
  min-height: 400px;
}
</style>
