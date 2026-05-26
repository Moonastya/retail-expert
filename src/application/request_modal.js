import { ref } from 'vue'

export const is_request_modal_open = ref(false)

export const open_request_modal = () => {
  is_request_modal_open.value = true
}

export const close_request_modal = () => {
  is_request_modal_open.value = false
}

