<!-- MatchStats.vue -->
<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
  >
    <h3
      class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center"
    >
      <svg
        class="w-5 h-5 mr-2 text-yellow-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        ></path>
      </svg>

      Match Stats
    </h3>
    <div class="space-y-4">
      <SteamStatsRow
        label="Matches Won"
        :value="matchesWon.toLocaleString()"
        badge-color="green"
      />
      <SteamStatsRow
        label="Matches Played"
        :value="matchesPlayed.toLocaleString()"
        badge-color="blue"
      />
      <SteamStatsRow
        label="Win Rate"
        :value="`${winRate}%`"
        :badge-class="winRateClass"
      />
      <div class="border-t border-gray-200 dark:border-gray-600 pt-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-600 dark:text-gray-400">Time Played</span>
          <span class="font-medium text-gray-900 dark:text-white">
            {{ formattedPlaytime }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CSStats } from "~/types/steam";

const props = defineProps<{
  csStats: CSStats;
  winRate: string;
  winRateClass: string;
}>();

const { getCSStatValue, formatPlaytime } = useSteam();

const matchesWon = computed(() =>
  getCSStatValue(props.csStats.stats, "total_matches_won"),
);
const matchesPlayed = computed(() =>
  getCSStatValue(props.csStats.stats, "total_matches_played"),
);
const formattedPlaytime = computed(() =>
  formatPlaytime(getCSStatValue(props.csStats.stats, "total_time_played")),
);
</script>
