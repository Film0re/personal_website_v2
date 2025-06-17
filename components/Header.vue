<template>
  <header class="w-full bg-gray-800 text-white shadow-md">
    <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
      <h1 class="text-xl font-semibold">
        <NuxtLink to="/" class="hover:text-gray-300">MySite</NuxtLink>
      </h1>
      <nav class="flex space-x-4">
        <NuxtLink
          to="/"
          class="hover:text-gray-300 transition-colors duration-200"
        >
          Home
        </NuxtLink>
        <NuxtLink
          to="/cs-stats"
          class="hover:text-gray-300 transition-colors duration-200"
        >
          CS Stats
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>
