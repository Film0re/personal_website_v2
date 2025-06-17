<template>
  <div class="flex flex-col items-center justify-center">
    <AboutMe imageUrl="/img/profile_picture.png">
      Welcome to my website, I am a software engineer who loves anime and
      programming. I am currently working on this website as a side project to
      learn a bit more about Tailwind, GraphQL and shadcn.
    </AboutMe>

    <AnimeProfile userName="Film0re" class="max-w-sm lg:max-w-7xl" />
    <ProjectDisplay title="Projects" />
    <Footer />
  </div>
</template>
<script setup>
useSeoMeta({
  ogImage: ".img/profile_picture.png",
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/konata.ico",
    },
  ],
  script: [
    {
      src: "/stats/script.js",
      "data-website-id": "cca8a2b2-fb86-4af2-91e4-7fe9cca4c264",
      defer: true,
    },
  ],
  meta: [
    { name: "description", content: "Portfolio website for Daniel Dowdle" },
  ],
  title: "Daniel Dowdle",
});
</script>
