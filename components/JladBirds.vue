<script setup lang="ts">

const back = ref(1);

const { data, status, error, refresh } = await useFetch<BirdsResponse>(
  "/api/birds/lochness",
  { query: { back } }, // reactive — refetches automatically when back changes
);

//TODO: Come back and fix timezones :-)
const formattedDate = computed(() => {
  if (!data.value?.date) {
    return "";
  }

  // Treat date-only strings as local midnight, not UTC midnight
  const [year, month, day] = data.value.date.split("-").map(Number);
  const date = new Date(year, month - 1, day); // local time

  return date.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
});



const birdEmojis = ["🐦", "🦆", "🦅", "🦉", "🦚", "🦜", "🐧", "🦢", "🕊️", "🦤"];
const getBirdEmoji = (index: number) => birdEmojis[index % birdEmojis.length];

const DAY_OPTIONS = [
  { label: "Yesterday", value: 1 },
  { label: "3 days ago", value: 3 },
  { label: "1 week ago", value: 7 },
  { label: "2 weeks ago", value: 14 },
];
</script>

<template>
  <div
    class="relative min-h-screen bg-stone-50 font-serif text-stone-900 px-4 py-10 pb-16 overflow-x-hidden"
  >
    <div
      class="absolute inset-0 pointer-events-none z-0 opacity-30"
      style="
        background-image:
          linear-gradient(#d6d3cb 1px, transparent 1px),
          linear-gradient(90deg, #d6d3cb 1px, transparent 1px);
        background-size: 40px 40px;
      "
      aria-hidden="true"
    />

    <header class="relative z-10 text-center mb-8 pb-8 border-b-2 border-stone-700">
      <p class="font-mono text-xs tracking-widest uppercase text-green-700 mb-2">
        🏴󠁧󠁢󠁳󠁣󠁴󠁿 Loch Ness Park · L1006498
      </p>
      <h1 class="leading-none m-0">
        <span
          class="block font-mono font-bold text-amber-600 tracking-widest uppercase text-sm sm:text-base"
        >
          jlad's
        </span>
        <span class="block italic font-bold text-green-800 text-5xl sm:text-6xl leading-tight">
          birds of the day
        </span>
      </h1>
      <p v-if="formattedDate" class="font-mono text-xs text-stone-400 mt-2 tracking-wide">
        {{ formattedDate }}
      </p>

      <!-- TODO: clean this up and figureo  -->
      <!-- Day picker -->
      <!-- <div class="flex items-center justify-center gap-2 mt-5 flex-wrap"> -->
      <!--   <button -->
      <!--     v-for="opt in DAY_OPTIONS" -->
      <!--     :key="opt.value" -->
      <!--     class="font-mono text-xs tracking-wide px-3 py-1.5 rounded-sm border transition-all duration-150" -->
      <!--     :class=" -->
      <!--       back === opt.value -->
      <!--         ? 'bg-stone-900 text-amber-400 border-stone-900' -->
      <!--         : 'bg-transparent text-stone-500 border-stone-300 hover:border-stone-500 hover:text-stone-700' -->
      <!--     " -->
      <!--     @click="back = opt.value" -->
      <!--   > -->
      <!--     {{ opt.label }} -->
      <!--   </button> -->
      <!-- </div> -->
    </header>

    <!-- Loading -->
    <div v-if="status === 'pending'" class="relative z-10 flex justify-center py-20">
      <div class="text-center">
        <span class="text-5xl block mb-4 animate-bounce">🔭</span>
        <p class="italic text-green-700 text-lg">Scannin' the loch…</p>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="relative z-10 flex justify-center py-20">
      <div class="text-center">
        <span class="text-5xl block mb-4">🌧️</span>
        <p class="font-bold text-red-600 text-lg">Nae birds found, pal</p>
        <p class="font-mono text-xs text-stone-400 mt-2">{{ error.message }}</p>
      </div>
    </div>

    <!-- Empty -->
    <div v-else-if="!data?.sightings.length" class="relative z-10 flex justify-center py-20">
      <div class="text-center">
        <span class="text-5xl block mb-4">🌫️</span>
        <p class="italic text-stone-500 text-lg">
          The loch's quiet that day. Not a single bird spotted, lad.
        </p>
      </div>
    </div>

    <!-- Birds -->
    <div v-else class="relative z-10 max-w-xl mx-auto">
      <div
        class="inline-block font-mono text-xs uppercase tracking-widest text-amber-500 bg-stone-900 px-3 py-1.5 mb-6"
        style="clip-path: polygon(6px 0%, 100% 0%, calc(100% - 6px) 100%, 0% 100%)"
      >
        {{ data.count }} species spotted
      </div>

      <ul class="space-y-2 list-none p-0 m-0">
        <li
          v-for="(bird, i) in data.sightings"
          :key="bird.speciesCode"
          class="flex items-center gap-4 bg-stone-100 border border-stone-200 border-l-4 border-l-green-700 px-4 py-3 rounded-sm transition-all duration-200 hover:border-l-amber-500 hover:translate-x-1 hover:shadow-md animate-[fadeSlideIn_0.4s_ease_both]"
          :style="{ animationDelay: `${i * 60}ms` }"
        >
          <span class="text-2xl w-8 text-center flex-shrink-0">{{ getBirdEmoji(i) }}</span>
          <div class="flex-1 min-w-0">
            <span class="block font-bold text-stone-900 truncate">{{ bird.comName }}</span>
            <span class="block italic text-xs text-stone-400 truncate">{{ bird.sciName }}</span>
          </div>
          <div class="flex flex-col items-end gap-1 flex-shrink-0">
            <span
              v-if="bird.howMany"
              class="font-mono text-xs font-bold text-green-700 bg-green-100 px-1.5 py-0.5 rounded-sm"
            >
              ×{{ bird.howMany }}
            </span>
            <span class="font-mono text-[10px] text-stone-400">{{
              bird.obsDt.split(" ")[1] ?? ""
            }}</span>
          </div>
        </li>
      </ul>
    </div>

    <footer
      class="relative z-10 text-center font-mono text-[10px] text-stone-400 tracking-wide mt-12"
    >
      Powered by eBird · Data © Cornell Lab of Ornithology
    </footer>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,700;1,400&family=Space+Mono:wght@400;700&display=swap");
.font-serif {
  font-family: "Lora", Georgia, serif;
}
.font-mono {
  font-family: "Space Mono", monospace;
}
@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
