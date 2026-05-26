<template>
  <svg
    class="home-stat-spark home-stat-spark--live"
    viewBox="0 0 120 36"
    aria-hidden="true"
  >
    <defs>
      <linearGradient :id="gid" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stop-color="#6d5cff" />
        <stop offset="55%" stop-color="#16d7c4" />
        <stop offset="100%" stop-color="#f6c66b" />
      </linearGradient>
    </defs>
    <rect
      v-for="(h, i) in heights"
      :key="i"
      class="home-stat-spark__bar"
      :x="4 + i * 14"
      :y="36 - h"
      width="10"
      :height="h"
      rx="5"
      :fill="`url(#${gid})`"
      :style="{ '--d': `${i * 0.11}s`, '--h': h }"
    />
  </svg>
</template>

<script setup>
import { useId } from 'vue'

defineProps({
  heights: {
    type: Array,
    default: () => [14, 22, 18, 28, 20, 32, 24, 30],
  },
})

const gid = `spark-${useId().replace(/[^a-zA-Z0-9]/g, '')}`
</script>

<style scoped>
.home-stat-spark {
  display: block;
  width: 100%;
  max-width: 140px;
  height: 36px;
  margin: 10px auto 0;
  filter: drop-shadow(0 8px 18px rgba(22, 215, 196, 0.18));
}

.home-stat-spark__bar {
  transform-origin: bottom center;
  transform-box: fill-box;
  animation: home-spark-wave 2.1s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

@keyframes home-spark-wave {
  0%,
  100% {
    transform: scaleY(0.55);
    opacity: 0.72;
  }
  50% {
    transform: scaleY(1);
    opacity: 1;
  }
}

</style>
