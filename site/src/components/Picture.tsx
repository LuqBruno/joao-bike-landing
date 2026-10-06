import manifest from '@/content/images.json'

type Entry = { w: number; h: number; widths: number[] }
const images = manifest as Record<string, Entry>
// Caminho relativo ao documento: funciona na raiz e em subpasta (GitHub Pages), também no HTML pré-renderizado.
const base = './'

export function imageSrc(name: string, width?: number, format: 'webp' | 'avif' = 'webp') {
  const entry = images[name]
  const chosen = width ?? entry.widths[entry.widths.length - 1]
  return `${base}img/${name}-${chosen}.${format}`
}

type Props = {
  name: string
  alt: string
  sizes: string
  priority?: boolean
  className?: string
}

/** Imagem responsiva AVIF/WebP com dimensões reservadas (evita deslocamento de layout). */
export function Picture({ name, alt, sizes, priority = false, className }: Props) {
  const entry = images[name]
  if (!entry) throw new Error(`Imagem sem manifesto: ${name}`)
  const set = (format: 'avif' | 'webp') => entry.widths.map((w) => `${base}img/${name}-${w}.${format} ${w}w`).join(', ')
  return (
    <picture className={className}>
      <source type="image/avif" srcSet={set('avif')} sizes={sizes} />
      <img
        src={imageSrc(name)}
        srcSet={set('webp')}
        sizes={sizes}
        width={entry.w}
        height={entry.h}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
      />
    </picture>
  )
}
