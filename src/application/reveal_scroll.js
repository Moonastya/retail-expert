/**
 * Scroll-reveal: threshold 0.12, появление/исчезновение при прокрутке.
 * Без «дрожания» при открытии: не сбрасываем уже видимые блоки при повторной привязке.
 */

let observer = null
let mutation_observer = null

/** @type {WeakSet<Element>} */
let tracked = new WeakSet()

const OBSERVER_OPTIONS = {
  root: null,
  threshold: 0.12,
}

function disconnect_observer() {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

function is_in_viewport(el) {
  const rect = el.getBoundingClientRect()
  const vh = window.innerHeight || document.documentElement.clientHeight
  return rect.bottom > 0 && rect.top < vh
}

function ensure_observer() {
  if (observer) {
    return observer
  }

  observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      } else if (entry.intersectionRatio <= 0) {
        entry.target.classList.remove('is-visible')
      }
    }
  }, OBSERVER_OPTIONS)

  return observer
}

/**
 * @param {{ reset?: boolean }} options
 * reset=true — смена страницы: новый observer, сброс is-visible только у новых узлов.
 */
export function init_scroll_reveal(options = {}) {
  const { reset = false } = options
  const main = document.querySelector('main')
  if (!main) {
    return 0
  }

  if (reset) {
    disconnect_observer()
    tracked = new WeakSet()
  }

  const elements = main.querySelectorAll('.reveal')
  if (!elements.length) {
    return 0
  }

  const io = ensure_observer()
  let added = 0

  for (const el of elements) {
    if (tracked.has(el)) {
      continue
    }

    tracked.add(el)
    if (!el.classList.contains('is-visible') && is_in_viewport(el)) {
      el.classList.add('is-visible')
    }
    io.observe(el)
    added += 1
  }

  return added
}

/** Полный сброс при смене маршрута (один раз, без серии миганий). */
export function reset_scroll_reveal_for_route() {
  const main = document.querySelector('main')
  if (!main) {
    return
  }

  disconnect_observer()
  tracked = new WeakSet()

  const elements = main.querySelectorAll('.reveal')
  for (const el of elements) {
    el.classList.toggle('is-visible', is_in_viewport(el))
  }

  requestAnimationFrame(() => {
    init_scroll_reveal()
    setup_reveal_autoscan_main()
    requestAnimationFrame(() => {
      init_scroll_reveal()
      for (const el of main.querySelectorAll('.reveal')) {
        if (is_in_viewport(el)) {
          el.classList.add('is-visible')
        }
      }
      document.documentElement.classList.add('reveal-ready')
    })
  })
}

let schedule_timer = null
let route_reset_timer = null

function setup_reveal_autoscan_main() {
  const main = document.querySelector('main')
  if (!main || mutation_observer) {
    return Boolean(main)
  }

  mutation_observer = new MutationObserver(() => {
    init_scroll_reveal()
  })
  mutation_observer.observe(main, { childList: true, subtree: true })
  return true
}

export function schedule_reveal_animations() {
  clearTimeout(schedule_timer)
  schedule_timer = setTimeout(() => {
    init_scroll_reveal()
    setup_reveal_autoscan_main()
  }, 80)

  for (const ms of [200, 500, 1000]) {
    setTimeout(() => init_scroll_reveal(), ms)
  }
}

export function schedule_route_reveal_reset() {
  clearTimeout(route_reset_timer)
  route_reset_timer = setTimeout(() => reset_scroll_reveal_for_route(), 0)
}

export function setup_reveal_autoscan() {
  schedule_route_reveal_reset()
}

/** @deprecated */
export function bind_reveal_elements() {
  return init_scroll_reveal()
}

export function init_reveal_animations() {
  return init_scroll_reveal()
}

export function refresh_page_reveals() {
  return init_scroll_reveal()
}

export function force_reveal_in_element(selector) {
  const root =
    typeof selector === 'string' ? document.querySelector(selector) : selector
  if (!root) {
    return
  }

  const targets = root.matches?.('.reveal')
    ? [root, ...root.querySelectorAll('.reveal')]
    : root.querySelectorAll('.reveal')

  for (const el of targets) {
    el.classList.add('is-visible')
    tracked.add(el)
    if (!el.closest('.plankit-page')) {
      ensure_observer().observe(el)
    }
  }
}

export function flush_reveal_visibility() {
  init_scroll_reveal()
}
