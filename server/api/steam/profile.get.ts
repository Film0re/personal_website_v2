// server/api/steam/profile.get.ts
export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
	const steamId = config.steamId
	const apiKey = config.steamApiKey

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
