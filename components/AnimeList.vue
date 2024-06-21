<template>
  <Card class="p-4">
    <div
    >
      <Carousel
      class="relative w-full max-w-m" 
      >
        <CarouselContent>
          <CarouselItem v-for="anime in animeArray" :key="anime.id" class="basis-1/5">
            <AnimeItem :anime="anime" />
          </CarouselItem>
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel></div
  ></Card>
</template>

<script setup>
const props = defineProps({
  animeArray: {
    type: Array,
    required: true,
  },
});
</script>
