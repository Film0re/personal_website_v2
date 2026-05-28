<template>
  <div v-if="featured" class="flex flex-col items-center gap-3">
    <p class="uppercase text-3xl text-balance text-center font-bold tracking-[0.15em]">✦ Malaxaco Pick of the Day ✦</p>

    <div class="relative rounded-xl overflow-hidden w-full max-w-2xl" style="aspect-ratio: 16/9">
      <img :src="featured.bannerImage" class="w-full h-full object-cover opacity-55" />
      <div
        class="absolute inset-0"
        style="
          background: linear-gradient(
            to top,
            rgba(10, 5, 20, 0.97) 0%,
            rgba(10, 5, 20, 0.4) 55%,
            transparent 100%
          );
        "
      />

      <div class="absolute bottom-0 left-0 right-0 p-6 flex items-end gap-5">
        <a :href="'https://anilist.co/anime/' + featured.id" class="flex-shrink-0">
          <NuxtImg
            :src="featured.coverImage.large"
            :alt="featured.title.english ?? featured.title.romaji"
            class="rounded-md object-cover flex-shrink-0"
            style="
              width: 80px;
              height: 112px;
              min-width: 80px;
              border: 2px solid rgba(255, 255, 255, 0.15);
            "
          />
        </a>

        <div class="min-w-0 flex-1">
          <p class="text-white text-xl font-semibold mb-1 truncate">
            {{ featured.title.english ?? featured.title.romaji }}
          </p>
          <div class="flex items-center gap-2 mb-2">
            <span
              class="text-xs px-2 py-0.5 rounded-full"
              style="
                background: rgba(255, 210, 0, 0.18);
                color: #ffd200;
                border: 1px solid rgba(255, 210, 0, 0.35);
              "
            >
              ★ {{ featured.score }} / 10
            </span>
          </div>
          <div
            class="line-clamp-2 text-sm [&_a]:pointer-events-none"
            style="color: rgba(255, 255, 255, 0.6)"
            v-html="featured.description"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { HIGH_SCORE_QUERY, pickRandomHighScoredAnime } from "~/queries/user";

const { data: raw } = await useAsyncQuery(HIGH_SCORE_QUERY, { userName: "Film0re" });
const featured = pickRandomHighScoredAnime(raw.value);
</script>
