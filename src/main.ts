import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import VueUniversalModal from 'vue-universal-modal'
import 'vue-universal-modal/dist/index.css'
import { Chart, registerables } from 'chart.js'
import { registerComponents } from '@/_setting/components/index'
import { registerGlobals } from '@/_setting/globals/index'
import router from '@/router'
const app = createApp(App)
const pinia = createPinia()

registerComponents(app)
registerGlobals(app)
Chart.register(...registerables)

app.use(pinia)
app.use(router)
app.use(VueUniversalModal, { teleportTarget: 'body' })
app.mount('#app')
app.use(router)
