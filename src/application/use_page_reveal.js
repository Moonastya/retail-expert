import { nextTick, onMounted } from 'vue'
import { schedule_reveal_animations } from './reveal_scroll'

/** Допривязать .reveal после монтирования страницы (без сброса). */
export function use_page_reveal() {
  onMounted(async () => {
    await nextTick()
    schedule_reveal_animations()
  })
}
