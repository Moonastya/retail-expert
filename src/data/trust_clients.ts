/**
 * Блок «Нам доверяют»: названия как на слайде + favicon по домену сайта бренда.
 * Домены подобраны вручную; при ошибке загрузки показывается монограмма (см. TrustClientChip).
 */
export type TrustTileVariant = 'blue' | 'white'

export type TrustClientEntry = {
  name: string
  variant: TrustTileVariant
  /** Домен для https://www.google.com/s2/favicons — без схемы, напр. x5.ru */
  logo_domain?: string
}

export const TRUST_CLIENTS: TrustClientEntry[] = [
  { name: 'X5 Group', variant: 'blue', logo_domain: 'x5.ru' },
  { name: 'Магнит', variant: 'blue', logo_domain: 'magnit.ru' },
  { name: 'Лента', variant: 'white', logo_domain: 'lenta.com' },
  { name: 'ЭКО', variant: 'blue', logo_domain: 'ecoproduct.ru' },
  { name: 'Heinz', variant: 'blue', logo_domain: 'heinz.com' },
  { name: 'Русский Стандарт', variant: 'white', logo_domain: 'rustandard.ru' },
  { name: 'simple', variant: 'white' },
  { name: 'Савушкин продукт', variant: 'blue', logo_domain: 'savushkin.ru' },
  { name: 'Campari', variant: 'white', logo_domain: 'campari.com' },
  { name: 'Beluga', variant: 'white', logo_domain: 'belugagroup.com' },
  { name: 'Bacardi', variant: 'blue', logo_domain: 'bacardi.com' },
  { name: 'Мистраль', variant: 'white' },
  { name: 'Grass.su', variant: 'white', logo_domain: 'grass.su' },
  { name: 'Балтика', variant: 'blue', logo_domain: 'baltika.ru' },
  { name: 'Splat', variant: 'blue', logo_domain: 'splatglobal.com' },
  { name: 'Pepsi', variant: 'blue', logo_domain: 'pepsi.com' },
  { name: 'Bonduelle', variant: 'blue', logo_domain: 'bonduelle.com' },
  { name: 'Jacobs', variant: 'white', logo_domain: 'jacobsdouweegberts.com' },
  { name: 'Mars', variant: 'blue', logo_domain: 'mars.com' },
  { name: 'Cotton Club', variant: 'white', logo_domain: 'cottonclub.ru' },
]
