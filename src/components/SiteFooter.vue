<template>
  <footer id="contacts" class="footer">
    <div class="container footer-grid">
      <div>
        <p class="footer-kicker">Retail Expert</p>
        <h4>Навигация</h4>
        <ul>
          <li><RouterLink to="/">Главная</RouterLink></li>
          <li><RouterLink to="/company">О компании</RouterLink></li>
          <li><RouterLink to="/solutions">Решения</RouterLink></li>
          <li><RouterLink to="/case">Кейсы</RouterLink></li>
          <li><RouterLink to="/plankit">Plankit</RouterLink></li>
        </ul>
      </div>
      <div id="request">
        <p class="footer-kicker">Data partner</p>
        <h4>Контакты</h4>
        <p>Телефон: +7 (926) 913-72-82</p>
        <p>Email: info@r-ex.ru</p>
        <p>127254, г. Москва, Огородный проезд, д. 16</p>
      </div>
      <div>
        <p class="footer-kicker">AI dashboard</p>
        <h4>Запрос</h4>
        <button class="btn" type="button" @click="open_request_modal">Отправить запрос</button>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { open_request_modal } from '../application/request_modal'
</script>
