<template>
  <div
    ref="root_el"
    class="hero-dash"
    :class="{ 'hero-dash--on': active }"
    role="img"
    :aria-label="aria_label"
  >
    <svg class="hero-dash__svg" viewBox="0 0 620 420" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient :id="gid('bg')" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#08111f" />
          <stop offset="48%" stop-color="#102449" />
          <stop offset="100%" stop-color="#0a0f1c" />
        </linearGradient>
        <linearGradient :id="gid('panel')" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="rgba(255,255,255,0.16)" />
          <stop offset="100%" stop-color="rgba(255,255,255,0.045)" />
        </linearGradient>
        <linearGradient :id="gid('bar')" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#5f4dff" />
          <stop offset="52%" stop-color="#16d7c4" />
          <stop offset="100%" stop-color="#f6c66b" />
        </linearGradient>
        <linearGradient :id="gid('fill')" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(22,215,196,0.42)" />
          <stop offset="100%" stop-color="rgba(8,17,31,0)" />
        </linearGradient>
        <linearGradient :id="gid('line')" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#7c5cff" />
          <stop offset="52%" stop-color="#16d7c4" />
          <stop offset="100%" stop-color="#f6c66b" />
        </linearGradient>
        <filter :id="gid('glow')" x="-35%" y="-35%" width="170%" height="170%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect width="620" height="420" rx="28" :fill="`url(#${gid('bg')})`" />
      <circle cx="118" cy="76" r="102" fill="#1b6fff" opacity="0.2" />
      <circle cx="505" cy="48" r="132" fill="#16d7c4" opacity="0.16" />
      <circle cx="540" cy="346" r="118" fill="#f6c66b" opacity="0.14" />

      <g opacity="0.18">
        <path d="M104 100 H588" stroke="#c4d7ff" stroke-width="1" />
        <path d="M104 174 H588" stroke="#c4d7ff" stroke-width="1" />
        <path d="M104 248 H588" stroke="#c4d7ff" stroke-width="1" />
        <path d="M104 322 H588" stroke="#c4d7ff" stroke-width="1" />
        <path d="M186 38 V386" stroke="#c4d7ff" stroke-width="1" />
        <path d="M306 38 V386" stroke="#c4d7ff" stroke-width="1" />
        <path d="M426 38 V386" stroke="#c4d7ff" stroke-width="1" />
        <path d="M546 38 V386" stroke="#c4d7ff" stroke-width="1" />
      </g>

      <rect x="18" y="18" width="74" height="384" rx="22" fill="rgba(255,255,255,0.07)" />
      <circle cx="55" cy="56" r="18" fill="rgba(22,215,196,0.14)" stroke="rgba(22,215,196,0.45)" />
      <text x="55" y="62" fill="#eaf7ff" text-anchor="middle" font-size="16" font-weight="800">R</text>
      <rect x="40" y="104" width="30" height="6" rx="3" fill="#16d7c4" class="hero-dash__pulse" />
      <rect x="40" y="138" width="30" height="6" rx="3" fill="rgba(234,247,255,0.42)" />
      <rect x="40" y="172" width="30" height="6" rx="3" fill="rgba(234,247,255,0.42)" />
      <rect x="40" y="206" width="30" height="6" rx="3" fill="rgba(234,247,255,0.42)" />
      <rect x="34" y="342" width="42" height="42" rx="14" fill="rgba(246,198,107,0.14)" />
      <path d="M45 365 L54 352 L65 365" fill="none" stroke="#f6c66b" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />

      <rect x="112" y="24" width="470" height="54" rx="18" :fill="`url(#${gid('panel')})`" stroke="rgba(255,255,255,0.12)" />
      <text x="134" y="48" fill="#eef8ff" font-family="Outfit,sans-serif" font-size="14" font-weight="700">
        AI market intelligence
      </text>
      <text x="134" y="66" fill="rgba(220,234,255,0.58)" font-family="Outfit,sans-serif" font-size="10" font-weight="600">
        FMCG sales, distribution, SKU health
      </text>
      <rect x="390" y="38" width="162" height="24" rx="12" fill="rgba(255,255,255,0.08)" />
      <circle cx="408" cy="50" r="5" fill="#16d7c4" />
      <text x="420" y="54" fill="rgba(238,248,255,0.82)" font-size="10" font-weight="700">Live data synced</text>

      <rect x="112" y="96" width="142" height="108" rx="22" :fill="`url(#${gid('panel')})`" stroke="rgba(255,255,255,0.14)" />
      <text x="132" y="122" fill="rgba(220,234,255,0.64)" font-size="10" font-weight="700">MARKET COVERAGE</text>
      <text x="132" y="158" fill="#eef8ff" font-size="31" font-weight="800">&gt;80%</text>
      <rect
        v-for="(b, i) in kpi_bars"
        :key="'kb' + i"
        class="hero-dash__bar"
        :x="132 + i * 18"
        :y="190 - b"
        width="10"
        :height="b"
        rx="5"
        :fill="`url(#${gid('bar')})`"
        :style="{ '--d': `${i * 0.1}s`, opacity: 0.7 + i * 0.08 }"
      />

      <rect x="270" y="96" width="142" height="108" rx="22" :fill="`url(#${gid('panel')})`" stroke="rgba(255,255,255,0.14)" />
      <text x="290" y="122" fill="rgba(220,234,255,0.64)" font-size="10" font-weight="700">QUALITY SCORE</text>
      <circle cx="342" cy="158" r="34" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="8" />
      <circle
        class="hero-dash__ring"
        cx="342"
        cy="158"
        r="34"
        fill="none"
        stroke="#16d7c4"
        stroke-width="8"
        stroke-linecap="round"
        transform="rotate(-90 342 158)"
        :filter="`url(#${gid('glow')})`"
      />
      <text x="342" y="164" fill="#eef8ff" text-anchor="middle" font-size="20" font-weight="800">98%</text>

      <rect x="428" y="96" width="154" height="108" rx="22" :fill="`url(#${gid('panel')})`" stroke="rgba(255,255,255,0.14)" />
      <text x="448" y="122" fill="rgba(220,234,255,0.64)" font-size="10" font-weight="700">SKU SENTIMENT</text>
      <text x="448" y="152" fill="#eef8ff" font-size="24" font-weight="800">700k+</text>
      <text x="448" y="172" fill="rgba(220,234,255,0.58)" font-size="11">350k+ точек</text>
      <rect
        v-for="(b, i) in sku_bars"
        :key="'sb' + i"
        class="hero-dash__bar"
        :x="514 + i * 10"
        :y="190 - b"
        width="6"
        :height="b"
        rx="3"
        :fill="i % 2 ? '#f6c66b' : '#16d7c4'"
        :style="{ '--d': `${0.2 + i * 0.08}s` }"
      />

      <rect x="112" y="222" width="302" height="160" rx="24" :fill="`url(#${gid('panel')})`" stroke="rgba(255,255,255,0.14)" />
      <text x="134" y="252" fill="rgba(220,234,255,0.64)" font-size="10" font-weight="700">SALES DYNAMICS</text>
      <text x="326" y="252" fill="#16d7c4" text-anchor="end" font-size="11" font-weight="800">+24.8%</text>
      <path class="hero-dash__area" :d="area_d" :fill="`url(#${gid('fill')})`" />
      <polyline
        class="hero-dash__line"
        :points="line_pts"
        fill="none"
        :stroke="`url(#${gid('line')})`"
        stroke-width="4"
        stroke-linecap="round"
        stroke-linejoin="round"
        :filter="`url(#${gid('glow')})`"
      />
      <polyline
        class="hero-dash__line hero-dash__line--dim"
        :points="bench_pts"
        fill="none"
        stroke="rgba(220,234,255,0.36)"
        stroke-width="2"
        stroke-dasharray="6 5"
        stroke-linecap="round"
      />
      <circle
        v-for="(p, i) in highlight_dots"
        :key="'d' + i"
        class="hero-dash__dot"
        :cx="p.x"
        :cy="p.y"
        r="6"
        fill="#091321"
        stroke="#16d7c4"
        stroke-width="2"
        :style="{ '--d': `${0.6 + i * 0.15}s` }"
      />

      <rect x="432" y="222" width="150" height="160" rx="24" :fill="`url(#${gid('panel')})`" stroke="rgba(255,255,255,0.14)" />
      <text x="454" y="252" fill="rgba(220,234,255,0.64)" font-size="10" font-weight="700">AI INSIGHTS</text>
      <text x="454" y="281" fill="#eef8ff" font-size="16" font-weight="800">Рекомендации</text>
      <text x="454" y="302" fill="rgba(220,234,255,0.58)" font-size="10">точки роста и риски</text>
      <g v-for="(bar, i) in insight_bars" :key="bar.label" class="hero-dash__insight">
        <text :x="454" :y="330 + i * 22" fill="rgba(220,234,255,0.7)" font-size="9" font-weight="700">
          {{ bar.label }}
        </text>
        <rect :x="510" :y="322 + i * 22" width="48" height="7" rx="4" fill="rgba(255,255,255,0.08)" />
        <rect
          class="hero-dash__meter"
          :x="510"
          :y="322 + i * 22"
          :width="bar.w"
          height="7"
          rx="4"
          :fill="bar.color"
          :style="{ '--d': `${0.7 + i * 0.12}s` }"
        />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, useId } from 'vue'

defineProps({
  aria_label: { type: String, default: 'Панель аналитики FMCG' },
})

const id_base = useId().replace(/[^a-zA-Z0-9]/g, '')
const gid = (s) => `hd-${id_base}-${s}`

const root_el = ref(null)
const active = ref(false)
const kpi_bars = [28, 44, 36, 56, 48]
const sku_bars = [22, 30, 18, 38, 26, 42]

const line_coords = [
  { x: 134, y: 344 },
  { x: 174, y: 316 },
  { x: 218, y: 326 },
  { x: 260, y: 286 },
  { x: 304, y: 266 },
  { x: 350, y: 244 },
  { x: 388, y: 234 },
]

const bench_coords = [
  { x: 134, y: 354 },
  { x: 174, y: 346 },
  { x: 218, y: 340 },
  { x: 260, y: 318 },
  { x: 304, y: 312 },
  { x: 350, y: 300 },
  { x: 388, y: 292 },
]

const line_pts = computed(() => line_coords.map((p) => `${p.x},${p.y}`).join(' '))
const bench_pts = computed(() => bench_coords.map((p) => `${p.x},${p.y}`).join(' '))

const area_d = computed(() => {
  const pts = line_coords
  const first = pts[0]
  const last = pts[pts.length - 1]
  const mid = pts.map((p) => `${p.x} ${p.y}`).join(' L ')
  return `M ${first.x} 362 L ${mid} L ${last.x} 362 Z`
})

const highlight_dots = [
  { x: 260, y: 286 },
  { x: 350, y: 244 },
]

const insight_bars = [
  { label: 'Promo', w: 42, color: '#16d7c4' },
  { label: 'Price', w: 34, color: '#7c5cff' },
  { label: 'Risk', w: 24, color: '#f6c66b' },
]

let observer = null

function set_active(v) {
  active.value = v
}

onMounted(() => {
  if (root_el.value) {
    const rect = root_el.value.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.95) {
      set_active(true)
    }
  }

  observer = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        set_active(e.isIntersecting)
      }
    },
    { threshold: 0.15 },
  )
  if (root_el.value) {
    observer.observe(root_el.value)
  }
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.hero-dash {
  width: 100%;
  max-width: 580px;
  margin-left: auto;
  border-radius: 30px;
  overflow: hidden;
  box-shadow:
    0 34px 90px rgba(4, 11, 24, 0.56),
    0 0 0 1px rgba(255, 255, 255, 0.12),
    0 0 86px rgba(22, 215, 196, 0.18);
}

.hero-dash__svg {
  display: block;
  width: 100%;
  height: auto;
}

.hero-dash__bar {
  transform-origin: bottom center;
  transform: scaleY(0);
  transition: transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--d, 0ms);
}

.hero-dash--on .hero-dash__bar {
  transform: scaleY(1);
  animation: hero-bar-wave 2.5s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

.hero-dash__ring {
  stroke-dasharray: 214 214;
  stroke-dashoffset: 214;
  transition: stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.25s;
}

.hero-dash--on .hero-dash__ring {
  stroke-dashoffset: 6;
}

.hero-dash__line {
  stroke-dasharray: 520;
  stroke-dashoffset: 520;
  transition: stroke-dashoffset 1.3s ease 0.35s;
}

.hero-dash--on .hero-dash__line {
  stroke-dashoffset: 0;
}

.hero-dash__line--dim {
  transition-delay: 0.55s;
}

.hero-dash__area {
  opacity: 0;
  transition: opacity 1s ease 0.5s;
}

.hero-dash--on .hero-dash__area {
  opacity: 1;
}

.hero-dash__dot {
  opacity: 0;
  transform: scale(0);
  transform-origin: center;
  transition:
    opacity 0.4s ease,
    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: var(--d, 0ms);
}

.hero-dash--on .hero-dash__dot {
  opacity: 1;
  transform: scale(1);
  animation: hero-dot-pulse 2s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

.hero-dash--on .hero-dash__line {
  animation: hero-line-glow 3.2s ease-in-out infinite;
}

@keyframes hero-bar-wave {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.14);
  }
}

@keyframes hero-dot-pulse {
  0%,
  100% {
    transform: scale(0.92);
  }
  50% {
    transform: scale(1.08);
  }
}

@keyframes hero-line-glow {
  0%,
  100% {
    filter: drop-shadow(0 0 0 rgba(22, 215, 196, 0));
  }
  50% {
    filter: drop-shadow(0 0 8px rgba(22, 215, 196, 0.4));
  }
}

.hero-dash__meter {
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--d, 0ms);
}

.hero-dash--on .hero-dash__meter {
  transform: scaleX(1);
}

.hero-dash__pulse {
  animation: hero-dash-pulse 2.4s ease-in-out infinite;
}

@keyframes hero-dash-pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.55;
  }
}

@media (prefers-reduced-motion: reduce) {
  .hero-dash__bar,
  .hero-dash__ring,
  .hero-dash__line,
  .hero-dash__area,
  .hero-dash__dot {
    transition: none;
    transform: none;
    stroke-dashoffset: 0;
    opacity: 1;
  }
}
</style>
