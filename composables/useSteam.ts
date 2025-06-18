// composables/useSteam.ts
import type { SteamProfile, CSStat, CSStats, RecentGames } from '../types/steam'

export const useSteam = () => {
  const getSteamProfile = async (): Promise<SteamProfile> => {
    const data = await $fetch('/api/steam/profile')
    return data
  }

  const getCSStats = async (): Promise<CSStats> => {
    const data = await $fetch('/api/steam/cs-stats')
    return data
  }

  const getRecentGames = async (): Promise<RecentGames> => {
    const data = await $fetch('/api/steam/recent-games')
    return data
  }

  const getCSStatValue = (stats: CSStat[], statName: string): number => {
    const stat = stats.find(s => s.name === statName)
    return stat ? stat.value : 0
  }

  const formatPlaytime = (seconds: number): string => {
    const correctionFactor = 1.59;
    const correctedSeconds = seconds * correctionFactor;
    const totalMinutes = Math.floor(correctedSeconds / 60);
    const hours = Math.floor(totalMinutes / 60);

    if (hours < 1) return `${totalMinutes}m`;
    if (hours < 24) return `${hours}h ${totalMinutes % 60}m`;

    const days = Math.floor(hours / 24);
    return `${days}d ${hours % 24}h`;
  };

  return {
    getSteamProfile,
    getCSStats,
    getRecentGames,
    getCSStatValue,
    formatPlaytime
  }
}
