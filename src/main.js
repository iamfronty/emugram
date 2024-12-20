import { createApp } from "vue";
import router from "./router";

import { init } from "@telegram-apps/sdk-vue";

import PrimeVue from "primevue/config";
import Aura from "@primevue/themes/aura";
import 'primeicons/primeicons.css'
import "./assets/css/index.css";
import "./assets/css/main.css";

import App from "./App.vue";

// init();
const app = createApp(App);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.mount("#app");
