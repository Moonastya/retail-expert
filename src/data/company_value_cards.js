/** Контент слайда «Единый дата-партнёр» (6 карточек). */
export const COMPANY_VALUE_CARDS = [
  {
    id: 'coverage',
    title: 'Покрытие',
    variant: 'accent',
    stat: '>80%',
    text: 'рынка FMCG России покрывает аналитика Retail Expert',
    art: 'map',
  },
  {
    id: 'granularity',
    title: 'Гранулярность',
    variant: 'glass',
    intro: 'Данные детализированы до уровня:',
    bullets: [
      'производителей, розничных сетей, категорий и SKU',
      'от региона до торговой точки (ТТ)',
      'продажи в рублях и штуках',
      'месяц / неделя / день',
    ],
    art: 'pie',
  },
  {
    id: 'convenience',
    title: 'Удобство',
    variant: 'accent',
    text: 'Все вычислительные мощности находятся на нашей стороне',
    art: 'sync',
    dots: true,
  },
  {
    id: 'data',
    title: 'Данные',
    variant: 'glass',
    intro: 'Доступны и регулярно обновляются данные по:',
    stats: [
      { value: '350 000+', label: 'торговым точкам' },
      { value: '700 000+', label: 'товарам' },
    ],
    art: 'database',
  },
  {
    id: 'accuracy',
    title: 'Точность',
    variant: 'accent',
    stat: '98%',
    text: 'Гарантируем качество данных и точность алгоритмов',
    art: 'trend',
    dots: true,
  },
  {
    id: 'security',
    title: 'Безопасность',
    variant: 'glass',
    text: 'Обеспечиваем настраиваемое разграничение прав доступа пользователей',
    art: 'shield',
  },
]
