<template>
  <header class="header">
    <div class="container header-inner">
      <RouterLink class="logo" to="/">
        <img src="/assets/rex/retail-expert-logo.svg" alt="Retail Expert" width="160" height="40" />
        <span class="logo-status">AI analytics</span>
      </RouterLink>
      <nav class="nav">
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/company" custom v-slot="{ navigate, href }">
          <a
            :href="href"
            :class="{ 'router-link-active': is_company_active }"
            @click="navigate"
          >
            О компании
          </a>
        </RouterLink>
        <RouterLink to="/company#products" custom v-slot="{ navigate, href }">
          <a
            :href="href"
            :class="{ 'router-link-active': is_products_active }"
            @click="navigate"
          >
            Продукты
          </a>
        </RouterLink>
        <RouterLink to="/solutions">Решения</RouterLink>
        <RouterLink to="/case">Кейсы</RouterLink>
        <RouterLink to="/plankit" custom v-slot="{ navigate, href }">
          <a
            :href="href"
            :class="{ 'router-link-active': is_plankit_active }"
            @click="navigate"
          >
            Plankit
          </a>
        </RouterLink>
        <RouterLink to="/plankit#contacts" custom v-slot="{ navigate, href }">
          <a
            :href="href"
            :class="{ 'router-link-active': is_plankit_contacts_active }"
            @click="navigate"
          >
            Контакты
          </a>
        </RouterLink>
      </nav>
      <button class="btn btn-small" type="button" @click="open_request_modal">
        Оставить заявку
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { open_request_modal } from '../application/request_modal'

const route = useRoute()

const is_company_active = computed(
  () => route.path === '/company' && route.hash !== '#products',
)
const is_products_active = computed(
  () => route.path === '/company' && route.hash === '#products',
)
const is_plankit_active = computed(
  () => route.path === '/plankit' && route.hash !== '#contacts',
)
const is_plankit_contacts_active = computed(
  () => route.path === '/plankit' && route.hash === '#contacts',
)
</script>
