<template>
  <div
    ref="root_el"
    class="plankit-hero-panel"
    :class="[`plankit-hero-panel--${variant}`, { 'plankit-hero-panel--live': live }]"
    role="img"
    :aria-label="aria_label"
  >
    <svg class="plankit-hero-panel__svg" viewBox="0 0 960 320" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient :id="gid('bg')" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#08111f" />
          <stop offset="100%" stop-color="#102449" />
        </linearGradient>
        <linearGradient :id="gid('bar')" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stop-color="#7c5cff" />
          <stop offset="55%" stop-color="#16d7c4" />
          <stop offset="100%" stop-color="#f6c66b" />
        </linearGradient>
        <linearGradient :id="gid('line')" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#7c5cff" />
          <stop offset="50%" stop-color="#16d7c4" />
          <stop offset="100%" stop-color="#f6c66b" />
        </linearGradient>
      </defs>

      <rect width="960" height="320" rx="20" :fill="`url(#${gid('bg')})`" />
      <circle cx="120" cy="60" r="80" fill="#16d7c4" opacity="0.1" class="php-orb" />
      <circle cx="840" cy="260" r="100" fill="#7c5cff" opacity="0.08" class="php-orb php-orb--b" />

      <text x="28" y="36" fill="rgba(238,248,255,0.75)" font-size="11" font-weight="700">
        {{ title }}
      </text>

      <g v-if="variant === 'sales'">
        <text x="28" y="58" fill="rgba(168,184,212,0.9)" font-size="10">Sell-in / Sell-out · недели · SKU</text>
        <rect
          v-for="(h, i) in sales_bars"
          :key="`sb-${i}`"
          class="php-bar"
          :x="48 + i * 72"
          :y="250 - h"
          width="44"
          :height="h"
          rx="8"
          :fill="`url(#${gid('bar')})`"
          :style="{ '--d': `${i * 0.12}s` }"
        />
        <path class="php-line" :d="sales_line" :stroke="`url(#${gid('line')})`" />
        <circle
          v-for="(p, i) in sales_points"
          :key="`sp-${i}`"
          class="php-dot"
          :cx="p.x"
          :cy="p.y"
          r="5"
          :style="{ '--d': `${0.2 + i * 0.1}s` }"
        />
      </g>

      <g v-else-if="variant === 'promo'">
        <text x="28" y="58" fill="rgba(168,184,212,0.9)" font-size="10">Промо-календарь · uplift · каналы</text>
        <rect
          v-for="(cell, i) in promo_cells"
          :key="`pc-${i}`"
          class="php-cell"
          :x="cell.x"
          :y="cell.y"
          width="56"
          height="36"
          rx="8"
          :fill="cell.on ? `url(#${gid('bar')})` : 'rgba(255,255,255,0.08)'"
          :stroke="cell.on ? 'rgba(22,215,196,0.5)' : 'rgba(255,255,255,0.12)'"
          :style="{ '--d': `${(i % 6) * 0.08}s` }"
        />
        <path class="php-line php-line--promo" :d="promo_line" :stroke="`url(#${gid('line')})`" />
      </g>

      <g v-else>
        <text x="28" y="58" fill="rgba(168,184,212,0.9)" font-size="10">P&amp;L · бюджет · ROI сценарии</text>
        <rect x="40" y="88" width="200" height="180" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" />
        <rect
          v-for="(row, i) in finance_rows"
          :key="`fr-${i}`"
          class="php-finance-bar"
          x="56"
          :y="104 + i * 28"
          :width="row.w"
          height="14"
          rx="6"
          :fill="row.color"
          :style="{ '--d': `${i * 0.1}s` }"
        />
        <rect x="280" y="88" width="640" height="180" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
        <rect
          v-for="(h, i) in finance_bars"
          :key="`fb-${i}`"
          class="php-bar"
          :x="310 + i * 58"
          :y="250 - h"
          width="36"
          :height="h"
          rx="7"
          :fill="`url(#${gid('bar')})`"
          :style="{ '--d': `${i * 0.11}s` }"
        />
        <path class="php-line" :d="finance_line" :stroke="`url(#${gid('line')})`" />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed, ref, useId } from 'vue'
import { use_live_chart } from '../application/use_live_chart'

const props = defineProps({
  variant: {
    type: String,
    default: 'sales',
    validator: (v) => ['sales', 'promo', 'finance'].includes(v),
  },
})

const titles = {
  sales: 'SALES WORKSPACE',
  promo: 'PROMO PLANNER',
  finance: 'FINANCE CONTROL',
}

const title = computed(() => titles[props.variant] ?? titles.sales)
const aria_label = computed(() => `Панель Plankit: ${title.value}`)

const root_el = ref(null)
const live = use_live_chart(root_el)
const id_base = useId().replace(/[^a-zA-Z0-9]/g, '')
const gid = (s) => `php-${id_base}-${s}`

const sales_bars = [72, 98, 86, 118, 104, 132, 92, 110, 88, 124]
const sales_points = sales_bars.map((h, i) => ({ x: 70 + i * 72, y: 242 - h }))
const sales_line = computed(
  () => `M ${sales_points.map((p) => `${p.x} ${p.y}`).join(' L ')}`,
)

const promo_cells = (() => {
  const cells = []
  for (let row = 0; row < 4; row += 1) {
    for (let col = 0; col < 12; col += 1) {
      cells.push({
        x: 40 + col * 72,
        y: 88 + row * 48,
        on: (row + col) % 3 !== 0,
      })
    }
  }
  return cells
})()

const promo_line = 'M 40 268 L 180 220 L 320 232 L 460 190 L 600 200 L 740 168 L 880 178'

const finance_rows = [
  { w: 140, color: '#16d7c4' },
  { w: 118, color: '#7c5cff' },
  { w: 156, color: '#f6c66b' },
  { w: 92, color: '#16d7c4' },
  { w: 128, color: '#7c5cff' },
]

const finance_bars = [64, 88, 72, 104, 92, 116, 80, 98, 76, 110]
const finance_line = computed(() => {
  const pts = finance_bars.map((h, i) => ({ x: 328 + i * 58, y: 250 - h }))
  return `M ${pts.map((p) => `${p.x} ${p.y}`).join(' L ')}`
})
</script>

<style scoped>
.plankit-hero-panel {
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow: 0 24px 56px rgba(0, 0, 0, 0.35);
}

.plankit-hero-panel__svg {
  display: block;
  width: 100%;
  height: auto;
  min-height: 220px;
}

.php-orb {
  animation: php-orb-drift 9s ease-in-out infinite;
}

.php-orb--b {
  animation-delay: -3s;
}

.php-bar {
  transform-origin: bottom center;
  transform: scaleY(0.5);
  opacity: 0.8;
}

.plankit-hero-panel--live .php-bar {
  animation: php-bar-wave 2.3s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

.php-line {
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
  stroke-dasharray: 640;
  stroke-dashoffset: 640;
}

.plankit-hero-panel--live .php-line {
  animation: php-line-draw 2s ease forwards, php-line-glow 3s ease-in-out 2s infinite;
}

.php-dot {
  fill: #091321;
  stroke: #16d7c4;
  stroke-width: 2;
  opacity: 0;
  transform: scale(0.6);
  transform-origin: center;
}

.plankit-hero-panel--live .php-dot {
  animation: php-dot-pulse 2.2s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

.php-cell {
  opacity: 0.85;
}

.plankit-hero-panel--live .php-cell {
  animation: php-cell-pulse 2.6s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

.php-finance-bar {
  opacity: 0.75;
  transform-origin: left center;
  transform: scaleX(0.7);
}

.plankit-hero-panel--live .php-finance-bar {
  animation: php-finance-grow 2.4s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

@keyframes php-bar-wave {
  0%,
  100% {
    transform: scaleY(0.55);
    opacity: 0.78;
  }
  50% {
    transform: scaleY(1);
    opacity: 1;
  }
}

@keyframes php-line-draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes php-line-glow {
  0%,
  100% {
    filter: drop-shadow(0 0 0 rgba(22, 215, 196, 0));
  }
  50% {
    filter: drop-shadow(0 0 6px rgba(22, 215, 196, 0.4));
  }
}

@keyframes php-dot-pulse {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(0.85);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

@keyframes php-cell-pulse {
  0%,
  100% {
    opacity: 0.7;
  }
  50% {
    opacity: 1;
  }
}

@keyframes php-finance-grow {
  0%,
  100% {
    transform: scaleX(0.75);
    opacity: 0.72;
  }
  50% {
    transform: scaleX(1);
    opacity: 1;
  }
}

@keyframes php-orb-drift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(8px, -5px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .php-bar,
  .php-line,
  .php-dot,
  .php-cell,
  .php-finance-bar,
  .php-orb {
    animation: none !important;
    transform: none;
    opacity: 1;
    stroke-dashoffset: 0;
  }
}
</style>
