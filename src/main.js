import './assets/main.css'

import { createApp } from 'vue'
// Подключаем анимацию
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
// /== Подключаем анимацию ==
// == Подключаем роутер ==
import { createRouter, createWebHistory } from 'vue-router'
// /== Подключаем роутер ==

import App from './App.vue'

// == Подключаем компоненты страниц ==
import HomeView from './pages/HomeView.vue'
import FavoritesView from './pages/FavoritesView.vue'
// /== Подключаем компоненты страниц ==

// == Подключаем роутер ==
const routes = [
  { path: '/', name: 'HomeView', component: HomeView },
  { path: '/favorites', name: 'FavoritesView', component: FavoritesView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})
// /== Подключаем роутер ==

const app = createApp(App)
// == Подключаем роутер ==
app.use(router)
// /== Подключаем роутер ==
// [переход в HeaderItem]
// == Подключаем анимацию ==
app.use(autoAnimatePlugin)
// /== Подключаем анимацию ==
// [переход в CardList]

app.mount('#app')
