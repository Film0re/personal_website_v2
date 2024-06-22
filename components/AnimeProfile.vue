<template>
  <div class="" v-if="user">
    <div class="flex flex-col items-center space-y-4">
      <!-- <a :href="`https://anilist.co/user/${user.name}`" target="_blank"> -->
      <!-- <img -->
      <!-- :src="user.avatar.large" -->
      <!-- :alt="user.name" -->
      <!-- class="rounded-full w-32 h-32 mt-4 shadow-lg" -->
      <!-- /> -->
      <!-- </a> -->
      <!-- <h1 class="text-2xl font-bold">{{ user.name }}</h1> -->
      <!-- <p class="text-center" v-html="user.about"></p> -->
    </div>
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
import AnimeList from "./AnimeList.vue";

const { data: userData } = await useAsyncData("anilist", async () => {
  return await useUserData("Film0re");
});

const user = computed(() => userData.value?.user);

const favoriteAnime = computed(() => {
  return user.value?.favourites?.anime.edges.map((edge) => edge.node);
});

const currentlyWatching = computed(() => {
  return userData.value.currentAnime[0].entries.map((entry) => {
    return {
      ...entry.media,
      score: entry.score,
      progress: entry.progress,
    };
  });
});

console.log(userData.value.currentAnime[0]);
</script>
