<template>
  <form class="rex-request-form" @submit.prevent="submitRequest">
    <h3 :id="title_id">{{ title }}</h3>
    <div class="form-grid form-grid-single">
      <input v-model.trim="form.name" type="text" placeholder="Имя Фамилия" />
      <input v-model.trim="form.position" type="text" placeholder="Должность" />
      <input v-model.trim="form.company" type="text" placeholder="Компания" />
      <input v-model.trim="form.email" type="email" placeholder="E-mail" />
      <input v-model.trim="form.phone" type="tel" placeholder="Телефон" />
      <input v-model.trim="form.industry" type="text" placeholder="Отрасль" />
      <textarea v-model.trim="form.message" rows="4" placeholder="Опишите запрос подробнее"></textarea>
    </div>
    <label class="form-agree">
      <input v-model="form.is_agree" type="checkbox" />
      <span>
        Нажимая кнопку "Отправить" я подтверждаю, что ознакомился с положениями
        <a href="/policy" @click.prevent="handlePolicyClick">
          Политики в отношении обработки персональных данных
        </a>
        ООО "Ритейл Эксперт" и даю согласие на обработку моих персональных данных, указанных в
        форме обращения, в соответствии с порядком обработки, установленным ООО "Ритейл Эксперт".
        <br /><br />
        Переданные средствами сайта персональные данные считаются общедоступными в соответствии со
        статьей 8. Федерального закона "О персональных данных" от 8 июля 2006 года.
      </span>
    </label>
    <p v-if="submitError" class="form-feedback form-feedback-error">{{ submitError }}</p>
    <p v-if="submitSuccess" class="form-feedback form-feedback-success">Заявка успешно отправлена.</p>
    <button class="btn" type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
    </button>
  </form>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { close_request_modal } from '../application/request_modal'

const router = useRouter()
const isSubmitting = ref(false)
const submitError = ref('')
const submitSuccess = ref(false)

const createInitialForm = () => ({
  name: '',
  position: '',
  company: '',
  email: '',
  phone: '',
  industry: '',
  message: '',
  is_agree: false,
})

const form = reactive(createInitialForm())

const resetForm = () => {
  Object.assign(form, createInitialForm())
}

const handlePolicyClick = async () => {
  close_request_modal()
  await router.push('/policy')
}

const submitRequest = async () => {
  submitError.value = ''
  submitSuccess.value = false

  if (!form.name || !form.email || !form.phone || !form.message) {
    submitError.value = 'Заполните обязательные поля: имя, email, телефон, сообщение.'
    return
  }

  if (!form.is_agree) {
    submitError.value = 'Подтвердите согласие на обработку персональных данных.'
    return
  }

  isSubmitting.value = true

  try {
    const response = await fetch('/send.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    })
    const result = await response.json()

    if (!response.ok || !result.ok) {
      submitError.value = result.error || 'Не удалось отправить заявку. Попробуйте позже.'
      return
    }

    submitSuccess.value = true
    resetForm()
  } catch (error) {
    submitError.value = 'Ошибка соединения. Проверьте интернет и попробуйте снова.'
  } finally {
    isSubmitting.value = false
  }
}

defineProps({
  title: {
    type: String,
    default: 'Форма заявки',
  },
  title_id: {
    type: String,
    default: undefined,
  },
})
</script>

<style scoped>
.rex-request-form {
  display: grid;
  gap: 16px;
  margin: 0;
  padding: 0;
  background: transparent;
  border: none;
  box-shadow: none;
}

.rex-request-form h3 {
  margin: 0 0 4px;
  padding-right: 40px;
  text-align: left;
  font-size: clamp(26px, 3vw, 32px);
  font-weight: 700;
  line-height: 1.15;
  color: #eef8ff;
}

.rex-request-form .form-grid {
  display: grid;
  gap: 10px;
}

.rex-request-form .form-grid-single {
  grid-template-columns: 1fr;
}

.rex-request-form .form-grid input,
.rex-request-form .form-grid textarea {
  width: 100%;
  font-family: inherit;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.14);
  color: #eef8ff;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    background 0.2s ease;
}

.rex-request-form .form-grid input {
  min-height: 44px;
  padding: 10px 14px;
  border-radius: 12px;
  font-size: 14px;
}

.rex-request-form .form-grid textarea {
  min-height: 96px;
  padding: 12px 14px;
  border-radius: 12px;
  font-size: 14px;
  resize: vertical;
}

.rex-request-form .form-grid input::placeholder,
.rex-request-form .form-grid textarea::placeholder {
  color: rgba(168, 184, 212, 0.55);
}

.rex-request-form .form-grid input:focus,
.rex-request-form .form-grid textarea:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.09);
  border-color: rgba(22, 215, 196, 0.5);
  box-shadow: 0 0 0 3px rgba(22, 215, 196, 0.14);
}

.rex-request-form .form-agree {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  font-size: 11px;
  line-height: 1.4;
  color: var(--text-soft, #a8b8d4);
  cursor: pointer;
}

.rex-request-form .form-agree input {
  margin-top: 3px;
  accent-color: #16d7c4;
  flex-shrink: 0;
}

.rex-request-form .form-agree a {
  color: #16d7c4;
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 3px;
}

.rex-request-form .form-agree a:hover {
  color: #7c5cff;
}

.rex-request-form .form-feedback {
  margin: 0;
  font-size: 13px;
}

.rex-request-form .form-feedback-error {
  color: #f6a6a6;
}

.rex-request-form .form-feedback-success {
  color: #16d7c4;
}

.rex-request-form .btn {
  justify-self: start;
  margin-top: 4px;
}

.rex-request-form .btn:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}
</style>
