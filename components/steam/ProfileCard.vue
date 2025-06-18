<!-- ProfileCard.vue -->
<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 text-center max-w-md mx-auto"
  >
    <img
      :src="profile.avatarfull"
      :alt="profile.personaname"
      class="w-20 h-20 rounded-full mx-auto mb-4 ring-4 ring-blue-500/20"
    />
    <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
      {{ profile.personaname }}
    </h2>
    <p class="text-gray-600 dark:text-gray-400">
      Steam ID: {{ profile.steamid }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { SteamProfile } from "~/types/steam";

defineProps<{
  profile: SteamProfile;
}>();
</script>
