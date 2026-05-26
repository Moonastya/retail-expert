<template>
  <div
    class="product-illus product-illus--on"
    :aria-hidden="decorative ? 'true' : undefined"
  >
    <svg
      class="product-illus__svg"
      viewBox="0 0 320 180"
      role="img"
      :aria-label="aria_label"
      shape-rendering="geometricPrecision"
    >
      <defs>
        <linearGradient :id="gid('bar')" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#5f4dff" />
          <stop offset="100%" stop-color="#16d7c4" />
        </linearGradient>
        <linearGradient :id="gid('gold')" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#c9a04a" />
          <stop offset="100%" stop-color="#f6c66b" />
        </linearGradient>
        <linearGradient :id="gid('area')" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="rgba(22,215,196,0.35)" />
          <stop offset="100%" stop-color="rgba(22,215,196,0)" />
        </linearGradient>
      </defs>

      <!-- 01 Данные и аналитика -->
      <g v-if="product_id === 'data-analytics'">
        <rect
          v-for="(b, i) in bars4"
          :key="i"
          class="product-illus__bar"
          :x="34 + i * 18"
          :y="170 - b"
          width="12"
          :height="b"
          rx="3"
          :fill="i % 2 ? `url(#${gid('gold')})` : `url(#${gid('bar')})`"
          :style="{ '--d': `${i * 0.12}s` }"
        />
        <path
          class="product-illus__line"
          :d="line_path(line_pts)"
          fill="none"
          stroke="#f6c66b"
          stroke-width="2.5"
          stroke-linecap="round"
          pathLength="100"
        />
        <path :d="area_path(line_pts, 152)" :fill="`url(#${gid('area')})`" class="product-illus__area" />
        <circle
          v-for="(p, i) in line_pts"
          :key="'d' + i"
          class="product-illus__dot"
          :cx="p.x"
          :cy="p.y"
          r="3.5"
          fill="#070d19"
          stroke="#f6c66b"
          stroke-width="1.5"
          :style="{ '--d': `${i * 0.2}s` }"
        />
      </g>

      <!-- 02 ОФД -->
      <g v-else-if="product_id === 'ofd'">
        <rect x="28" y="28" width="72" height="96" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(22,215,196,0.28)" />
        <line
          v-for="n in 6"
          :key="n"
          class="product-illus__receipt"
          x1="38"
          :y1="40 + n * 12"
          x2="90"
          :y2="40 + n * 12"
          stroke="rgba(168,184,212,0.45)"
          stroke-width="2"
          stroke-linecap="round"
          :stroke-dasharray="n % 2 ? '0' : '4 4'"
          :style="{ '--d': `${n * 0.12}s` }"
        />
        <rect
          v-for="(b, i) in bars5"
          :key="'o' + i"
          class="product-illus__bar"
          :x="118 + i * 16"
          :y="160 - b"
          width="10"
          :height="b"
          rx="2"
          :fill="`url(#${gid('bar')})`"
          :style="{ '--d': `${i * 0.1}s` }"
        />
        <path
          class="product-illus__line"
          d="M 230 140 L 250 118 L 268 124 L 286 92 L 300 78"
          fill="none"
          stroke="#f6c66b"
          stroke-width="2"
          pathLength="100"
        />
      </g>

      <!-- 03 Retail Index -->
      <g v-else-if="product_id === 'retail-index'">
        <g v-for="(row, ri) in heat" :key="'r' + ri">
          <rect
            v-for="(v, ci) in row"
            :key="'c' + ci"
            :x="28 + ci * 28"
            :y="32 + ri * 22"
            width="24"
            height="18"
            rx="3"
            :fill="heat_color(v)"
            class="product-illus__cell"
            :style="{ '--d': `${(ri * 4 + ci) * 0.05}s` }"
          />
        </g>
        <path
          class="product-illus__pie"
          d="M 200 36 A 40 40 0 0 1 272 88 L 200 88 Z"
          fill="#7c5cff"
          opacity="0.9"
        />
        <path class="product-illus__pie" d="M 200 36 A 40 40 0 0 0 236 120 L 200 88 Z" fill="#f6c66b" />
        <path class="product-illus__pie" d="M 236 120 A 40 40 0 0 0 272 88 L 200 88 Z" fill="#16d7c4" />
      </g>

      <!-- 04 Факторный анализ -->
      <g v-else-if="product_id === 'factor-analysis'">
        <rect
          v-for="(w, i) in waterfall"
          :key="i"
          class="product-illus__wf"
          :x="48 + i * 38"
          :y="w.y"
          width="28"
          :height="w.h"
          rx="4"
          :fill="w.fill"
          :style="{ '--d': `${i * 0.15}s` }"
        />
        <text
          v-for="(w, i) in waterfall"
          :key="'t' + i"
          :x="62 + i * 38"
          :y="w.y - 6"
          text-anchor="middle"
          font-size="9"
          fill="rgba(168,184,212,0.9)"
          font-weight="600"
          font-family="Inter, system-ui, sans-serif"
        >
          {{ w.label }}
        </text>
      </g>

      <!-- 05 GAP -->
      <g v-else-if="product_id === 'gap'">
        <g v-for="(row, i) in gap_rows" :key="i">
          <text :x="28" :y="44 + i * 28" font-size="9" fill="rgba(168,184,212,0.85)" font-family="Inter, system-ui, sans-serif">{{ row.name }}</text>
          <rect
            :x="72"
            :y="32 + i * 28"
            :width="row.actual"
            height="12"
            rx="3"
            fill="#7c5cff"
            class="product-illus__gap-a"
            :style="{ '--d': `${i * 0.12}s` }"
          />
          <rect
            :x="72"
            :y="48 + i * 28"
            :width="row.potential"
            height="12"
            rx="3"
            fill="rgba(246,198,107,0.35)"
            stroke="#f6c66b"
            stroke-width="1"
            class="product-illus__gap-p"
            :style="{ '--d': `${i * 0.12 + 0.08}s` }"
          />
        </g>
        <rect x="72" y="148" width="12" height="8" rx="2" fill="#7c5cff" />
        <text x="88" y="155" font-size="8" fill="rgba(168,184,212,0.75)" font-family="Inter, system-ui, sans-serif">факт</text>
        <rect x="120" y="148" width="12" height="8" rx="2" fill="rgba(246,198,107,0.35)" stroke="#f6c66b" />
        <text x="136" y="155" font-size="8" fill="rgba(168,184,212,0.75)" font-family="Inter, system-ui, sans-serif">потенциал</text>
      </g>

      <!-- 06 Promo Tool -->
      <g v-else-if="product_id === 'promo-tool'">
        <g v-for="col in 7" :key="'col' + col">
          <rect
            v-for="row in 4"
            :key="'cell' + col + row"
            :x="36 + col * 34"
            :y="36 + row * 28"
            width="28"
            height="22"
            rx="4"
            :fill="promo_cell(col, row)"
            class="product-illus__cell"
            :style="{ '--d': `${(col + row) * 0.04}s` }"
          />
        </g>
        <rect x="36" y="152" width="200" height="6" rx="2" fill="rgba(246,198,107,0.45)" class="product-illus__promo-bar" />
        <text x="160" y="168" font-size="8" fill="rgba(168,184,212,0.75)" text-anchor="middle" font-family="Inter, system-ui, sans-serif">календарь промо</text>
      </g>

      <!-- 07 Plankit / Demand Planning -->
      <g v-else-if="product_id === 'plankit'">
        <rect
          v-for="(ch, i) in channels"
          :key="i"
          class="product-illus__bar product-illus__bar--plankit"
          :x="30 + i * 42"
          :y="152 - ch.h"
          width="36"
          :height="ch.h"
          rx="5"
          :fill="ch.color"
          :style="{ '--d': `${i * 0.12}s` }"
        />
        <path
          class="product-illus__line product-illus__line--trend product-illus__line--plankit"
          d="M 36 42 L 88 58 L 138 50 L 188 32 L 248 20 L 292 14"
          fill="none"
          stroke="#f6c66b"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
          pathLength="100"
        />
        <circle class="product-illus__line-dot" r="5" fill="#f6c66b">
          <animateMotion
            dur="3.2s"
            repeatCount="indefinite"
            path="M 36 42 L 88 58 L 138 50 L 188 32 L 248 20 L 292 14"
            calcMode="linear"
          />
        </circle>
        <text
          v-for="(ch, i) in channels"
          :key="'l' + i"
          class="product-illus__label"
          :x="48 + i * 42"
          y="172"
          font-size="9"
          fill="rgba(168,184,212,0.75)"
          text-anchor="middle"
          font-family="Inter, system-ui, sans-serif"
          :style="{ '--d': `${0.5 + i * 0.08}s` }"
        >
          {{ ch.label }}
        </text>
      </g>

      <!-- 08 Специальная аналитика -->
      <g v-else-if="product_id === 'custom-analytics'">
        <circle
          v-for="(n, i) in nodes"
          :key="i"
          :cx="n.x"
          :cy="n.y"
          :r="n.r"
          :fill="n.fill"
          class="product-illus__node"
          :style="{ '--d': `${i * 0.1}s` }"
        />
        <line
          v-for="(e, i) in edges"
          :key="'e' + i"
          :x1="nodes[e[0]].x"
          :y1="nodes[e[0]].y"
          :x2="nodes[e[1]].x"
          :y2="nodes[e[1]].y"
          stroke="rgba(124,92,255,0.55)"
          stroke-width="1.5"
          stroke-linecap="round"
          class="product-illus__edge"
          :style="{ '--d': `${i * 0.12}s` }"
        />
        <path
          class="product-illus__line product-illus__line--trend"
          d="M 210 148 L 230 132 L 252 140 L 278 120"
          fill="none"
          stroke="#16d7c4"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          pathLength="100"
        />
        <circle
          class="product-illus__line-dot product-illus__line-dot--teal"
          r="4"
          fill="#16d7c4"
        >
          <animateMotion
            dur="3.5s"
            repeatCount="indefinite"
            path="M 210 148 L 230 132 L 252 140 L 278 120"
            calcMode="linear"
          />
        </circle>
      </g>
    </svg>
  </div>
</template>

<script setup>
import { useId } from 'vue'

defineProps({
  product_id: { type: String, required: true },
  aria_label: { type: String, default: '' },
  decorative: { type: Boolean, default: true },
  /** @deprecated оставлен для совместимости с ProductDetailBlock */
  active: { type: Boolean, default: undefined },
})

const id_base = useId().replace(/[^a-zA-Z0-9]/g, '')
const gid = (s) => `pi-${id_base}-${s}`

const bars4 = [42, 58, 48, 68]
const bars5 = [36, 52, 44, 60, 38]
const line_pts = [
  { x: 130, y: 118 },
  { x: 168, y: 98 },
  { x: 206, y: 104 },
  { x: 244, y: 78 },
  { x: 282, y: 62 },
]

const heat = [
  [0.3, 0.5, 0.7, 0.4, 0.9, 0.6],
  [0.6, 0.8, 0.4, 0.7, 0.5, 0.85],
  [0.45, 0.65, 0.9, 0.55, 0.75, 0.5],
  [0.7, 0.4, 0.6, 0.85, 0.65, 0.95],
]

const waterfall = [
  { y: 72, h: 68, fill: '#7c5cff', label: 'база' },
  { y: 56, h: 16, fill: '#16d7c4', label: '+цена' },
  { y: 48, h: 8, fill: '#f6c66b', label: '+промо' },
  { y: 40, h: 8, fill: '#5f4dff', label: '+дистр' },
  { y: 32, h: 8, fill: '#12a896', label: '−конк' },
]

const gap_rows = [
  { name: 'NKA', actual: 120, potential: 168 },
  { name: 'LKA', actual: 88, potential: 130 },
  { name: 'E-com', actual: 100, potential: 145 },
  { name: 'HoReCa', actual: 64, potential: 110 },
]

const channels = [
  { label: 'сети', h: 88, color: '#7c5cff' },
  { label: 'ОФД', h: 58, color: '#16d7c4' },
  { label: 'e-com', h: 108, color: '#f6c66b' },
  { label: 'дистр', h: 68, color: '#5f4dff' },
  { label: 'HoReCa', h: 48, color: '#12a896' },
]

const nodes = [
  { x: 80, y: 90, r: 14, fill: '#7c5cff' },
  { x: 150, y: 60, r: 10, fill: '#16d7c4' },
  { x: 150, y: 120, r: 10, fill: '#f6c66b' },
  { x: 220, y: 90, r: 12, fill: '#5f4dff' },
]

const edges = [
  [0, 1],
  [0, 2],
  [1, 3],
  [2, 3],
]

function line_path(pts) {
  return `M ${pts.map((p) => `${p.x} ${p.y}`).join(' L ')}`
}

function area_path(pts, base) {
  const first = pts[0]
  const last = pts[pts.length - 1]
  return `M ${first.x} ${base} L ${pts.map((p) => `${p.x} ${p.y}`).join(' L ')} L ${last.x} ${base} Z`
}

function heat_color(v) {
  const r = Math.round(95 + (22 - 95) * v)
  const g = Math.round(77 + (215 - 77) * v)
  const b = Math.round(255 + (196 - 255) * v)
  return `rgba(${r},${g},${b},${0.25 + v * 0.55})`
}

function promo_cell(col, row) {
  const hot = (col === 2 && row === 1) || (col === 5 && row === 2) || (col === 4 && row === 0)
  if (hot) return '#f6c66b'
  if ((col + row) % 3 === 0) return 'rgba(124,92,255,0.35)'
  return 'rgba(255,255,255,0.06)'
}
</script>

<style scoped>
.product-illus {
  width: 100%;
  margin-bottom: 14px;
  background: transparent;
  border: none;
  box-shadow: none;
}

.product-illus__svg {
  display: block;
  width: 100%;
  min-height: 168px;
  height: auto;
}

.product-illus__bar {
  transform-origin: bottom center;
  transform-box: fill-box;
  transform: scaleY(0);
  opacity: 0.9;
  transition: transform 0.9s cubic-bezier(0.34, 1.45, 0.64, 1);
  transition-delay: var(--d, 0ms);
}

.product-illus--on .product-illus__bar {
  transform: scaleY(1);
  animation: product-bar-glow 2.5s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

.product-illus__label {
  opacity: 0.75;
  transition: opacity 0.5s ease;
  transition-delay: var(--d, 0.4s);
}

.product-illus--on .product-illus__label {
  opacity: 1;
}

.product-illus__line {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  opacity: 0.85;
  transition:
    stroke-dashoffset 1.35s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.5s ease;
  transition-delay: 0.3s;
}

.product-illus--on .product-illus__line {
  stroke-dashoffset: 0;
  opacity: 1;
  animation: product-line-glow 3.2s ease-in-out infinite;
}

.product-illus--on .product-illus__line--plankit {
  transition-delay: 0.55s;
  animation-delay: 0.2s;
}

.product-illus__line--trend {
  filter: drop-shadow(0 0 4px rgba(246, 198, 107, 0.35));
}

.product-illus__line-dot {
  opacity: 1;
  animation: product-line-dot-pulse 1.6s ease-in-out infinite;
}

.product-illus__area {
  opacity: 0.7;
}

.product-illus--on .product-illus__area {
  animation: product-area-breathe 4.5s ease-in-out infinite;
  animation-delay: 0.3s;
}

.product-illus__dot {
  opacity: 0.85;
}

.product-illus--on .product-illus__dot {
  animation: product-dot-pulse 2.8s ease-in-out infinite;
  animation-delay: var(--d, 0s);
}

.product-illus__cell {
  opacity: 0.75;
}

.product-illus--on .product-illus__cell {
  animation: product-cell-pulse 3.2s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

.product-illus__wf {
  transform-origin: bottom center;
  transform-box: fill-box;
  transform: scaleY(0);
  opacity: 0.85;
  transition: transform 0.85s cubic-bezier(0.34, 1.2, 0.64, 1);
  transition-delay: var(--d, 0ms);
}

.product-illus--on .product-illus__wf {
  transform: scaleY(1);
  animation: product-wf-pulse 3.4s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

.product-illus__gap-a,
.product-illus__gap-p {
  transform-origin: left center;
  opacity: 0.8;
}

.product-illus--on .product-illus__gap-a,
.product-illus--on .product-illus__gap-p {
  animation: product-gap-pulse 3s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

.product-illus__node {
  transform-origin: center;
  transform-box: fill-box;
  transform: scale(0);
  opacity: 0.85;
  transition:
    transform 0.65s cubic-bezier(0.34, 1.35, 0.64, 1),
    opacity 0.45s ease;
  transition-delay: var(--d, 0s);
}

.product-illus--on .product-illus__node {
  transform: scale(1);
  opacity: 1;
  animation: product-node-glow 2.6s ease-in-out infinite;
  animation-delay: var(--d, 0s);
}

.product-illus__pie {
  opacity: 0.85;
}

.product-illus--on .product-illus__pie {
  animation: product-pie-glow 4s ease-in-out infinite;
}

.product-illus__edge {
  stroke-dasharray: 6 10;
  stroke-dashoffset: 0;
  opacity: 0.55;
}

.product-illus--on .product-illus__edge {
  animation: product-edge-flow 2.4s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

.product-illus__receipt {
  opacity: 0.7;
}

.product-illus--on .product-illus__receipt {
  animation: product-receipt-blink 2.8s ease-in-out infinite;
  animation-delay: var(--d, 0s);
}

.product-illus__promo-bar {
  opacity: 0.75;
}

.product-illus--on .product-illus__promo-bar {
  animation: product-promo-sweep 3s ease-in-out infinite;
}

.product-illus__line-dot--teal {
  filter: drop-shadow(0 0 6px rgba(22, 215, 196, 0.55));
}

@keyframes product-bar-glow {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.2) drop-shadow(0 0 6px rgba(22, 215, 196, 0.35));
  }
}

@keyframes product-line-glow {
  0%,
  100% {
    opacity: 0.92;
    filter: drop-shadow(0 0 3px rgba(246, 198, 107, 0.2));
  }
  50% {
    opacity: 1;
    filter: drop-shadow(0 0 12px rgba(246, 198, 107, 0.55));
  }
}

@keyframes product-node-glow {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.15) drop-shadow(0 0 8px rgba(124, 92, 255, 0.45));
  }
}

@keyframes product-line-dot-pulse {
  0%,
  100% {
    opacity: 0.75;
  }
  50% {
    opacity: 1;
  }
}

@keyframes product-area-breathe {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.85;
  }
}

@keyframes product-dot-pulse {
  0%,
  100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

@keyframes product-cell-pulse {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}

@keyframes product-wf-pulse {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

@keyframes product-gap-pulse {
  0%,
  100% {
    opacity: 0.65;
  }
  50% {
    opacity: 1;
  }
}

@keyframes product-edge-flow {
  0%,
  100% {
    stroke-dashoffset: 16;
    opacity: 0.35;
  }
  50% {
    stroke-dashoffset: 0;
    opacity: 0.85;
  }
}

@keyframes product-pie-glow {
  0%,
  100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}

@keyframes product-edge-fade {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 0.65;
  }
}

@keyframes product-receipt-blink {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 0.85;
  }
}

@keyframes product-promo-sweep {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 0.9;
  }
}

@media (prefers-reduced-motion: reduce) {
  .product-illus__bar,
  .product-illus__line,
  .product-illus__node,
  .product-illus__edge,
  .product-illus__wf,
  .product-illus__label {
    transform: none;
    opacity: 1;
    stroke-dashoffset: 0;
    transition: none;
    animation: none !important;
  }

  .product-illus--on .product-illus__bar {
    transform: scaleY(1);
  }

  .product-illus__line-dot {
    display: none;
  }
}
</style>
