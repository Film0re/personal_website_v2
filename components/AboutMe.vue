<template>
  <div class="about-me-container">
    <a href="https://anilist.co/user/Film0re" target="_blank">
      <NuxtImg
        :src="imageUrl"
        class="rounded-full h-32 w-32 object-cover mx-auto mb-4"
        style="width: 120px; height: 120px"
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

<style scoped>
.about-me-container {
  max-width: 320px;
  margin: 0 auto;
  text-align: center;
  margin-top: 2rem;
}
</style>
