<template>
  <div class="max-w-6xl mx-auto p-6">
    <!-- break this unholy monster that claude created into more maintainable pieces -->
    <!-- Loading State -->
    <div v-if="pending" class="flex items-center justify-center min-h-96">
      <div class="flex items-center space-x-4">
        <div
          class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
        ></div>
        <p class="text-lg text-gray-600 dark:text-gray-300">
          Loading your CS stats...
        </p>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 max-w-md mx-auto"
    >
      <div class="flex items-center">
        <div class="flex-shrink-0">
          <svg
            class="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800 dark:text-red-200">
            Error
          </h3>
          <p class="text-sm text-red-700 dark:text-red-300">{{ error }}</p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="space-y-8">
      <!-- Profile Section -->
      <div
        v-if="profile"
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

      <!-- Stats Grid -->
      <div v-if="csStats" class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Key Stats -->
        <div
          class="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
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
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {{
                  getCSStatValue(csStats.stats, "total_kills").toLocaleString()
                }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Total Kills
              </div>
            </div>
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div class="text-2xl font-bold text-red-600 dark:text-red-400">
                {{
                  getCSStatValue(csStats.stats, "total_deaths").toLocaleString()
                }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Total Deaths
              </div>
            </div>
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div
                class="text-2xl font-bold text-green-600 dark:text-green-400"
              >
                {{ kdrRatio }}
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                K/D Ratio
              </div>
            </div>
            <div class="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div
                class="text-2xl font-bold text-purple-600 dark:text-purple-400"
              >
                {{ headshotPercentage }}%
              </div>
              <div class="text-sm text-gray-600 dark:text-gray-400">
                Headshot %
              </div>
            </div>
          </div>
        </div>

        <!-- Match Stats -->
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
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Matches Won</span>
              <span
                class="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-sm font-medium"
              >
                {{
                  getCSStatValue(
                    csStats.stats,
                    "total_matches_won",
                  ).toLocaleString()
                }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400"
                >Matches Played</span
              >
              <span
                class="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
              >
                {{
                  getCSStatValue(
                    csStats.stats,
                    "total_matches_played",
                  ).toLocaleString()
                }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600 dark:text-gray-400">Win Rate</span>
              <span
                :class="winRateClass"
                class="px-3 py-1 rounded-full text-sm font-medium"
              >
                {{ winRate }}%
              </span>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-600 pt-4">
              <div class="flex justify-between items-center">
                <span class="text-gray-600 dark:text-gray-400"
                  >Time Played</span
                >

                <span class="font-medium text-gray-900 dark:text-white">{{
                  formatPlaytime(
                    getCSStatValue(csStats.stats, "total_time_played"),
                  )
                }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Additional Stats -->
        <div
          class="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
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
            <div>
              <h4
                class="font-medium text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide"
              >
                Combat
              </h4>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400 text-sm"
                    >MVP Awards</span
                  >
                  <span
                    class="text-gray-900 dark:text-white font-medium text-sm"
                    >{{
                      getCSStatValue(
                        csStats.stats,
                        "total_mvps",
                      ).toLocaleString()
                    }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400 text-sm"
                    >Shots Fired</span
                  >
                  <span
                    class="text-gray-900 dark:text-white font-medium text-sm"
                    >{{
                      getCSStatValue(
                        csStats.stats,
                        "total_shots_fired",
                      ).toLocaleString()
                    }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400 text-sm"
                    >Shots Hit</span
                  >
                  <span
                    class="text-gray-900 dark:text-white font-medium text-sm"
                    >{{
                      getCSStatValue(
                        csStats.stats,
                        "total_shots_hit",
                      ).toLocaleString()
                    }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400 text-sm"
                    >Accuracy</span
                  >
                  <span
                    class="text-gray-900 dark:text-white font-medium text-sm"
                    >{{ shotAccuracy }}%</span
                  >
                </div>
              </div>
            </div>

            <div>
              <h4
                class="font-medium text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide"
              >
                Objectives
              </h4>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400 text-sm"
                    >Bombs Planted</span
                  >
                  <span
                    class="text-gray-900 dark:text-white font-medium text-sm"
                    >{{
                      getCSStatValue(
                        csStats.stats,
                        "total_planted_bombs",
                      ).toLocaleString()
                    }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400 text-sm"
                    >Bombs Defused</span
                  >
                  <span
                    class="text-gray-900 dark:text-white font-medium text-sm"
                    >{{
                      getCSStatValue(
                        csStats.stats,
                        "total_defused_bombs",
                      ).toLocaleString()
                    }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400 text-sm"
                    >Hostages Rescued</span
                  >
                  <span
                    class="text-gray-900 dark:text-white font-medium text-sm"
                    >{{
                      getCSStatValue(
                        csStats.stats,
                        "total_rescued_hostages",
                      ).toLocaleString()
                    }}</span
                  >
                </div>
              </div>
            </div>

            <div>
              <h4
                class="font-medium text-gray-900 dark:text-white mb-3 text-sm uppercase tracking-wide"
              >
                Equipment
              </h4>
              <div class="space-y-3">
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400 text-sm"
                    >Money Earned</span
                  >
                  <span
                    class="text-gray-900 dark:text-white font-medium text-sm"
                    >${{
                      getCSStatValue(
                        csStats.stats,
                        "total_money_earned",
                      ).toLocaleString()
                    }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400 text-sm"
                    >Weapons Donated</span
                  >
                  <span
                    class="text-gray-900 dark:text-white font-medium text-sm"
                    >{{
                      getCSStatValue(
                        csStats.stats,
                        "total_weapons_donated",
                      ).toLocaleString()
                    }}</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600 dark:text-gray-400 text-sm"
                    >Damage Dealt</span
                  >
                  <span
                    class="text-gray-900 dark:text-white font-medium text-sm"
                    >{{
                      getCSStatValue(
                        csStats.stats,
                        "total_damage_done",
                      ).toLocaleString()
                    }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Games -->
        <div
          v-if="recentGames?.games?.length"
          class="lg:col-span-3 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
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
            <div
              v-for="game in recentGames.games.slice(0, 6)"
              :key="game.appid"
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
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { SteamProfile, CSStats, RecentGames } from "~/types/steam";

const props = defineProps<{
  steamId: string;
}>();

const {
  getSteamProfile,
  getCSStats,
  getRecentGames,
  getCSStatValue,
  formatPlaytime,
} = useSteam(props.steamId);

const profile = ref<SteamProfile | null>(null);
const csStats = ref<CSStats | null>(null);
const recentGames = ref<RecentGames | null>(null);
const pending = ref(false);
const error = ref<string | null>(null);

// Computed stats
const kdrRatio = computed(() => {
  if (!csStats.value) return "0.00";
  const kills = getCSStatValue(csStats.value.stats, "total_kills");
  const deaths = getCSStatValue(csStats.value.stats, "total_deaths");
  return deaths > 0 ? (kills / deaths).toFixed(2) : kills.toString();
});

const headshotPercentage = computed(() => {
  if (!csStats.value) return "0";
  const headshots = getCSStatValue(csStats.value.stats, "total_kills_headshot");
  const totalKills = getCSStatValue(csStats.value.stats, "total_kills");
  return totalKills > 0 ? ((headshots / totalKills) * 100).toFixed(1) : "0";
});

const winRate = computed(() => {
  if (!csStats.value) return "0";
  const wins = getCSStatValue(csStats.value.stats, "total_matches_won");
  const matches = getCSStatValue(csStats.value.stats, "total_matches_played");
  return matches > 0 ? ((wins / matches) * 100).toFixed(1) : "0";
});

const shotAccuracy = computed(() => {
  if (!csStats.value) return "0";
  const shotsHit = getCSStatValue(csStats.value.stats, "total_shots_hit");
  const shotsFired = getCSStatValue(csStats.value.stats, "total_shots_fired");
  return shotsFired > 0 ? ((shotsHit / shotsFired) * 100).toFixed(1) : "0";
});

const winRateClass = computed(() => {
  const rate = parseFloat(winRate.value);
  if (rate >= 60)
    return "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200";
  if (rate >= 50)
    return "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200";
  return "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200";
});

// Load data on mount
onMounted(async () => {
  try {
    const [profileData, csStatsData, recentGamesData] = await Promise.all([
      getSteamProfile(),
      getCSStats(),
      getRecentGames(),
    ]);

    profile.value = profileData;
    csStats.value = csStatsData;
    recentGames.value = recentGamesData;
  } catch (err) {
    error.value = err instanceof Error ? err.message : "Unknown error";
  } finally {
    pending.value = false;
  }
});
</script>
