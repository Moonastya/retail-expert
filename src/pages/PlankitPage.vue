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
        <div class="plankit-platform plankit-glass">
          <div class="plankit-platform-top">
            <strong>Общие правила и политики компании</strong>
            <span>Промо-политика, ассортиментные приоритеты и критерии согласования</span>
          </div>
          <div class="plankit-people-row">
            <article class="plankit-person" style="--delay: 40ms">
              <div class="avatar" aria-hidden="true"><span>КЛ</span></div>
              <h3>Клиент</h3>
            </article>
            <article class="plankit-person" style="--delay: 80ms">
              <div class="avatar avatar--kam" aria-hidden="true"><span>KAM</span></div>
              <h3>Отдел продаж (KAM)</h3>
            </article>
            <article class="plankit-person" style="--delay: 120ms">
              <div class="avatar avatar--tm" aria-hidden="true"><span>TM</span></div>
              <h3>Трейд-маркетинг</h3>
            </article>
            <article class="plankit-person" style="--delay: 160ms">
              <div class="avatar avatar--plan" aria-hidden="true"><span>S&amp;OP</span></div>
              <h3>Функция планирования</h3>
            </article>
            <article class="plankit-person" style="--delay: 200ms">
              <div class="avatar avatar--fin" aria-hidden="true"><span>FIN</span></div>
              <h3>Коммерческие финансы</h3>
            </article>
          </div>
          <div class="plankit-feature-row">
            <article style="--delay: 80ms">
              <div class="plankit-feat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M5 7h14v12H5V7Z"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linejoin="round"
                  />
                  <path d="M9 7V5.5A1.5 1.5 0 0 1 10.5 4h3A1.5 1.5 0 0 1 15 5.5V7" stroke="currentColor" stroke-width="1.5" />
                </svg>
              </div>
              <p>Кабинет KAM<br />Промо-план<br />Off take</p>
            </article>
            <article style="--delay: 120ms">
              <div class="plankit-feat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 17l5-6 4 4 7-9"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
              <p>Согласование<br />Контроль<br />Эффективность</p>
            </article>
            <article style="--delay: 160ms">
              <div class="plankit-feat-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 18V8M10 18V5M15 18v-7M20 18V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                </svg>
              </div>
              <p>Точный прогноз<br />По неделям и SKU<br />Аналитика</p>
            </article>
            <article style="--delay: 200ms">
              <div class="plankit-feat-icon plankit-feat-icon--accent" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M4 16h16M6 12h4M14 8h4"
                    stroke="currentColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                </svg>
              </div>
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
          <article style="--delay: 40ms">
            <div class="channel-head">
              <span class="plankit-ch-badge">СН</span>
              <h3>Прямые сети</h3>
            </div>
            <p>Промо-календарь и регулярные отгрузки</p>
          </article>
          <article style="--delay: 80ms">
            <div class="channel-head">
              <span class="plankit-ch-badge">POS</span>
              <h3>Кассовые продажи</h3>
            </div>
            <p>Offtake, дистрибуция и товарная матрица</p>
          </article>
          <article style="--delay: 120ms">
            <div class="channel-head">
              <span class="plankit-ch-badge">DT</span>
              <h3>Дистрибьюторы</h3>
            </div>
            <p>ML-модели: Sell Out → Stock → Sell In</p>
          </article>
          <article style="--delay: 160ms">
            <div class="channel-head">
              <span class="plankit-ch-badge">RT</span>
              <h3>Сети / Розница / HoReCa</h3>
            </div>
            <p>Единая омниканальная модель сбыта</p>
          </article>
          <article style="--delay: 200ms">
            <div class="channel-head">
              <span class="plankit-ch-badge">EC</span>
              <h3>E-commerce</h3>
            </div>
            <p>Медиапланирование и промо-поддержка</p>
          </article>
          <article style="--delay: 240ms">
            <div class="channel-head">
              <span class="plankit-ch-badge">ПВЗ</span>
              <h3>ПВЗ</h3>
            </div>
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
            <h3><span class="plankit-check" aria-hidden="true">✓</span> Drag&amp;Drop Интерфейс</h3>
            <ul>
              <li>Простое визуальное планирование</li>
              <li>Сокращение времени на рутинные операции</li>
              <li>Быстрое добавление и перенос промо-активностей</li>
            </ul>
          </article>
          <article  style="--delay: 80ms">
            <h3><span class="plankit-check" aria-hidden="true">✓</span> Real-time Simulation</h3>
            <ul>
              <li>Изменения сразу отражаются в P&amp;L</li>
              <li>Без ночных пересчетов и задержек в отчетности</li>
            </ul>
          </article>
          <article  style="--delay: 120ms">
            <h3><span class="plankit-check" aria-hidden="true">✓</span> Кабинет для КАМ</h3>
            <ul>
              <li>Наглядный промо-план по клиентам и периодам</li>
              <li>Отслеживание активности конкурентов</li>
              <li>Инструменты для ежедневной работы KAM</li>
            </ul>
          </article>
          <article  style="--delay: 160ms">
            <h3><span class="plankit-check" aria-hidden="true">✓</span> Сценичность и версионность</h3>
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

/* Тёмное стекло вместо белой карточки из глобального style.css */
.plankit-image-section h2 {
  color: #eef8ff;
}

.plankit-glass,
.plankit-platform {
  position: relative;
  overflow: hidden;
  padding: 28px;
  border-radius: var(--radius-card, 22px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  background: linear-gradient(
    155deg,
    rgba(22, 36, 62, 0.92) 0%,
    rgba(14, 24, 44, 0.96) 100%
  );
  box-shadow: var(--shadow-card, 0 24px 56px rgba(0, 0, 0, 0.32));
  color: #eef8ff;
}

.plankit-platform-top {
  margin-bottom: 18px;
  padding: 14px 16px;
  text-align: center;
  border-radius: 12px;
  border: 1px solid rgba(22, 215, 196, 0.22);
  background: rgba(22, 215, 196, 0.06);
}

.plankit-platform-top strong {
  display: block;
  margin-bottom: 4px;
  font-size: 15px;
  font-weight: 600;
  color: #eef8ff;
}

.plankit-platform-top span {
  font-size: 13px;
  line-height: 1.45;
  color: #a8b8d4;
}

.plankit-person {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.1);
  transition:
    border-color 0.25s ease,
    transform 0.25s ease;
}

.plankit-person:hover {
  transform: translateY(-2px);
  border-color: rgba(22, 215, 196, 0.35);
}

.plankit-person .avatar {
  width: 52px;
  height: 52px;
  margin: 0 auto 8px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.02em;
  color: #eef8ff;
  background: linear-gradient(
    135deg,
    rgba(124, 92, 255, 0.45) 0%,
    rgba(22, 215, 196, 0.35) 100%
  );
  border: 1px solid rgba(22, 215, 196, 0.35);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
}

.plankit-person .avatar span {
  font-size: 11px;
  line-height: 1;
}

.plankit-person .avatar--kam {
  background: linear-gradient(135deg, rgba(22, 215, 196, 0.4), rgba(30, 80, 140, 0.5));
}

.plankit-person .avatar--tm {
  background: linear-gradient(135deg, rgba(124, 92, 255, 0.5), rgba(22, 215, 196, 0.3));
}

.plankit-person .avatar--plan {
  background: linear-gradient(135deg, rgba(246, 198, 107, 0.35), rgba(22, 215, 196, 0.35));
}

.plankit-person .avatar--fin {
  background: linear-gradient(135deg, rgba(30, 80, 140, 0.55), rgba(124, 92, 255, 0.4));
}

.plankit-person h3 {
  color: #eef8ff;
  font-size: 12px;
  font-weight: 500;
}

.plankit-feature-row article {
  background: rgba(255, 255, 255, 0.04);
  border-color: rgba(255, 255, 255, 0.1);
  padding: 14px 10px;
}

.plankit-feat-icon {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  margin: 0 auto 10px;
  border-radius: 12px;
  color: #16d7c4;
  background: rgba(22, 215, 196, 0.1);
  border: 1px solid rgba(22, 215, 196, 0.28);
}

.plankit-feat-icon svg {
  width: 22px;
  height: 22px;
}

.plankit-feat-icon--accent {
  color: #7c5cff;
  background: rgba(124, 92, 255, 0.12);
  border-color: rgba(124, 92, 255, 0.35);
}

.plankit-feature-row p {
  color: #c5d4ea;
  font-size: 12px;
}

.plankit-platform-note {
  margin-top: 4px;
  padding: 14px 16px;
  border-style: dashed;
  border-color: rgba(22, 215, 196, 0.4);
  background: rgba(22, 215, 196, 0.05);
}

.plankit-platform-note h4 {
  color: #eef8ff;
  font-weight: 600;
}

.plankit-platform-note ul {
  color: #a8b8d4;
}

.plankit-channels article {
  background: linear-gradient(
    155deg,
    rgba(22, 36, 62, 0.75) 0%,
    rgba(14, 24, 44, 0.88) 100%
  );
  border-color: rgba(255, 255, 255, 0.1);
}

.plankit-channels h3 {
  color: #eef8ff;
}

.channel-head {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
}

.plankit-ch-badge {
  flex-shrink: 0;
  display: grid;
  place-items: center;
  min-width: 44px;
  height: 44px;
  padding: 0 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.04em;
  color: #eef8ff;
  background: linear-gradient(
    135deg,
    rgba(124, 92, 255, 0.4) 0%,
    rgba(22, 215, 196, 0.3) 100%
  );
  border: 1px solid rgba(22, 215, 196, 0.3);
}

.plankit-unique article {
  background: linear-gradient(
    155deg,
    rgba(22, 36, 62, 0.75) 0%,
    rgba(14, 24, 44, 0.88) 100%
  );
  border-color: rgba(255, 255, 255, 0.1);
}

.plankit-unique article h3 {
  color: #eef8ff;
}

.plankit-check {
  display: inline-grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 700;
  color: #16d7c4;
  background: rgba(22, 215, 196, 0.12);
  border: 1px solid rgba(22, 215, 196, 0.35);
}

.plankit-flow-hint span:not(.arrow) {
  padding: 6px 12px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #eef8ff;
}

@media (max-width: 900px) {
  .plankit-person .avatar--plan span {
    font-size: 9px;
  }
}
</style>
