<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    "
  >
    <AboutMe imageUrl="/img/pfp.png">
      Welcome to my website, I am a software engineer who loves anime and
      programming. I am currently working on this website as a side project to
      learn a bit more about Tailwind.
    </AboutMe>

    <AnimeProfile userName="Film0re" style="width: 1200px" />
    <ProjectDisplay title="Projects" />
  </div>
</template>
<script setup>
useHead({
  htmlAttrs: {
    lang: "en",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/favicon.ico",
    },
  ],
  script: [
    {
      src: "/stats/script.js",
      "data-website-id": "cca8a2b2-fb86-4af2-91e4-7fe9cca4c264",
      defer: true,
    },
  ],
});
</script>

<style scoped>
.user-profile {
  padding: 20px;
}
</style>
