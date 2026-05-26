<template>
  <section
    :id="`case-${index}`"
    ref="root_el"
    class="case-card co-scroll-section reveal"
    :class="{ 'case-card--play': play_anim }"
    :style="{ '--delay': delay }"
  >
    <div class="container">
      <article class="case-card__panel">
        <span class="case-card__shine" aria-hidden="true" />
        <span class="case-card__glow" aria-hidden="true" />

        <header class="case-card__top">
          <div class="case-card__meta">
            <span class="case-card__index">{{ index }}</span>
            <div v-if="tags?.length" class="case-card__tags">
              <span v-for="tag in tags" :key="tag" class="case-card__tag">{{ tag }}</span>
            </div>
          </div>
          <h2 class="case-card__title">{{ title }}</h2>
          <p v-if="tagline" class="case-card__tagline">{{ tagline }}</p>
        </header>

        <div v-if="metrics?.length" class="case-card__metrics">
          <div v-for="m in metrics" :key="m.label" class="case-card__metric">
            <span class="case-card__metric-val">{{ m.value }}</span>
            <span class="case-card__metric-lbl">{{ m.label }}</span>
          </div>
        </div>

        <div class="case-card__grid" :class="{ 'case-card__grid--reverse': reverse }">
          <div class="case-card__viz">
            <img
              class="case-card__viz-bg"
              src="/assets/rex/case-illustration.svg"
              alt=""
              aria-hidden="true"
            />
            <CaseIllustration :variant="variant" :play="play_anim" :aria_label="title" />
          </div>

          <div class="case-card__body">
            <div v-for="(block, bi) in content_blocks" :key="bi" class="case-card__block">
              <h3 class="case-card__label">{{ block.label }}</h3>
              <p v-for="(para, pi) in block.paragraphs" :key="pi">{{ para }}</p>
            </div>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import CaseIllustration from './CaseIllustration.vue'

defineProps({
  index: { type: String, default: '' },
  title: { type: String, required: true },
  tagline: { type: String, default: '' },
  variant: { type: String, required: true },
  tags: { type: Array, default: () => [] },
  metrics: { type: Array, default: () => [] },
  content_blocks: { type: Array, required: true },
  reverse: { type: Boolean, default: false },
  delay: { type: String, default: '0ms' },
})

const root_el = ref(null)
const started = ref(false)
const play_anim = computed(() => started.value)

let observer = null

onMounted(() => {
  const el = root_el.value
  if (!el) {
    started.value = true
    return
  }

  const sync = () => {
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
      started.value = true
    }
  }
  sync()
  requestAnimationFrame(sync)
  setTimeout(sync, 150)

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          started.value = true
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px 5% 0px' },
  )
  observer.observe(el)
})

onUnmounted(() => {
  observer?.disconnect()
})
</script>

<style scoped>
.case-card {
  padding: 8px 0 28px;
}

.case-card__panel {
  position: relative;
  overflow: hidden;
  padding: 28px 30px 30px;
  border-radius: var(--radius-card, 22px);
  border: 1px solid rgba(22, 215, 196, 0.24);
  background: linear-gradient(
    155deg,
    rgba(26, 48, 96, 0.94) 0%,
    rgba(14, 28, 52, 0.98) 50%,
    rgba(10, 18, 36, 1) 100%
  );
  box-shadow:
    0 28px 60px rgba(0, 0, 0, 0.38),
    0 0 40px rgba(22, 215, 196, 0.08);
}

.case-card__glow {
  position: absolute;
  top: -30%;
  right: -15%;
  width: 55%;
  height: 70%;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(124, 92, 255, 0.2) 0%, transparent 70%);
  pointer-events: none;
}

.case-card__shine {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    105deg,
    transparent 38%,
    rgba(255, 255, 255, 0.08) 50%,
    transparent 62%
  );
  transform: translateX(-130%) skewX(-10deg);
  pointer-events: none;
}

.case-card--play .case-card__shine {
  animation: case-card-shine 1.8s ease 0.3s;
}

@keyframes case-card-shine {
  to {
    transform: translateX(130%) skewX(-10deg);
  }
}

.case-card__top {
  position: relative;
  z-index: 1;
  margin-bottom: 20px;
}

.case-card__meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  margin-bottom: 14px;
}

.case-card__index {
  padding: 6px 14px;
  border-radius: 999px;
  border: 1px solid rgba(246, 198, 107, 0.5);
  background: rgba(246, 198, 107, 0.1);
  color: #f6c66b;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

.case-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.case-card__tag {
  padding: 5px 12px;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.05);
  color: #a8b8d4;
  font-size: 11px;
  font-weight: 500;
}

.case-card__title {
  margin: 0 0 10px;
  font-size: clamp(22px, 2.5vw, 32px);
  font-weight: 700;
  line-height: 1.18;
  letter-spacing: -0.02em;
  color: #eef8ff;
}

.case-card__tagline {
  margin: 0;
  max-width: 62ch;
  font-size: 16px;
  line-height: 1.55;
  color: var(--text-soft, #a8b8d4);
}

.case-card__metrics {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 22px;
}

.case-card__metric {
  padding: 14px 16px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.22);
  text-align: center;
}

.case-card__metric-val {
  display: block;
  font-size: clamp(20px, 2vw, 26px);
  font-weight: 700;
  line-height: 1.1;
  color: #16d7c4;
  letter-spacing: -0.02em;
}

.case-card__metric-lbl {
  display: block;
  margin-top: 6px;
  font-size: 11px;
  line-height: 1.35;
  color: #a8b8d4;
}

.case-card__grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(280px, 1fr) minmax(0, 1.15fr);
  gap: 28px;
  align-items: stretch;
}

.case-card__grid--reverse .case-card__viz {
  order: 2;
}

.case-card__grid--reverse .case-card__body {
  order: 1;
}

.case-card__viz {
  position: relative;
  min-height: 340px;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.case-card__viz-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.35;
  border-radius: 16px;
  pointer-events: none;
}

.case-card__viz :deep(.case-illus-wrap) {
  position: relative;
  z-index: 1;
  width: 100%;
}

.case-card__label {
  margin: 0 0 10px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #16d7c4;
}

.case-card__block + .case-card__block {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
}

.case-card__body p {
  margin: 0 0 12px;
  font-size: 15px;
  line-height: 1.68;
  color: var(--text-soft, #a8b8d4);
}

.case-card__body p:last-child {
  margin-bottom: 0;
}

@media (max-width: 960px) {
  .case-card__metrics {
    grid-template-columns: 1fr;
  }

  .case-card__grid,
  .case-card__grid--reverse {
    grid-template-columns: 1fr;
  }

  .case-card__grid--reverse .case-card__viz,
  .case-card__grid--reverse .case-card__body {
    order: unset;
  }

  .case-card__viz {
    min-height: 260px;
  }
}
</style>
