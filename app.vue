<template>
  <div class="flex flex-col center justify-center items-center">
    <Header></Header>
    <AboutMe imageUrl="/img/profile_picture.png">
      Hello I am currently a full stack developer learning the ropes. In my
      offtime I enjoy working with vue and playing counterstrike and league
      along with watching anime. :3</AboutMe
    >

    <NuxtPage></NuxtPage>
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
