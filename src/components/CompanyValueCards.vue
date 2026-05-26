<template>
  <section
    ref="root_el"
    class="co-values co-values--live co-scroll-section"
    aria-label="Преимущества Retail Expert"
  >
    <div class="co-values-ambient" aria-hidden="true">
      <span class="co-values-orb co-values-orb--a" />
      <span class="co-values-orb co-values-orb--b" />
    </div>

    <header class="co-values-head">
      <p class="eyebrow reveal">Единый дата-партнёр</p>
      <h2 class="reveal" style="--delay: 60ms">От сбора данных до готовой аналитики</h2>
      <p class="co-values-lead reveal" style="--delay: 120ms">
        Шесть опор Retail Expert — как в корпоративной презентации: покрытие, гранулярность,
        удобство, масштаб базы, точность и безопасность доступа.
      </p>
    </header>

    <div class="co-values-grid">
      <article
        v-for="(card, i) in cards"
        :key="card.id"
        class="co-value-card reveal"
        :class="[
          `co-value-card--${card.variant}`,
          `co-value-card--${card.id}`,
        ]"
        :style="{ '--delay': `${40 + i * 40}ms`, '--i': i }"
      >
        <div class="co-value-card__shine" aria-hidden="true" />
        <div class="co-value-card__dots" v-if="card.dots" aria-hidden="true">
          <span v-for="n in 24" :key="n" class="co-value-dot" :style="{ '--n': n }" />
        </div>

        <div class="co-value-card__icon" aria-hidden="true">
          <svg viewBox="0 0 48 48" class="co-value-icon-svg">
            <g v-if="card.art === 'map'">
              <path
                class="co-icon-pin"
                d="M24 8c-5.5 0-10 4.5-10 10 0 7.5 10 18 10 18s10-10.5 10-18c0-5.5-4.5-10-10-10zm0 14a4 4 0 110-8 4 4 0 010 8z"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              />
            </g>
            <g v-else-if="card.art === 'pie'">
              <circle cx="24" cy="24" r="16" fill="none" stroke="currentColor" stroke-width="2" opacity="0.35" />
              <path
                class="co-icon-pie-slice"
                d="M24 24 L24 8 A16 16 0 0 1 38 30 Z"
                fill="currentColor"
                opacity="0.5"
              />
              <path
                class="co-icon-pie-slice co-icon-pie-slice--b"
                d="M24 24 L38 30 A16 16 0 0 1 24 40 Z"
                fill="currentColor"
                opacity="0.75"
              />
            </g>
            <g v-else-if="card.art === 'sync'">
              <path
                class="co-icon-sync-a"
                d="M30 14a12 12 0 00-18 4"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
              />
              <path
                class="co-icon-sync-b"
                d="M18 34a12 12 0 0018-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2.2"
                stroke-linecap="round"
              />
              <polygon points="32,10 32,18 26,14" fill="currentColor" class="co-icon-sync-a" />
              <polygon points="16,38 16,30 22,34" fill="currentColor" class="co-icon-sync-b" />
            </g>
            <g v-else-if="card.art === 'database'">
              <ellipse
                class="co-icon-db-top"
                cx="24"
                cy="14"
                rx="14"
                ry="5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                class="co-icon-db-body"
                d="M10 14v14c0 2.8 6.3 5 14 5s14-2.2 14-5V14"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                class="co-icon-db-mid"
                d="M10 22c0 2.8 6.3 5 14 5s14-2.2 14-5"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                opacity="0.55"
              />
            </g>
            <g v-else-if="card.art === 'trend'">
              <polyline
                class="co-icon-trend-line"
                points="8,34 18,26 26,28 40,12"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <circle class="co-icon-trend-dot" cx="40" cy="12" r="3" fill="currentColor" />
            </g>
            <g v-else-if="card.art === 'shield'">
              <path
                class="co-icon-shield"
                d="M24 6l14 6v12c0 10-6 16-14 18-8-2-14-8-14-18V12z"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
              />
              <path
                class="co-icon-shield-check"
                d="M17 24l5 5 9-10"
                fill="none"
                stroke="currentColor"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        </div>

        <h3 class="co-value-card__title">{{ card.title }}</h3>

        <!-- Покрытие -->
        <template v-if="card.id === 'coverage'">
          <div class="co-value-map-wrap co-card-viz" aria-hidden="true">
            <svg
              class="co-value-map"
              viewBox="0 0 320 180"
              preserveAspectRatio="xMidYMid slice"
              shape-rendering="geometricPrecision"
            >
              <defs>
                <linearGradient :id="uid('map-fill')" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="rgba(22,215,196,0.35)" />
                  <stop offset="100%" stop-color="rgba(124,92,255,0.25)" />
                </linearGradient>
                <filter :id="uid('map-glow')">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <path
                class="co-map-outline"
                :filter="`url(#${uid('map-glow')})`"
                d="M48 92c18-28 42-38 68-32 22 5 38-2 52-18 14-16 34-22 56-14 20 8 36 2 48-12 12-14 28-18 44-10 16 8 24 22 20 38-4 16 8 28 24 32 16 4 22 18 14 32-8 14-26 20-44 16-18-4-32 6-40 22-8 16-24 22-40 14-16-8-28-6-40 4-12 10-28 12-42 4-14-8-22-22-18-38 4-16-2-32 14-44z"
                :fill="`url(#${uid('map-fill')})`"
                stroke="rgba(22,215,196,0.55)"
                stroke-width="1.5"
              />
              <circle
                v-for="(pt, pi) in map_points"
                :key="`n-${pi}`"
                class="co-map-node"
                :cx="pt.x"
                :cy="pt.y"
                r="4"
                fill="#f6c66b"
                :style="{ '--nd': `${pi * 0.4}s` }"
              >
                <animate
                  attributeName="opacity"
                  values="0.45;1;0.45"
                  dur="2.8s"
                  repeatCount="indefinite"
                  :begin="`${pi * 0.35}s`"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1;0.4 0 0.2 1"
                  keyTimes="0;0.5;1"
                />
              </circle>
            </svg>
          </div>
          <p class="co-value-stat co-value-stat--float">{{ card.stat }}</p>
          <p class="co-value-text">{{ card.text }}</p>
        </template>

        <!-- Гранулярность -->
        <template v-else-if="card.id === 'granularity'">
          <p class="co-value-intro">{{ card.intro }}</p>
          <ul class="co-value-list">
            <li
              v-for="(b, bi) in card.bullets"
              :key="bi"
              class="co-value-list-item"
              :style="{ '--bi': bi }"
            >
              {{ b }}
            </li>
          </ul>
          <svg
            class="co-value-mini-chart co-value-mini-chart--pie co-card-viz"
            viewBox="0 0 200 48"
            aria-hidden="true"
            shape-rendering="geometricPrecision"
          >
            <circle cx="24" cy="24" r="18" fill="none" stroke="rgba(124,92,255,0.35)" stroke-width="6" />
            <circle
              class="co-mini-ring co-mini-ring--outer"
              cx="24"
              cy="24"
              r="18"
              fill="none"
              stroke="#7c5cff"
              stroke-width="3"
              stroke-dasharray="28 85"
              stroke-linecap="round"
              transform="rotate(-90 24 24)"
            />
            <circle
              class="co-mini-ring"
              cx="24"
              cy="24"
              r="18"
              fill="none"
              stroke="#16d7c4"
              stroke-width="6"
              stroke-dasharray="72 40"
              stroke-linecap="round"
              transform="rotate(-90 24 24)"
            />
            <rect
              v-for="(h, hi) in [12, 22, 16, 28, 20, 32, 18]"
              :key="hi"
              class="co-mini-bar"
              :x="56 + hi * 18"
              :y="48 - h"
              width="12"
              :height="h"
              rx="4"
              fill="url(#gran-bar)"
              :style="{ '--d': `${hi * 0.12}s` }"
            >
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur="2.4s"
                repeatCount="indefinite"
                :begin="`${hi * 0.15}s`"
              />
            </rect>
            <defs>
              <linearGradient id="gran-bar" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0%" stop-color="#7c5cff" />
                <stop offset="100%" stop-color="#16d7c4" />
              </linearGradient>
            </defs>
          </svg>
        </template>

        <!-- Удобство -->
        <template v-else-if="card.id === 'convenience'">
          <p class="co-value-text co-value-text--lg">{{ card.text }}</p>
          <div class="co-value-server" aria-hidden="true">
            <span class="co-server-core" />
            <span v-for="s in 5" :key="s" class="co-server-blade" :style="{ '--s': s }">
              <span class="co-server-flow" />
            </span>
            <span v-for="p in 6" :key="`p-${p}`" class="co-server-particle" :style="{ '--p': p }" />
          </div>
        </template>

        <!-- Данные -->
        <template v-else-if="card.id === 'data'">
          <p class="co-value-intro">{{ card.intro }}</p>
          <div class="co-value-stats">
            <div v-for="(st, si) in card.stats" :key="si" class="co-value-stat-row">
              <span class="co-value-stat-num" :style="{ '--si': si }">{{ st.value }}</span>
              <span class="co-value-stat-lbl">{{ st.label }}</span>
            </div>
          </div>
          <svg
            class="co-value-mini-chart co-value-mini-chart--data co-card-viz"
            viewBox="0 0 240 56"
            aria-hidden="true"
            shape-rendering="geometricPrecision"
          >
            <rect
              v-for="(h, hi) in data_bars"
              :key="`bg-${hi}`"
              class="co-data-bar co-data-bar--ghost"
              :x="8 + hi * 28"
              y="8"
              width="20"
              height="48"
              rx="5"
              fill="rgba(255,255,255,0.06)"
            />
            <rect
              v-for="(h, hi) in data_bars"
              :key="hi"
              class="co-data-bar"
              :x="8 + hi * 28"
              :y="56 - h"
              width="20"
              :height="h"
              rx="5"
              :fill="hi % 2 ? '#16d7c4' : '#7c5cff'"
              :style="{ '--d': `${hi * 0.12}s` }"
            >
              <animate
                attributeName="opacity"
                values="0.5;1;0.5"
                dur="2.2s"
                repeatCount="indefinite"
                :begin="`${hi * 0.1}s`"
              />
            </rect>
          </svg>
        </template>

        <!-- Точность -->
        <template v-else-if="card.id === 'accuracy'">
          <div class="co-acc-ring-wrap" aria-hidden="true">
            <svg class="co-acc-ring-svg" viewBox="0 0 88 88">
              <circle class="co-acc-ring-track" cx="44" cy="44" r="36" fill="none" />
              <circle class="co-acc-ring-prog" cx="44" cy="44" r="36" fill="none" />
            </svg>
            <p class="co-value-stat co-value-stat--hero co-value-stat--in-ring">{{ card.stat }}</p>
          </div>
          <p class="co-value-text">{{ card.text }}</p>
          <svg
            class="co-value-mini-chart co-value-trend co-card-viz"
            viewBox="0 0 280 72"
            aria-hidden="true"
            shape-rendering="geometricPrecision"
          >
            <defs>
              <linearGradient :id="uid('trend-fill')" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="rgba(22,215,196,0.45)" />
                <stop offset="100%" stop-color="rgba(22,215,196,0)" />
              </linearGradient>
            </defs>
            <g class="co-trend-grid">
              <line
                v-for="gy in 4"
                :key="gy"
                x1="0"
                :y1="gy * 18"
                x2="280"
                :y2="gy * 18"
              />
            </g>
            <path class="co-trend-area" :d="trend_area" :fill="`url(#${uid('trend-fill')})`" />
            <path
              class="co-trend-line"
              :d="trend_line"
              fill="none"
              stroke="#16d7c4"
              stroke-width="2"
              stroke-linecap="round"
              pathLength="100"
              stroke-dasharray="100"
              stroke-dashoffset="0"
            >
              <animate
                attributeName="stroke-dashoffset"
                values="0;18;0"
                dur="4s"
                repeatCount="indefinite"
                calcMode="spline"
                keySplines="0.4 0 0.2 1;0.4 0 0.2 1"
                keyTimes="0;0.5;1"
              />
            </path>
            <circle
              v-for="(p, pi) in trend_points"
              :key="pi"
              class="co-trend-dot"
              :cx="p.x"
              :cy="p.y"
              r="4"
              fill="#f6c66b"
              :style="{ '--d': `${pi * 0.2}s` }"
            />
          </svg>
        </template>

        <!-- Безопасность -->
        <template v-else-if="card.id === 'security'">
          <p class="co-value-text">{{ card.text }}</p>
          <div class="co-value-access" aria-hidden="true">
            <span class="co-access-scan" />
            <svg class="co-access-shield" viewBox="0 0 64 72" aria-hidden="true">
              <path
                class="co-access-shield-shape"
                d="M32 4l22 8v18c0 14-9 24-22 26-13-2-22-12-22-26V12z"
                fill="none"
                stroke="#16d7c4"
                stroke-width="2"
              />
              <path
                class="co-access-shield-check"
                d="M22 36l8 8 14-16"
                fill="none"
                stroke="#f6c66b"
                stroke-width="2.5"
                stroke-linecap="round"
              />
            </svg>
            <span v-for="a in 4" :key="a" class="co-access-row" :style="{ '--a': a }">
              <span class="co-access-avatar" />
              <span class="co-access-bar" />
              <span class="co-access-lock" />
            </span>
          </div>
        </template>
      </article>
    </div>
  </section>
</template>

<script setup>
import { ref, useId } from 'vue'
import { use_component_reveal } from '../application/use_component_reveal'
import { COMPANY_VALUE_CARDS } from '../data/company_value_cards.js'

const root_el = ref(null)
const cards = COMPANY_VALUE_CARDS

use_component_reveal()

const base_id = useId().replace(/[^a-zA-Z0-9]/g, '')
const uid = (suffix) => `cv-${base_id}-${suffix}`

const map_points = [
  { x: 72, y: 78 },
  { x: 118, y: 62 },
  { x: 158, y: 88 },
  { x: 198, y: 54 },
  { x: 248, y: 72 },
  { x: 132, y: 108 },
  { x: 188, y: 118 },
]

const data_bars = [18, 32, 24, 40, 28, 44, 36, 48]

const trend_points = [
  { x: 8, y: 52 },
  { x: 48, y: 44 },
  { x: 88, y: 48 },
  { x: 128, y: 32 },
  { x: 168, y: 36 },
  { x: 208, y: 22 },
  { x: 248, y: 18 },
  { x: 272, y: 14 },
]

const trend_line = trend_points
  .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`)
  .join(' ')

const trend_area = `${trend_line} L272,72 L8,72 Z`
</script>

<style scoped>
.co-values {
  position: relative;
  padding: 56px 0 64px;
  overflow: hidden;
}

.co-values-ambient {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.co-values-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(70px);
  opacity: 0.45;
}

.co-values-orb--a {
  width: 420px;
  height: 420px;
  top: -120px;
  left: -80px;
  background: rgba(124, 92, 255, 0.22);
  animation: co-values-orb-a 18s ease-in-out infinite;
}

.co-values-orb--b {
  width: 360px;
  height: 360px;
  bottom: -100px;
  right: -60px;
  background: rgba(22, 215, 196, 0.18);
  animation: co-values-orb-b 14s ease-in-out infinite;
}

@keyframes co-values-orb-a {
  0%,
  100% {
    transform: translate(0, 0);
    opacity: 0.4;
  }
  50% {
    transform: translate(4%, 3%);
    opacity: 0.55;
  }
}

@keyframes co-values-orb-b {
  0%,
  100% {
    transform: translate(0, 0);
    opacity: 0.35;
  }
  50% {
    transform: translate(-3%, -4%);
    opacity: 0.5;
  }
}

.co-values-head {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 820px;
  margin: 0 auto 36px;
}

.co-values-head h2 {
  margin: 0 0 14px;
  font-family: var(--font-main);
  font-size: clamp(28px, 3vw, 38px);
  font-weight: 700;
  letter-spacing: -0.03em;
  color: #eef8ff;
}

.co-values-lead {
  margin: 0;
  font-size: 17px;
  line-height: 1.55;
  color: var(--text-soft);
}

.co-values-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

.co-value-card {
  position: relative;
  min-height: 240px;
  padding: 22px 22px 20px;
  border-radius: var(--radius-card);
  border: 1px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition:
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.45s ease;
}


.co-value-card:hover {
  transform: translateY(-4px);
}

.co-value-card--glass {
  background: linear-gradient(155deg, rgba(22, 36, 62, 0.92) 0%, rgba(14, 24, 44, 0.96) 100%);
  box-shadow: var(--shadow-card);
  color: #eef8ff;
}

.co-value-card--accent {
  background: linear-gradient(145deg, rgba(30, 58, 120, 0.85) 0%, rgba(16, 36, 73, 0.92) 55%, rgba(124, 92, 255, 0.35) 100%);
  border-color: rgba(22, 215, 196, 0.28);
  box-shadow:
    0 24px 56px rgba(0, 0, 0, 0.32),
    0 0 40px rgba(22, 215, 196, 0.08);
  color: #f4f8ff;
}

.co-value-card__shine {
  position: absolute;
  inset: -40% -20%;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.12) 50%,
    transparent 60%
  );
  transform: translateX(-120%) skewX(-12deg);
  pointer-events: none;
}

.co-value-card .co-value-card__shine {
  opacity: 0.4;
  animation: co-value-shine 5s linear infinite;
  animation-delay: calc(var(--i, 0) * 0.85s);
}

@keyframes co-value-shine {
  0% {
    transform: translateX(-140%) skewX(-8deg);
  }
  100% {
    transform: translateX(140%) skewX(-8deg);
  }
}

.co-value-card__dots {
  position: absolute;
  right: 14px;
  bottom: 14px;
  display: grid;
  grid-template-columns: repeat(6, 5px);
  gap: 5px;
  opacity: 0.35;
}

.co-value-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(246, 198, 107, 0.85);
}

.co-value-card .co-value-dot {
  animation: co-dot-blink 3.2s var(--motion-ease, ease-in-out) infinite;
  animation-delay: calc(var(--n) * 0.1s);
}

@keyframes co-dot-blink {
  0%,
  100% {
    opacity: 0.35;
  }
  50% {
    opacity: 0.85;
  }
}

.co-value-card__icon {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 44px;
  height: 44px;
  color: rgba(238, 248, 255, 0.75);
}

.co-value-card--glass .co-value-card__icon {
  color: rgba(22, 215, 196, 0.9);
}

.co-value-icon-svg {
  width: 100%;
  height: 100%;
}

.co-value-card .co-icon-sync-a {
  animation: co-sync-spin 8s linear infinite;
  transform-origin: 24px 24px;
}

.co-value-card .co-icon-sync-b {
  animation: co-sync-spin 8s linear infinite reverse;
  transform-origin: 24px 24px;
}

@keyframes co-sync-spin {
  to {
    transform: rotate(360deg);
  }
}


.co-value-card .co-icon-trend-line {
  stroke-dasharray: 120;
  animation: co-trend-draw 3s ease-in-out infinite;
}

@keyframes co-trend-draw {
  0%,
  100% {
    stroke-dashoffset: 120;
    opacity: 0.7;
  }
  50% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

.co-value-card .co-icon-trend-dot {
  animation: co-pulse-dot 1.8s ease-in-out infinite;
}

.co-value-card .co-icon-shield {
  animation: co-shield-glow 2.6s ease-in-out infinite;
}

.co-value-card .co-icon-shield-check {
  stroke-dasharray: 40;
  animation: co-check-draw 2.4s ease-in-out infinite;
}

@keyframes co-check-draw {
  0%,
  100% {
    stroke-dashoffset: 40;
    opacity: 0.5;
  }
  50% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

@keyframes co-shield-glow {
  0%,
  100% {
    filter: drop-shadow(0 0 0 rgba(22, 215, 196, 0));
  }
  50% {
    filter: drop-shadow(0 0 8px rgba(22, 215, 196, 0.65));
  }
}

.co-value-card__title {
  margin: 0;
  font-family: var(--font-main);
  font-size: 1.125rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  position: relative;
  z-index: 1;
  padding-right: 48px;
}

.co-card-viz {
  shape-rendering: geometricPrecision;
}

.co-value-map-wrap {
  position: absolute;
  inset: 0;
  opacity: 0.65;
  pointer-events: none;
  overflow: hidden;
}

.co-value-map {
  width: 100%;
  height: 100%;
}

.co-value-card .co-map-outline {
  animation: co-map-breathe 4s var(--motion-ease, ease-in-out) infinite;
}

@keyframes co-map-breathe {
  0%,
  100% {
    opacity: 0.72;
  }
  50% {
    opacity: 1;
  }
}

.co-value-stat {
  margin: auto 0 0;
  font-family: var(--font-main);
  font-size: clamp(32px, 3.2vw, 44px);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.03em;
  line-height: 1;
  color: #f6c66b;
  position: relative;
  z-index: 1;
}

.co-value-stat--hero {
  font-size: clamp(36px, 3.5vw, 44px);
}

.co-value-text {
  margin: 0;
  font-family: var(--font-main);
  font-size: 15px;
  font-weight: 400;
  line-height: 1.55;
  color: rgba(238, 248, 255, 0.9);
  position: relative;
  z-index: 1;
}

.co-value-text--lg {
  font-size: 16px;
  max-width: 92%;
}

.co-value-intro {
  margin: 0;
  font-size: 14px;
  color: var(--text-soft);
  position: relative;
  z-index: 1;
}

.co-value-list {
  margin: 0;
  padding: 0 0 0 18px;
  font-size: 14px;
  line-height: 1.45;
  color: #d8e4f8;
  position: relative;
  z-index: 1;
}

.co-value-list-item {
  margin-bottom: 6px;
}

.co-value-stats {
  display: grid;
  gap: 12px;
  position: relative;
  z-index: 1;
}

.co-value-stat-row {
  display: grid;
  gap: 2px;
}

.co-value-stat-num {
  font-family: var(--font-main);
  font-size: clamp(26px, 2.4vw, 32px);
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  letter-spacing: -0.03em;
  color: #16d7c4;
  display: inline-block;
}

.co-acc-ring-wrap {
  position: relative;
  width: 88px;
  height: 88px;
  margin: 8px 0 4px;
  z-index: 1;
}

.co-acc-ring-svg {
  width: 100%;
  height: 100%;
}

.co-acc-ring-track {
  stroke: rgba(255, 255, 255, 0.12);
  stroke-width: 6;
}

.co-acc-ring-prog {
  stroke: #16d7c4;
  stroke-width: 6;
  stroke-linecap: round;
  stroke-dasharray: 226;
  stroke-dashoffset: 5;
  transform: rotate(-90deg);
  transform-origin: 44px 44px;
}

.co-value-card .co-acc-ring-prog {
  animation: co-acc-ring-pulse 3.2s var(--motion-ease, ease-in-out) infinite;
}

@keyframes co-acc-ring-pulse {
  0%,
  100% {
    stroke-dashoffset: 18;
    opacity: 0.85;
  }
  50% {
    stroke-dashoffset: 4;
    opacity: 1;
  }
}

.co-value-stat--in-ring {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0;
  font-family: var(--font-main);
  font-size: 1.35rem !important;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  color: #eef8ff;
}

.co-value-stat-lbl {
  font-size: 14px;
  color: var(--text-soft);
}

.co-value-mini-chart {
  display: block;
  width: 100%;
  height: 48px;
  margin-top: auto;
  position: relative;
  z-index: 1;
}

.co-value-mini-chart--pie {
  height: 52px;
}

.co-value-card :deep(.co-mini-bar),
.co-value-card :deep(.co-data-bar:not(.co-data-bar--ghost)) {
  animation: co-bar-opacity 2.8s var(--motion-ease, cubic-bezier(0.4, 0, 0.2, 1)) infinite;
  animation-delay: var(--d, 0s);
}

@keyframes co-bar-opacity {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}

.co-value-card :deep(.co-mini-ring) {
  animation: co-ring-dash 6s var(--motion-ease, cubic-bezier(0.4, 0, 0.2, 1)) infinite;
}

.co-value-card :deep(.co-mini-ring--outer) {
  animation: co-ring-dash 8s var(--motion-ease, cubic-bezier(0.4, 0, 0.2, 1)) infinite reverse;
}

@keyframes co-ring-dash {
  0%,
  100% {
    stroke-dashoffset: 0;
    opacity: 0.78;
  }
  50% {
    stroke-dashoffset: 12;
    opacity: 1;
  }
}

.co-value-server {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: auto;
  position: relative;
  z-index: 1;
  min-height: 72px;
  padding: 8px 0;
}

.co-server-core {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 28px;
  height: 28px;
  margin: -14px 0 0 -14px;
  border-radius: 50%;
  border: 2px solid rgba(22, 215, 196, 0.5);
  box-shadow: 0 0 20px rgba(22, 215, 196, 0.35);
}

.co-value-card .co-server-core {
  animation: co-core-pulse 3.6s var(--motion-ease, cubic-bezier(0.4, 0, 0.2, 1)) infinite;
}

@keyframes co-core-pulse {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}

.co-server-blade {
  position: relative;
  display: block;
  height: 10px;
  border-radius: 6px;
  background: linear-gradient(90deg, rgba(22, 215, 196, 0.35), rgba(124, 92, 255, 0.5));
  overflow: hidden;
}

.co-value-card .co-server-blade {
  animation: co-server-pulse 3s var(--motion-ease, cubic-bezier(0.4, 0, 0.2, 1)) infinite;
  animation-delay: calc(var(--s) * 0.2s);
}

.co-server-flow {
  position: absolute;
  inset: 0 auto 0 -40%;
  width: 35%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.55), transparent);
  opacity: 0;
}

.co-value-card .co-server-flow {
  animation: co-flow-sweep 2.2s ease-in-out infinite;
  animation-delay: calc(var(--s) * 0.22s);
}

@keyframes co-flow-sweep {
  0% {
    left: -40%;
    opacity: 0;
  }
  30% {
    opacity: 1;
  }
  100% {
    left: 110%;
    opacity: 0;
  }
}

.co-server-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #f6c66b;
  opacity: 0;
  left: 8%;
  top: 20%;
}

.co-value-card .co-server-particle {
  animation: co-particle-fly 3.5s ease-in-out infinite;
  animation-delay: calc(var(--p) * 0.4s);
}

@keyframes co-particle-fly {
  0% {
    opacity: 0;
    transform: translate(0, 0) scale(0.5);
  }
  20% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(180px, -40px) scale(0.2);
  }
}

@keyframes co-server-pulse {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}

.co-value-trend {
  height: 72px;
}

.co-trend-grid line {
  stroke: rgba(255, 255, 255, 0.06);
  stroke-width: 1;
}

.co-value-card .co-trend-grid line {
  animation: co-grid-fade 3s ease-in-out infinite;
}

@keyframes co-grid-fade {
  0%,
  100% {
    opacity: 0.4;
  }
  50% {
    opacity: 1;
  }
}

.co-value-card .co-trend-area {
  animation: co-area-breathe 4s ease-in-out infinite;
}

@keyframes co-area-breathe {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 0.9;
  }
}

.co-value-card :deep(.co-trend-line) {
  animation: co-trend-line-flow 4.5s var(--motion-ease, cubic-bezier(0.4, 0, 0.2, 1)) infinite;
}

@keyframes co-trend-line-flow {
  0%,
  100% {
    stroke-dashoffset: 0;
    opacity: 0.9;
  }
  50% {
    stroke-dashoffset: 12;
    opacity: 1;
  }
}

.co-value-card :deep(.co-trend-dot) {
  animation: co-pulse-dot 3s var(--motion-ease, cubic-bezier(0.4, 0, 0.2, 1)) infinite;
  animation-delay: var(--d, 0s);
}

@keyframes co-pulse-dot {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}

.co-value-access {
  display: grid;
  grid-template-columns: 56px 1fr;
  gap: 8px 12px;
  margin-top: auto;
  position: relative;
  align-items: start;
}

.co-access-shield {
  grid-row: 1 / span 5;
  width: 52px;
  height: auto;
}

.co-value-card .co-access-shield-shape {
  animation: co-shield-glow 2.6s ease-in-out infinite;
}

.co-value-card .co-access-shield-check {
  stroke-dasharray: 48;
  animation: co-check-draw 2.2s ease-in-out infinite;
}

.co-access-scan {
  position: absolute;
  left: 56px;
  right: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, #16d7c4, transparent);
  opacity: 0;
  pointer-events: none;
}

.co-value-card .co-access-scan {
  animation: co-scan-move 3.5s ease-in-out infinite;
}

@keyframes co-scan-move {
  0% {
    top: 0;
    opacity: 0;
  }
  15% {
    opacity: 0.9;
  }
  85% {
    opacity: 0.9;
  }
  100% {
    top: 100%;
    opacity: 0;
  }
}

.co-access-row {
  display: flex;
  align-items: center;
  gap: 10px;
  grid-column: 2;
}

.co-access-avatar {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: linear-gradient(135deg, #7c5cff, #16d7c4);
  flex-shrink: 0;
}

.co-value-card .co-access-avatar {
  animation: co-avatar-pulse 3.2s var(--motion-ease, cubic-bezier(0.4, 0, 0.2, 1)) infinite;
  animation-delay: calc(var(--a) * 0.25s);
}

@keyframes co-avatar-pulse {
  0%,
  100% {
    opacity: 0.55;
  }
  50% {
    opacity: 1;
  }
}

.co-access-bar {
  flex: 1;
  height: 8px;
  border-radius: 4px;
  background: rgba(124, 92, 255, 0.35);
  transform-origin: left;
}

.co-value-card .co-access-bar {
  animation: co-access-fill 3.2s var(--motion-ease, cubic-bezier(0.4, 0, 0.2, 1)) infinite;
  animation-delay: calc(var(--a) * 0.25s);
}

@keyframes co-access-fill {
  0%,
  100% {
    opacity: 0.45;
  }
  50% {
    opacity: 1;
  }
}

.co-access-lock {
  width: 14px;
  height: 14px;
  border-radius: 4px;
  border: 2px solid #16d7c4;
  box-shadow: 0 0 12px rgba(22, 215, 196, 0.45);
}

.co-value-card .co-access-lock {
  animation: co-lock-blink 2s ease-in-out infinite;
  animation-delay: calc(var(--a) * 0.15s);
}

@keyframes co-lock-blink {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}

@media (max-width: 1024px) {
  .co-values-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .co-values-grid {
    grid-template-columns: 1fr;
  }

  .co-value-card {
    min-height: 200px;
  }
}

.co-value-card--coverage {
  box-shadow:
    0 24px 56px rgba(0, 0, 0, 0.32),
    0 0 48px rgba(22, 215, 196, 0.12);
}

.co-value-card--granularity .co-value-mini-chart--pie {
  filter: drop-shadow(0 0 14px rgba(124, 92, 255, 0.35));
}

.co-values .co-value-card,
.co-values .co-value-card :deep(*) {
  animation-play-state: running !important;
  animation-iteration-count: infinite !important;
}
</style>

