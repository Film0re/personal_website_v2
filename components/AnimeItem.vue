<template>
  <div class="flex flex-col items-center justify-between space-y-4">
    <a :href="'https://anilist.co/anime/' + anime.id">
      <NuxtImg
        :src="anime.coverImage.large"
        :alt="anime.title.english"
        class="rounded-lg h-auto shadow lg:w-auto w-72"
        width="200"
        height="300"
      />
    </a>
    <p class="mt-2 text-lg" style="margin-top: auto;">{{ anime.title.english }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  anime: {
    type: Object,
    required: true,
  },
});
</script>

<!-- No need for scoped styles with Tailwind CSS -->
<style scoped>
.shadow {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}
</style>
