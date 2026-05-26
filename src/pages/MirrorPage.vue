<template>
  <div class="mirror-page">
    <iframe
      class="mirror-frame"
      :src="src"
      title="Retail Expert mirror"
      loading="eager"
      referrerpolicy="no-referrer-when-downgrade"
    />
  </div>
</template>

<script setup>
defineProps({
  src: {
    type: String,
    required: true,
  },
})
</script>
