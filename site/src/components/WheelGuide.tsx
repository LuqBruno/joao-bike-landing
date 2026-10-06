import { useEffect, useRef, useState } from 'react'
import { gsap } from '@/lib/gsap'
import { wheelGuide, whatsappLink } from '@/content/site'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { Trail, WhatsAppIcon } from './Icons'

// Cena em unidades do SVG. A roda é desenhada com raio 100 e escalada pelo aro real:
// o diâmetro na tela é proporcional à medida em polegadas (29" = maior roda).
const W = 800
const GROUND = 520
const MAX_R = 236
const LEFT = 36
const STEP = (W - LEFT - 2 * MAX_R - 24) / (wheelGuide.length - 1)
const SHORT_AGES = ['1–2', '2+', '3+', '4–6', '6–9', '9–12', '12+']
const SPOKES = Array.from({ length: 28 }, (_, i) => i)

function geometry(index: number) {
  const r = (MAX_R * wheelGuide[index].scale) / 29
  return { r, cx: LEFT + MAX_R + index * STEP + (MAX_R - r) * 0.35, cy: GROUND - r }
}

export function WheelGuide() {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(4)
  const placement = useRef<SVGGElement>(null)
  const spin = useRef<SVGGElement>(null)
  const last = useRef({ index: 4, rotation: 0 })
  const stage = wheelGuide[index]

  useEffect(() => {
    const from = geometry(last.current.index)
    const to = geometry(index)
    // Rolar sem deslizar: o ângulo percorrido é a distância dividida pelo raio médio.
    const distance = to.cx - from.cx
    const rotation = last.current.rotation + (distance / ((from.r + to.r) / 2)) * (180 / Math.PI)
    last.current = { index, rotation }
    const props = { x: to.cx, y: to.cy, scale: to.r / 100 }
    if (reduced) {
      gsap.set(placement.current, { ...props, svgOrigin: '0 0' })
      gsap.set(spin.current, { rotation, svgOrigin: '0 0' })
      return
    }
    // gsap.to parte do valor atual: trocar de idade no meio da animação apenas redireciona a roda.
    gsap.to(placement.current, { ...props, svgOrigin: '0 0', duration: 0.9, ease: 'power3.out', overwrite: 'auto' })
    gsap.to(spin.current, { rotation, svgOrigin: '0 0', duration: 0.9, ease: 'power3.out', overwrite: 'auto' })
  }, [index, reduced])

  useEffect(() => {
    const g = geometry(4)
    gsap.set(placement.current, { x: g.cx, y: g.cy, scale: g.r / 100, svgOrigin: '0 0' })
  }, [])

  const adult = stage.id === 'adulto'
  // Rodas 26" e 27,5" tocando o chão no mesmo ponto da roda de 29".
  const ghost = (inches: number) => {
    const r = (MAX_R * inches) / 29
    return <circle cx={geometry(6).cx} cy={GROUND - r} r={r} />
  }
  const message = stage.inches
    ? `Olá, João Bike! Quero ver opções de bike ${stage.label.toLowerCase()} (${stage.age.charAt(0).toLowerCase()}${stage.age.slice(1)}).`
    : 'Olá, João Bike! Quero ver opções de bike de equilíbrio ou triciclo para criança de 1 a 2 anos.'

  return (
    <section className="section section--azul on-dark" id="guia-de-aro" aria-labelledby="guia-title">
      <div className="wrap">
        <div className="section__head">
          <div data-reveal>
            <Trail />
            <h2 className="h2" id="guia-title">Qual aro para cada idade?</h2>
          </div>
          <p className="lead" style={{ color: '#e6eeff' }} data-reveal>
            O guia que a equipe da João Bike preparou para acertar o tamanho em cada fase da criança.
          </p>
        </div>

        <div className="guide">
          <div className="guide__stage" aria-hidden="true">
            <span className="guide__inch">{stage.inches ? `${stage.inches}″` : ''}</span>
            <svg viewBox={`0 0 ${W} 550`} role="presentation">
              <line x1="0" x2={W} y1={GROUND + 1} y2={GROUND + 1} stroke="rgb(255 255 255 / 0.5)" strokeWidth="2" />
              <line x1="0" x2={W} y1={GROUND + 16} y2={GROUND + 16} stroke="rgb(255 255 255 / 0.22)" strokeWidth="2" strokeDasharray="18 14" />
              {wheelGuide.map((_, i) => {
                const { cx } = geometry(i)
                return <circle key={i} cx={cx} cy={GROUND + 1} r={i === index ? 6 : 3.5} fill={i <= index ? '#fff' : 'rgb(255 255 255 / 0.4)'} style={{ transition: 'r 300ms, fill 300ms' }} />
              })}
              {adult && (
                <g fill="none" stroke="rgb(255 255 255 / 0.4)" strokeWidth="2" strokeDasharray="6 8">
                  {ghost(26)}
                  {ghost(27.5)}
                </g>
              )}
              <g ref={placement}>
                <g ref={spin}>
                  {/* Pneu com cravos */}
                  <circle r="93" fill="none" stroke="#061a3f" strokeWidth="14" />
                  <circle r="100" fill="none" stroke="#061a3f" strokeWidth="3" strokeDasharray="3.2 4.2" />
                  {/* Aro de parede dupla */}
                  <circle r="84" fill="none" stroke="#dfe8f8" strokeWidth="5" />
                  <circle r="78" fill="none" stroke="rgb(223 232 248 / 0.55)" strokeWidth="1.5" />
                  {/* Raios cruzados, saindo das duas flanges do cubo */}
                  <g stroke="rgb(240 245 255 / 0.85)" strokeWidth="0.9">
                    {SPOKES.map((i) => {
                      const a = (i / SPOKES.length) * Math.PI * 2
                      const flange = a + (i % 2 === 0 ? 0.42 : -0.42)
                      return <line key={i} x1={Math.cos(flange) * 9} y1={Math.sin(flange) * 9} x2={Math.cos(a) * 77} y2={Math.sin(a) * 77} />
                    })}
                  </g>
                  {/* Cubo */}
                  <circle r="11" fill="#fff" />
                  <circle r="4.5" fill="#061a3f" />
                  {/* Válvula: referência visual de que a roda gira */}
                  <rect x="-2" y="-90" width="4" height="9" rx="1" fill="#ffd34d" />
                </g>
              </g>
            </svg>
          </div>

          <div className="guide__panel">
            <div aria-live="polite" aria-atomic="true" style={{ display: 'grid', gap: 14 }}>
            <p className="guide__age">{stage.age}</p>
            <h3 className="h2 guide__label" style={{ fontSize: 'clamp(2rem, 1.4rem + 2.4vw, 3.2rem)' }}>{stage.inches ? `Bike ${stage.label.toLowerCase()}` : stage.label}</h3>
            <p className="guide__text">{stage.text}</p>
            {adult && <p className="guide__note fine" style={{ margin: 0 }}>A roda desenhada usa 29″; as linhas tracejadas mostram 26″ e 27,5″.</p>}
            </div>

            <div className="guide__control">
              <label htmlFor="idade" className="fine" style={{ fontWeight: 700 }}>Idade da criança</label>
              <input
                id="idade"
                className="guide__range"
                type="range"
                min={0}
                max={wheelGuide.length - 1}
                step={1}
                value={index}
                aria-valuetext={`${stage.age}: ${stage.label}`}
                onChange={(e) => setIndex(Number(e.target.value))}
              />
              <div className="guide__ticks">
                {SHORT_AGES.map((label, i) => (
                  <button key={label} type="button" aria-pressed={i === index} onClick={() => setIndex(i)}>
                    {label}<span className="sr-only"> anos</span>
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a className="btn btn--light" href={whatsappLink(message)} target="_blank" rel="noopener">
                <WhatsAppIcon />Ver opções com a loja
              </a>
            </div>
            <p className="guide__note fine">
              O tamanho ideal depende também da altura, do quadro e do nível de experiência. Na loja, a equipe ajuda a conferir.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
