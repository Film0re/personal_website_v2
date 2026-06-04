<template>
  <div class="flex flex-col center justify-center items-center">
    <Header />
    <AboutMe imageUrl="/img/profile_picture.png">
      Just a chud with a dream
    </AboutMe>

    <NuxtPage></NuxtPage>
    <Footer />
  </div>
</template>
<script setup lang="ts">
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
  meta: [{ name: "description", content: "Portfolio website for Daniel Dowdle" }],
  title: "Daniel Dowdle",
});
</script>
