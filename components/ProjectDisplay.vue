<template>
  <div class="p-8 w-full">
    <h2 class="text-center text-3xl font-bold mb-8">{{ title }}</h2>
    <div class="flex flex-wrap justify-center">
      <!-- Loop through projects and display each one -->
      <div>
        <!-- Assuming you have a 'Project' component to display each project -->
        <ProjectCard
          imageUrl="/img/lol.png"
          linkUrl="https://uofm.lol/"
          title="League of Legend's Intramurals Website"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          :badges="['Nuxt', 'Postgres']"
        >
        </ProjectCard>
      </div>
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

<style scoped>
/* No custom scoped styles needed since Tailwind CSS classes are used */
</style>
