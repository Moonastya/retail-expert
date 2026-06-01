<template>
  <div class="solutions-page">
    <section class="solutions-hero">
      <div class="container reveal">
        <p class="eyebrow">Retail Expert Solutions</p>
        <h1>Продуктовые решения Retail Expert в формате интерактивных вкладок</h1>
      </div>
    </section>

    <section class="solutions-main">
      <div class="container">
        <PresentationSolutionsTabs />
      </div>
    </section>

    <section class="solutions-challenges">
      <div class="container">
        <h2 class="reveal">На какие вызовы FMCG рынка отвечаем</h2>
        <ul class="solutions-challenges-grid">
          <li
            v-for="(item, i) in challenges"
            :key="item"
            class="reveal"
            :style="{ '--delay': `${40 + i * 40}ms` }"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </section>

    <section class="solutions-facts">
      <div class="container">
        <h2 class="reveal">Ключевые факты</h2>
        <div class="solutions-facts-grid">
          <article
            v-for="(item, i) in facts"
            :key="item"
            class="solutions-fact-card reveal"
            :style="{ '--delay': `${40 + i * 40}ms` }"
          >
            <p>{{ item }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="solutions-advantages">
      <div class="container">
        <h2 class="reveal">Почему выбирают Retail Expert</h2>
        <ul class="solutions-adv-grid">
          <li
            v-for="(item, i) in advantages"
            :key="item"
            class="reveal"
            :style="{ '--delay': `${40 + i * 40}ms` }"
          >
            {{ item }}
          </li>
        </ul>
        <div class="solutions-cta reveal" style="--delay: 200ms">
          <button class="btn" type="button" @click="open_request_modal">Обсудить внедрение</button>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { use_page_reveal } from '../application/use_page_reveal'
import { open_request_modal } from '../application/request_modal'
import PresentationSolutionsTabs from '../components/PresentationSolutionsTabs.vue'
import {
  PRESENTATION_ADVANTAGES,
  PRESENTATION_CHALLENGES,
  PRESENTATION_FACTS,
} from '../data/presentation_solutions'

const advantages = PRESENTATION_ADVANTAGES
const challenges = PRESENTATION_CHALLENGES
const facts = PRESENTATION_FACTS

use_page_reveal()
</script>
