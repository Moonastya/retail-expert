<template>
  <section ref="root_el" class="sol-tabs" :class="{ 'sol-tabs--on': visible }">
    <header class="sol-tabs__head">
      <p class="eyebrow reveal" style="--delay: 0ms">Решения Retail Expert</p>
      <h2 class="reveal" style="--delay: 60ms">Полный стек продуктовой аналитики</h2>
    </header>

    <div class="sol-tabs__nav" role="tablist" aria-label="Вкладки продуктовых решений">
      <button
        v-for="(item, i) in solutions"
        :key="item.id"
        class="sol-tabs__tab"
        :class="{ 'sol-tabs__tab--active': i === active_idx }"
        role="tab"
        :aria-selected="i === active_idx ? 'true' : 'false'"
        type="button"
        @click="set_active_tab(i)"
      >
        {{ item.title }}
      </button>
    </div>

    <article :key="active_solution.id" class="sol-tabs__panel" role="tabpanel">
      <div class="sol-tabs__content">
        <h3>{{ active_solution.title }}</h3>
        <p class="sol-tabs__lead">{{ active_solution.lead }}</p>
        <div class="sol-tabs__chips">
          <span v-for="metric in active_solution.metrics" :key="metric">{{ metric }}</span>
        </div>

        <h4>Данные в основе</h4>
        <ul>
          <li v-for="row in active_solution.data_basis" :key="row">
            {{ row }}
          </li>
        </ul>

        <h4>Доступные показатели</h4>
        <ul>
          <li v-for="row in active_solution.kpis" :key="row">
            {{ row }}
          </li>
        </ul>

        <h4>Как это работает</h4>
        <ol>
          <li v-for="row in active_solution.workflow" :key="row">
            {{ row }}
          </li>
        </ol>
      </div>

      <div class="sol-tabs__chart-wrap">
        <svg class="sol-chart" viewBox="0 0 430 250" role="img" :aria-label="`График ${active_solution.title}`">
          <defs>
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
            <linearGradient :id="gid('area')" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="rgba(22,215,196,0.45)" />
              <stop offset="100%" stop-color="rgba(22,215,196,0)" />
            </linearGradient>
          </defs>

          <rect x="0" y="0" width="430" height="250" rx="24" fill="rgba(255,255,255,0.04)" />
          <g class="sol-chart__grid">
            <line v-for="gy in [48, 88, 128, 168, 208]" :key="gy" x1="26" :y1="gy" x2="404" :y2="gy" />
          </g>

          <g>
            <rect
              v-for="(h, i) in active_solution.chart.bars"
              :key="`b-${i}-${active_solution.id}`"
              class="sol-chart__bar"
              :x="40 + i * 58"
              :y="206 - h * 1.7"
              width="34"
              :height="h * 1.7"
              rx="8"
              :fill="`url(#${gid('bar')})`"
              :style="{ '--d': `${i * 90}ms` }"
            />
          </g>

          <path class="sol-chart__area" :d="area_path" :fill="`url(#${gid('area')})`" />
          <path class="sol-chart__line" :d="line_path" :stroke="`url(#${gid('line')})`" />

          <circle
            v-for="(p, i) in line_points"
            :key="`p-${i}-${active_solution.id}`"
            class="sol-chart__dot"
            :cx="p.x"
            :cy="p.y"
            r="5"
            :style="{ '--d': `${240 + i * 80}ms` }"
          />
        </svg>
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, useId, watch } from 'vue'
import { use_component_reveal } from '../application/use_component_reveal'
import { PRESENTATION_SOLUTIONS } from '../data/presentation_solutions'

const solutions = PRESENTATION_SOLUTIONS
const active_idx = ref(0)
const root_el = ref(null)
const visible = ref(false)

use_component_reveal()

const set_active_tab = (index) => {
  active_idx.value = index
}

watch(active_idx, async () => {
  const el = root_el.value
  if (!el) {
    return
  }
  const rect = el.getBoundingClientRect()
  const in_view = rect.top < window.innerHeight && rect.bottom > 0
  if (!in_view) {
    return
  }
  visible.value = false
  await nextTick()
  visible.value = true
})

const id_base = useId().replace(/[^a-zA-Z0-9]/g, '')
const gid = (s) => `sol-${id_base}-${s}`

const active_solution = computed(() => solutions[active_idx.value])
const line_points = computed(() =>
  active_solution.value.chart.line.map((v, i) => ({
    x: 57 + i * 58,
    y: 206 - v * 1.8,
  })),
)

const line_path = computed(() => `M ${line_points.value.map((p) => `${p.x} ${p.y}`).join(' L ')}`)
const area_path = computed(() => {
  const pts = line_points.value
  if (!pts.length) return ''
  const first = pts[0]
  const last = pts[pts.length - 1]
  return `M ${first.x} 206 L ${pts.map((p) => `${p.x} ${p.y}`).join(' L ')} L ${last.x} 206 Z`
})

let observer = null
onMounted(() => {
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        visible.value = entry.isIntersecting
      }
    },
    { threshold: 0.2 },
  )
  if (root_el.value) observer.observe(root_el.value)
})

onUnmounted(() => observer?.disconnect())
</script>

<style scoped>
.sol-tabs {
  padding: 56px 0;
}
.sol-tabs__head {
  max-width: 820px;
  margin: 0 auto 22px;
  text-align: center;
}
.sol-tabs__head h2 {
  margin: 10px 0 12px;
}
.sol-tabs__head p {
  margin: 0;
  color: var(--text-soft);
}
.sol-tabs__nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 18px;
}
.sol-tabs__tab {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: rgba(255, 255, 255, 0.06);
  color: var(--text-soft);
  border-radius: 999px;
  padding: 8px 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}
.sol-tabs__tab--active {
  background: rgba(22, 215, 196, 0.16);
  color: #eef8ff;
  border-color: rgba(22, 215, 196, 0.5);
}
.sol-tabs__panel {
  display: grid;
  grid-template-columns: 1.1fr 1fr;
  gap: 18px;
  animation: sol-panel-in 0.35s ease;
}

@keyframes sol-panel-in {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.sol-tabs__content,
.sol-tabs__chart-wrap {
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 20px;
  padding: 20px;
  background: linear-gradient(
    155deg,
    rgba(22, 36, 62, 0.92) 0%,
    rgba(14, 24, 44, 0.96) 100%
  );
}
.sol-tabs__lead {
  color: var(--text-soft);
}
.sol-tabs__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 12px 0 14px;
}
.sol-tabs__chips span {
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0.01em;
  color: #eef8ff;
  background: rgba(10, 18, 36, 0.92);
  border: 1px solid rgba(22, 215, 196, 0.35);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}
.sol-tabs__content h4 {
  margin: 14px 0 8px;
}
.sol-tabs__content ul,
.sol-tabs__content ol {
  margin: 0;
  padding-left: 18px;
  color: var(--text-soft);
  display: grid;
  gap: 6px;
}
.sol-chart {
  width: 100%;
  height: auto;
  display: block;
  shape-rendering: geometricPrecision;
  text-rendering: optimizeLegibility;
}
.sol-chart__grid line {
  stroke: rgba(255, 255, 255, 0.15);
}
.sol-chart__bar {
  transform-origin: bottom center;
  transform: scaleY(0);
  transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--d, 0ms);
}
.sol-tabs--on .sol-chart__bar {
  transform: scaleY(1);
  animation: sol-bar-breathe 2.8s ease-in-out infinite;
}
.sol-chart__line {
  fill: none;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 520;
  stroke-dashoffset: 520;
  transition: stroke-dashoffset 1.15s ease 0.2s;
}
.sol-tabs--on .sol-chart__line {
  stroke-dashoffset: 0;
}
.sol-chart__area {
  opacity: 0;
  transition: opacity 0.9s ease 0.35s;
}
.sol-tabs--on .sol-chart__area {
  opacity: 1;
}
.sol-chart__dot {
  fill: #091321;
  stroke: #16d7c4;
  stroke-width: 2;
  opacity: 0;
  transform: scale(0);
  transform-origin: center;
  transition: opacity 0.3s ease, transform 0.35s ease;
  transition-delay: var(--d, 0ms);
}
.sol-tabs--on .sol-chart__dot {
  opacity: 1;
  transform: scale(1);
}

.sol-tabs--on .sol-chart__line {
  animation: sol-line-glow 3.4s ease-in-out infinite;
}

@keyframes sol-bar-breathe {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.13);
  }
}

@keyframes sol-line-glow {
  0%,
  100% {
    filter: drop-shadow(0 0 0 rgba(22, 215, 196, 0));
  }
  50% {
    filter: drop-shadow(0 0 8px rgba(22, 215, 196, 0.35));
  }
}
@media (max-width: 960px) {
  .sol-tabs__panel {
    grid-template-columns: 1fr;
  }
}
</style>
