<!-- GameCard.vue -->
<template>
  <div
    class="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
  >
    <img
      :src="`https://media.steampowered.com/steamcommunity/public/images/apps/${game.appid}/${game.img_icon_url}.jpg`"
      :alt="game.name"
      class="w-12 h-12 rounded-lg"
    />
    <div class="flex-1 min-w-0">
      <p class="font-medium text-gray-900 dark:text-white truncate">
        {{ game.name }}
      </p>
      <p class="text-sm text-gray-600 dark:text-gray-400">
        {{ formatPlaytime(game.playtime_forever) }} total
      </p>
      <p
        v-if="game.playtime_2weeks > 0"
        class="text-xs text-gray-500 dark:text-gray-500"
      >
        {{ formatPlaytime(game.playtime_2weeks) }} recent
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RecentGame } from "~/types/steam";

defineProps<{
  game: RecentGame;
}>();

const { formatPlaytime } = useSteam();
</script>
