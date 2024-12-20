<script setup>
import { RouterView } from "vue-router";
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const isNavigatingBack = ref(false);
const routeHistory = ref([]);

router.beforeEach((to, from, next) => {
  const toPath = to.path;
  const fromPath = from.path;
  if (
    routeHistory.value.length > 1 &&
    routeHistory.value[routeHistory.value.length - 2] === toPath
  ) {
    isNavigatingBack.value = true;
    routeHistory.value.pop();
  } else {
    isNavigatingBack.value = false;
    routeHistory.value.push(fromPath);
  }
  next();
});
router.afterEach(() => {
  setTimeout(() => {
    isNavigatingBack.value = false;
  }, 150);
});
</script>

<template>
  <router-view v-slot="{ Component, route }" class="max-w-xl m-auto">
    <transition
      :enter-active-class="
        'transition-all duration-150 ' +
        (isNavigatingBack ? 'ease-out' : 'ease-out')
      "
      :enter-from-class="
        isNavigatingBack
          ? 'opacity-0 -translate-x-6'
          : 'opacity-0 translate-x-6'
      "
      enter-to-class="opacity-100 translate-x-0"
      :leave-active-class="
        'transition-all duration-150 ' +
        (isNavigatingBack ? 'ease-in' : 'ease-in')
      "
      leave-from-class="opacity-100 translate-x-0"
      :leave-to-class="
        isNavigatingBack
          ? 'opacity-0 translate-x-6'
          : 'opacity-0 -translate-x-6'
      "
      mode="out-in"
    >
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>
