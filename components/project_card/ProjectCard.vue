<template>
  <Card class="p-0 card">
    <CardContent class="p-0 project-card">
      <a :href="linkUrl" target="_blank">
        <img
          :src="imageUrl"
          alt="Project Image"
          class="project-image"
        />
      </a>
      <CardHeader>
        <CardTitle>{{ title }}</CardTitle>
      </CardHeader>

      <p class="p-3">
        {{ description }}
      </p>
      <div class="badges pl-3">
        <Badge v-for="(badge, index) in badges" :key="index">{{ badge }}</Badge>
      </div>
      <div class="buttons">
        <Button v-for="(button, index) in buttons" :key="index" :href="button.url" target="_blank">{{ button.text }}</Button>
      </div>
    </CardContent>
  </Card>
</template>

<script setup>
const props = defineProps({
    imageUrl: {
      type: String,
      required: true
    },
    linkUrl: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    badges: {
      type: Array,
      required: true
    },
    buttons: {
      type: Array,
      required: false
    }
  });
</script>

<style scoped>
.project-image {
  height: auto;
  display: block;
  margin: 0 auto;
  border-radius: 5px 5px 0 0;
}

.card {
  margin-bottom: 20px;
  max-width: 700px;
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
}
</style>
