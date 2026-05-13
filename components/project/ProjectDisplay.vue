<template>
  <div class="p-8 w-full">
    <h2 class="text-center text-3xl font-bold mb-8">{{ title }}</h2>
    <div class="flex flex-wrap justify-center flex-row gap-4">
      <ProjectCard
        imageUrl="/img/lol.png"
        linkUrl="https://uofm.lol/"
        title="League of Legend's Intramurals Website"
        :badges="['Nuxt', 'PostgreSQL', 'C#']"
        >Little project I created over 2023 winter break in order to automate scorekeeping for our
        intramural league. This project utilized
        <a class="underline" href="https://github.com/fraxiinus/roflxd.cs"> roflxd.cs</a>
        by
        <a class="underline" href="https://github.com/fraxiinus">Fraxinus' </a>
        to parse data from replay files which were then used to automatically update the standings.
        This was the first time I setup the schema to a database all on my own and I made some
        mistakes but overall I learned a lot and had fun B)
      </ProjectCard>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  projects: {
    type: Array,
    required: false,
  },
});
</script>
