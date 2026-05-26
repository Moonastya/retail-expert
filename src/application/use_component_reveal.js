import { nextTick, onMounted } from 'vue'
import { schedule_reveal_animations } from './reveal_scroll'

/** Допривязать .reveal, появившиеся после монтирования (без сброса страницы). */
export function use_component_reveal() {
  onMounted(async () => {
    await nextTick()
    schedule_reveal_animations()
  })
}
