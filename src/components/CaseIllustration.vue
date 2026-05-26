<template>
  <div
    ref="root_el"
    class="case-illus-wrap"
    :class="{ 'case-illus-wrap--live': is_live }"
  >
    <svg class="case-illus" viewBox="0 0 400 260" role="img" :aria-label="aria_label">
      <defs>
        <linearGradient :id="bar_id" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#5f4dff" />
          <stop offset="100%" stop-color="#16d7c4" />
        </linearGradient>
        <linearGradient :id="gold_id" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#c9a04a" />
          <stop offset="100%" stop-color="#f6c66b" />
        </linearGradient>
        <linearGradient :id="bg_id" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#08111f" />
          <stop offset="50%" stop-color="#102449" />
          <stop offset="100%" stop-color="#0a0f1c" />
        </linearGradient>
        <filter :id="glow_id" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="400" height="260" rx="16" :fill="`url(#${bg_id})`" />
      <circle class="case-illus__orb" cx="70" cy="50" r="90" fill="#7c5cff" opacity="0.12">
        <animate attributeName="opacity" values="0.08;0.18;0.08" dur="5s" repeatCount="indefinite" />
      </circle>
      <circle class="case-illus__orb" cx="330" cy="40" r="70" fill="#16d7c4" opacity="0.14">
        <animate attributeName="opacity" values="0.1;0.22;0.1" dur="4.2s" repeatCount="indefinite" />
      </circle>
      <circle class="case-illus__orb" cx="300" cy="200" r="55" fill="#f6c66b" opacity="0.1">
        <animate attributeName="opacity" values="0.06;0.16;0.06" dur="6s" repeatCount="indefinite" />
      </circle>

      <g opacity="0.14" stroke="rgba(196, 215, 255, 0.35)" stroke-width="1">
        <line x1="32" y1="200" x2="368" y2="200" />
        <line x1="32" y1="160" x2="368" y2="160" />
        <line x1="32" y1="120" x2="368" y2="120" />
        <line x1="32" y1="80" x2="368" y2="80" />
      </g>

      <!-- distribution -->
      <g v-if="variant === 'distribution'">
        <rect
          x="20"
          y="24"
          width="360"
          height="178"
          rx="12"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(22,215,196,0.25)"
        />
        <g
          v-for="(b, i) in dist_bars"
          :key="i"
          class="case-illus__bar-wrap"
          :transform="`translate(${59 + i * 48}, 188)`"
          :style="{ '--d': `${i * 0.11}s` }"
        >
          <rect
            class="case-illus__bar"
            x="-14"
            :y="-b.h"
            width="28"
            :height="b.h"
            rx="5"
            :fill="b.gold ? `url(#${gold_id})` : `url(#${bar_id})`"
          />
        </g>
        <path
          class="case-illus__line case-illus__line--gold"
          d="M 45 175 L 105 145 L 155 152 L 205 118 L 255 105 L 305 88"
          fill="none"
          stroke="#f6c66b"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          pathLength="100"
          :filter="`url(#${glow_id})`"
        />
        <path
          class="case-illus__area"
          d="M 45 175 L 105 145 L 155 152 L 205 118 L 255 105 L 305 88 L 305 188 L 45 188 Z"
          fill="rgba(246,198,107,0.15)"
        />
        <circle v-if="is_live" class="case-illus__dot-travel" r="5" fill="#f6c66b">
          <animateMotion
            dur="3.2s"
            repeatCount="indefinite"
            path="M 45 175 L 105 145 L 155 152 L 205 118 L 255 105 L 305 88"
            calcMode="linear"
          />
        </circle>
        <text x="200" y="232" text-anchor="middle" fill="rgba(168,184,212,0.95)" font-size="12" font-weight="600">
          Рейтинг ТТ и дистрибуция
        </text>
      </g>

      <!-- launch -->
      <g v-else-if="variant === 'launch'">
        <rect
          x="20"
          y="28"
          width="360"
          height="188"
          rx="12"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(22,215,196,0.25)"
        />
        <path
          class="case-illus__line case-illus__line--gold"
          d="M 45 188 L 105 158 L 155 165 L 205 128 L 255 112 L 305 95"
          fill="none"
          stroke="#f6c66b"
          stroke-width="3"
          stroke-linecap="round"
          pathLength="100"
        />
        <path
          class="case-illus__area"
          d="M 45 188 L 45 208 L 305 208 L 305 95 L 285 102 L 255 112 L 205 128 L 155 165 L 105 158 L 45 188 Z"
          fill="rgba(246,198,107,0.18)"
        />
        <rect
          v-for="n in 4"
          :key="n"
          class="case-illus__chip"
          x="52"
          :y="48 + n * 18"
          width="100 + n * 12"
          height="8"
          rx="3"
          :style="{ '--d': `${n * 0.1}s` }"
        />
        <circle v-if="is_live" class="case-illus__dot-travel" r="4" fill="#f6c66b">
          <animateMotion
            dur="3.8s"
            repeatCount="indefinite"
            path="M 45 188 L 105 158 L 155 165 L 205 128 L 255 112 L 305 95"
            calcMode="linear"
          />
        </circle>
        <text x="200" y="232" text-anchor="middle" fill="rgba(168,184,212,0.95)" font-size="12" font-weight="600">
          Анализ рынка и сценарии
        </text>
      </g>

      <!-- assortment -->
      <g v-else-if="variant === 'assortment'">
        <g v-for="i in 4" :key="i">
          <rect
            :x="36 + (i % 2) * 172"
            :y="44 + Math.floor(i / 2) * 88"
            width="156"
            height="76"
            rx="10"
            fill="rgba(255,255,255,0.04)"
            stroke="rgba(22,215,196,0.22)"
          />
          <g
            v-for="j in 5"
            :key="`${i}-${j}`"
            class="case-illus__bar-wrap"
            :transform="`translate(${50 + (i % 2) * 172 + j * 24}, 108)`"
            :style="{ '--d': `${(i * 5 + j) * 0.06}s` }"
          >
            <rect
              class="case-illus__bar"
              x="-7"
              :y="-(22 + (i + j) * 3)"
              width="14"
              :height="22 + (i + j) * 3"
              rx="3"
              :fill="`url(#${bar_id})`"
            />
          </g>
        </g>
        <text x="200" y="238" text-anchor="middle" fill="rgba(168,184,212,0.95)" font-size="12" font-weight="600">
          Модель ассортимента по магазинам
        </text>
      </g>

      <!-- elasticity -->
      <g v-else-if="variant === 'elasticity'">
        <rect x="28" y="36" width="344" height="168" rx="12" fill="rgba(255,255,255,0.03)" stroke="rgba(22,215,196,0.2)" />
        <path
          class="case-illus__line"
          d="M 56 188 Q 200 52 344 188"
          fill="none"
          stroke="#16d7c4"
          stroke-width="3"
          pathLength="100"
        />
        <circle class="case-illus__dot case-illus__dot--peak" cx="200" cy="108" r="9" fill="#f6c66b" style="--d: 0.6s" />
        <circle v-if="is_live" class="case-illus__dot-travel case-illus__dot-travel--teal" r="4" fill="#16d7c4">
          <animateMotion
            dur="4s"
            repeatCount="indefinite"
            path="M 56 188 Q 200 52 344 188"
            calcMode="linear"
          />
        </circle>
        <line x1="200" y1="48" x2="200" y2="210" stroke="rgba(255,255,255,0.15)" stroke-dasharray="5 5" />
        <line x1="48" y1="188" x2="352" y2="188" stroke="rgba(255,255,255,0.15)" />
        <text x="214" y="100" fill="#eef8ff" font-size="13" font-weight="700">оптимум</text>
        <text x="200" y="238" text-anchor="middle" fill="rgba(168,184,212,0.95)" font-size="12" font-weight="600">
          Кривая эластичности спроса
        </text>
      </g>

      <!-- growth -->
      <g v-else-if="variant === 'growth'">
        <rect x="40" y="48" width="320" height="148" rx="10" fill="rgba(255,255,255,0.03)" stroke="rgba(22,215,196,0.22)" />
        <circle
          v-for="(p, i) in map_dots"
          :key="i"
          class="case-illus__dot"
          :class="{ 'case-illus__dot--hot': p.hot }"
          :cx="p.x"
          :cy="p.y"
          :r="p.hot ? 11 : 7"
          :fill="p.hot ? '#f6c66b' : '#7c5cff'"
          :style="{ '--d': `${i * 0.1}s` }"
        />
        <path
          class="case-illus__line case-illus__line--gold"
          d="M 72 158 L 132 118 L 192 128 L 252 88 L 312 98"
          fill="none"
          stroke="#f6c66b"
          stroke-width="2.5"
          pathLength="100"
        />
        <circle v-if="is_live" class="case-illus__dot-travel" r="4" fill="#f6c66b">
          <animateMotion
            dur="3.4s"
            repeatCount="indefinite"
            path="M 72 158 L 132 118 L 192 128 L 252 88 L 312 98"
            calcMode="linear"
          />
        </circle>
        <text x="200" y="238" text-anchor="middle" fill="rgba(168,184,212,0.95)" font-size="12" font-weight="600">
          Карта точек роста в сетях
        </text>
      </g>

      <!-- horeca -->
      <g v-else-if="variant === 'horeca'">
        <rect x="28" y="36" width="344" height="158" rx="10" fill="rgba(22,215,196,0.08)" stroke="rgba(22,215,196,0.28)" />
        <circle
          v-for="(p, i) in horeca_dots"
          :key="i"
          class="case-illus__dot"
          :cx="p.x"
          :cy="p.y"
          r="6"
          :fill="p.c"
          :style="{ '--d': `${i * 0.09}s` }"
        />
        <rect x="272" y="48" width="80" height="60" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(246,198,107,0.4)" />
        <path
          class="case-illus__line"
          d="M 282 88 L 302 68 L 322 76 L 338 58"
          fill="none"
          stroke="#16d7c4"
          stroke-width="2.5"
          pathLength="100"
        />
        <circle v-if="is_live" class="case-illus__dot-travel case-illus__dot-travel--teal" r="4" fill="#16d7c4">
          <animateMotion
            dur="2.8s"
            repeatCount="indefinite"
            path="M 282 88 L 302 68 L 322 76 L 338 58"
            calcMode="linear"
          />
        </circle>
        <text x="200" y="238" text-anchor="middle" fill="rgba(168,184,212,0.95)" font-size="12" font-weight="600">
          Карта HoReCa и сегментов
        </text>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { onMounted, ref, useId, watch } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    required: true,
    validator: (v) =>
      ['distribution', 'launch', 'assortment', 'elasticity', 'growth', 'horeca'].includes(v),
  },
  aria_label: { type: String, default: 'Иллюстрация кейса' },
  /** Включает непрерывную анимацию (рост столбцов, бегущая точка, пульс) */
  play: { type: Boolean, default: true },
})

const uid = useId().replace(/[^a-zA-Z0-9]/g, '')
const bar_id = `case-bar-${uid}`
const bg_id = `case-bg-${uid}`
const gold_id = `case-gold-${uid}`
const glow_id = `case-glow-${uid}`

const root_el = ref(null)
const is_live = ref(props.play)

watch(
  () => props.play,
  (value) => {
    if (value) {
      is_live.value = true
    }
  },
  { immediate: true },
)

onMounted(() => {
  if (props.play) {
    is_live.value = true
    return
  }
  const el = root_el.value
  if (!el) {
    is_live.value = true
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          is_live.value = true
        }
      }
    },
    { threshold: 0.08 },
  )
  io.observe(el)
  const rect = el.getBoundingClientRect()
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    is_live.value = true
  }
})

const dist_bars = [
  { h: 58, gold: false },
  { h: 78, gold: true },
  { h: 52, gold: false },
  { h: 98, gold: true },
  { h: 68, gold: false },
  { h: 108, gold: true },
]

const map_dots = [
  { x: 88, y: 128, hot: false },
  { x: 138, y: 108, hot: true },
  { x: 188, y: 122, hot: false },
  { x: 238, y: 92, hot: true },
  { x: 288, y: 102, hot: false },
  { x: 318, y: 84, hot: true },
]

const horeca_dots = [
  { x: 76, y: 98, c: '#7c5cff' },
  { x: 118, y: 138, c: '#16d7c4' },
  { x: 158, y: 88, c: '#f6c66b' },
  { x: 198, y: 118, c: '#5f4dff' },
  { x: 238, y: 76, c: '#f6c66b' },
  { x: 178, y: 158, c: '#16d7c4' },
]
</script>

<style scoped>
.case-illus-wrap {
  width: 100%;
}

.case-illus {
  display: block;
  width: 100%;
  min-height: 280px;
  height: auto;
  border-radius: 14px;
}

/* —— Статичное состояние (график виден) —— */
.case-illus__bar-wrap {
  transform-box: fill-box;
  transform-origin: 0 0;
  transform: scaleY(1);
}

.case-illus__line {
  stroke-dasharray: 100;
  stroke-dashoffset: 0;
}

.case-illus__dot-travel {
  opacity: 0;
}

/* —— Живая анимация (непрерывная) —— */
.case-illus-wrap--live .case-illus__bar-wrap {
  animation:
    case-bar-enter 0.85s cubic-bezier(0.34, 1.45, 0.64, 1) both,
    case-bar-breathe 2.2s ease-in-out infinite;
  animation-delay: var(--d, 0ms), calc(var(--d, 0ms) + 0.85s);
}

.case-illus-wrap--live .case-illus__line {
  animation:
    case-line-draw 1.2s ease both,
    case-line-flow 2.8s ease-in-out infinite;
  animation-delay: 0.15s, 1.35s;
}

.case-illus-wrap--live .case-illus__area {
  animation: case-area-breathe 3.5s ease-in-out infinite;
}

.case-illus-wrap--live .case-illus__dot {
  animation: case-dot-pulse 2.2s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

.case-illus-wrap--live .case-illus__dot--hot {
  animation: case-dot-pulse-hot 1.8s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

.case-illus-wrap--live .case-illus__chip {
  animation: case-chip-pulse 2.4s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

.case-illus-wrap--live .case-illus__dot-travel {
  opacity: 1;
  filter: drop-shadow(0 0 6px rgba(246, 198, 107, 0.7));
}

.case-illus-wrap--live .case-illus__dot-travel--teal {
  filter: drop-shadow(0 0 6px rgba(22, 215, 196, 0.7));
}

@keyframes case-bar-enter {
  from {
    transform: scaleY(0.06);
    opacity: 0.35;
  }
  to {
    transform: scaleY(1);
    opacity: 1;
  }
}

@keyframes case-bar-breathe {
  0%,
  100% {
    transform: scaleY(0.94);
  }
  50% {
    transform: scaleY(1.06);
  }
}

@keyframes case-line-draw {
  from {
    stroke-dashoffset: 100;
    opacity: 0.4;
  }
  to {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

@keyframes case-line-flow {
  0%,
  100% {
    stroke-dashoffset: 0;
    opacity: 0.92;
  }
  50% {
    stroke-dashoffset: 12;
    opacity: 1;
  }
}

@keyframes case-area-breathe {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 0.9;
  }
}

@keyframes case-dot-pulse {
  0%,
  100% {
    transform: scale(0.92);
    opacity: 0.85;
  }
  50% {
    transform: scale(1.12);
    opacity: 1;
  }
}

@keyframes case-dot-pulse-hot {
  0%,
  100% {
    transform: scale(0.95);
  }
  50% {
    transform: scale(1.18);
  }
}

@keyframes case-chip-pulse {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .case-illus-wrap--live .case-illus__bar-wrap,
  .case-illus-wrap--live .case-illus__line,
  .case-illus-wrap--live .case-illus__area,
  .case-illus-wrap--live .case-illus__dot,
  .case-illus-wrap--live .case-illus__chip {
    animation: none !important;
  }

  .case-illus__dot-travel {
    display: none;
  }
}
</style>
