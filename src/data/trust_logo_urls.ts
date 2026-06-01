const logo_modules = import.meta.glob('../assets/trust/*.{png,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

export function resolve_trust_logo(file: string): string {
  return logo_modules[`../assets/trust/${file}`] ?? ''
}
