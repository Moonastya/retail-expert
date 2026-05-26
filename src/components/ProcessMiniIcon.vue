<template>
  <svg
    ref="root_el"
    class="process-mini-icon"
    :class="[`process-mini-icon--${kind}`, { 'process-mini-icon--on': active }]"
    viewBox="0 0 64 64"
    aria-hidden="true"
  >
    <rect width="64" height="64" rx="14" fill="rgba(30,90,168,0.08)" />

    <!-- retail: витрина + столбцы -->
    <g v-if="kind === 'retail'">
      <rect x="14" y="22" width="36" height="28" rx="4" fill="#fff" stroke="rgba(30,90,168,0.2)" />
      <rect
        v-for="(h, i) in [14, 20, 16, 24]"
        :key="i"
        class="pmi-bar"
        :x="20 + i * 8"
        :y="44 - h"
        width="5"
        :height="h"
        rx="1"
        fill="#1e5aa8"
        :style="{ '--d': `${i * 0.08}s` }"
      />
      <rect x="18" y="26" width="28" height="4" rx="1" fill="#c9a962" opacity="0.8" />
    </g>

    <!-- ecommerce: корзина + тренд -->
    <g v-else-if="kind === 'ecommerce'">
      <path d="M22 28 h20 l4 14 H18 Z" fill="none" stroke="#1e5aa8" stroke-width="2" stroke-linejoin="round" />
      <circle cx="24" cy="46" r="2.5" fill="#1e5aa8" />
      <circle cx="36" cy="46" r="2.5" fill="#1e5aa8" />
      <polyline
        class="pmi-line"
        points="14,20 26,14 38,18 50,10"
        fill="none"
        stroke="#c9a962"
        stroke-width="2.5"
        stroke-linecap="round"
      />
    </g>

    <!-- horeca: тарелка + точки -->
    <g v-else-if="kind === 'horeca'">
      <ellipse cx="32" cy="36" rx="18" ry="10" fill="#fff" stroke="rgba(30,90,168,0.25)" />
      <circle
        v-for="(p, i) in horeca_dots"
        :key="i"
        class="pmi-dot"
        :cx="p.x"
        :cy="p.y"
        r="3"
        :fill="p.c"
        :style="{ '--d': `${i * 0.1}s` }"
      />
    </g>

    <!-- collect: поиск + узлы -->
    <g v-else-if="kind === 'collect'">
      <circle cx="28" cy="28" r="12" fill="none" stroke="#1e5aa8" stroke-width="2.5" />
      <line x1="36" y1="36" x2="48" y2="48" stroke="#1e5aa8" stroke-width="2.5" stroke-linecap="round" />
      <circle
        v-for="(p, i) in collect_dots"
        :key="i"
        class="pmi-dot"
        :cx="p.x"
        :cy="p.y"
        r="2.5"
        fill="#c9a962"
        :style="{ '--d': `${0.2 + i * 0.12}s` }"
      />
    </g>

    <!-- structure: сетка связей -->
    <g v-else-if="kind === 'structure'">
      <rect
        v-for="(r, i) in struct_cells"
        :key="i"
        class="pmi-cell"
        :x="r.x"
        :y="r.y"
        width="14"
        height="14"
        rx="3"
        fill="#fff"
        stroke="#1e5aa8"
        stroke-width="1.5"
        :style="{ '--d': `${i * 0.07}s` }"
      />
      <line x1="29" y1="22" x2="43" y2="36" stroke="#c9a962" stroke-width="1.5" opacity="0.8" />
      <line x1="43" y1="22" x2="29" y2="36" stroke="#c9a962" stroke-width="1.5" opacity="0.8" />
    </g>

    <!-- viz: круговая + столбцы -->
    <g v-else-if="kind === 'viz'">
      <rect
        v-for="(h, i) in [12, 22, 16, 28]"
        :key="'b' + i"
        class="pmi-bar"
        :x="14 + i * 9"
        :y="46 - h"
        width="6"
        :height="h"
        rx="1.5"
        :fill="i % 2 ? '#c9a962' : '#1e5aa8'"
        :style="{ '--d': `${i * 0.08}s` }"
      />
      <circle cx="48" cy="22" r="10" fill="none" stroke="#1e5aa8" stroke-width="3" />
      <path d="M48 12 A10 10 0 0 1 56 26 L48 22 Z" fill="#c9a962" class="pmi-slice" />
    </g>

    <!-- algorithm: блок-схема -->
    <g v-else-if="kind === 'algorithm'">
      <rect class="pmi-cell" x="22" y="14" width="20" height="10" rx="3" fill="#1e5aa8" style="--d: 0s" />
      <rect class="pmi-cell" x="14" y="30" width="36" height="10" rx="3" fill="#3d6cbc" style="--d: 0.1s" />
      <rect class="pmi-cell" x="22" y="46" width="20" height="10" rx="3" fill="#c9a962" style="--d: 0.2s" />
      <line x1="32" y1="24" x2="32" y2="30" stroke="rgba(30,90,168,0.4)" stroke-width="1.5" />
      <line x1="32" y1="40" x2="32" y2="46" stroke="rgba(30,90,168,0.4)" stroke-width="1.5" />
      <polyline
        class="pmi-line"
        points="48,32 54,32 54,38"
        fill="none"
        stroke="#c9a962"
        stroke-width="2"
        stroke-linecap="round"
      />
    </g>
  </svg>
</template>

<script setup>
import { ref } from 'vue'
import { use_live_chart } from '../application/use_live_chart'

defineProps({
  kind: {
    type: String,
    required: true,
    validator: (v) =>
      ['retail', 'ecommerce', 'horeca', 'collect', 'structure', 'viz', 'algorithm'].includes(v),
  },
})

const root_el = ref(null)
const active = use_live_chart(root_el)

const horeca_dots = [
  { x: 24, y: 30, c: '#1e5aa8' },
  { x: 32, y: 26, c: '#c9a962' },
  { x: 40, y: 32, c: '#3d6cbc' },
  { x: 36, y: 38, c: '#1a2744' },
]

const collect_dots = [
  { x: 20, y: 20 },
  { x: 44, y: 18 },
  { x: 50, y: 40 },
]

const struct_cells = [
  { x: 16, y: 18 },
  { x: 34, y: 18 },
  { x: 16, y: 36 },
  { x: 34, y: 36 },
]

</script>

<style scoped>
.process-mini-icon {
  display: block;
  width: 56px;
  height: 56px;
  flex-shrink: 0;
}

.pmi-bar {
  transform-origin: bottom center;
  transform: scaleY(0);
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--d, 0ms);
}

.process-mini-icon--on .pmi-bar {
  transform: scaleY(1);
  animation: pmi-bar-wave 2.3s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

.pmi-line {
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  transition: stroke-dashoffset 0.9s ease 0.2s;
}

.process-mini-icon--on .pmi-line {
  stroke-dashoffset: 0;
  animation: pmi-line-glow 2.8s ease-in-out infinite;
}

@keyframes pmi-bar-wave {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.15);
  }
}

@keyframes pmi-dot-pulse {
  0%,
  100% {
    transform: scale(0.92);
  }
  50% {
    transform: scale(1.08);
  }
}

@keyframes pmi-line-glow {
  0%,
  100% {
    opacity: 0.85;
  }
  50% {
    opacity: 1;
  }
}

.pmi-dot {
  opacity: 0;
  transform: scale(0);
  transform-origin: center;
  transition:
    opacity 0.4s ease,
    transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
  transition-delay: var(--d, 0ms);
}

.process-mini-icon--on .pmi-dot {
  opacity: 1;
  transform: scale(1);
  animation: pmi-dot-pulse 2s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

.pmi-cell {
  opacity: 0;
  transform: translateY(6px);
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
  transition-delay: var(--d, 0ms);
}

.process-mini-icon--on .pmi-cell {
  opacity: 1;
  transform: translateY(0);
}

.pmi-slice {
  opacity: 0;
  transition: opacity 0.6s ease 0.35s;
}

.process-mini-icon--on .pmi-slice {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .pmi-bar,
  .pmi-line,
  .pmi-dot,
  .pmi-cell,
  .pmi-slice {
    transition: none;
    transform: none;
    stroke-dashoffset: 0;
    opacity: 1;
  }
}
</style>
