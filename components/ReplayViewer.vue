<script setup lang="ts">
import { Effect, Exit, Cause } from "effect";
import { parseReplay } from "~/shared/rofl";
import type { Replay } from "~/shared/rofl";

const replay = ref<Replay | null>(null);
const error = ref<string | null>(null);
const loading = ref(false);
const dragging = ref(false);

async function processFile(file: File) {
  if (!file.name.endsWith(".rofl")) {
    error.value = "Not a .rofl file";
    return;
  }

  loading.value = true;
  error.value = null;
  replay.value = null;

  const buffer = await file.arrayBuffer();
  const exit = await Effect.runPromiseExit(parseReplay(new Uint8Array(buffer)));

  if (Exit.isSuccess(exit)) {
    replay.value = exit.value;
  } else {
    const failure = Cause.failureOption(exit.cause);
    if (failure._tag === "Some") {
      const e = failure.value;
      switch (e._tag) {
        case "MetadataError":
          error.value = `Failed to read replay metadata — the file may be corrupted or unsupported.\n${e.cause}`;
          break;
        case "SchemaError":
          error.value = `Metadata schema mismatch — unexpected file structure.\n${e.cause}`;
          break;
        case "JsonError":
          error.value = `Failed to parse stats JSON embedded in the replay.\n${e.cause}`;
          break;
        case "ParseError":
          error.value = `Failed to decode participant data — stats format may have changed.\n${e.cause}`;
          break;
      }
    } else {
      error.value = `Unexpected error:\n${Cause.pretty(exit.cause)}`;
    }
  }

  loading.value = false;
}

async function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    await processFile(file);
  }
}

async function onDrop(event: DragEvent) {
  dragging.value = false;
  const file = event.dataTransfer?.files?.[0];
  if (file) {
    await processFile(file);
  }
}

function formatSeconds(seconds: number) {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

const blueTeam = computed(() => replay.value?.participants.filter((p) => p.team === 100) ?? []);
const redTeam = computed(() => replay.value?.participants.filter((p) => p.team === 200) ?? []);
const blueWon = computed(() => blueTeam.value[0]?.won ?? false);

function exportJson() {
  if (!replay.value) {
    return;
  }
  const blob = new Blob([JSON.stringify(replay.value, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "replay.json";
  a.click();
  URL.revokeObjectURL(url);
}
</script>

<template>
  <div class="min-h-screen bg-white text-gray-800 font-sans">
    <!-- Drop zone -->
    <div v-if="!replay" class="max-w-lg mx-auto pt-24 px-6">
      <p class="text-xs tracking-[0.25em] uppercase text-gray-400 mb-6 text-center">
        League of Legends · Replay Parser
      </p>

      <label
        class="group relative flex flex-col items-center justify-center border border-dashed rounded-xl cursor-pointer transition-all duration-200 p-16 gap-4"
        :class="
          dragging
            ? 'border-blue-400 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
        "
        @dragover.prevent="dragging = true"
        @dragleave="dragging = false"
        @drop.prevent="onDrop"
      >
        <svg
          class="w-9 h-9 transition-colors duration-200"
          :class="dragging ? 'text-blue-400' : 'text-gray-300 group-hover:text-gray-400'"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="1.5"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
          />
        </svg>

        <div class="text-center">
          <p class="text-sm text-gray-600">
            Drop a <span class="text-blue-500 font-medium">.rofl</span> file here
          </p>
          <p class="text-xs text-gray-400 mt-1">or click to browse</p>
        </div>

        <input
          type="file"
          accept=".rofl"
          class="absolute inset-0 opacity-0 cursor-pointer"
          @change="onFileChange"
        />
      </label>

      <!-- Loading -->
      <div
        v-if="loading"
        class="mt-6 flex items-center justify-center gap-2.5 text-sm text-gray-400"
      >
        <svg
          class="animate-spin w-4 h-4 text-blue-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          />
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
        Parsing replay…
      </div>

      <!-- Error -->
      <div v-if="error" class="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
        <p class="text-xs tracking-widest uppercase text-red-400 font-medium mb-2">Parse failed</p>
        <pre class="text-xs text-red-500 whitespace-pre-wrap break-all leading-relaxed">{{
          error
        }}</pre>
      </div>
    </div>

    <!-- Results -->
    <div v-if="replay" class="max-w-3xl mx-auto px-6 py-10">
      <!-- Header -->
      <div class="flex items-baseline justify-between mb-8">
        <div>
          <p class="text-[10px] tracking-[0.25em] uppercase text-gray-400 mb-0.5">Match Summary</p>
          <p class="text-gray-500 text-sm">
            Duration:
            <span class="text-gray-800 font-medium">{{ formatSeconds(replay.gameLength) }}</span>
          </p>
        </div>
        <div class="flex items-center gap-2">
          <button
            class="text-xs tracking-widest uppercase text-gray-400 hover:text-gray-600 transition-colors border border-gray-200 hover:border-gray-300 rounded px-3 py-1.5"
            @click="exportJson"
          >
            ↓ Export JSON
          </button>
          <button
            class="text-xs tracking-widest uppercase text-gray-400 hover:text-gray-600 transition-colors border border-gray-200 hover:border-gray-300 rounded px-3 py-1.5"
            @click="
              replay = null;
              error = null;
            "
          >
            ← New file
          </button>
        </div>
      </div>

      <!-- Teams -->
      <div class="space-y-8">
        <div
          v-for="(team, idx) in [
            {
              players: blueTeam,
              won: blueWon,
              label: 'Blue Team',
              accent: 'text-blue-500',
              badge: blueWon,
            },
            {
              players: redTeam,
              won: !blueWon,
              label: 'Red Team',
              accent: 'text-red-400',
              badge: !blueWon,
            },
          ]"
          :key="idx"
        >
          <!-- Team label -->
          <div class="flex items-center gap-2.5 mb-2">
            <span class="text-[10px] tracking-[0.2em] uppercase font-semibold" :class="team.accent">
              {{ team.label }}
            </span>
            <span
              class="text-[10px] tracking-widest uppercase px-2 py-0.5 rounded-full border font-medium"
              :class="
                team.won
                  ? 'border-emerald-200 text-emerald-500 bg-emerald-50'
                  : 'border-gray-200 text-gray-400'
              "
            >
              {{ team.won ? "Victory" : "Defeat" }}
            </span>
          </div>

          <!-- Table -->
          <div class="rounded-xl border border-gray-200 overflow-hidden">
            <table class="w-full text-sm">
              <thead>
                <tr class="border-b border-gray-100 bg-gray-50">
                  <th
                    class="text-left py-2.5 px-4 text-[10px] tracking-wider text-gray-400 font-medium uppercase"
                  >
                    Player
                  </th>
                  <th
                    class="text-left py-2.5 px-4 text-[10px] tracking-wider text-gray-400 font-medium uppercase"
                  >
                    Champion
                  </th>
                  <th
                    class="text-center py-2.5 px-3 text-[10px] tracking-wider text-gray-400 font-medium uppercase"
                  >
                    KDA
                  </th>
                  <th
                    class="text-right py-2.5 px-4 text-[10px] tracking-wider text-gray-400 font-medium uppercase"
                  >
                    Dmg
                  </th>
                  <th
                    class="text-right py-2.5 px-4 text-[10px] tracking-wider text-gray-400 font-medium uppercase"
                  >
                    CS
                  </th>
                  <th
                    class="text-right py-2.5 px-4 text-[10px] tracking-wider text-gray-400 font-medium uppercase"
                  >
                    Gold
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr
                  v-for="player in team.players"
                  :key="`${player.riotId}-${player.tagLine}`"
                  class="hover:bg-gray-50 transition-colors"
                >
                  <td class="py-3 px-4">
                    <span class="text-gray-800 font-medium">{{ player.riotId }}</span>
                    <span class="text-gray-400 text-xs">#{{ player.tagLine }}</span>
                  </td>
                  <td class="py-3 px-4 text-gray-500">{{ player.champion }}</td>
                  <td class="py-3 px-3 text-center tabular-nums">
                    <span class="text-gray-700">{{ player.kills }}</span>
                    <span class="text-gray-300 mx-1">/</span>
                    <span class="text-red-400">{{ player.deaths }}</span>
                    <span class="text-gray-300 mx-1">/</span>
                    <span class="text-gray-700">{{ player.assists }}</span>
                  </td>
                  <td class="py-3 px-4 text-right text-gray-500 tabular-nums">
                    {{ player.damageToChampions.toLocaleString() }}
                  </td>
                  <td class="py-3 px-4 text-right text-gray-500 tabular-nums">
                    {{ player.cs }}
                  </td>
                  <td class="py-3 px-4 text-right text-gray-500 tabular-nums">
                    {{ player.goldEarned.toLocaleString() }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
