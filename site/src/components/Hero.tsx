import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { HEX_PATH, HEX_POINTS, HEX_RADII, roundedPolygon } from '@/lib/hex'
import { whatsappLink } from '@/content/site'
import { Picture } from './Picture'
import { WhatsAppIcon } from './Icons'

// Contorno externo em coordenadas do SVG (100 x 102): mesma geometria, desenhada como linha.
const RING_PATH = roundedPolygon(HEX_POINTS, HEX_RADII.map((r) => r * 100), [100, 102])

export function Hero() {
  const root = useRef<HTMLElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const q = gsap.utils.selector(root)
      const ring = root.current?.querySelector<SVGPathElement>('.hex__ring path')
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      if (ring) tl.fromTo(ring, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, ease: 'power2.inOut' }, 0)
      // A bike entra no sentido em que aponta (para a direita), como quem chega pedalando.
      // Sem partir de opacidade 0: a foto é o LCP e precisa ser pintada já no primeiro quadro.
      tl.fromTo(q('.hex__photo'), { xPercent: -5, scale: 1.05 }, { xPercent: 0, scale: 1, duration: 1.2 }, 0)
        .fromTo(q('.hero__copy .line > span'), { yPercent: 105 }, { yPercent: 0, duration: 0.85, stagger: 0.08 }, 0.15)
        .fromTo(q('.hero__copy [data-intro]'), { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.6, stagger: 0.07 }, 0.55)

      // Profundidade leve: a foto desliza um pouco mais devagar que a página.
      gsap.to(q('.hex__photo img'), {
        yPercent: 6, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      })
    })
    return () => mm.revert()
  }, { scope: root })

  return (
    <section className="hero on-dark" id="topo" ref={root} aria-labelledby="hero-title">
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <clipPath id="hex-clip" clipPathUnits="objectBoundingBox"><path d={HEX_PATH} /></clipPath>
      </svg>
      <div className="wrap hero__grid">
        <div className="hero__copy">
          <p className="kicker" data-intro>Bicicletaria no Centro de Içara, desde 1983</p>
          <h1 className="display" id="hero-title">
            <span className="line"><span style={{ display: 'inline-block' }}>Seu próximo</span></span>
            <span className="line"><span style={{ display: 'inline-block' }}>caminho</span></span>
            <span className="line"><span style={{ display: 'inline-block' }}>começa aqui.</span></span>
          </h1>
          <p className="lead" data-intro>
            Bicicletas para todas as idades, mobilidade elétrica, peças e oficina especializada, com quem pedala com você há mais de 40 anos.
          </p>
          <div className="hero__ctas" data-intro>
            <a className="btn btn--light" href={whatsappLink('Olá, João Bike! Vim pelo site e gostaria de atendimento.')} target="_blank" rel="noopener">
              <WhatsAppIcon />Falar com a loja
            </a>
            <a className="btn btn--ghost" href="#vitrine">Ver bicicletas</a>
          </div>
        </div>

        <figure className="hero__media" style={{ margin: 0 }}>
          <div className="hex">
            <div className="hex__photo">
              <Picture
                name="hero-gta-gravity-violeta"
                alt="Bicicleta GTA Gravity na cor Violeta Galáctico, com aros roxos, fotografada diante do painel azul João Bike Since 1983"
                sizes="(min-width: 1024px) 52vw, (min-width: 600px) 560px, 92vw"
                priority
              />
            </div>
            <svg className="hex__ring" viewBox="-2 -2 104 106" preserveAspectRatio="none" aria-hidden="true">
              <path d={RING_PATH} pathLength={1} />
            </svg>
          </div>
          <figcaption className="hero__caption">
            <span>Na foto: GTA Gravity, Violeta Galáctico.</span>
            <a href="#vitrine">Conhecer o modelo</a>
          </figcaption>
        </figure>
      </div>
      <span id="hero-end" aria-hidden="true" />
    </section>
  )
}
