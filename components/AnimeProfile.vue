<template>
  <div v-if="user">
    <div>
      <div class="mt-8">
        <h2 class="text-center text-3xl font-bold mb-4">Favorites</h2>
        <AnimeList :animeArray="favoriteAnime" />
      </div>

      <div class="mt-8">
        <h2 class="text-center text-3xl font-bold mb-4">Currently Watching</h2>
        <AnimeList :animeArray="currentlyWatching" />
      </div>
    </div>
  </div>
</template>

<script setup>
const { data: userData } = await useAsyncData("anilist", async () => {
  return await useUserData("Film0re");
});

const user = computed(() => userData.value?.user);
const favoriteAnime = computed(() => userData.value?.favoriteAnime);
const currentlyWatching = computed(() => userData.value?.currentlyWatching);
</script>
