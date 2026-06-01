/**
 * Блок «Нам доверяют»: логотипы из src/assets/trust (через Vite).
 */
import { resolve_trust_logo } from './trust_logo_urls'

export type TrustTileVariant = 'blue' | 'white'

export type TrustClientEntry = {
  name: string
  variant: TrustTileVariant
  logo: string
}

export const TRUST_CLIENTS: TrustClientEntry[] = [
  { name: 'X5 Group', variant: 'blue', logo: resolve_trust_logo('x5.png') },
  { name: 'Магнит', variant: 'blue', logo: resolve_trust_logo('magnit.png') },
  { name: 'Лента', variant: 'white', logo: resolve_trust_logo('lenta.png') },
  { name: 'ЭКО', variant: 'blue', logo: resolve_trust_logo('eko.png') },
  { name: 'Heinz', variant: 'blue', logo: resolve_trust_logo('heinz.png') },
  { name: 'Русский Стандарт', variant: 'white', logo: resolve_trust_logo('rustandard.png') },
  { name: 'simple', variant: 'white', logo: resolve_trust_logo('simple.png') },
  { name: 'Савушкин продукт', variant: 'blue', logo: resolve_trust_logo('savushkin.png') },
  { name: 'Campari', variant: 'white', logo: resolve_trust_logo('campari.png') },
  { name: 'Beluga', variant: 'white', logo: resolve_trust_logo('beluga.png') },
  { name: 'Bacardi', variant: 'blue', logo: resolve_trust_logo('bacardi.png') },
  { name: 'Мистраль', variant: 'white', logo: resolve_trust_logo('mistral.png') },
  { name: 'Grass.su', variant: 'white', logo: resolve_trust_logo('grass.png') },
  { name: 'Балтика', variant: 'blue', logo: resolve_trust_logo('baltika.png') },
  { name: 'Splat', variant: 'blue', logo: resolve_trust_logo('splat.svg') },
  { name: 'Pepsi', variant: 'blue', logo: resolve_trust_logo('pepsi.png') },
  { name: 'Bonduelle', variant: 'blue', logo: resolve_trust_logo('bonduelle.png') },
  { name: 'Jacobs', variant: 'white', logo: resolve_trust_logo('jacobs.svg') },
  { name: 'Mars', variant: 'blue', logo: resolve_trust_logo('mars.png') },
  { name: 'Cotton Club', variant: 'white', logo: resolve_trust_logo('cottonclub.png') },
]
