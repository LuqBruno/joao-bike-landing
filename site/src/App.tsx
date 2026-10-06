import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap'
import { store, whatsappLink } from '@/content/site'
import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { Categories } from '@/components/Categories'
import { Products } from '@/components/Products'
import { WheelGuide } from '@/components/WheelGuide'
import { Workshop } from '@/components/Workshop'
import { History } from '@/components/History'
import { Community } from '@/components/Community'
import { Visit } from '@/components/Visit'
import { Footer } from '@/components/Footer'
import { PhoneIcon, WhatsAppIcon } from '@/components/Icons'

export default function App() {
  const main = useRef<HTMLElement>(null)
  const [barVisible, setBarVisible] = useState(false)

  // Linguagem única de revelação: o traço de rota se desenha da esquerda para a direita
  // e o conteúdo avança um pouco no mesmo sentido, uma vez, ao entrar na tela.
  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      ;(window as Window & { __motionReady?: boolean }).__motionReady = true
      gsap.utils.toArray<SVGPathElement>('.trail path').forEach((path) => {
        gsap.fromTo(path, { strokeDasharray: 1, strokeDashoffset: 1 }, {
          strokeDashoffset: 0, duration: 1, ease: 'power2.out',
          scrollTrigger: { trigger: path, start: 'top 88%', once: true },
        })
      })
      ScrollTrigger.batch('[data-reveal]', {
        start: 'top 88%',
        once: true,
        onEnter: (batch) => gsap.fromTo(batch, { opacity: 0, x: -18 }, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', stagger: 0.06, overwrite: true }),
      })
    })
    return () => mm.revert()
  }, { scope: main })

  // Barra de contato no celular aparece depois do hero e some perto do rodapé.
  useEffect(() => {
    const hero = document.getElementById('hero-end')
    const loja = document.getElementById('loja')
    if (!hero || !loja) return
    let pastHero = false
    let atContact = false
    const update = () => setBarVisible(pastHero && !atContact)
    const io1 = new IntersectionObserver(([e]) => { pastHero = e.boundingClientRect.top < 0; update() })
    const io2 = new IntersectionObserver(([e]) => { atContact = e.isIntersecting || e.boundingClientRect.top < 0; update() }, { rootMargin: '0px 0px -30% 0px' })
    io1.observe(hero)
    io2.observe(loja)
    return () => { io1.disconnect(); io2.disconnect() }
  }, [])

  return (
    <>
      <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
      <Header />
      <main id="conteudo" ref={main}>
        <Hero />
        <Categories />
        <Products />
        <WheelGuide />
        <Workshop />
        <History />
        <Community />
        <Visit />
      </main>
      <Footer />
      <div className="mobile-bar" data-visible={barVisible} aria-hidden={!barVisible}>
        <a className="btn btn--light" href={whatsappLink('Olá, João Bike! Vim pelo site e gostaria de atendimento.')} target="_blank" rel="noopener" tabIndex={barVisible ? 0 : -1}>
          <WhatsAppIcon />WhatsApp
        </a>
        <a className="btn" href={store.phoneHref} tabIndex={barVisible ? 0 : -1} style={{ flex: '0 0 auto' }} aria-label={`Ligar para ${store.phoneDisplay}`}>
          <PhoneIcon />Ligar
        </a>
      </div>
    </>
  )
}
