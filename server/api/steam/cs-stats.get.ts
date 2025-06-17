// server/api/steam/cs-stats.get.ts
export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const steamId = config.steamId
	const apiKey = config.steamApiKey
	const csgoAppId = '730' // CS2/CSGO app ID

	try {
		const response = await $fetch(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/`, {
			query: {
				appid: csgoAppId,
				key: apiKey,
				steamid: steamId
			}
		})

		console.log(JSON.stringify(response.playerstats.stats, null, 2))

		return response.playerstats
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to fetch CS stats'
		})
	}
})

