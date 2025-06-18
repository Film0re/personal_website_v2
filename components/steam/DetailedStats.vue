<!-- DetailedStats.vue -->
<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
  >
    <h3
      class="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center"
    >
      <svg
        class="w-5 h-5 mr-2 text-indigo-600"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        ></path>
      </svg>
      Detailed Statistics
    </h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <StatsSection title="Combat" :stats="combatStats" />
      <StatsSection title="Objectives" :stats="objectiveStats" />
      <StatsSection title="Equipment" :stats="equipmentStats" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { CSStats } from "~/types/steam";
import StatsSection from "./StatsSection.vue";

const props = defineProps<{
  csStats: CSStats;
}>();

const { getCSStatValue } = useSteam();

const combatStats = computed(() => {
  const shotsFired = getCSStatValue(props.csStats.stats, "total_shots_fired");
  const shotsHit = getCSStatValue(props.csStats.stats, "total_shots_hit");
  const accuracy =
    shotsFired > 0 ? ((shotsHit / shotsFired) * 100).toFixed(1) : "0";

  return [
    {
      label: "MVP Awards",
      value: getCSStatValue(props.csStats.stats, "total_mvps").toLocaleString(),
    },
    { label: "Shots Fired", value: shotsFired.toLocaleString() },
    { label: "Shots Hit", value: shotsHit.toLocaleString() },
    { label: "Accuracy", value: `${accuracy}%` },
  ];
});

const objectiveStats = computed(() => [
  {
    label: "Bombs Planted",
    value: getCSStatValue(
      props.csStats.stats,
      "total_planted_bombs",
    ).toLocaleString(),
  },
  {
    label: "Bombs Defused",
    value: getCSStatValue(
      props.csStats.stats,
      "total_defused_bombs",
    ).toLocaleString(),
  },
  {
    label: "Hostages Rescued",
    value: getCSStatValue(
      props.csStats.stats,
      "total_rescued_hostages",
    ).toLocaleString(),
  },
]);

const equipmentStats = computed(() => [
  {
    label: "Money Earned",
    value: `$${getCSStatValue(props.csStats.stats, "total_money_earned").toLocaleString()}`,
  },
  {
    label: "Weapons Donated",
    value: getCSStatValue(
      props.csStats.stats,
      "total_weapons_donated",
    ).toLocaleString(),
  },
  {
    label: "Damage Dealt",
    value: getCSStatValue(
      props.csStats.stats,
      "total_damage_done",
    ).toLocaleString(),
  },
]);
</script>
