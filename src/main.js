import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { autoAnimatePlugin } from '@formkit/auto-animate/vue';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import Home from './pages/Home.vue';
import Favorites from './pages/Favorites.vue';

const app = createApp(App);

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/favorites', name: 'favorites', component: Favorites },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

app.use(autoAnimatePlugin);
app.use(router);
app.mount('#app');
