<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const loading = ref([]);
const route = useRoute();
const games = ref([]);
const currentEngine = computed(() => {
  const parts = route.path.split("/");
  return parts[parts.length - 1];
});
const loadGames = async () => {
  try {
    const url = `https://cdn.jsdelivr.net/gh/arianrhodsandlot/retro-assembly@main/src/core/constants/retrobrews/${currentEngine.value}-games.ts`;
    const response = await fetch(url);
    const text = await response.text();
    const match = text.match(/export const \w+Games = (\[[\s\S]*\])/);
    if (match && match[1]) {
      const gamesArray = eval(match[1]);
      games.value = gamesArray;
      loading.value = false;
    } else {
      console.error("Failed to extract games array from the response");
    }
  } catch (error) {
    console.error("Error loading games:", error);
  }
};

onMounted(() => {
  loadGames();
});
</script>

<template>
  <div class="container px-4 py-8">
    <RouterLink to="/">
      <Button label="Back" icon="pi pi-arrow-left" class="w-full mb-4" />
    </RouterLink>
    <div v-if="loading" class="text-center py-8">
      <i-svg-spinners-bars-rotate-fade class="w-full h-8" />
    </div>
    <div v-else-if="error" class="text-center py-8">
      <div class="text-lg text-red-600">{{ error }}</div>
    </div>
    <div v-else-if="games.length">
      <h1
        class="text-3xl font-bold mb-8 flex flex-col items-center justify-center"
      >
        <img
          :src="'/src/assets/img/' + currentEngine + '.png'"
          class="h-32 w-32 object-fill"
        />
        {{ currentEngine }}
      </h1>
      <div class="grid grid-cols-2 gap-2">
        <router-link
        :to="'/game/' + currentEngine + '/' + game.fileName"
          v-for="game in games"
          :key="game.fileName"
          class="bg-neutral-800 rounded-lg shadow-md p-2 gap-2 flex flex-col"
        >
          <img
            :src="`https://cdn.jsdelivr.net/gh/retrobrews/${currentEngine}-games@master/${
              game.fileName.split('.')[0]
            }.png`"
            :alt="game.name"
            class="object-cover w-full h-32 rounded"
          />
          <h3 class="text-md font-semibold mb-2">{{ game.name }}</h3>
        </router-link>
      </div>
    </div>
  </div>
</template>

<!-- <template>
  <div>
    <h1>{{ currentEngine }} Games</h1>
    <ul v-if="games.length">
      <li v-for="game in games" :key="game.fileName">
        {{ game.name }} ({{ game.fileName }})
      </li>
    </ul>
    <p v-else>Loading games...</p>
  </div>
</template> -->
