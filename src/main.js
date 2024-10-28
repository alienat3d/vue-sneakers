import './assets/main.css'

import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import App from './App.vue'

const app = createApp(App)

app.use(autoAnimatePlugin)
// [переход в CardList]
app.mount('#app')
