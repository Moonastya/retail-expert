<template>
  <section
    ref="root_el"
    :id="section_id"
    class="rex-portfolio rex-scroll-section"
    :class="`rex-portfolio--${variant}`"
  >
    <div class="container">
      <header class="rex-portfolio__head">
        <p v-if="show_eyebrow" class="eyebrow reveal">Портфель продуктов</p>
        <h2
          class="reveal"
          :style="{ '--delay': show_eyebrow ? '60ms' : '0ms' }"
        >
          {{ title }}
        </h2>
        <p
          class="rex-portfolio__lead reveal"
          :style="{ '--delay': show_eyebrow ? '120ms' : '60ms' }"
        >
          {{ lead }}
        </p>
      </header>

      <div v-if="show_challenges" class="rex-portfolio__challenges">
        <p class="rex-portfolio__challenges-title reveal" style="--delay: 0ms">
          Вызовы FMCG, которые закрывает линейка
        </p>
        <ul class="rex-portfolio__challenges-list">
          <li
            v-for="(item, ci) in FMCG_CHALLENGES"
            :key="item"
            class="reveal"
            :style="{ '--delay': `${40 + ci * 40}ms` }"
          >
            {{ item }}
          </li>
        </ul>
      </div>

      <div v-if="variant === 'full'" class="rex-portfolio__details">
        <ProductDetailBlock
          v-for="(detail, i) in product_details"
          :key="detail.id"
          :product="detail"
          :accent="i % 2 === 1"
          :delay="`${40 + i * 40}ms`"
        />
      </div>

      <div v-else class="rex-portfolio__grid">
        <article
          v-for="(product, i) in visible_products"
          :key="product.id"
          :id="`product-${product.id}`"
          class="rex-portfolio__card reveal"
          :style="{ '--delay': `${40 + i * 40}ms` }"
        >
          <ProductIllustration
            :product_id="product.id"
            :aria_label="`График: ${product.title}`"
          />
          <h3>{{ product.title }}</h3>
          <p class="rex-portfolio__tagline">{{ product.tagline }}</p>
          <p class="rex-portfolio__summary">{{ product.summary }}</p>
        </article>
      </div>

      <div v-if="variant === 'teaser'" class="rex-portfolio__footer reveal" style="--delay: 200ms">
        <RouterLink class="btn home-btn" to="/company#products">Весь портфель продуктов</RouterLink>
      </div>

      <div v-else class="rex-portfolio__cta reveal" style="--delay: 200ms">
        <p>Обсудим, какие модули закроют ваши задачи — от данных до планирования спроса.</p>
        <button class="btn" type="button" @click="open_request_modal">Обсудить проект</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'
import { use_component_reveal } from '../application/use_component_reveal'
import { FMCG_CHALLENGES, PRODUCT_PORTFOLIO } from '../data/product_portfolio'
import { PRODUCT_DETAILS } from '../data/product_details'
import { open_request_modal } from '../application/request_modal'
import ProductDetailBlock from './ProductDetailBlock.vue'
import ProductIllustration from './ProductIllustration.vue'

const root_el = ref(null)
use_component_reveal()

const props = defineProps({
  variant: {
    type: String,
    default: 'full',
    validator: (v) => ['full', 'teaser'].includes(v),
  },
  section_id: {
    type: String,
    default: 'products',
  },
  title: {
    type: String,
    default: 'Портфель продуктов',
  },
  lead: {
    type: String,
    default:
      'Ответы на вызовы FMCG: разрозненные источники, нехватка аналитики по рынку, промо, ' +
      'факторы выручки, ассортимент и планирование — в единой линейке решений.',
  },
  show_challenges: {
    type: Boolean,
    default: true,
  },
  show_eyebrow: {
    type: Boolean,
    default: false,
  },
  teaser_limit: {
    type: Number,
    default: 4,
  },
})

const visible_products = computed(() =>
  props.variant === 'teaser'
    ? PRODUCT_PORTFOLIO.slice(0, props.teaser_limit)
    : PRODUCT_PORTFOLIO,
)

const product_details = computed(() =>
  props.variant === 'full' ? PRODUCT_DETAILS : [],
)
</script>

<style scoped>
.rex-portfolio__details {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
</style>
