<script setup>
import { Nostalgist } from "nostalgist";

const route = useRoute();
const loading = ref(true);
const error = ref(null);
const consoleType = computed(() => route.params.consoleType);
const gameName = computed(() => route.params.gameName);
const gameUrl = computed(
  () =>
    `https://cdn.jsdelivr.net/gh/retrobrews/${consoleType.value}-games@master/${gameName.value}`
);
const emulatorMap = {
  nes: "fceumm",
  snes: "snes9x",
  gbc: "mgba",
  gba: "mgba",
};
function getEmulator(system) {
  return emulatorMap[system.toLowerCase()] || "Emulator not found";
}

let nostalgist;

try {
  nostalgist = Nostalgist.configure({
    core: getEmulator(consoleType.value),
    rom: gameUrl.value,
  });
  loading.value = false;
} catch (err) {
  console.error("Failed to load game:", err);
  error.value = "Failed to load the game. Please try again later.";
  loading.value = false;
}

onMounted(async () => {
  nostalgist = await Nostalgist.launch({
    element: document.querySelector("canvas"),
  });
  console.log("Nostalgist:", nostalgist.exit);
});

onBeforeRouteLeave(() => {
  try {
    nostalgist.exit();
  } catch (error) {
    console.error("Error during Nostalgist exit:", error);
  }
});
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen p-4">
    <h1 class="text-3xl font-bold mb-6">{{ gameName }}</h1>
    <div v-if="loading" class="text-xl text-blue-600 animate-pulse">
      Loading game...
    </div>
    <div v-else-if="error" class="text-xl text-red-600">
      {{ error }}
    </div>
    <div
      v-else
      class="relative aspect-container border-4 border-gray-500 rounded-lg overflow-hidden shadow-lg"
    >
      <canvas
        ref="gameContainer"
        class="absolute top-0 left-0 w-full h-full"
      ></canvas>
    </div>
    <div class="mt-6 text-sm text-gray-400">
      Use arrow keys to move, 'Z' for A button, 'X' for B button, 'Enter' for
      Start, and 'Shift' for Select.
    </div>

    <div
      v-if="!loading && !error"
      class="fixed bottom-4 inset-x-4 grid grid-cols-3 gap-4 text-center"
    >
      <!-- D-pad -->
      <div class="flex flex-col items-center space-y-2">
        <button
          class="w-12 h-12 bg-gray-500 rounded-full"
          @click="() => nostalgist.press('up')"
        >
          ▲
        </button>
        <div class="flex space-x-2">
          <button
            class="w-12 h-12 bg-gray-500 rounded-full"
            @click="() => nostalgist.press('left')"
          >
            ◀
          </button>
          <button
            class="w-12 h-12 bg-gray-500 rounded-full"
            @click="() => nostalgist.press('right')"
          >
            ▶
          </button>
        </div>
        <button
          class="w-12 h-12 bg-gray-500 rounded-full"
          @click="() => nostalgist.press('down')"
        >
          ▼
        </button>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col items-center space-y-2">
        <button
          class="w-12 h-12 bg-blue-500 rounded-full text-white font-bold"
          @click="() => nostalgist.press('a')"
        >
          A
        </button>
        <button
          class="w-12 h-12 bg-red-500 rounded-full text-white font-bold"
          @click="() => nostalgist.press('b')"
        >
          B
        </button>
      </div>

      <!-- Start and Select -->
      <div class="flex flex-col items-center space-y-2">
        <button
          class="w-20 h-12 bg-gray-700 rounded-lg text-white"
          @click="() => nostalgist.press('start')"
        >
          Start
        </button>
        <button
          class="w-20 h-12 bg-gray-700 rounded-lg text-white"
          @click="() => nostalgist.press('select')"
        >
          Select
        </button>
      </div>
    </div>
  </div>
</template>
<style>
.aspect-container {
  position: relative;
  width: 100%;
  padding-top: 75%; /* 4:3 aspect ratio */
  max-width: 80vw; /* Max width for large screens */
  max-height: 60vh; /* Max height for large screens */
  min-width: 400px; /* Ensures visibility on larger devices */
  min-height: 300px; /* Ensures visibility on larger devices */
  box-sizing: border-box;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

button:active {
  transform: scale(0.95);
}

/* Media Queries */
@media (min-width: 1024px) {
  .aspect-container {
    max-width: 50vw; /* Larger container for desktops */
    max-height: 50vh; /* Adjust proportionally */
  }
}
</style>
