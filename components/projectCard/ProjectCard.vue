<template>
  <Card class="p-0 card">
    <CardContent class="p-0 project-card">
      <a :href="linkUrl" target="_blank">
        <div class="image-container">
          <NuxtImg
            :src="imageUrl"
            alt="Project Image"
            class="project-image shadow-sm"
            height="360"
            width="700"
          />
        </div>
      </a>
      <CardHeader>
        <CardTitle>{{ title }}</CardTitle>
      </CardHeader>

      <p class="p-3">
        {{ description }}
      </p>

      <div class="p-3 flex flex-row justify-center align-center">
        <Badge class="mr-1" v-for="(badge, index) in badges" :key="index">{{ badge }}</Badge>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
const props = defineProps({
  imageUrl: {
    type: String,
    required: true,
  },
  linkUrl: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  badges: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.image-container {
  width: 100%;
  overflow: hidden;
  border-radius: 5px 5px 0 0;
}

.project-image {
  display: block;
  transition: transform 0.3s;
}

.project-image:hover {
  transform: scale(1.05);
}

.card {
  margin-bottom: 20px;
  max-width: 700px;
  width: 100%;
  box-sizing: border-box;
}

.project-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.badges {
  display: flex;
  align-items: start;
  gap: 10px;
  margin-top: 10px;
  width: 100%;
}

.buttons {
  margin-top: 20px;
  margin-right: auto;
}
</style>
