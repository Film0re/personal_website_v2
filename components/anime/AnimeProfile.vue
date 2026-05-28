<template>
  <div v-if="user">
    <div>
      <div class="mt-8">
        <h2 class="mb-4 text-center text-3xl font-bold">Favorites</h2>
        <AnimeList :animeArray="favoriteAnime" />
      </div>

      <div class="mt-8">
        <h2 class="mb-4 text-center text-3xl font-bold">Currently Watching</h2>
        <AnimeList :animeArray="currentlyWatching" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { USER_QUERY, processUserData } from '~/queries/user'
const { data: raw } = await useAsyncQuery(USER_QUERY, { userName: 'Film0re' })

const { user, favoriteAnime, currentlyWatching } = computed(
  () => raw.value ? processUserData(raw.value) : { user: null, favoriteAnime: [], currentlyWatching: [] }
).value
</script>
