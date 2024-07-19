<template>
  <div class="flex flex-col items-center justify-between space-y-4">
    <a :href="'https://anilist.co/anime/' + anime.id">
      <NuxtImg
        :src="anime.coverImage.large"
        :alt="anime.title.english"
        class="rounded-lg shadow w-52 h-72 object-cover"
        height="288"
      />
    </a>
    <br />
    <p class="mt-2 text-lg text-center" style="margin-top: auto">
      {{ anime.title.english }}
    </p>
    <p class="text-sm text-gray-500">
      <span v-if="anime.progress" class="text-sm text-gray-500">
        Progress: {{ anime.progress }} / {{ anime.episodes }}
      </span>
      <span v-if="anime.score && anime.progress" class="text-sm text-gray-500">
        &middot;
      </span>
      <span v-if="anime.score" class="text-sm text-gray-500">
        Score: {{ anime.score }}
      </span>
    </p>
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
