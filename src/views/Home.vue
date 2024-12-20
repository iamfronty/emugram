<script setup>
import { RouterLink } from "vue-router";
import { engines } from "@/store";
</script>

<template>
  <main class="home">
    <h1 class="text-3xl font-500 w-full text-center pt-20 pb-8">Retrogram</h1>
    <div class="flex flex-col gap-2">
      <router-link
        v-for="item in engines"
        :key="item.id"
        :to="'/engine/' + item.id"
        class="flex flex-row items-center gap-4 p-2 bg-neutral-800 rounded-md"
      >
        <img
          :src="'/src/assets/img/' + item.id + '.png'"
          class="h-20 w-20 object-fill"
        />
        {{ item.name }}
      </router-link>
    </div>
  </main>
</template>
