<template>
  <div class="about-me-container mx-0 my-2 max-w-xs text-center">
    <a href="https://anilist.co/user/Film0re" target="_blank">
      <NuxtImg
        :src="imageUrl"
        format="webp"
        class="mx-auto mb-4 h-32 w-32 rounded-full object-cover"
        height="128"
        width="128"
        alt="MaoMao from Apothecary Diaries holding a wooden scroll"
      />
    </a>
    <p class="text-balance"><slot /></p>
  </div>
</template>

<script setup>
const props = defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
});
</script>
