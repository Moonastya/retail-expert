<template>
  <div
    ref="root_el"
    class="plankit-flow-illus"
    :class="{ 'plankit-flow-illus--live': live }"
    role="img"
    :aria-label="aria_label"
  >
    <svg class="plankit-flow-illus__svg" viewBox="0 0 520 280" xmlns="http://www.w3.org/2000/svg">
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

      <rect width="520" height="280" rx="22" :fill="`url(#${gid('bg')})`" />
      <circle cx="90" cy="50" r="70" fill="#16d7c4" opacity="0.12" class="pf-orb" />
      <circle cx="430" cy="220" r="90" fill="#7c5cff" opacity="0.1" class="pf-orb pf-orb--b" />

      <g v-if="variant === 'platform'">
        <text x="24" y="32" fill="rgba(238,248,255,0.7)" font-size="10" font-weight="700">S&amp;OP PLATFORM</text>
        <rect
          v-for="(n, i) in nodes_platform"
          :key="n"
          class="pf-node"
          :x="40 + i * 92"
          y="48"
          width="72"
          height="36"
          rx="10"
          fill="rgba(255,255,255,0.08)"
          stroke="rgba(22,215,196,0.35)"
          :style="{ '--d': `${i * 0.15}s` }"
        />
        <text
          v-for="(n, i) in nodes_platform"
          :key="'t' + n"
          :x="76 + i * 92"
          y="70"
          text-anchor="middle"
          fill="#eef8ff"
          font-size="9"
          font-weight="600"
        >
          {{ n }}
        </text>
        <polyline
          class="pf-line"
          points="112,66 168,66 256,66 348,66"
          fill="none"
          stroke="#16d7c4"
          stroke-width="2"
          stroke-dasharray="6 5"
        />
        <rect
          v-for="(h, i) in bars"
          :key="'b' + i"
          class="pf-bar"
          :x="48 + i * 44"
          :y="200 - h"
          width="28"
          :height="h"
          rx="6"
          :fill="`url(#${gid('bar')})`"
          :style="{ '--d': `${i * 0.1}s` }"
        />
        <path class="pf-area" :d="area_path" :fill="rgba(22,215,196,0.2)" />
        <path class="pf-line pf-line--main" :d="line_path" :stroke="`url(#${gid('line')})`" />
      </g>

      <g v-else-if="variant === 'channels'">
        <text x="24" y="32" fill="rgba(238,248,255,0.7)" font-size="10" font-weight="700">OMNI CHANNEL FLOW</text>
        <rect x="24" y="52" width="472" height="88" rx="14" fill="rgba(255,255,255,0.05)" />
        <circle
          v-for="(ch, i) in channel_dots"
          :key="ch.label"
          class="pf-dot"
          :cx="ch.x"
          :cy="ch.y"
          r="8"
          fill="#16d7c4"
          :style="{ '--d': `${i * 0.12}s` }"
        />
        <text
          v-for="(ch, i) in channel_dots"
          :key="'l' + ch.label"
          :x="ch.x"
          :y="ch.y + 22"
          text-anchor="middle"
          fill="rgba(238,248,255,0.75)"
          font-size="8"
        >
          {{ ch.label }}
        </text>
        <polyline
          class="pf-line pf-line--main"
          points="60,96 130,96 220,96 310,96 400,96 460,96"
          fill="none"
          :stroke="`url(#${gid('line')})`"
          stroke-width="3"
        />
        <rect
          v-for="(h, i) in bars"
          :key="'cb' + i"
          class="pf-bar"
          :x="56 + i * 38"
          :y="228 - h"
          width="22"
          :height="h"
          rx="5"
          :fill="`url(#${gid('bar')})`"
          :style="{ '--d': `${i * 0.08}s` }"
        />
      </g>

      <g v-else>
        <text x="24" y="32" fill="rgba(238,248,255,0.7)" font-size="10" font-weight="700">FORECAST ACCURACY</text>
        <circle cx="130" cy="150" r="52" fill="none" stroke="rgba(255,255,255,0.12)" stroke-width="10" />
        <circle
          class="pf-ring"
          cx="130"
          cy="150"
          r="52"
          fill="none"
          stroke="#16d7c4"
          stroke-width="10"
          stroke-linecap="round"
          transform="rotate(-90 130 150)"
        />
        <text x="130" y="156" text-anchor="middle" fill="#eef8ff" font-size="22" font-weight="800">+24%</text>
        <rect
          v-for="(h, i) in bars"
          :key="'fb' + i"
          class="pf-bar"
          :x="220 + i * 36"
          :y="210 - h"
          width="24"
          :height="h"
          rx="5"
          :fill="`url(#${gid('bar')})`"
          :style="{ '--d': `${i * 0.1}s` }"
        />
        <path class="pf-line pf-line--main" :d="line_path" :stroke="`url(#${gid('line')})`" />
      </g>
    </svg>
  </div>
</template>

<script setup>
import { computed, ref, useId } from 'vue'
import { use_live_chart } from '../application/use_live_chart'

defineProps({
  variant: {
    type: String,
    default: 'platform',
    validator: (v) => ['platform', 'channels', 'forecast'].includes(v),
  },
  aria_label: { type: String, default: 'Диаграмма Plankit' },
})

const root_el = ref(null)
const live = use_live_chart(root_el)
const id_base = useId().replace(/[^a-zA-Z0-9]/g, '')
const gid = (s) => `pf-${id_base}-${s}`

const nodes_platform = ['KAM', 'TM', 'Plan', 'Finance']
const bars = [42, 58, 48, 72, 64, 80, 52]

const channel_dots = [
  { label: 'NKA', x: 60, y: 96 },
  { label: 'E-com', x: 150, y: 96 },
  { label: 'Distr', x: 240, y: 96 },
  { label: 'HoReCa', x: 330, y: 96 },
  { label: 'PVZ', x: 420, y: 96 },
]

const line_coords = [
  { x: 220, y: 200 },
  { x: 260, y: 170 },
  { x: 300, y: 178 },
  { x: 340, y: 140 },
  { x: 380, y: 120 },
  { x: 420, y: 108 },
]

const line_path = computed(() => `M ${line_coords.map((p) => `${p.x} ${p.y}`).join(' L ')}`)
const area_path = computed(() => {
  const pts = line_coords
  const first = pts[0]
  const last = pts[pts.length - 1]
  return `M ${first.x} 210 L ${pts.map((p) => `${p.x} ${p.y}`).join(' L ')} L ${last.x} 210 Z`
})
</script>

<style scoped>
.plankit-flow-illus {
  width: 100%;
  margin: 0 0 20px;
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.28);
}

.plankit-flow-illus__svg {
  display: block;
  width: 100%;
  height: auto;
}

.pf-orb {
  animation: pf-orb-drift 10s ease-in-out infinite;
}

.pf-orb--b {
  animation-delay: -4s;
}

.pf-bar {
  transform-origin: bottom center;
  transform: scaleY(0.55);
  opacity: 0.75;
}

.plankit-flow-illus--live .pf-bar {
  animation: pf-bar-wave 2.2s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

.pf-line {
  stroke-dasharray: 420;
  stroke-dashoffset: 420;
}

.plankit-flow-illus--live .pf-line {
  animation: pf-line-draw 2.4s ease forwards, pf-line-glow 3s ease-in-out 2.4s infinite;
}

.pf-line--main {
  fill: none;
  stroke-width: 3;
  stroke-linecap: round;
}

.pf-area {
  opacity: 0;
}

.plankit-flow-illus--live .pf-area {
  animation: pf-area-in 1s ease 0.4s forwards;
}

.pf-dot {
  opacity: 0.4;
  transform: scale(0.8);
  transform-origin: center;
}

.plankit-flow-illus--live .pf-dot {
  animation: pf-dot-pulse 2s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

.pf-node {
  opacity: 0.7;
}

.plankit-flow-illus--live .pf-node {
  animation: pf-node-glow 2.8s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

.pf-ring {
  stroke-dasharray: 327;
  stroke-dashoffset: 82;
}

.plankit-flow-illus--live .pf-ring {
  animation: pf-ring-spin 8s linear infinite;
}

@keyframes pf-bar-wave {
  0%,
  100% {
    transform: scaleY(0.55);
    opacity: 0.75;
  }
  50% {
    transform: scaleY(1);
    opacity: 1;
  }
}

@keyframes pf-line-draw {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes pf-line-glow {
  0%,
  100% {
    filter: drop-shadow(0 0 0 rgba(22, 215, 196, 0));
  }
  50% {
    filter: drop-shadow(0 0 6px rgba(22, 215, 196, 0.45));
  }
}

@keyframes pf-area-in {
  to {
    opacity: 1;
  }
}

@keyframes pf-dot-pulse {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(0.85);
  }
  50% {
    opacity: 1;
    transform: scale(1.15);
  }
}

@keyframes pf-node-glow {
  0%,
  100% {
    opacity: 0.65;
  }
  50% {
    opacity: 1;
  }
}

@keyframes pf-ring-spin {
  to {
    transform: rotate(270deg);
  }
}

@keyframes pf-orb-drift {
  0%,
  100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(6px, -4px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .pf-bar,
  .pf-line,
  .pf-dot,
  .pf-node,
  .pf-ring,
  .pf-orb {
    animation: none !important;
    transform: none;
    opacity: 1;
    stroke-dashoffset: 0;
  }
}
</style>
