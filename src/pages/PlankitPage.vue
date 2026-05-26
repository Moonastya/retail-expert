<template>
  <div class="plankit-page">
    <section class="plankit-hero">
      <div class="container">
        <p class="plankit-logo">plankit</p>
        <h1>Demand planning platform</h1>
        <p class="plankit-sub">
          Единая платформа для управления промо, прогнозирования спроса и контроля финансовых показателей
        </p>
        <div
          class="plankit-top-buttons"
          role="tablist"
          aria-label="Модули Plankit"
        >
          <button
            v-for="tab in hero_tabs"
            :key="tab.id"
            type="button"
            role="tab"
            :class="{ 'is-active': active_hero_tab === tab.id }"
            :aria-selected="active_hero_tab === tab.id ? 'true' : 'false'"
            @click="set_hero_tab(tab.id)"
          >
            {{ tab.label }}
          </button>
        </div>
        <div class="plankit-hero-art">
          <PlankitHeroPanel :key="active_hero_tab" :variant="active_hero_tab" />
        </div>
      </div>
    </section>

    <section class="plankit-image-section">
      <div class="container">
        <h2>Единый источник планов</h2>
        <div>
          <PlankitFlowIllustration variant="platform" aria_label="Схема S&OP платформы Plankit" />
        </div>
        <div class="plankit-platform">
          <div class="plankit-platform-top">
            <strong>Общие правила и политики компании</strong>
            <span>Промо-политика, ассортиментные приоритеты и критерии согласования</span>
          </div>
          <div class="plankit-people-row">
            <article class="plankit-person" style="--delay: 40ms">
              <div class="avatar">👤</div>
              <h3>Клиент</h3>
            </article>
            <article class="plankit-person" style="--delay: 80ms">
              <div class="avatar">👨‍💼</div>
              <h3>Отдел продаж (KAM)</h3>
            </article>
            <article class="plankit-person" style="--delay: 120ms">
              <div class="avatar">🧑‍💼</div>
              <h3>Трейд маркетинг</h3>
            </article>
            <article class="plankit-person" style="--delay: 160ms">
              <div class="avatar">👨‍🔧</div>
              <h3>Функция планирования</h3>
            </article>
            <article class="plankit-person" style="--delay: 200ms">
              <div class="avatar">👩‍💼</div>
              <h3>Коммерческие финансы</h3>
            </article>
          </div>
          <div class="plankit-feature-row">
            <article  style="--delay: 80ms">
              <div class="icon">🗂️</div>
              <p>Кабинет KAM<br />Промо-план<br />Off take</p>
            </article>
            <article  style="--delay: 120ms">
              <div class="icon">📈</div>
              <p>Согласование<br />Контроль<br />Эффективность</p>
            </article>
            <article  style="--delay: 160ms">
              <div class="icon">📊</div>
              <p>Точный прогноз<br />По неделям и SKU<br />Аналитика</p>
            </article>
            <article  style="--delay: 200ms">
              <div class="icon">💹</div>
              <p>P&amp;L<br />Бюджеты<br />ROI</p>
            </article>
          </div>
          <div class="plankit-platform-note" style="--delay: 220ms">
            <h4>Внутренние системы и процессы компании</h4>
            <ul>
              <li>Общий финансовый план компании</li>
              <li>План продаж для KPI команд</li>
              <li>План по SKU для производства и закупок</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <section class="plankit-image-section">
      <div class="container">
        <h2>План по всем каналам сбыта</h2>
        <div>
          <PlankitFlowIllustration variant="channels" aria_label="Омниканальный поток данных" />
        </div>
        <div class="plankit-channels">
          <article  style="--delay: 40ms">
            <div class="channel-head"><span class="ch-icon">🏬</span><h3>Прямые сети</h3></div>
            <p>Промо-календарь и регулярные отгрузки</p>
          </article>
          <article  style="--delay: 80ms">
            <div class="channel-head"><span class="ch-icon">🧾</span><h3>Кассовые продажи</h3></div>
            <p>Offtake, дистрибуция и товарная матрица</p>
          </article>
          <article  style="--delay: 120ms">
            <div class="channel-head"><span class="ch-icon">🚚</span><h3>Дистрибьюторы</h3></div>
            <p>ML-модели: Sell Out -&gt; Stock -&gt; Sell In</p>
          </article>
          <article  style="--delay: 160ms">
            <div class="channel-head"><span class="ch-icon">🏪</span><h3>Сети / Розница / HoReCa</h3></div>
            <p>Единая омниканальная модель сбыта</p>
          </article>
          <article  style="--delay: 200ms">
            <div class="channel-head"><span class="ch-icon">🛍️</span><h3>E-commerce</h3></div>
            <p>Медиапланирование и промо-поддержка</p>
          </article>
          <article  style="--delay: 240ms">
            <div class="channel-head"><span class="ch-icon">📦</span><h3>ПВЗ</h3></div>
            <p>Пункты выдачи заказов и локальная доступность</p>
          </article>
        </div>
        <div class="plankit-flow-hint" style="--delay: 280ms">
          <span>Sell Out</span>
          <span class="arrow">→</span>
          <span>Stock</span>
          <span class="arrow">→</span>
          <span>Sell In</span>
        </div>
      </div>
    </section>

    <section class="plankit-image-section">
      <div class="container">
        <h2>Уникальность системы</h2>
        <div>
          <PlankitFlowIllustration variant="forecast" aria_label="Точность прогноза и тренд" />
        </div>
        <div class="plankit-unique">
          <article  style="--delay: 40ms">
            <h3><span class="u-icon">✓</span> Drag&Drop Интерфейс</h3>
            <ul>
              <li>Простое визуальное планирование</li>
              <li>Сокращение времени на рутинные операции</li>
              <li>Быстрое добавление и перенос промо-активностей</li>
            </ul>
          </article>
          <article  style="--delay: 80ms">
            <h3><span class="u-icon">✓</span> Real-time Simulation</h3>
            <ul>
              <li>Изменения сразу отражаются в P&amp;L</li>
              <li>Без ночных пересчетов и задержек в отчетности</li>
            </ul>
          </article>
          <article  style="--delay: 120ms">
            <h3><span class="u-icon">✓</span> Кабинет для КАМ</h3>
            <ul>
              <li>Наглядный промо-план по клиентам и периодам</li>
              <li>Отслеживание активности конкурентов</li>
              <li>Инструменты для ежедневной работы KAM</li>
            </ul>
          </article>
          <article  style="--delay: 160ms">
            <h3><span class="u-icon">✓</span> Сценичность и версионность</h3>
            <ul>
              <li>Сценарное моделирование и сравнение версий</li>
              <li>Автоматический расчет промо-прогноза</li>
              <li>Оценка точности и качества прогноза</li>
              <li>Быстрый выбор оптимального сценария</li>
            </ul>
          </article>
        </div>
      </div>
    </section>

    <section class="plankit-image-section">
      <div class="container">
        <div class="plankit-cta">
          <p>Оставьте заявку, чтобы получить подробную информацию о возможностях платформы и стоимости внедрения</p>
          <button
            class="plankit-requirements-toggle"
            type="button"
            :aria-expanded="is_requirements_visible ? 'true' : 'false'"
            @click="toggleRequirements"
          >
            <small>Информация, необходимая для установки и эксплуатации программного обеспечения</small>
            <span>{{ is_requirements_visible ? '×' : '+' }}</span>
          </button>

          <section v-if="is_requirements_visible" class="plankit-requirements">
            <ul>
              <li>
                Системные требования к серверу: DDR3 32 - 64 ГБ, процессор 8 ядер с частотой 3.4ГГц,
                жесткий диск NVMe 200ГБ+.
              </li>
              <li>Операционная система: Ubuntu Server 22.04 LTS.</li>
              <li>Открытые порты: 443 SSL и 22 SSH.</li>
              <li>Поддерживаемые браузеры на базе Chrome.</li>
            </ul>

            <p>
              Для установки программы пользователю необходимо предоставить доступ администратора по
              SSH/RDP к своему серверу.
            </p>
            <p>
              Наш специалист установит все необходимые настройки и компоненты, а также настроит
              конфигурации.
            </p>
            <p>Экземпляр программного обеспечения не устанавливаем на сервер пользователя в виде Docker-файла.</p>
            <p>
              В ходе эксплуатации в случае возникновения запросов пользователь всегда может обратиться
              в службу технической поддержки.
            </p>
            <p>Доработка и обновление производится индивидуально для каждого заказчика.</p>

            <p class="plankit-requirements-footer">
              Более подробная информация опубликована в руководстве по установке и руководстве
              пользователя.
            </p>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import PlankitFlowIllustration from '../components/PlankitFlowIllustration.vue'
import PlankitHeroPanel from '../components/PlankitHeroPanel.vue'

const hero_tabs = [
  { id: 'sales', label: 'Sales' },
  { id: 'promo', label: 'Promo' },
  { id: 'finance', label: 'Finance' },
]

const active_hero_tab = ref('sales')

const set_hero_tab = (tab_id) => {
  active_hero_tab.value = tab_id
}

const is_requirements_visible = ref(false)

const toggleRequirements = () => {
  is_requirements_visible.value = !is_requirements_visible.value
}
</script>

<style scoped>
.plankit-page {
  min-height: 50vh;
}

.plankit-hero h1 {
  color: #eef8ff;
}

.plankit-top-buttons button.is-active {
  background: rgba(22, 215, 196, 0.22);
  border-color: rgba(22, 215, 196, 0.55);
  color: #eef8ff;
  box-shadow: 0 14px 32px rgba(22, 215, 196, 0.18);
}

.plankit-hero-art {
  margin-top: 22px;
}
</style>
