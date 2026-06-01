<template>
  <div
    ref="root_el"
    class="home-trust-chip reveal"
    :class="`home-trust-chip--${variant}`"
    :style="{ '--delay': reveal_delay }"
  >
    <div class="home-trust-chip__mark" aria-hidden="true">
      <img
        v-if="show_logo"
        class="home-trust-chip__favicon"
        :src="logo"
        alt=""
        loading="lazy"
        decoding="async"
        @error="logo_failed = true"
      />
      <span v-else class="home-trust-chip__initials">{{ initials }}</span>
    </div>
    <span class="home-trust-chip__text">{{ name }}</span>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { use_component_reveal } from '../application/use_component_reveal'

const root_el = ref(null)
use_component_reveal()

const props = defineProps({
  name: { type: String, required: true },
  variant: { type: String, required: true },
  logo: { type: String, required: true },
  reveal_delay: { type: String, required: true },
})

const logo_failed = ref(false)

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
const show_logo = computed(() => Boolean(props.logo) && !logo_failed.value)
</script>

<style scoped>
.home-trust-chip {
  min-height: 96px;
  padding: 12px 10px;
  border-radius: 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition:
    transform 0.22s ease,
    box-shadow 0.22s ease,
    border-color 0.22s ease;
}

.home-trust-chip--blue {
  border: 1px solid rgba(22, 215, 196, 0.28);
  background: linear-gradient(
    155deg,
    rgba(30, 58, 120, 0.88) 0%,
    rgba(14, 28, 52, 0.96) 100%
  );
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.28),
    0 0 24px rgba(22, 215, 196, 0.06);
}

.home-trust-chip--white {
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(
    155deg,
    rgba(22, 36, 62, 0.82) 0%,
    rgba(14, 24, 44, 0.92) 100%
  );
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.24);
}

.home-trust-chip:hover {
  transform: translateY(-2px);
}

.home-trust-chip--blue:hover {
  border-color: rgba(22, 215, 196, 0.45);
  box-shadow:
    0 12px 28px rgba(0, 0, 0, 0.32),
    0 0 32px rgba(22, 215, 196, 0.12);
}

.home-trust-chip--white:hover {
  border-color: rgba(124, 92, 255, 0.35);
  box-shadow:
    0 12px 28px rgba(0, 0, 0, 0.32),
    0 0 28px rgba(124, 92, 255, 0.1);
}

.home-trust-chip--blue .home-trust-chip__mark,
.home-trust-chip--white .home-trust-chip__mark {
  min-height: 46px;
  min-width: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 12px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid rgba(20, 61, 114, 0.1);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.14);
}

.home-trust-chip__favicon {
  width: auto;
  max-width: 76px;
  max-height: 38px;
  height: auto;
  object-fit: contain;
  display: block;
}

.home-trust-chip__initials {
  font-size: 0.95rem;
  font-weight: 800;
  letter-spacing: 0.03em;
  line-height: 1;
  color: #1e5aa8;
}

.home-trust-chip--blue .home-trust-chip__text,
.home-trust-chip--white .home-trust-chip__text {
  font-size: clamp(0.72rem, 1.35vw, 0.88rem);
  font-weight: 600;
  text-align: center;
  line-height: 1.25;
  letter-spacing: 0.01em;
  color: #ffffff;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.45);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  hyphens: auto;
  word-break: break-word;
}
</style>
