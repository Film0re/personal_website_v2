// server/api/steam/recent-games.get.ts
export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const steamId = config.steamId
	const apiKey = config.steamApiKey

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
