<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    "
  >
    <ProjectCard
      imageUrl="/img/league_website.png"
      linkUrl="https://uofm.lol/"
      title="League of Legend's Intramurals Website"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
      :badges="['Nuxt', 'Postgres']"
    >
  </ProjectCard>

  </div>
</template>
<script setup>
useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.ico'
    },
  ],
  script: [
    {
      src: '/stats/script.js',
      'data-website-id': 'cca8a2b2-fb86-4af2-91e4-7fe9cca4c264',
      defer: true
    }
  ]
})

</script>