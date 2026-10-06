import { useEffect, useRef, useState } from 'react'
import { history } from '@/content/site'
import { Picture } from './Picture'
import { Trail } from './Icons'

export function History() {
  const [active, setActive] = useState(0)
  const list = useRef<HTMLOListElement>(null)

  // A frase que cruza o meio da tela define a foto: rolagem nativa, sem prender a página.
  useEffect(() => {
    const steps = list.current?.querySelectorAll<HTMLElement>('[data-step]')
    if (!steps?.length) return
    const io = new IntersectionObserver((entries) => {
      for (const entry of entries) if (entry.isIntersecting) setActive(Number((entry.target as HTMLElement).dataset.step))
    }, { rootMargin: '-48% 0px -48% 0px' })
    steps.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  return (
    <section className="section section--noite on-dark" id="historia" aria-labelledby="historia-title">
      <div className="wrap">
        <div className="section__head">
          <div data-reveal>
            <Trail />
            <h2 className="h2" id="historia-title">Desde 1983 pedalando com você</h2>
          </div>
          <p className="lead" style={{ color: '#c9d6f0' }} data-reveal>
            A João Bike nasceu da paixão pelo ciclismo e, ao longo de mais de quatro décadas, conquistou a confiança de gerações de clientes em Içara e região.
          </p>
        </div>

        <div className="story">
          <div className="story__frame" aria-hidden="true">
            {history.map((step, i) => (
              <div className="story__slide" key={step.image} data-active={i === active}>
                <Picture name={step.image} alt="" sizes="(min-width: 900px) 44vw, 1px" />
              </div>
            ))}
          </div>
          <ol className="story__list" ref={list}>
            {history.map((step, i) => (
              <li className="story__step" key={step.image} data-step={i} data-active={i === active}>
                <div className="story__inline">
                  <Picture name={step.image} alt={step.caption} sizes="92vw" />
                </div>
                <p className="story__phrase">{step.phrase}</p>
                <p className="story__caption">{step.caption}</p>
              </li>
            ))}
          </ol>
        </div>
        <p className="fine" style={{ color: '#9fb0d4', marginTop: 32 }}>
          Frases e fotografias da série “Mais de 40 anos de história”, publicada pela João Bike.
        </p>
      </div>
    </section>
  )
}
