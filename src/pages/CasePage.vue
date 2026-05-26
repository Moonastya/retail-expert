<template>
  <div class="case-page">
    <section class="case-hero co-scroll-section">
      <div class="case-hero-bg" aria-hidden="true" />
      <div class="container case-hero-grid">
        <div class="case-hero-copy">
          <p class="eyebrow reveal">Retail Expert · Кейсы</p>
          <h1 class="case-hero-title reveal" style="--delay: 60ms">
            Кейсы компании на рынке FMCG
          </h1>
          <p class="case-hero-lead reveal" style="--delay: 120ms">
            Реальные проекты с измеримым эффектом: вывод на рынок, ассортимент, эластичность
            спроса, рост в федеральных сетях и аналитика HoReCa — на данных Retail Expert.
          </p>
          <nav class="case-hero-nav reveal" style="--delay: 160ms" aria-label="Кейсы">
            <a
              v-for="item in case_studies"
              :key="item.id"
              class="case-hero-nav__link"
              :href="`#case-${item.index}`"
            >
              {{ item.index }}
            </a>
          </nav>
          <div class="case-hero-actions reveal" style="--delay: 200ms">
            <button class="btn" type="button" @click="open_request_modal">Обсудить проект</button>
            <RouterLink class="btn btn-outline" to="/company#products">Продукты</RouterLink>
          </div>
        </div>

        <div class="case-hero-visual reveal" style="--delay: 140ms">
          <img
            class="case-hero-visual__bg"
            src="/assets/rex/case-illustration.svg"
            alt=""
            aria-hidden="true"
          />
          <CaseIllustration variant="distribution" :play="hero_play" aria_label="Кейсы FMCG" />
        </div>
      </div>
    </section>

    <section class="case-strip co-scroll-section">
      <div class="container case-strip-grid">
        <div
          v-for="(s, i) in hero_stats"
          :key="s.text"
          class="case-strip-item reveal"
          :style="{ '--delay': `${40 + i * 50}ms` }"
        >
          <span class="case-strip-num">{{ s.num }}</span>
          <span class="case-strip-txt">{{ s.text }}</span>
        </div>
      </div>
    </section>

    <CaseStudyCard
      v-for="(item, i) in case_studies"
      :key="item.id"
      :index="item.index"
      :title="item.title"
      :tagline="item.tagline"
      :variant="item.variant"
      :tags="item.tags"
      :metrics="item.metrics"
      :content_blocks="item.content_blocks"
      :reverse="i % 2 === 1"
      :delay="`${40 + i * 40}ms`"
    />

    <section class="case-cta co-scroll-section">
      <div class="container case-cta-inner reveal">
        <h2>Нужен похожий проект под вашу категорию?</h2>
        <p>
          Обсудим задачу, подберём модуль аналитики и сроки. От брифа до старта — не более 7 дней.
        </p>
        <div class="case-cta-actions">
          <button class="btn" type="button" @click="open_request_modal">Оставить заявку</button>
          <RouterLink class="btn btn-outline" to="/company">О компании</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { use_page_reveal } from '../application/use_page_reveal'
import { open_request_modal } from '../application/request_modal'
import { CASE_HERO_STATS, CASE_STUDIES } from '../data/case_studies.js'
import CaseIllustration from '../components/CaseIllustration.vue'
import CaseStudyCard from '../components/CaseStudyCard.vue'

use_page_reveal()

const hero_play = ref(true)
const case_studies = CASE_STUDIES
const hero_stats = CASE_HERO_STATS
</script>

<style scoped>
.case-page {
  padding-bottom: 0;
}

/* Hero — две колонки как на главной */
.case-hero {
  position: relative;
  padding: 48px 0 32px;
  overflow: hidden;
}

.case-hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 12% 30%, rgba(124, 92, 255, 0.24), transparent 42%),
    radial-gradient(circle at 90% 15%, rgba(22, 215, 196, 0.2), transparent 38%),
    linear-gradient(165deg, #070d19 0%, #0e1b34 55%, #080b14 100%);
  pointer-events: none;
}

.case-hero-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(300px, 1.05fr);
  gap: 36px;
  align-items: center;
}

.case-hero-copy {
  min-width: 0;
}

.case-hero-title {
  margin: 0 0 16px;
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.02em;
  color: #eef8ff;
}

.case-hero-lead {
  margin: 0 0 22px;
  font-size: clamp(16px, 1.4vw, 18px);
  line-height: 1.6;
  color: var(--text-soft, #a8b8d4);
}

.case-hero-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 24px;
}

.case-hero-nav__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 40px;
  padding: 8px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.05);
  color: #eef8ff;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  transition:
    border-color 0.2s ease,
    background 0.2s ease,
    color 0.2s ease;
}

.case-hero-nav__link:hover {
  border-color: rgba(22, 215, 196, 0.5);
  background: rgba(22, 215, 196, 0.12);
  color: #16d7c4;
}

.case-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.case-hero-visual {
  position: relative;
  min-height: 320px;
  padding: 20px;
  border-radius: var(--radius-card, 22px);
  border: 1px solid rgba(22, 215, 196, 0.28);
  background: linear-gradient(
    155deg,
    rgba(26, 48, 96, 0.92) 0%,
    rgba(14, 28, 52, 0.96) 100%
  );
  box-shadow: 0 28px 64px rgba(0, 0, 0, 0.4);
  overflow: hidden;
}

.case-hero-visual__bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.4;
  pointer-events: none;
}

.case-hero-visual :deep(.case-illus-wrap) {
  position: relative;
  z-index: 1;
}

/* Полоса цифр */
.case-strip {
  padding: 8px 0 40px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.case-strip-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.case-strip-item {
  padding: 20px 18px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.04);
  text-align: center;
}

.case-strip-num {
  display: block;
  font-size: clamp(22px, 2.2vw, 30px);
  font-weight: 700;
  line-height: 1.1;
  color: #16d7c4;
  letter-spacing: -0.02em;
}

.case-strip-txt {
  display: block;
  margin-top: 8px;
  font-size: 13px;
  line-height: 1.45;
  color: #a8b8d4;
}

/* CTA */
.case-cta {
  margin-top: 16px;
  padding: 56px 0 72px;
  background: linear-gradient(
    180deg,
    transparent 0%,
    rgba(22, 215, 196, 0.06) 50%,
    transparent 100%
  );
}

.case-cta-inner {
  text-align: center;
  padding: 40px 32px;
  border-radius: var(--radius-card, 22px);
  border: 1px solid rgba(22, 215, 196, 0.25);
  background: linear-gradient(
    155deg,
    rgba(26, 48, 96, 0.9) 0%,
    rgba(14, 28, 52, 0.95) 100%
  );
  box-shadow: 0 24px 56px rgba(0, 0, 0, 0.35);
}

.case-cta-inner h2 {
  margin: 0 0 12px;
  font-size: clamp(24px, 3vw, 34px);
  font-weight: 700;
  color: #eef8ff;
}

.case-cta-inner p {
  margin: 0 auto 24px;
  max-width: 48ch;
  font-size: 16px;
  line-height: 1.58;
  color: #a8b8d4;
}

.case-cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
}

@media (max-width: 960px) {
  .case-hero-grid {
    grid-template-columns: 1fr;
  }

  .case-hero-visual {
    min-height: 260px;
  }

  .case-strip-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .case-strip-grid {
    grid-template-columns: 1fr;
  }
}
</style>
