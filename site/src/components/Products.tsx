import { useCallback, useEffect, useState, type KeyboardEvent } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { products, store, whatsappLink } from '@/content/site'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { Picture } from './Picture'
import { ArrowLeft, ArrowRight, Trail, WhatsAppIcon } from './Icons'

export function Products() {
  const reduced = useReducedMotion()
  const [viewport, api] = useEmblaCarousel({ align: 'start', containScroll: 'trimSnaps', duration: reduced ? 10 : 28, skipSnaps: false })
  const [snaps, setSnaps] = useState<number[]>([])
  const [index, setIndex] = useState(0)

  const sync = useCallback(() => {
    if (!api) return
    setSnaps(api.scrollSnapList())
    setIndex(api.selectedScrollSnap())
  }, [api])

  useEffect(() => {
    if (!api) return
    sync()
    api.on('select', sync).on('reInit', sync)
    return () => { api.off('select', sync).off('reInit', sync) }
  }, [api, sync])

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'ArrowRight') { event.preventDefault(); api?.scrollNext(reduced) }
    if (event.key === 'ArrowLeft') { event.preventDefault(); api?.scrollPrev(reduced) }
  }

  const total = snaps.length || products.length

  return (
    <section className="section section--gelo on-light" id="vitrine" aria-labelledby="vitrine-title">
      <div className="wrap">
        <div className="section__head">
          <div data-reveal>
            <Trail />
            <h2 className="h2" id="vitrine-title">Na vitrine da loja</h2>
          </div>
          <p className="lead muted" data-reveal>
            Modelos que a João Bike apresentou nas últimas semanas. Cores, tamanhos e condições mudam: confirme a disponibilidade com a equipe.
          </p>
        </div>

        <div
          className="vitrine"
          role="region"
          aria-roledescription="carrossel"
          aria-label="Bicicletas em destaque"
        >
          <div className="vitrine__viewport" ref={viewport} tabIndex={0} onKeyDown={onKeyDown} aria-describedby="vitrine-dica">
            <div className="vitrine__track">
              {products.map((product, i) => (
                <div
                  className="vitrine__slide"
                  key={product.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} de ${products.length}: ${product.name}`}
                >
                  <article className="product">
                    <div className="product__media">
                      <Picture name={product.image} alt={product.alt} sizes="(min-width: 1024px) 34vw, (min-width: 600px) 420px, 82vw" />
                      <span className="product__kind">{product.kind}</span>
                    </div>
                    <div>
                      <h3 className="h3">{product.name}</h3>
                      <ul className="product__specs" role="list">
                        {product.specs.map((spec) => <li key={spec}>{spec}</li>)}
                      </ul>
                      <p className="product__colors">Cores: {product.colors}</p>
                    </div>
                    <div className="product__actions">
                      <a
                        className="btn"
                        href={whatsappLink(`Olá, João Bike! Vi a ${product.name} no site e quero saber disponibilidade, cores e condições.`)}
                        target="_blank"
                        rel="noopener"
                      >
                        <WhatsAppIcon />Falar sobre este modelo
                      </a>
                      <a className="text-link fine" href={product.source} target="_blank" rel="noopener">
                        Ver post da loja<span className="sr-only"> sobre a {product.name} (abre o Instagram)</span>
                      </a>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <div className="vitrine__controls">
            <button type="button" className="vitrine__btn" onClick={() => api?.scrollPrev(reduced)} disabled={index === 0} aria-label="Modelo anterior">
              <ArrowLeft />
            </button>
            <button type="button" className="vitrine__btn" onClick={() => api?.scrollNext(reduced)} disabled={index >= total - 1} aria-label="Próximo modelo">
              <ArrowRight />
            </button>
            <div className="vitrine__progress" aria-label="Posição no carrossel">
              {snaps.map((_, i) => (
                <button key={i} type="button" aria-label={`Ir para a posição ${i + 1}`} aria-current={i === index} onClick={() => api?.scrollTo(i, reduced)} />
              ))}
            </div>
            <span className="vitrine__count" aria-live="polite" aria-atomic="true">{index + 1} de {total}</span>
          </div>
          <p className="fine muted" id="vitrine-dica" style={{ margin: '18px 0 0' }}>
            Arraste para o lado ou use as setas do teclado. {store.payment}
          </p>
        </div>
      </div>
    </section>
  )
}
