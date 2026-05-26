<template>
  <section ref="root_el" class="co-charts" aria-label="Ключевые метрики в графиках">
    <div class="co-charts-ambient" aria-hidden="true">
      <span class="co-orb co-orb--a" />
      <span class="co-orb co-orb--b" />
      <span class="co-orb co-orb--c" />
    </div>

    <div class="co-charts-head">
      <p class="eyebrow co-charts-eyebrow">Метрики из практики</p>
      <h2 class="co-charts-title">Цифры, которым доверяют лидеры FMCG</h2>
      <p class="co-charts-lead">
        Покрытие рынка, точность алгоритмов и масштаб базы — в одной визуализации. Анимации
        запускаются при скролле и продолжают «дышать», пока блок на экране.
      </p>
    </div>

    <div
      class="co-charts-grid"
      :class="{ 'co-charts-grid--on': visible, 'co-charts-grid--live': live }"
    >
      <article class="co-chart-panel co-chart-panel--bars">
        <div class="co-panel-shine" aria-hidden="true" />
        <h3>Сравнение масштабов</h3>
        <svg class="co-bars-svg" :viewBox="'0 0 420 200'" role="img" aria-label="Столбчатая диаграмма">
          <defs>
            <linearGradient :id="gid('bar')" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#5f4dff" />
              <stop offset="52%" stop-color="#16d7c4" />
              <stop offset="100%" stop-color="#f6c66b" />
            </linearGradient>
            <linearGradient :id="gid('shine')" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="rgba(255,255,255,0)" />
              <stop offset="45%" stop-color="rgba(255,252,248,0.55)" />
              <stop offset="55%" stop-color="rgba(255,252,248,0.55)" />
              <stop offset="100%" stop-color="rgba(255,255,255,0)" />
              <animate
                attributeName="x1"
                values="-80%;120%"
                dur="3.2s"
                repeatCount="indefinite"
              />
              <animate
                attributeName="x2"
                values="20%;220%"
                dur="3.2s"
                repeatCount="indefinite"
              />
            </linearGradient>
            <filter :id="gid('glow')" x="-35%" y="-35%" width="170%" height="170%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <clipPath :id="gid('barclip')">
              <rect x="0" y="0" width="420" height="170" />
            </clipPath>
          </defs>
          <g class="co-bars-layer" :clip-path="`url(#${gid('barclip')})`">
            <g
              v-for="(bar, i) in bars"
              :key="bar.label"
              class="co-bar-group"
              :transform="`translate(${40 + i * 92}, 170)`"
            >
              <rect
                class="co-bar-shadow"
                x="4"
                :y="-bar.h"
                width="48"
                :height="bar.h"
                rx="8"
                fill="rgba(15,22,36,0.18)"
              />
              <rect
                class="co-bar-rect"
                x="0"
                :y="-bar.h"
                width="56"
                :height="bar.h"
                rx="8"
                :fill="`url(#${gid('bar')})`"
                :filter="`url(#${gid('glow')})`"
                :style="{ transitionDelay: `${100 + i * 110}ms` }"
              />
              <rect
                class="co-bar-gloss"
                x="0"
                :y="-bar.h"
                width="56"
                :height="bar.h"
                rx="8"
                :fill="`url(#${gid('shine')})`"
                opacity="0.35"
              />
              <text class="co-bar-val" x="28" :y="-bar.h - 14" text-anchor="middle">
                {{ bar.value }}
              </text>
              <text class="co-bar-lbl" x="28" y="26" text-anchor="middle">{{ bar.label }}</text>
            </g>
          </g>
        </svg>
      </article>

      <article class="co-chart-panel co-chart-panel--rings">
        <div class="co-panel-shine" aria-hidden="true" />
        <h3>Качество и охват</h3>
        <div class="co-rings">
          <div class="co-ring-wrap">
            <svg class="co-ring-svg co-ring-svg--halo" viewBox="0 0 140 140" aria-hidden="true">
              <circle class="co-ring-halo" cx="70" cy="70" r="58" fill="none" />
            </svg>
            <svg class="co-ring-svg" viewBox="0 0 140 140">
              <circle class="co-ring-track" cx="70" cy="70" r="52" fill="none" />
              <circle
                class="co-ring-prog co-ring-prog--a"
                cx="70"
                cy="70"
                r="52"
                fill="none"
                :stroke-dasharray="`${ring_circ} ${ring_circ}`"
                :stroke-dashoffset="ring_a_offset"
              />
            </svg>
            <div class="co-ring-center">
              <span class="co-ring-num">98%</span>
              <span class="co-ring-cap">точность</span>
            </div>
          </div>
          <div class="co-ring-wrap">
            <svg class="co-ring-svg co-ring-svg--halo co-ring-svg--halo-b" viewBox="0 0 140 140" aria-hidden="true">
              <circle class="co-ring-halo co-ring-halo--b" cx="70" cy="70" r="58" fill="none" />
            </svg>
            <svg class="co-ring-svg" viewBox="0 0 140 140">
              <circle class="co-ring-track" cx="70" cy="70" r="52" fill="none" />
              <circle
                class="co-ring-prog co-ring-prog--b"
                cx="70"
                cy="70"
                r="52"
                fill="none"
                :stroke-dasharray="`${ring_circ} ${ring_circ}`"
                :stroke-dashoffset="ring_b_offset"
              />
            </svg>
            <div class="co-ring-center">
              <span class="co-ring-num">&gt;80%</span>
              <span class="co-ring-cap">покрытие</span>
            </div>
          </div>
        </div>
      </article>

      <article class="co-chart-panel co-chart-panel--wide">
        <div class="co-panel-shine" aria-hidden="true" />
        <h3>Динамика и конкурентный контекст</h3>
        <svg class="co-line-svg" viewBox="0 0 480 200" role="img" aria-label="Два тренда и сетка">
          <defs>
            <linearGradient :id="gid('lineFill')" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="rgba(22, 215, 196, 0.42)" />
              <stop offset="55%" stop-color="rgba(124, 92, 255, 0.12)" />
              <stop offset="100%" stop-color="rgba(8, 17, 31, 0)" />
            </linearGradient>
            <linearGradient :id="gid('lineStroke')" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#7c5cff" />
              <stop offset="50%" stop-color="#16d7c4" />
              <stop offset="100%" stop-color="#f6c66b" />
            </linearGradient>
            <filter :id="gid('lineGlow')">
              <feGaussianBlur stdDeviation="2.5" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <g class="co-grid-lines" opacity="0.35">
            <line v-for="gy in grid_ys" :key="gy" x1="28" :y1="gy" x2="452" :y2="gy" />
          </g>

          <path class="co-line-area" :d="area_path" :fill="`url(#${gid('lineFill')})`" />
          <path
            ref="line_path_el"
            class="co-line-stroke"
            :d="line_path"
            :stroke="`url(#${gid('lineStroke')})`"
            :filter="`url(#${gid('lineGlow')})`"
            :stroke-dasharray="`${line_len} ${line_len}`"
            :stroke-dashoffset="visible ? 0 : line_len"
          />
          <path
            ref="line2_path_el"
            class="co-line-stroke co-line-stroke--ghost"
            :d="line2_path"
            :stroke-dasharray="`${line2_len} ${line2_len}`"
            :stroke-dashoffset="visible ? 0 : line2_len"
            :style="{ transitionDelay: '0.35s' }"
          />
          <g class="co-line-dots">
            <circle
              v-for="(pt, i) in line_points"
              :key="'a' + i"
              :cx="pt.x"
              :cy="pt.y"
              r="6"
              class="co-line-dot"
              :style="{ transitionDelay: `${420 + i * 85}ms` }"
            />
            <circle
              v-for="(pt, i) in line2_points"
              :key="'b' + i"
              :cx="pt.x"
              :cy="pt.y"
              r="4"
              class="co-line-dot co-line-dot--ghost"
              :style="{ transitionDelay: `${520 + i * 70}ms` }"
            />
          </g>
        </svg>

        <div class="co-spark-wrap">
          <p class="co-spark-label">Пульс категории (нормировано)</p>
          <div class="co-spark-row" role="img" aria-label="Мини-график активности по периодам">
            <div
              v-for="(s, i) in sparks"
              :key="i"
              class="co-spark-bar"
              :style="{ '--h': `${s}%`, '--d': `${80 + i * 45}ms` }"
            />
          </div>
        </div>

        <p class="co-line-note">
          Иллюстрация: основной тренд, рыночный бенчмарк (пунктир) и микро-волатильность. В продукте —
          ваши OLAP и дашборды.
        </p>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, useId } from 'vue'

const id_base = useId().replace(/[^a-zA-Z0-9]/g, '')
const gid = (suffix) => `co-${id_base}-${suffix}`

const root_el = ref(null)
const line_path_el = ref(null)
const line2_path_el = ref(null)
const visible = ref(false)
const live = ref(false)

const bars = [
  { label: 'Покрытие', value: '>80%', h: 96 },
  { label: 'Точность', value: '98%', h: 118 },
  { label: 'ТТ', value: '350k+', h: 108 },
  { label: 'SKU', value: '700k+', h: 125 },
]

const ring_circ = 2 * Math.PI * 52
const ring_a_offset = computed(() => (visible.value ? ring_circ * (1 - 0.98) : ring_circ))
const ring_b_offset = computed(() => (visible.value ? ring_circ * (1 - 0.8) : ring_circ))

const grid_ys = [36, 68, 100, 132]

const line_points = [
  { x: 40, y: 118 },
  { x: 120, y: 96 },
  { x: 200, y: 102 },
  { x: 280, y: 72 },
  { x: 360, y: 58 },
  { x: 440, y: 44 },
]

const line2_points = [
  { x: 40, y: 132 },
  { x: 120, y: 124 },
  { x: 200, y: 118 },
  { x: 280, y: 108 },
  { x: 360, y: 102 },
  { x: 440, y: 98 },
]

const line_path = computed(() => {
  const pts = line_points
  return `M ${pts.map((p) => `${p.x} ${p.y}`).join(' L ')}`
})

const line2_path = computed(() => {
  const pts = line2_points
  return `M ${pts.map((p) => `${p.x} ${p.y}`).join(' L ')}`
})

const area_path = computed(() => {
  const base_y = 148
  const pts = line_points
  return `M ${pts[0].x} ${base_y} L ${pts.map((p) => `${p.x} ${p.y}`).join(' L ')} L ${pts[pts.length - 1].x} ${base_y} Z`
})

const sparks = [42, 68, 55, 88, 61, 74, 52, 91, 63, 79, 58, 85]

const line_len = ref(520)
const line2_len = ref(480)

let observer = null

onMounted(() => {
  nextTick(() => {
    const el = line_path_el.value
    if (el && typeof el.getTotalLength === 'function') {
      try {
        line_len.value = el.getTotalLength()
      } catch {
        line_len.value = 520
      }
    }
    const el2 = line2_path_el.value
    if (el2 && typeof el2.getTotalLength === 'function') {
      try {
        line2_len.value = el2.getTotalLength()
      } catch {
        line2_len.value = 480
      }
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            visible.value = true
            live.value = true
          } else {
            visible.value = false
            live.value = false
          }
        }
      },
      { threshold: 0.18 },
    )

    if (root_el.value) {
      const rect = root_el.value.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.92) {
        visible.value = true
        live.value = true
      } else if (observer) {
        observer.observe(root_el.value)
      }
    }
  })
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})
</script>

<style scoped>
.co-charts {
  position: relative;
  padding: 52px 0 60px;
  overflow: hidden;
  background:
    radial-gradient(circle at 18% 12%, rgba(124, 92, 255, 0.18), transparent 36%),
    radial-gradient(circle at 82% 8%, rgba(22, 215, 196, 0.14), transparent 34%),
    linear-gradient(180deg, rgba(7, 13, 25, 0.4) 0%, rgba(10, 20, 40, 0.2) 100%);
}

.co-charts-ambient {
  position: absolute;
  inset: -20% -10%;
  pointer-events: none;
  z-index: 0;
}

.co-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(72px);
  opacity: 0.55;
  animation: co-orb-float 14s ease-in-out infinite;
}

.co-orb--a {
  width: 340px;
  height: 340px;
  background: radial-gradient(circle, rgba(124, 92, 255, 0.35) 0%, transparent 70%);
  top: -8%;
  left: -5%;
}

.co-orb--b {
  width: 280px;
  height: 280px;
  background: radial-gradient(circle, rgba(22, 215, 196, 0.28) 0%, transparent 70%);
  top: 30%;
  right: -8%;
  animation-delay: -4s;
}

.co-orb--c {
  width: 220px;
  height: 220px;
  background: radial-gradient(circle, rgba(246, 198, 107, 0.2) 0%, transparent 65%);
  bottom: 5%;
  left: 35%;
  animation-delay: -7s;
}

@keyframes co-orb-float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(3%, 4%) scale(1.06);
  }
  66% {
    transform: translate(-2%, -3%) scale(0.96);
  }
}

.co-charts-head {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 760px;
  margin: 0 auto 42px;
}

.co-charts-eyebrow {
  animation: co-fade-up 0.9s ease both;
}

.co-charts-title {
  margin: 10px 0 14px;
  font-size: clamp(30px, 3.5vw, 44px);
  line-height: 1.12;
  color: #eef8ff;
  text-shadow: 0 12px 40px rgba(0, 0, 0, 0.35);
  animation: co-fade-up 0.9s ease 0.08s both;
}

.co-charts-lead {
  margin: 0;
  font-size: 16px;
  line-height: 1.58;
  color: #a8b8d4;
  animation: co-fade-up 0.9s ease 0.14s both;
}

@keyframes co-fade-up {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes co-title-shine {
  0%,
  100% {
    background-position: 0% center;
  }
  50% {
    background-position: 100% center;
  }
}

.co-charts-grid {
  position: relative;
  z-index: 1;
  display: grid;
  gap: 22px;
  grid-template-columns: 1fr 1fr;
  grid-template-areas:
    'bars rings'
    'line line';
}

.co-chart-panel--wide {
  grid-area: line;
}

.co-chart-panel--rings {
  grid-area: rings;
}

.co-chart-panel--bars {
  grid-area: bars;
}

@media (max-width: 900px) {
  .co-charts-grid {
    grid-template-columns: 1fr;
    grid-template-areas:
      'bars'
      'rings'
      'line';
  }
}

.co-chart-panel {
  position: relative;
  overflow: hidden;
  background: linear-gradient(
    155deg,
    rgba(255, 255, 255, 0.1) 0%,
    rgba(255, 255, 255, 0.04) 48%,
    rgba(16, 30, 55, 0.55) 100%
  );
  backdrop-filter: blur(18px) saturate(1.35);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 22px;
  padding: 24px 26px 22px;
  box-shadow:
    0 28px 70px rgba(0, 0, 0, 0.32),
    0 0 0 1px rgba(22, 215, 196, 0.08) inset,
    0 0 48px rgba(22, 215, 196, 0.06);
  transition:
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.45s ease,
    border-color 0.45s ease;
}

.co-charts-grid--on .co-chart-panel:hover {
  transform: translateY(-3px) scale(1.01);
  border-color: rgba(22, 215, 196, 0.45);
  box-shadow:
    0 36px 80px rgba(0, 0, 0, 0.38),
    0 0 0 1px rgba(22, 215, 196, 0.2) inset,
    0 0 56px rgba(22, 215, 196, 0.14);
}

.co-panel-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    110deg,
    transparent 0%,
    transparent 38%,
    rgba(255, 255, 255, 0.45) 50%,
    transparent 62%,
    transparent 100%
  );
  background-size: 240% 100%;
  opacity: 0;
  pointer-events: none;
  border-radius: inherit;
}

.co-charts-grid--on .co-panel-shine {
  opacity: 1;
  animation: co-panel-shimmer 2.8s ease-in-out infinite;
}

.co-charts-grid--on .co-chart-panel:hover .co-panel-shine {
  animation-duration: 1.6s;
}

@keyframes co-panel-shimmer {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: -100% 0;
  }
}

.co-chart-panel h3 {
  position: relative;
  z-index: 1;
  margin: 0 0 18px;
  font-size: 1.18rem;
  color: #eef8ff;
  letter-spacing: -0.02em;
}

.co-bars-svg {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 420px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.co-bar-shadow {
  opacity: 0;
  transition: opacity 0.6s ease 0.4s;
}

.co-charts-grid--on .co-bar-shadow {
  opacity: 1;
}

.co-bar-rect {
  transform-origin: 28px 0;
  transform: scaleY(0);
  transition: transform 1.15s cubic-bezier(0.22, 1, 0.36, 1);
}

.co-charts-grid--on .co-bar-rect {
  transform: scaleY(1);
}

.co-charts-grid--live .co-bar-rect {
  animation: co-bar-wave 2.2s ease-in-out infinite;
  transform-origin: 28px 0;
}

.co-charts-grid--live .co-bar-group:nth-child(1) .co-bar-rect {
  animation-delay: 0s;
}
.co-charts-grid--live .co-bar-group:nth-child(2) .co-bar-rect {
  animation-delay: 0.2s;
}
.co-charts-grid--live .co-bar-group:nth-child(3) .co-bar-rect {
  animation-delay: 0.4s;
}
.co-charts-grid--live .co-bar-group:nth-child(4) .co-bar-rect {
  animation-delay: 0.6s;
}

@keyframes co-bar-wave {
  0%,
  100% {
    transform: scaleY(0.9);
    filter: brightness(1) drop-shadow(0 0 0 rgba(22, 215, 196, 0));
  }
  50% {
    transform: scaleY(1.05);
    filter: brightness(1.15) drop-shadow(0 0 10px rgba(22, 215, 196, 0.35));
  }
}

.co-bar-gloss {
  pointer-events: none;
  mix-blend-mode: soft-light;
}

.co-bar-val {
  fill: #eef8ff;
  font-size: 13px;
  font-weight: 700;
  font-family: Outfit, system-ui, sans-serif;
  opacity: 0;
  transform: translateY(8px);
  transition:
    opacity 0.55s ease 0.75s,
    transform 0.55s cubic-bezier(0.22, 1, 0.36, 1) 0.75s;
}

.co-charts-grid--on .co-bar-val {
  opacity: 1;
  transform: translateY(0);
}

.co-bar-lbl {
  fill: rgba(168, 184, 212, 0.85);
  font-size: 10px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-family: Outfit, system-ui, sans-serif;
}

.co-ring-track {
  stroke: rgba(255, 255, 255, 0.12);
  stroke-width: 10;
}

.co-ring-prog {
  stroke-width: 10;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 70px 70px;
  transition: stroke-dashoffset 1.55s cubic-bezier(0.22, 1, 0.36, 1);
}

.co-ring-prog--a {
  stroke: #16d7c4;
  filter: drop-shadow(0 0 12px rgba(22, 215, 196, 0.55));
}

.co-ring-prog--b {
  stroke: #7c5cff;
  filter: drop-shadow(0 0 10px rgba(124, 92, 255, 0.45));
}

.co-charts-grid--live .co-ring-prog--a {
  animation: co-ring-pulse 2.4s ease-in-out infinite;
}

.co-charts-grid--live .co-ring-prog--b {
  animation: co-ring-pulse-dark 2.4s ease-in-out infinite;
  animation-delay: 0.4s;
}

@keyframes co-ring-pulse-dark {
  0%,
  100% {
    filter: drop-shadow(0 0 6px rgba(26, 39, 68, 0.2));
  }
  50% {
    filter: drop-shadow(0 0 14px rgba(26, 39, 68, 0.38));
  }
}

@keyframes co-ring-pulse {
  0%,
  100% {
    filter: drop-shadow(0 0 8px rgba(201, 169, 98, 0.35));
  }
  50% {
    filter: drop-shadow(0 0 16px rgba(201, 169, 98, 0.55));
  }
}

.co-rings {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: space-around;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;
}

.co-ring-wrap {
  position: relative;
  width: 148px;
  height: 148px;
}

.co-ring-svg {
  position: relative;
  z-index: 2;
  width: 148px;
  height: 148px;
}

.co-ring-svg--halo {
  position: absolute;
  z-index: 1;
  inset: 0;
  width: 148px;
  height: 148px;
  animation: co-halo-spin 18s linear infinite;
}

.co-ring-svg--halo-b {
  animation-direction: reverse;
  animation-duration: 22s;
}

.co-ring-halo {
  stroke: rgba(22, 215, 196, 0.45);
  stroke-width: 1.5;
  stroke-dasharray: 8 14;
}

.co-ring-halo--b {
  stroke: rgba(124, 92, 255, 0.35);
}

@keyframes co-halo-spin {
  to {
    transform: rotate(360deg);
  }
}

.co-ring-center {
  position: absolute;
  inset: 0;
  z-index: 3;
  display: grid;
  place-content: center;
  text-align: center;
  pointer-events: none;
}

.co-ring-num {
  font-family: 'Cormorant Garamond', Georgia, serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #eef8ff;
  line-height: 1.05;
}

.co-charts-grid--on .co-ring-num {
  animation: co-pop 0.65s cubic-bezier(0.22, 1, 0.36, 1) 1s both;
}

@keyframes co-pop {
  from {
    transform: scale(0.85);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.co-ring-cap {
  display: block;
  font-size: 10px;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: #a8b8d4;
  margin-top: 4px;
}

.co-grid-lines line {
  stroke: rgba(255, 255, 255, 0.14);
  stroke-width: 1;
  stroke-dasharray: 6 8;
  opacity: 0;
  transition: opacity 0.8s ease 0.2s;
}

.co-charts-grid--on .co-grid-lines line {
  opacity: 1;
}

.co-line-svg {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 480px;
  height: auto;
  display: block;
  margin: 0 auto;
}

.co-line-area {
  opacity: 0;
  transition: opacity 1s ease 0.25s;
}

.co-charts-grid--on .co-line-area {
  opacity: 1;
}

.co-line-stroke {
  fill: none;
  stroke-width: 3.2;
  stroke-linejoin: round;
  stroke-linecap: round;
  transition: stroke-dashoffset 1.65s cubic-bezier(0.22, 1, 0.36, 1);
}

.co-line-stroke--ghost {
  stroke: rgba(246, 198, 107, 0.75);
  stroke-width: 2.2;
  stroke-dasharray: 10 8;
  opacity: 0.92;
  transition: stroke-dashoffset 1.85s cubic-bezier(0.22, 1, 0.36, 1);
}

.co-charts-grid--live .co-line-stroke--ghost {
  animation: co-dash-flow 14s linear infinite;
}

@keyframes co-dash-flow {
  to {
    stroke-dashoffset: -240;
  }
}

.co-charts-grid--live .co-line-stroke:not(.co-line-stroke--ghost) {
  animation: co-line-glow 2.8s ease-in-out infinite;
}

@keyframes co-line-glow {
  0%,
  100% {
    filter: drop-shadow(0 2px 10px rgba(22, 215, 196, 0.25));
  }
  50% {
    filter: drop-shadow(0 4px 20px rgba(22, 215, 196, 0.55));
  }
}

.co-line-dot {
  fill: #091321;
  stroke: #16d7c4;
  stroke-width: 2.5;
  opacity: 0;
  transform-origin: center;
  transform-box: fill-box;
  transition:
    opacity 0.45s ease,
    transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform: scale(0.2);
}

.co-line-dot--ghost {
  stroke: rgba(246, 198, 107, 0.65);
  fill: rgba(246, 198, 107, 0.15);
  stroke-width: 1.5;
}

.co-charts-grid--on .co-line-dot {
  opacity: 1;
  transform: scale(1);
}

.co-charts-grid--live .co-line-dot {
  animation: co-dot-pulse 2s ease-in-out infinite;
}

.co-charts-grid--live .co-line-dot:nth-child(odd) {
  animation-delay: 0.3s;
}

@keyframes co-dot-pulse {
  0%,
  100% {
    stroke-width: 2.5;
    transform: scale(1);
  }
  50% {
    stroke-width: 4;
    transform: scale(1.15);
    filter: drop-shadow(0 0 8px rgba(22, 215, 196, 0.75));
  }
}

.co-spark-wrap {
  position: relative;
  z-index: 1;
  margin-top: 8px;
  padding: 14px 8px 4px;
}

.co-spark-label {
  margin: 0 0 10px;
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #a8b8d4;
  text-align: center;
}

.co-spark-row {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 6px;
  height: 72px;
  padding: 0 12px;
}

.co-spark-bar {
  flex: 1;
  min-width: 0;
  max-width: 28px;
  margin: 0 auto;
  height: calc(var(--h) * 1%);
  border-radius: 8px 8px 4px 4px;
  background: linear-gradient(180deg, #7c5cff 0%, #16d7c4 55%, #f6c66b 100%);
  transform-origin: bottom center;
  transform: scaleY(0);
  opacity: 0.95;
  box-shadow: 0 4px 14px rgba(15, 22, 36, 0.15);
  transition: transform 0.85s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--d, 0ms);
}

.co-charts-grid--on .co-spark-bar {
  transform: scaleY(1);
}

.co-charts-grid--live .co-spark-bar {
  animation: co-spark-wave 2.6s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

@keyframes co-spark-wave {
  0%,
  100% {
    filter: brightness(1);
    transform: scaleY(1);
  }
  50% {
    filter: brightness(1.12);
    transform: scaleY(1.06);
  }
}

.co-line-note {
  position: relative;
  z-index: 1;
  margin: 14px 0 0;
  font-size: 12px;
  line-height: 1.45;
  color: #a8b8d4;
  text-align: center;
}

@media (prefers-reduced-motion: reduce) {
  .co-orb,
  .co-panel-shine,
  .co-charts-title,
  .co-ring-svg--halo,
  .co-spark-bar,
  .co-line-stroke--ghost,
  .co-line-dot,
  .co-bar-rect,
  .co-ring-prog--a,
  .co-ring-prog--b,
  .co-line-stroke:not(.co-line-stroke--ghost) {
    animation: none !important;
  }

  .co-charts-grid--live .co-bar-rect {
    animation: none;
  }

  .co-charts-grid--on .co-chart-panel:hover {
    transform: none;
  }
}
</style>
