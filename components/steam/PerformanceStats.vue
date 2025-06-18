<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
  >
    <h3
      class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center"
    >
      <svg
        class="w-5 h-5 mr-2 text-blue-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>

      Performance Stats
    </h3>
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
      <SteamStatsCard
        :value="totalKills.toLocaleString()"
        label="Total Kills"
        color="blue"
      />
      <SteamStatsCard
        :value="totalDeaths.toLocaleString()"
        label="Total Deaths"
        color="red"
      />
      <SteamStatsCard :value="kdrRatio" label="K/D Ratio" color="green" />
      <SteamStatsCard
        :value="`${headshotPercentage}%`"
        label="Headshot %"
        color="purple"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { CSStats } from "~/types/steam";

const props = defineProps<{
  csStats: CSStats;
  kdrRatio: string;
  headshotPercentage: string;
  steamId: string;
}>();

// Create local utility function instead of using composable
const getCSStatValue = (stats: any[], statName: string): number => {
  const stat = stats?.find((s) => s.name === statName);
  return stat ? stat.value : 0;
};

const totalKills = computed(() =>
  getCSStatValue(props.csStats.stats, "total_kills"),
);

const totalDeaths = computed(() =>
  getCSStatValue(props.csStats.stats, "total_deaths"),
);
</script>
