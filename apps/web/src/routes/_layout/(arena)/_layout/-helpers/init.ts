import { createApp } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';

import App from './app.vue'
import Battles from './battles.vue'

export const init = async () => {
  const routes = [
    { path: '/battles', component: Battles },
  ]

  const router = createRouter({
    history: createWebHashHistory(),
    routes
  })

  console.log('@@@init')
  const app = createApp(App);
  app.use(router);
  app.mount('#arena');
}