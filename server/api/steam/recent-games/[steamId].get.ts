// server/api/steam/recent-games/[steamId].get.ts
export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const apiKey = config.steamApiKey
	const { steamId } = event.context.params || {}

	if (!steamId) {
		throw createError({
			statusCode: 400,
			statusMessage: 'Missing steamId in URL'
		})
	}

	try {
		const response = await $fetch(`https://api.steampowered.com/IPlayerService/GetRecentlyPlayedGames/v0001/`, {
			query: {
				key: apiKey,
				steamid: steamId,
				format: 'json'
			}
		})

		return response.response
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to fetch recent games'
		})
	}
})

