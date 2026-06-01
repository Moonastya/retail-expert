<template>
  <article
    ref="root_el"
    :id="`product-${product.id}`"
    class="rex-product"
    :class="{
      'rex-product--accent': accent,
      'rex-product--live': live,
      'rex-product--entered': entered,
    }"
    :style="{ '--delay': delay }"
  >
    <div class="rex-product__layout">
      <aside class="rex-product__aside">
        <span class="rex-product__aside-shine" aria-hidden="true" />
        <span class="rex-product__aside-glow" aria-hidden="true" />

        <h3 class="rex-product__title rex-product__anim" style="--inner-d: 80ms">
          {{ product.title }}
        </h3>
        <p class="rex-product__tagline rex-product__anim" style="--inner-d: 140ms">
          {{ product.tagline }}
        </p>
        <p class="rex-product__intro rex-product__anim" style="--inner-d: 200ms">
          {{ product.intro }}
        </p>

        <ol v-if="product.highlights?.length" class="rex-product__highlights">
          <li
            v-for="(item, hi) in product.highlights"
            :key="hi"
            class="rex-product__anim"
            :style="{ '--inner-d': `${260 + hi * 90}ms` }"
          >
            {{ item }}
          </li>
        </ol>

        <div v-if="product.tags?.length" class="rex-product__tags">
          <span
            v-for="(tag, ti) in product.tags"
            :key="tag"
            class="rex-product__tag rex-product__anim"
            :style="{ '--inner-d': `${420 + ti * 70}ms`, '--pulse-d': `${ti * 0.35}s` }"
          >
            {{ tag }}
          </span>
        </div>

        <div v-if="product.outcomes?.length" class="rex-product__outcomes">
          <span
            v-for="(out, oi) in product.outcomes"
            :key="out"
            class="rex-product__outcome rex-product__anim"
            :style="{ '--inner-d': `${500 + oi * 100}ms` }"
          >
            {{ out }}
          </span>
        </div>

        <div v-if="product.partners?.length" class="rex-product__partners rex-product__anim" style="--inner-d: 560ms">
          <p class="rex-product__partners-label">Источники и партнёры</p>
          <div class="rex-product__partners-grid">
            <span
              v-for="(p, pi) in product.partners"
              :key="p"
              class="rex-product__anim"
              :style="{ '--inner-d': `${620 + pi * 45}ms` }"
            >
              {{ p }}
            </span>
          </div>
        </div>

        <div class="rex-product__viz rex-product__anim" style="--inner-d: 380ms" aria-hidden="true">
          <ProductIllustration
            :product_id="product.id"
            :aria_label="`Схема: ${product.title}`"
            :active="live || entered"
            decorative
          />
        </div>

        <div class="rex-product__aside-actions">
          <RouterLink v-if="product.link" class="btn btn-outline rex-product__link" :to="product.link">
            Подробнее
          </RouterLink>
          <button class="btn rex-product__btn" type="button" @click="open_request_modal">
            Обсудить модуль
          </button>
        </div>
      </aside>

      <div class="rex-product__main">
        <div class="rex-product__row rex-product__row--top">
          <section class="rex-product__card rex-product__anim" style="--inner-d: 240ms">
            <span class="rex-product__card-shine" aria-hidden="true" />
            <h4>Какие данные в основе продукта</h4>
            <ul>
              <li
                v-for="(row, ri) in product.data_basis"
                :key="row"
                class="rex-product__anim"
                :style="{ '--inner-d': `${320 + ri * 75}ms` }"
              >
                {{ row }}
              </li>
            </ul>
          </section>

          <section class="rex-product__card rex-product__anim" style="--inner-d: 320ms">
            <span class="rex-product__card-shine" aria-hidden="true" />
            <h4>Какие показатели доступны</h4>
            <template v-if="product.kpi_groups?.length">
              <div
                v-for="(group, gi) in product.kpi_groups"
                :key="group.title"
                class="rex-product__kpi-group rex-product__anim"
                :style="{ '--inner-d': `${400 + gi * 100}ms` }"
              >
                <p class="rex-product__kpi-title">{{ group.title }}</p>
                <ul class="rex-product__kpi-list">
                  <li
                    v-for="(item, ki) in group.items"
                    :key="item"
                    class="rex-product__anim"
                    :style="{ '--inner-d': `${460 + gi * 100 + ki * 50}ms` }"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </template>
          </section>
        </div>

        <section class="rex-product__card rex-product__card--wide rex-product__anim" style="--inner-d: 400ms">
          <span class="rex-product__card-shine" aria-hidden="true" />
          <h4>
            {{ product.workflow_models ? 'Как это работает (2 аналитические модели)' : 'Как это работает' }}
          </h4>

          <div v-if="product.workflow_models" class="rex-product__models">
            <article
              v-for="(model, mi) in product.workflow_models"
              :key="model.title"
              class="rex-product__model rex-product__anim"
              :style="{ '--inner-d': `${480 + mi * 120}ms` }"
            >
              <h5>{{ model.title }}</h5>
              <p>{{ model.text }}</p>
            </article>
          </div>

          <ol v-else-if="product.workflow?.length" class="rex-product__steps">
            <li
              v-for="(step, si) in product.workflow"
              :key="si"
              class="rex-product__anim"
              :style="{ '--inner-d': `${440 + si * 95}ms` }"
            >
              <span class="rex-product__step-num">{{ si + 1 }}</span>
              <span>{{ step }}</span>
            </li>
          </ol>

          <p
            v-if="product.workflow_note"
            class="rex-product__note rex-product__anim"
            style="--inner-d: 720ms"
          >
            {{ product.workflow_note }}
          </p>

          <div v-if="product.workflow_columns?.length" class="rex-product__cols">
            <div
              v-for="(col, ci) in product.workflow_columns"
              :key="col.title"
              class="rex-product__col rex-product__anim"
              :style="{ '--inner-d': `${560 + ci * 110}ms` }"
            >
              <h5>{{ col.title }}</h5>
              <ul>
                <li
                  v-for="(item, ii) in col.items"
                  :key="item"
                  class="rex-product__anim"
                  :style="{ '--inner-d': `${600 + ci * 110 + ii * 55}ms` }"
                >
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>

          <div
            v-if="product.workflow_outputs?.length"
            class="rex-product__outputs rex-product__anim"
            style="--inner-d: 640ms"
          >
            <p class="rex-product__outputs-label">Результат</p>
            <ul>
              <li
                v-for="(out, oi) in product.workflow_outputs"
                :key="out"
                class="rex-product__anim"
                :style="{ '--inner-d': `${700 + oi * 80}ms` }"
              >
                {{ out }}
              </li>
            </ul>
          </div>

          <div
            v-if="product.workflow_types?.length"
            class="rex-product__cols rex-product__cols--types"
          >
            <div class="rex-product__col rex-product__anim" style="--inner-d: 520ms">
              <h5>Форматы исследований</h5>
              <ul>
                <li
                  v-for="(t, ti) in product.workflow_types"
                  :key="t"
                  class="rex-product__anim"
                  :style="{ '--inner-d': `${560 + ti * 70}ms` }"
                >
                  {{ t }}
                </li>
              </ul>
            </div>
            <div
              v-if="product.workflow_examples?.length"
              class="rex-product__col rex-product__anim"
              style="--inner-d: 600ms"
            >
              <h5>Примеры исследований</h5>
              <ul>
                <li
                  v-for="(ex, ei) in product.workflow_examples"
                  :key="ex"
                  class="rex-product__anim"
                  :style="{ '--inner-d': `${640 + ei * 70}ms` }"
                >
                  {{ ex }}
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  </article>
</template>

<script setup>
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import ProductIllustration from './ProductIllustration.vue'
import { open_request_modal } from '../application/request_modal'

const root_el = ref(null)
const live = ref(false)
const entered = ref(false)

let observer = null

function sync_live(is_intersecting) {
  live.value = is_intersecting
  if (is_intersecting) {
    entered.value = true
  }
}

onMounted(() => {
  nextTick(() => {
    const el = root_el.value
    if (!el) {
      entered.value = true
      return
    }

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      sync_live(true)
    }

    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          sync_live(entry.isIntersecting)
        }
      },
      { threshold: 0.04, rootMargin: '0px 0px 8% 0px' },
    )
    observer.observe(el)
  })
})

onUnmounted(() => {
  observer?.disconnect()
})

defineProps({
  product: {
    type: Object,
    required: true,
  },
  accent: {
    type: Boolean,
    default: false,
  },
  delay: {
    type: String,
    default: '0ms',
  },
})
</script>

<style scoped>
.rex-product {
  margin-bottom: 32px;
}

.rex-product__layout {
  display: grid;
  grid-template-columns: minmax(260px, 320px) minmax(0, 1fr);
  gap: 22px;
  align-items: stretch;
}

/* Контент всегда виден; каскад — один раз при первом появлении в экране */
.rex-product__anim {
  opacity: 1;
  transform: translateY(0);
}

.rex-product--entered .rex-product__anim {
  animation: rex-inner-in 0.75s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: var(--inner-d, 0ms);
}

@keyframes rex-inner-in {
  from {
    opacity: 0;
    transform: translateY(18px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.rex-product__aside {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 28px 26px 24px;
  border-radius: var(--radius-card, 22px);
  border: 1px solid rgba(22, 215, 196, 0.22);
  background: linear-gradient(
    165deg,
    rgba(26, 48, 96, 0.95) 0%,
    rgba(14, 28, 52, 0.98) 55%,
    rgba(10, 18, 36, 1) 100%
  );
  box-shadow:
    0 24px 56px rgba(0, 0, 0, 0.35),
    0 0 40px rgba(22, 215, 196, 0.06);
  color: #eef8ff;
  overflow: hidden;
  transition:
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.45s ease,
    border-color 0.45s ease;
}

.rex-product--live .rex-product__aside:hover {
  transform: translateY(-3px);
  border-color: rgba(22, 215, 196, 0.45);
  box-shadow:
    0 32px 64px rgba(0, 0, 0, 0.4),
    0 0 56px rgba(22, 215, 196, 0.14);
}

.rex-product__aside-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    110deg,
    transparent 0%,
    transparent 40%,
    rgba(255, 255, 255, 0.14) 50%,
    transparent 60%,
    transparent 100%
  );
  background-size: 220% 100%;
  pointer-events: none;
  opacity: 0;
}

.rex-product__aside-glow {
  position: absolute;
  top: -40%;
  right: -30%;
  width: 70%;
  height: 80%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(22, 215, 196, 0.2) 0%, transparent 70%);
  pointer-events: none;
  animation: rex-aside-orb 9s ease-in-out infinite;
}

.rex-product--live .rex-product__aside-shine {
  opacity: 1;
  animation: rex-shine-sweep 3.2s ease-in-out infinite;
}

@keyframes rex-shine-sweep {
  0% {
    background-position: 120% 0;
  }
  100% {
    background-position: -120% 0;
  }
}

@keyframes rex-aside-orb {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
    opacity: 0.5;
  }
  50% {
    transform: translate(-6%, 8%) scale(1.08);
    opacity: 0.85;
  }
}

.rex-product--accent .rex-product__aside {
  border-color: rgba(124, 92, 255, 0.35);
  background: linear-gradient(
    155deg,
    rgba(30, 58, 120, 0.92) 0%,
    rgba(16, 36, 73, 0.96) 50%,
    rgba(8, 14, 28, 1) 100%
  );
}

.rex-product__aside > :not(.rex-product__aside-shine):not(.rex-product__aside-glow) {
  position: relative;
  z-index: 1;
}

.rex-product__card > :not(.rex-product__card-shine) {
  position: relative;
  z-index: 1;
}

.rex-product__title {
  margin: 0;
  font-size: clamp(26px, 2.4vw, 34px);
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.rex-product__tagline {
  margin: 0;
  font-size: 15px;
  font-weight: 600;
  color: rgba(22, 215, 196, 0.9);
}

.rex-product__intro {
  margin: 0;
  font-size: 14px;
  line-height: 1.55;
  color: rgba(168, 184, 212, 0.92);
}

.rex-product__highlights {
  margin: 0;
  padding: 0 0 0 18px;
  display: grid;
  gap: 8px;
  font-size: 13px;
  line-height: 1.45;
  color: rgba(238, 248, 255, 0.88);
}

.rex-product__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.rex-product__tag {
  padding: 6px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.22);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: rgba(238, 248, 255, 0.9);
  transition:
    transform 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
}

.rex-product--live .rex-product__tag {
  animation:
    rex-inner-in 0.75s cubic-bezier(0.22, 1, 0.36, 1) both,
    rex-tag-pulse 2.8s ease-in-out infinite;
  animation-delay: var(--inner-d, 0ms), calc(var(--inner-d, 0ms) + 0.8s + var(--pulse-d, 0s));
}

.rex-product--live .rex-product__tag:hover {
  transform: translateY(-2px) scale(1.04);
  border-color: rgba(22, 215, 196, 0.5);
  box-shadow: 0 0 16px rgba(22, 215, 196, 0.25);
}

@keyframes rex-tag-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 rgba(22, 215, 196, 0);
  }
  50% {
    box-shadow: 0 0 14px rgba(22, 215, 196, 0.2);
  }
}

.rex-product__outcomes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.rex-product__outcome {
  padding: 9px 14px;
  border-radius: 999px;
  border: 1px solid rgba(22, 215, 196, 0.28);
  background: rgba(10, 18, 36, 0.92);
  font-size: 13px;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0.01em;
  color: #eef8ff;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

.rex-product--live .rex-product__outcome {
  animation:
    rex-inner-in 0.75s cubic-bezier(0.22, 1, 0.36, 1) both,
    rex-outcome-glow 2.4s ease-in-out infinite;
  animation-delay: var(--inner-d, 0ms), calc(var(--inner-d, 0ms) + 0.6s);
}

@keyframes rex-outcome-glow {
  0%,
  100% {
    border-color: rgba(22, 215, 196, 0.28);
    box-shadow: 0 0 0 rgba(22, 215, 196, 0);
  }
  50% {
    border-color: rgba(22, 215, 196, 0.5);
    box-shadow: 0 0 14px rgba(22, 215, 196, 0.16);
  }
}

.rex-product__partners-label {
  margin: 4px 0 6px;
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: rgba(168, 184, 212, 0.75);
}

.rex-product__partners-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 6px 10px;
  font-size: 11px;
  color: rgba(238, 248, 255, 0.75);
}

.rex-product__partners-grid span {
  padding: 4px 8px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.06);
  transition:
    background 0.25s ease,
    transform 0.25s ease;
}

.rex-product--live .rex-product__partners-grid span:hover {
  background: rgba(22, 215, 196, 0.15);
  transform: translateY(-1px);
}

.rex-product__viz {
  margin-top: auto;
  opacity: 1;
  min-height: 190px;
}

.rex-product__viz :deep(.product-illus) {
  margin-bottom: 0;
}

.rex-product__viz :deep(.product-illus__svg) {
  min-height: 180px;
}

.rex-product__aside-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}

.rex-product__aside-actions .btn-outline.rex-product__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 132px;
  padding: 11px 20px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: #f6c66b !important;
  background: rgba(255, 255, 255, 0.05) !important;
  border: 1px solid rgba(246, 198, 107, 0.55) !important;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.06) inset;
  transition:
    color 0.25s ease,
    border-color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.25s ease,
    transform 0.25s ease;
}

.rex-product__aside-actions .btn-outline.rex-product__link:hover {
  color: #fff !important;
  border-color: #16d7c4 !important;
  background: rgba(22, 215, 196, 0.14) !important;
  box-shadow: 0 0 22px rgba(22, 215, 196, 0.22);
  transform: translateY(-1px);
}

.rex-product__btn {
  font-size: 11px;
}

.rex-product__main {
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
}

.rex-product__row--top {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
}

.rex-product__card {
  position: relative;
  overflow: hidden;
  padding: 22px 24px 20px;
  border-radius: var(--radius-card, 22px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(
    155deg,
    rgba(22, 36, 62, 0.88) 0%,
    rgba(14, 24, 44, 0.94) 100%
  );
  box-shadow: var(--shadow-card, 0 20px 48px rgba(0, 0, 0, 0.28));
  color: #eef8ff;
  transition:
    transform 0.4s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.4s ease,
    box-shadow 0.4s ease;
}

.rex-product--live .rex-product__card:hover {
  transform: translateY(-3px);
  border-color: rgba(22, 215, 196, 0.35);
  box-shadow:
    0 28px 56px rgba(0, 0, 0, 0.35),
    0 0 32px rgba(22, 215, 196, 0.1);
}

.rex-product__card-shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 38%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 62%
  );
  transform: translateX(-130%) skewX(-10deg);
  pointer-events: none;
}

.rex-product--live .rex-product__card:hover .rex-product__card-shine {
  animation: rex-card-shine 1.4s ease;
}

@keyframes rex-card-shine {
  to {
    transform: translateX(130%) skewX(-10deg);
  }
}

.rex-product__card h4 {
  margin: 0 0 14px;
  font-size: 1.05rem;
  font-weight: 700;
  color: #16d7c4;
  letter-spacing: -0.01em;
}

.rex-product__card ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 10px;
}

.rex-product__card > ul > li {
  position: relative;
  padding-left: 16px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-soft, #a8b8d4);
}

.rex-product__card > ul > li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.55em;
  width: 6px;
  height: 6px;
  border-radius: 2px;
  background: linear-gradient(135deg, #7c5cff, #16d7c4);
  transition: transform 0.3s ease;
}

.rex-product--live .rex-product__card > ul > li:hover::before {
  transform: scale(1.35);
  box-shadow: 0 0 8px rgba(22, 215, 196, 0.5);
}

.rex-product__kpi-group + .rex-product__kpi-group {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.rex-product__kpi-title {
  margin: 0 0 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(22, 215, 196, 0.85);
}

.rex-product__kpi-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 8px;
}

.rex-product__kpi-list li {
  padding: 4px 10px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  font-size: 12px;
  color: #d4e2f4;
  transition:
    transform 0.25s ease,
    background 0.25s ease;
}

.rex-product--live .rex-product__kpi-list li:hover {
  transform: translateY(-2px);
  background: rgba(22, 215, 196, 0.18);
}

.rex-product__card--wide h4 {
  margin-bottom: 18px;
}

.rex-product__steps {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 12px;
}

.rex-product__steps li {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--text-soft, #a8b8d4);
}

.rex-product__step-num {
  flex-shrink: 0;
  width: 28px;
  height: 28px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background: linear-gradient(135deg, rgba(124, 92, 255, 0.35), rgba(22, 215, 196, 0.35));
  border: 1px solid rgba(22, 215, 196, 0.35);
  font-size: 12px;
  font-weight: 700;
  color: #eef8ff;
}

.rex-product--live .rex-product__steps li {
  transition: transform 0.3s ease;
}

.rex-product--live .rex-product__steps li:hover {
  transform: translateX(4px);
}

.rex-product--live .rex-product__step-num {
  animation: rex-step-pulse 2.2s ease-in-out infinite;
  animation-delay: calc(var(--inner-d, 0ms) + 0.5s);
}

@keyframes rex-step-pulse {
  0%,
  100% {
    box-shadow: 0 0 0 rgba(22, 215, 196, 0);
    transform: scale(1);
  }
  50% {
    box-shadow: 0 0 12px rgba(22, 215, 196, 0.45);
    transform: scale(1.06);
  }
}

.rex-product__note {
  margin: 16px 0 0;
  padding: 12px 14px;
  border-radius: 12px;
  background: rgba(22, 215, 196, 0.08);
  border: 1px solid rgba(22, 215, 196, 0.2);
  font-size: 13px;
  line-height: 1.5;
  color: #b8d4e8;
}

.rex-product--live .rex-product__note {
  animation:
    rex-inner-in 0.75s cubic-bezier(0.22, 1, 0.36, 1) both,
    rex-note-glow 3s ease-in-out infinite;
  animation-delay: var(--inner-d, 0ms), calc(var(--inner-d, 0ms) + 0.5s);
}

@keyframes rex-note-glow {
  0%,
  100% {
    border-color: rgba(22, 215, 196, 0.2);
  }
  50% {
    border-color: rgba(22, 215, 196, 0.45);
    box-shadow: 0 0 20px rgba(22, 215, 196, 0.12);
  }
}

.rex-product__models {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}

.rex-product__model {
  padding: 16px 18px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition:
    transform 0.35s ease,
    border-color 0.35s ease,
    box-shadow 0.35s ease;
}

.rex-product--live .rex-product__model {
  animation:
    rex-inner-in 0.75s cubic-bezier(0.22, 1, 0.36, 1) both,
    rex-model-float 4s ease-in-out infinite;
  animation-delay: var(--inner-d, 0ms), calc(var(--inner-d, 0ms) + 0.4s);
}

.rex-product--live .rex-product__model:hover {
  transform: translateY(-2px);
  border-color: rgba(124, 92, 255, 0.4);
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);
}

@keyframes rex-model-float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.rex-product__model h5 {
  margin: 0 0 8px;
  font-size: 14px;
  font-weight: 700;
  color: #eef8ff;
}

.rex-product__model p {
  margin: 0;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-soft, #a8b8d4);
}

.rex-product__cols {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 16px;
}

.rex-product__col h5 {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: #7c5cff;
}

.rex-product__col ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 6px;
}

.rex-product__col li {
  font-size: 13px;
  line-height: 1.45;
  color: var(--text-soft, #a8b8d4);
  padding-left: 12px;
  position: relative;
}

.rex-product__col li::before {
  content: '—';
  position: absolute;
  left: 0;
  color: rgba(22, 215, 196, 0.6);
}

.rex-product__outputs {
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.rex-product__outputs-label {
  margin: 0 0 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #f6c66b;
}

.rex-product__outputs ul {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 6px;
}

.rex-product__outputs li {
  font-size: 14px;
  color: #eef8ff;
}

@media (max-width: 1100px) {
  .rex-product__layout {
    grid-template-columns: 1fr;
  }

  .rex-product__row--top,
  .rex-product__models {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .rex-product__aside {
    padding: 22px 20px 20px;
  }

  .rex-product__card {
    padding: 18px 18px 16px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .rex-product--entered .rex-product__anim,
  .rex-product--live .rex-product__tag,
  .rex-product--live .rex-product__outcome,
  .rex-product--live .rex-product__model,
  .rex-product--live .rex-product__step-num,
  .rex-product--live .rex-product__note,
  .rex-product--live .rex-product__aside-shine {
    animation: none !important;
  }

  .rex-product--live .rex-product__aside:hover,
  .rex-product--live .rex-product__card:hover {
    transform: none;
  }
}
</style>
