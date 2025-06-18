// server/api/steam/cs-stats/[steamId].get.ts
export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const apiKey = config.steamApiKey
	const csgoAppId = '730'

	const { steamId } = event.context.params || {}

	if (!steamId) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Missing steamId in URL'
		})
	}

	try {
		const response = await $fetch(`https://api.steampowered.com/ISteamUserStats/GetUserStatsForGame/v0002/`, {
			query: {
				appid: csgoAppId,
				key: apiKey,
				steamid: steamId
			}
		})

		return response.playerstats
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to fetch CS stats'
		})
	}
})

