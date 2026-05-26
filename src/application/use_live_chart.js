import { onMounted, onUnmounted, ref } from 'vue'

/**
 * Включает «живую» анимацию.
 * @param {boolean} always_on — не выключать после первого появления (постоянная анимация).
 */
export function use_live_chart(root_ref, threshold = 0.05, always_on = true) {
  const live = ref(false)
  let observer = null
  let sticky_on = false

  onMounted(() => {
    const el = root_ref.value
    if (!el) return

    const sync = (on) => {
      if (always_on && on) {
        sticky_on = true
      }
      live.value = always_on ? sticky_on || on : on
    }

    const check_initial = () => {
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        sync(true)
      }
    }
    check_initial()
    requestAnimationFrame(check_initial)
    setTimeout(() => sync(true), 200)

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          sync(entry.isIntersecting)
        }
      },
      { threshold, rootMargin: '12% 0px 12% 0px' },
    )
    observer.observe(el)
  })

  onUnmounted(() => {
    observer?.disconnect()
  })

  return live
}
