<template>
  <header class="header">
    <div class="container header-inner">
      <RouterLink class="logo" to="/">
        <img src="/assets/rex/retail-expert-logo.svg" alt="Retail Expert" width="160" height="40" />
        <span class="logo-status">AI analytics</span>
      </RouterLink>
      <nav class="nav">
        <RouterLink to="/">Главная</RouterLink>
        <RouterLink to="/company">О компании</RouterLink>
        <RouterLink to="/company#products">Продукты</RouterLink>
        <RouterLink to="/solutions">Решения</RouterLink>
        <RouterLink to="/case">Кейсы</RouterLink>
        <RouterLink to="/plankit">Plankit</RouterLink>
        <RouterLink to="/plankit#contacts">Контакты</RouterLink>
      </nav>
      <button class="btn btn-small" type="button" @click="open_request_modal">
        Оставить заявку
      </button>
    </div>
  </header>
</template>

<script setup>
import { open_request_modal } from '../application/request_modal'
</script>
