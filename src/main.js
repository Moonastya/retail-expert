import { createApp } from 'vue'
import { router } from './router'
import './style.css'
import './styles/scroll_reveal.css'
import App from './App.vue'
import { v_reveal } from './application/reveal_directive'
import { schedule_route_reveal_reset } from './application/reveal_scroll'

const app = createApp(App)
app.directive('reveal', v_reveal)
app.use(router)

app.mount('#app')

router.isReady().then(() => {
  schedule_route_reveal_reset()
})
