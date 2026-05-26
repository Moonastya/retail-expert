import { schedule_reveal_animations } from './reveal_scroll'

/** Директива v-reveal — добавляет класс и переподключает observer. */
export const v_reveal = {
  mounted(el, binding) {
    el.classList.add('reveal')
    if (binding.value) {
      const delay =
        typeof binding.value === 'string' ? binding.value : binding.value?.delay
      if (delay) {
        el.style.setProperty('--delay', delay)
      }
    }
    schedule_reveal_animations()
  },
  unmounted(el) {
    el.classList.remove('reveal', 'is-visible')
  },
}
