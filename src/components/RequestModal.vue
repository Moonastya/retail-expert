<template>
  <Teleport to="body">
    <Transition name="modal-overlay-fade">
      <div
        v-if="is_request_modal_open"
        class="rex-modal-overlay"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rex-modal-title"
        @click.self="close"
      >
        <div class="rex-modal-panel">
          <button
            class="rex-modal-close"
            type="button"
            aria-label="Закрыть"
            @click="close"
          >
            ×
          </button>
          <RequestForm title="Форма заявки" title_id="rex-modal-title" />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onBeforeUnmount, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import RequestForm from './RequestForm.vue'
import { close_request_modal, is_request_modal_open } from '../application/request_modal'

const route = useRoute()

const close = () => {
  close_request_modal()
}

const onKeydown = (e) => {
  if (e.key === 'Escape') {
    close()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})

watch(is_request_modal_open, (isOpen) => {
  document.body.style.overflow = isOpen ? 'hidden' : ''
})

watch(
  () => route.fullPath,
  () => {
    close_request_modal()
  },
)
</script>

<style scoped>
.rex-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  padding: 20px;
  background: rgba(6, 10, 18, 0.82);
  backdrop-filter: blur(10px);
}

.rex-modal-panel {
  position: relative;
  width: min(640px, 92vw);
  max-height: 92vh;
  overflow: auto;
  padding: 28px 30px 26px;
  border-radius: var(--radius-card, 22px);
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: linear-gradient(
    155deg,
    rgba(22, 36, 62, 0.98) 0%,
    rgba(14, 24, 44, 0.99) 100%
  );
  box-shadow:
    0 32px 80px rgba(0, 0, 0, 0.55),
    0 0 0 1px rgba(22, 215, 196, 0.1) inset,
    0 0 48px rgba(22, 215, 196, 0.1);
}

.rex-modal-close {
  position: absolute;
  top: 12px;
  right: 14px;
  z-index: 2;
  width: 36px;
  height: 36px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.06);
  color: #a8b8d4;
  font-size: 22px;
  line-height: 1;
  cursor: pointer;
  transition:
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
}

.rex-modal-close:hover {
  color: #eef8ff;
  border-color: rgba(22, 215, 196, 0.45);
  background: rgba(22, 215, 196, 0.12);
}

.modal-overlay-fade-enter-active,
.modal-overlay-fade-leave-active {
  transition: opacity 0.28s ease;
}

.modal-overlay-fade-enter-active .rex-modal-panel,
.modal-overlay-fade-leave-active .rex-modal-panel {
  transition:
    opacity 0.28s ease,
    transform 0.32s cubic-bezier(0.22, 1, 0.36, 1);
}

.modal-overlay-fade-enter-from,
.modal-overlay-fade-leave-to {
  opacity: 0;
}

.modal-overlay-fade-enter-from .rex-modal-panel,
.modal-overlay-fade-leave-to .rex-modal-panel {
  opacity: 0;
  transform: translateY(16px) scale(0.98);
}
</style>

