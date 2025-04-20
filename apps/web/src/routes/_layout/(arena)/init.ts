import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import App from './_layout/-helpers/app.vue'
import Battles from './_layout/-helpers/battles.vue'

export const init = async () => {
  const routes = [
    { path: '/arena/battles', component: Battles },
  ]

  const router = createRouter({
    history: createWebHashHistory(),
    routes,
  })

  const app = createApp(App);
  app.use(router);
  app.mount('#arena');
}