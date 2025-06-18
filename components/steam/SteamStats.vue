<!-- Main Dashboard Component -->
<template>
  <div class="max-w-6xl mx-auto p-6">
    <!-- Loading State -->
    <SteamLoadingState v-if="pending" />
    <!-- Error State -->
    <!-- <SteamErrorState v-else-if="error" :error="error" /> -->
    <!-- Main Content -->
    <div class="space-y-8">
      <!-- Profile Section -->
      <SteamProfileCard v-if="profile" :profile="profile" />
      <!-- Stats Grid -->
      <div v-if="csStats" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!--   <!-- Performance Stats -->
        <SteamPerformanceStats
          :cs-stats="csStats"
          :kdr-ratio="kdrRatio"
          :headshot-percentage="headshotPercentage"
          :steam-id="steamId"
          class="lg:col-span-2"
        />
        <!--   <!-- Match Stats -->
        <SteamMatchStats
          :cs-stats="csStats"
          :win-rate="winRate"
          :win-rate-class="winRateClass"
        />
        <!---->
        <!--   <!-- Detailed Stats -->
        <SteamDetailedStats :cs-stats="csStats" class="lg:col-span-3" />
        <!---->
        <!--   <!-- Recent Games -->
        <SteamRecentGamesCard
          v-if="recentGames?.games?.length"
          :recent-games="recentGames"
          class="lg:col-span-3"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  steamId: string;
}>();

// Create utility functions locally to avoid serialization issues
const getCSStatValue = (stats: any[], statName: string): number => {
  const stat = stats?.find((s) => s.name === statName);
  return stat ? stat.value : 0;
};

// Use asyncData instead of onMounted for better SSR support
const { data, pending, error } = await useLazyAsyncData(
  `steam-dashboard-${props.steamId}`,
  async () => {
    const { getSteamProfile, getCSStats, getRecentGames } = useSteam(
      props.steamId,
    );

    try {
      const [profileData, csStatsData, recentGamesData] = await Promise.all([
        getSteamProfile(),
        getCSStats(),
        getRecentGames(),
      ]);

      return {
        profile: profileData,
        csStats: csStatsData,
        recentGames: recentGamesData,
      };
    } catch (err) {
      throw createError({
        statusCode: 500,
        statusMessage:
          err instanceof Error ? err.message : "Failed to load Steam data",
      });
    }
  },
);

// Extract data from asyncData result
const profile = computed(() => data.value?.profile || null);
const csStats = computed(() => data.value?.csStats || null);
const recentGames = computed(() => data.value?.recentGames || null);

// Computed stats - now safe because they only use reactive data, not functions
const kdrRatio = computed(() => {
  if (!csStats.value?.stats) return "0.00";
  const kills = getCSStatValue(csStats.value.stats, "total_kills");
  const deaths = getCSStatValue(csStats.value.stats, "total_deaths");
  return deaths > 0 ? (kills / deaths).toFixed(2) : kills.toString();
});

const headshotPercentage = computed(() => {
  if (!csStats.value?.stats) return "0";
  const headshots = getCSStatValue(csStats.value.stats, "total_kills_headshot");
  const totalKills = getCSStatValue(csStats.value.stats, "total_kills");
  return totalKills > 0 ? ((headshots / totalKills) * 100).toFixed(1) : "0";
});

const winRate = computed(() => {
  if (!csStats.value?.stats) return "0";
  const wins = getCSStatValue(csStats.value.stats, "total_matches_won");
  const matches = getCSStatValue(csStats.value.stats, "total_matches_played");
  return matches > 0 ? ((wins / matches) * 100).toFixed(1) : "0";
});

const winRateClass = computed(() => {
  const rate = parseFloat(winRate.value);
  if (rate >= 60)
    return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
  if (rate >= 50)
    return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
  return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
});
</script>
