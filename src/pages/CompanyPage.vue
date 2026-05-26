<template>
  <div class="company-page">
    <section class="co-hero">
      <div class="co-hero-bg" aria-hidden="true" />
      <div class="container co-hero-inner reveal">
        <p class="eyebrow co-hero-eyebrow">Retail Expert</p>
        <h1 class="co-hero-title">
          Точно определяем настоящее и планируем будущее
        </h1>
        <p class="co-hero-lead">
          Единый дата-партнёр от сбора данных до готовой аналитики рынка FMCG России: гранулярность
          до SKU и торговой точки, продажи в рублях и штуках, периоды от дня до месяца.
        </p>
        <div class="co-hero-actions">
          <button class="btn" type="button" @click="open_request_modal">Обсудить проект</button>
          <RouterLink class="btn btn-outline co-hero-outline" to="/plankit">Demand Planning</RouterLink>
        </div>
        <p class="co-hero-note">
          От обсуждения до старта проекта — не более 7 дней
        </p>
      </div>
    </section>

    <section class="co-strip co-scroll-section">
      <div class="container co-strip-grid">
        <div class="co-strip-item reveal" style="--delay: 40ms">
          <span class="co-strip-num">10+</span>
          <span class="co-strip-txt">лет опыта на рынке анализа данных FMCG</span>
        </div>
        <div class="co-strip-item reveal" style="--delay: 80ms">
          <span class="co-strip-num">350 000+</span>
          <span class="co-strip-txt">торговых точек — регулярное обновление данных</span>
        </div>
        <div class="co-strip-item reveal" style="--delay: 120ms">
          <span class="co-strip-num">98%</span>
          <span class="co-strip-txt">гарантия точности алгоритмов и качества данных</span>
        </div>
        <div class="co-strip-item reveal" style="--delay: 160ms">
          <span class="co-strip-num">&gt;80%</span>
          <span class="co-strip-txt">рыночное покрытие аналитики Retail Expert</span>
        </div>
      </div>
    </section>

    <div class="container">
      <CompanyValueCards />

      <ProductPortfolioSection variant="full" section_id="products" :show_eyebrow="false" />

      <section class="co-advantages co-scroll-section">
        <h2 class="reveal">Почему Retail Expert</h2>
        <ol class="co-adv-list">
          <li
            v-for="(a, i) in advantages"
            :key="i"
            class="reveal"
            :style="{ '--delay': `${40 + i * 40}ms` }"
          >
            {{ a }}
          </li>
        </ol>
      </section>
    </div>

    <section class="co-cta co-scroll-section" aria-label="Карьера и сотрудничество">
      <div class="container co-cta-grid">
        <article class="co-cta-card reveal" style="--delay: 40ms">
          <span class="co-cta-card__shine" aria-hidden="true" />
          <h2>Карьера</h2>
          <p>
            Наблюдайте, выявляйте закономерности и аномалии, решайте интересные задачи —
            присоединяйтесь к команде.
          </p>
          <button class="btn co-cta-card__btn" type="button" @click="open_request_modal">
            Оставить заявку
          </button>
        </article>
        <article class="co-cta-card co-cta-card--accent reveal" style="--delay: 120ms">
          <span class="co-cta-card__shine" aria-hidden="true" />
          <h2>Сотрудничество</h2>
          <p>
            Поиск ответов — это приключение. Присылайте данные и формулируйте вопросы — вместе
            найдём решения под ваш контекст.
          </p>
          <button class="btn co-cta-card__btn" type="button" @click="open_request_modal">
            Оставить заявку
          </button>
        </article>
      </div>
    </section>
  </div>
</template>

<script setup>
import { use_page_reveal } from '../application/use_page_reveal'
import { open_request_modal } from '../application/request_modal'
import CompanyValueCards from '../components/CompanyValueCards.vue'
import ProductPortfolioSection from '../components/ProductPortfolioSection.vue'

use_page_reveal()

const advantages = [
  'Единый дата-партнёр: от сбора данных до готовой аналитики.',
  'Гранулярность до SKU и торговой точки, продажи в рублях и штуках.',
  'Периоды от дня до месяца — гибкая аналитика под задачу.',
  'Гарантия точности алгоритмов и контроль качества данных.',
]
</script>

<style scoped>
/* Как co-value-card: тёмное стекло, не светлые «белые» карточки из глобального CSS */
.co-cta {
  padding: 48px 0 72px;
}

.co-cta-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 22px;
}

.co-cta-card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 280px;
  padding: 36px 38px 32px;
  overflow: hidden;
  border-radius: var(--radius-card, 22px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(
    155deg,
    rgba(22, 36, 62, 0.92) 0%,
    rgba(14, 24, 44, 0.96) 100%
  );
  box-shadow: var(--shadow-card, 0 24px 56px rgba(0, 0, 0, 0.32));
  color: #eef8ff;
  transition:
    transform 0.45s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.45s ease,
    border-color 0.45s ease;
}

.co-cta-card--accent {
  background: linear-gradient(
    145deg,
    rgba(30, 58, 120, 0.85) 0%,
    rgba(16, 36, 73, 0.92) 55%,
    rgba(124, 92, 255, 0.35) 100%
  );
  border-color: rgba(22, 215, 196, 0.28);
  box-shadow:
    0 24px 56px rgba(0, 0, 0, 0.32),
    0 0 40px rgba(22, 215, 196, 0.08);
}

.co-cta-card:hover {
  transform: translateY(-4px);
  border-color: rgba(22, 215, 196, 0.4);
  box-shadow:
    0 32px 64px rgba(0, 0, 0, 0.38),
    0 0 48px rgba(22, 215, 196, 0.12);
}

.co-cta-card__shine {
  position: absolute;
  inset: -40% -20%;
  background: linear-gradient(
    105deg,
    transparent 40%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 60%
  );
  transform: translateX(-120%) skewX(-12deg);
  pointer-events: none;
  opacity: 0.35;
}

.co-cta-card:hover .co-cta-card__shine {
  animation: co-cta-shine 4.5s linear infinite;
}

@keyframes co-cta-shine {
  0% {
    transform: translateX(-140%) skewX(-8deg);
  }
  100% {
    transform: translateX(140%) skewX(-8deg);
  }
}

.co-cta-card h2 {
  position: relative;
  z-index: 1;
  margin: 0 0 14px;
  font-size: clamp(28px, 2.8vw, 36px);
  font-weight: 700;
  line-height: 1.12;
  letter-spacing: -0.02em;
  color: #eef8ff;
}

.co-cta-card p {
  position: relative;
  z-index: 1;
  flex: 1;
  margin: 0 0 28px;
  max-width: 42ch;
  font-size: 16px;
  line-height: 1.58;
  color: var(--text-soft, #a8b8d4);
}

.co-cta-card__btn {
  position: relative;
  z-index: 1;
  align-self: flex-start;
  margin-top: auto;
}

@media (max-width: 900px) {
  .co-cta-grid {
    grid-template-columns: 1fr;
  }

  .co-cta-card {
    min-height: 0;
    padding: 28px 26px 26px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .co-cta-card:hover .co-cta-card__shine {
    animation: none;
  }
}
</style>
