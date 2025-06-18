// server/api/steam/profile/[steamId].get.ts
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
		const response = await $fetch(`https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/`, {
			query: {
				key: apiKey,
				steamids: steamId
			}
		})

		return response.response.players[0]
	} catch (error) {
		throw createError({
			statusCode: 500,
			statusMessage: 'Failed to fetch Steam profile'
		})
	}
})

