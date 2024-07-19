<template>
  <div class="p-8 w-full">
    <h2 class="text-center text-3xl font-bold mb-8">{{ title }}</h2>
    <div class="flex flex-wrap justify-center flex-row gap-4">
      <ProjectCard
        imageUrl="/img/lol.png"
        linkUrl="https://uofm.lol/"
        title="League of Legend's Intramurals Website"
        :badges="['Nuxt', 'PostgreSQL', 'C#']"
        >Little project I created over 2023 winter break in order to automate
        scorekeeping for our intramural league. This project utilized
        <a class="underline" href="https://github.com/fraxiinus/roflxd.cs">
          roflxd.cs</a
        >
        by
        <a class="underline" href="https://github.com/fraxiinus">Fraxinus' </a>
        to parse data from replay files which were then used to automatically
        update the standings. This was the first time I setup the schema to a
        database all on my own and I made some mistakes but overall I learned a
        lot and have fun B)
      </ProjectCard>

      <ProjectCard
        imageUrl="/img/aram.png"
        linkUrl="https://aram.dowdle.dev"
        title="Aram Stats"
        :badges="['Vue', 'Supabase', 'PrimeVue', 'Riot Games API']"
        >Aram is one of my favorite game modes to just relax on and so I was
        quite sad when <a href="https://aram.academy/">Aram Academy</a> went
        down. I like being able to see my stats over hundreds of games but none
        of the other sites had my old data and would only load the past 20 games
        or so. In order to fix this problem I created
        <a class="underline" href="https://aram.dowdle.dev/">Aram Stats</a>. I
        was able to go back ~500 games and create an auto-update script to
        always keep my stats up to date! The only downside is I can also see my
        bad stats :(
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
