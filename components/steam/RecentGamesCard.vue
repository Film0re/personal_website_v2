<!-- RecentGamesCard.vue -->
<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
  >
    <h3
      class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center"
    >
      <svg
        class="w-5 h-5 mr-2 text-green-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      Recent Games
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <GameCard
        v-for="game in recentGames.games.slice(0, 6)"
        :key="game.appid"
        :game="game"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { RecentGames } from "~/types/steam";
import GameCard from "./GameCard.vue";

defineProps<{
  recentGames: RecentGames;
}>();
</script>
