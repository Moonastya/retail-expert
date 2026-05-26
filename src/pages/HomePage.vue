<template>
  <div class="home-page">
    <section class="home-hero home-block">
      <div class="container home-hero-grid">
        <div class="reveal home-hero-copy">
          <p class="eyebrow">Retail Expert</p>
          <h1>Измерение продаж FMCG по всем каналам в едином формате</h1>
          <p>
            Найдите скрытые возможности и достигайте максимальных значений дистрибуции, продаж,
            прибыли на рынке FMCG
          </p>
          <RouterLink class="home-link" to="/case">Смотреть кейсы</RouterLink>
        </div>
        <div class="home-hero-image reveal" style="--delay: 120ms">
          <HeroDashboardIllustration />
        </div>
      </div>
    </section>

    <section class="home-about home-block home-scroll-section">
      <div class="container reveal">
        <h2>Кратко о компании</h2>
        <p>
          Наша задача предоставить исчерпывающую информацию о фактической ситуации на рынке FMCG,
          чтобы наши клиенты могли учесть все факторы, влияющие на достижение их целей и
          принимать максимально эффективные решения, комфортно и без лишних затрат.
        </p>
        <RouterLink class="btn home-btn" to="/company">Подробнее</RouterLink>
      </div>
    </section>

    <section class="home-use-cases home-block home-scroll-section">
      <div class="container">
        <h2 class="reveal">Для чего используют аудит продаж FMCG?</h2>
        <div class="home-cards-grid">
          <article
            v-for="(item, i) in use_cases"
            :key="item.text"
            class="home-card reveal"
            :style="{ '--delay': `${40 + i * 40}ms` }"
          >
            <span class="icon">{{ item.icon }}</span>
            <p>{{ item.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="home-stats home-block home-scroll-section">
      <div class="container">
        <h2 class="reveal">База данных продаж FMCG в цифрах</h2>
        <div class="home-stats-grid">
          <article
            v-for="(stat, i) in stats"
            :key="stat.title"
            class="home-stat-card reveal"
            :style="i > 0 ? { '--delay': `${i * 70}ms` } : undefined"
          >
            <h3>{{ stat.title }}</h3>
            <HomeStatSpark :heights="stat.heights" />
            <div class="line" />
            <p>{{ stat.text }}</p>
          </article>
        </div>
      </div>
    </section>

    <ProductPortfolioSection
      class="home-block"
      variant="teaser"
      section_id="products"
      title="Портфель продуктов"
      :show_challenges="false"
      :show_eyebrow="true"
      :teaser_limit="8"
    />

    <section class="home-process home-block home-scroll-section">
      <div class="container">
        <h2 class="reveal">Как работает Retail Expert?</h2>
        <p class="home-sub reveal">
          Мы оказываем услуги на отдельных этапах измерения рынка FMCG так и полный сервис
          работы с данными начиная от сбора информации заканчивая построением системы контроля
          достижения бизнес показателей.
        </p>

        <div class="home-sources reveal">
          <div v-for="src in sources" :key="src.title" class="home-source-card">
            <ProcessMiniIcon :kind="src.kind" />
            <strong>{{ src.title }}</strong>
            <span>{{ src.text }}</span>
          </div>
        </div>

        <div class="home-process-topline reveal" style="--delay: 40ms">
          <span class="node" />
          <span class="node" />
          <span class="node" />
        </div>

        <div class="home-timeline">
          <article class="timeline-item left reveal" style="--delay: 80ms">
            <ProcessMiniIcon kind="collect" />
            <h3>Сбор данных</h3>
            <p>
              В наличии собственная база данных за 7 лет продаж, более 1000 аудиторов по всей
              территории России, чеки ОФД и информация от других партнеров.
            </p>
          </article>
          <div class="timeline-dot reveal" style="--delay: 80ms">1</div>
          <div class="timeline-spacer" />

          <div class="timeline-spacer" />
          <div class="timeline-dot reveal" style="--delay: 120ms">2</div>
          <article class="timeline-item right reveal">
            <ProcessMiniIcon kind="structure" />
            <h3>Структурирование данных</h3>
            <p>
              Информацию очищаем, устанавливаем связи и приводим к общей структуре, так чтобы их
              можно было объединить с вашей базой данных.
            </p>
          </article>

          <article class="timeline-item left reveal" style="--delay: 160ms">
            <ProcessMiniIcon kind="viz" />
            <h3>Визуализация</h3>
            <p>
              Представляем все данные о продажах FMCG в виде интерактивных диаграмм и графиков.
            </p>
          </article>
          <div class="timeline-dot reveal" style="--delay: 160ms">3</div>
          <div class="timeline-spacer" />

          <div class="timeline-spacer" />
          <div class="timeline-dot reveal" style="--delay: 240ms">4</div>
          <article class="timeline-item right reveal" style="--delay: 240ms">
            <ProcessMiniIcon kind="algorithm" />
            <h3>Алгоритм действий</h3>
            <p>
              Цель - создание детального алгоритма действий, направленных на достижение
              конкретной цели и дальнейший контроль полученных результатов.
            </p>
          </article>
        </div>
      </div>
    </section>

    <section class="home-case home-block home-scroll-section">
      <div class="container">
        <h2 class="reveal">Кейс</h2>
        <div class="home-case-grid">
          <div class="reveal">
            <CaseIllustration variant="distribution" aria_label="Кейс: дистрибуция и аналитика" />
            <RouterLink class="btn home-btn" to="/case">Больше кейсов</RouterLink>
          </div>
          <div class="home-case-text reveal" style="--delay: 100ms">
            <h3>Задача:</h3>
            <p>Повысить уровень дистрибуции максимально эффективным способом</p>
            <h3>Этапы:</h3>
            <ol>
              <li v-for="step in case_steps" :key="step">
                {{ step }}
              </li>
            </ol>
          </div>
        </div>
      </div>
    </section>

    <section class="home-clients home-block home-scroll-section">
      <div class="container">
        <div class="home-trust">
          <div class="home-trust-head">
            <h2 class="home-trust-title">Нам доверяют</h2>
            <span class="home-trust-wordmark">RETAIL EXPERT</span>
          </div>
          <div class="home-trust-scroller">
            <div class="home-trust-grid">
              <TrustClientChip
                v-for="(cell, i) in trust_clients"
                :key="cell.name"
                :name="cell.name"
                :variant="cell.variant"
                :logo_domain="cell.logo_domain"
                :reveal_delay="`${40 + i * 40}ms`"
              />
            </div>
          </div>
          <p class="home-clients-lead">
            Партнёры и клиенты — ведущие производители и ритейлеры FMCG в форматах NKA, LKA,
            e-commerce и omni-channel.
          </p>
        </div>
      </div>
    </section>

    <section class="home-cta home-block home-scroll-section">
      <div class="container reveal">
        <h2>
          Начните открывать для себя скрытые возможности достижения ваших бизнес целей!
        </h2>
        <button
          class="btn home-btn ghost"
          type="button"
          @click="open_request_modal"
        >
          Отправить запрос
        </button>
      </div>
    </section>
  </div>
</template>

<script setup>
import { use_page_reveal } from '../application/use_page_reveal'
import { open_request_modal } from '../application/request_modal'
import TrustClientChip from '../components/TrustClientChip.vue'
import ProductPortfolioSection from '../components/ProductPortfolioSection.vue'
import HomeStatSpark from '../components/HomeStatSpark.vue'
import HeroDashboardIllustration from '../components/HeroDashboardIllustration.vue'
import ProcessMiniIcon from '../components/ProcessMiniIcon.vue'
import CaseIllustration from '../components/CaseIllustration.vue'
import { TRUST_CLIENTS } from '../data/trust_clients'

const trust_clients = TRUST_CLIENTS

const use_cases = [
  { icon: '▦', text: 'Повышение эффективности мерчандайзинга' },
  { icon: '⌁', text: 'Развитие дистрибуции' },
  { icon: '⌨', text: 'Запуск новых продуктов' },
  { icon: '%', text: 'Повышение эффективности промо акций' },
  { icon: '🛒', text: 'Подбор ассортимента' },
  { icon: '🏪', text: 'Открытие нового магазина' },
]

const stats = [
  {
    title: '350 000',
    heights: [12, 20, 16, 28, 22, 32, 26, 30],
    text: 'Обновляем информацию из 350 000 торговых точек ежемесячно',
  },
  {
    title: '10+',
    heights: [8, 12, 14, 18, 22, 26, 30, 34],
    text: 'лет опыта на рынке анализа данных FMCG и непрерывного развития методологии',
  },
  {
    title: '98%',
    heights: [18, 24, 28, 30, 32, 33, 34, 35],
    text: 'гарантия точности алгоритмов и контроля качества данных для решений клиентов',
  },
  {
    title: '700 000',
    heights: [14, 18, 22, 20, 26, 28, 30, 33],
    text: 'Текущая база данных содержит более 700 000 уникальных товаров',
  },
]

const sources = [
  { kind: 'retail', title: 'Ритейл', text: 'Традиционная розница и современная торговля' },
  { kind: 'ecommerce', title: 'E-commerce', text: 'Маркетплейсы и онлайн ритейл' },
  { kind: 'horeca', title: 'HoReCa', text: 'Кафе, бары, отели, рестораны' },
]

const case_steps = [
  'Создание рейтинга интересующих торговых точек федеральных сетей.',
  'Аудит в наиболее интересных торговых точках.',
  'Карта адресов с весом в общей значении дистрибуции.',
  'План конкретных шагов по поставке товара.',
  'Построение системы контроля выполнения показателей.',
  'Достижение поставленной цели за 3 месяца работы.',
]

use_page_reveal()
</script>
