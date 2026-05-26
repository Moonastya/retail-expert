<template>
  <div class="app-shell">
    <SiteHeader />
    <main>
      <router-view />
    </main>
    <SiteFooter />
    <RequestModal />
  </div>
</template>

<script setup>
import { nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { force_reveal_in_element } from './application/reveal_scroll'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
import RequestModal from './components/RequestModal.vue'

const route = useRoute()

watch(
  () => route.fullPath,
  async () => {
    if (route.hash) {
      setTimeout(() => force_reveal_in_element(route.hash), 500)
      setTimeout(() => force_reveal_in_element(route.hash), 1100)
    }
  },
  { immediate: true },
)
</script>
