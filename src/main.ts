import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import VueUniversalModal from 'vue-universal-modal'
import 'vue-universal-modal/dist/index.css'
import { Chart, registerables } from 'chart.js'

const app = createApp(App)
const pinia = createPinia()

Chart.register(...registerables)

app.use(pinia)
app.use(VueUniversalModal, { teleportTarget: 'body' })
app.mount('#app')
