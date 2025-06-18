// composables/useSteam.ts
import type { SteamProfile, CSStat, CSStats, RecentGames } from '../types/steam'

export const useSteam = (defaultSteamId?: string) => {
  const resolveSteamId = (override?: string): string => {
    if (override) return override
    if (defaultSteamId) return defaultSteamId
    throw new Error('Steam ID is required but not provided.')
  }

  const getSteamProfile = async (steamIdOverride?: string): Promise<SteamProfile> => {
    const steamId = resolveSteamId(steamIdOverride)
    const data = await $fetch(`/api/steam/profile/${steamId}`)
    return data
  }

  const getCSStats = async (steamIdOverride?: string): Promise<CSStats> => {
    const steamId = resolveSteamId(steamIdOverride)
    const data = await $fetch(`/api/steam/cs-stats/${steamId}`)
    return data
  }

  const getRecentGames = async (steamIdOverride?: string): Promise<RecentGames> => {
    const steamId = resolveSteamId(steamIdOverride)
    const data = await $fetch(`/api/steam/recent-games/${steamId}`)
    return data
  }

  const getCSStatValue = (stats: CSStat[], statName: string): number => {
    const stat = stats.find(s => s.name === statName)
    return stat ? stat.value : 0
  }

  const formatPlaytime = (seconds: number): string => {
    const correctionFactor = 1.59
    const correctedSeconds = seconds * correctionFactor
    const totalMinutes = Math.floor(correctedSeconds / 60)
    const hours = Math.floor(totalMinutes / 60)

    if (hours < 1) return `${totalMinutes}m`
    if (hours < 24) return `${hours}h ${totalMinutes % 60}m`

    const days = Math.floor(hours / 24)
    return `${days}d ${hours % 24}h`
  }

  return {
    getSteamProfile,
    getCSStats,
    getRecentGames,
    getCSStatValue,
    formatPlaytime
  }
}

