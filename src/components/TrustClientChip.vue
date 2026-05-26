<template>
  <div
    ref="root_el"
    class="home-trust-chip reveal"
    :class="`home-trust-chip--${variant}`"
    :style="{ '--delay': reveal_delay }"
  >
    <div class="home-trust-chip__mark" aria-hidden="true">
      <svg class="home-trust-chip__badge" viewBox="0 0 48 48" aria-hidden="true">
        <defs>
          <linearGradient :id="badge_gid" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="#7c5cff" />
            <stop offset="100%" stop-color="#16d7c4" />
          </linearGradient>
        </defs>
        <rect width="48" height="48" rx="12" fill="rgba(255,255,255,0.08)" />
        <rect
          class="home-trust-chip__bar"
          x="10"
          y="28"
          width="6"
          height="14"
          rx="2"
          :fill="`url(#${badge_gid})`"
          style="--d: 0s"
        />
        <rect
          class="home-trust-chip__bar"
          x="18"
          y="22"
          width="6"
          height="20"
          rx="2"
          :fill="`url(#${badge_gid})`"
          style="--d: 0.12s"
        />
        <rect
          class="home-trust-chip__bar"
          x="26"
          y="18"
          width="6"
          height="24"
          rx="2"
          :fill="`url(#${badge_gid})`"
          style="--d: 0.24s"
        />
        <rect
          class="home-trust-chip__bar"
          x="34"
          y="24"
          width="6"
          height="18"
          rx="2"
          :fill="`url(#${badge_gid})`"
          style="--d: 0.36s"
        />
        <text
          x="24"
          y="16"
          text-anchor="middle"
          fill="#eef8ff"
          font-size="11"
          font-weight="800"
        >
          {{ initials }}
        </text>
      </svg>
    </div>
    <span class="home-trust-chip__text">{{ name }}</span>
  </div>
</template>

<script setup>
import { computed, ref, useId } from 'vue'
import { use_component_reveal } from '../application/use_component_reveal'

const root_el = ref(null)
use_component_reveal()

const props = defineProps({
  name: { type: String, required: true },
  variant: { type: String, required: true },
  logo_domain: { type: String, default: undefined },
  reveal_delay: { type: String, required: true },
})

const badge_gid = `trust-${useId().replace(/[^a-zA-Z0-9]/g, '')}`

function trust_initials(raw) {
  const t = raw.trim()
  if (/^x5/i.test(t)) return 'X5'
  if (t.includes('.')) {
    const before = t.split('.')[0]?.replace(/[^a-zA-Zа-яА-ЯёЁ0-9]/g, '') ?? ''
    if (before.length >= 2) return before.slice(0, 2).toUpperCase()
  }
  const parts = t.split(/\s+/).filter((p) => /\S/.test(p))
  if (parts.length >= 2) {
    const a = (parts[0]?.[0] ?? '') + (parts[1]?.[0] ?? '')
    return a.toUpperCase()
  }
  return t.slice(0, 2).toUpperCase()
}

const initials = computed(() => trust_initials(props.name))
</script>

<style scoped>
.home-trust-chip__badge {
  width: 40px;
  height: 40px;
  display: block;
}

.home-trust-chip__bar {
  transform-origin: bottom center;
  animation: trust-bar-wave 2.2s ease-in-out infinite;
  animation-delay: var(--d, 0ms);
}

@keyframes trust-bar-wave {
  0%,
  100% {
    transform: scaleY(0.6);
    opacity: 0.75;
  }
  50% {
    transform: scaleY(1);
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .home-trust-chip__bar {
    animation: none;
    transform: scaleY(1);
  }
}
</style>
