import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { whatsappLink } from '@/content/site'
import { WhatsAppIcon } from './Icons'

const MobileMenu = lazy(() => import('./MobileMenu'))

const base = import.meta.env.BASE_URL
const NAV = [
  { href: '#vitrine', label: 'Bicicletas' },
  { href: '#guia-de-aro', label: 'Guia de aro' },
  { href: '#oficina', label: 'Oficina' },
  { href: '#historia', label: 'História' },
  { href: '#loja', label: 'Loja' },
]
const generalMessage = 'Olá, João Bike! Vim pelo site e gostaria de atendimento.'

export function Header() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const [menuLoaded, setMenuLoaded] = useState(false)
  const menuButton = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)

  // Cabeçalho vira material translúcido quando o hero sai de baixo dele.
  useEffect(() => {
    const sentinel = document.getElementById('hero-end')
    if (!sentinel) return
    const io = new IntersectionObserver(([entry]) => setSolid(entry.boundingClientRect.top < 80), {
      rootMargin: '-80px 0px 0px 0px', threshold: [0, 1],
    })
    io.observe(sentinel)
    return () => io.disconnect()
  }, [])

  // Ao fechar, o foco volta para o botão que abriu o menu.
  useEffect(() => {
    if (wasOpen.current && !open) menuButton.current?.focus()
    wasOpen.current = open
  }, [open])

  const openMenu = () => { setMenuLoaded(true); setOpen(true) }
  const preload = () => { void import('./MobileMenu') }

  return (
    <header className="header" data-solid={solid || open}>
      <div className="wrap header__inner">
        <a className="header__logo" href="#topo" aria-label="João Bike, voltar ao início">
          <img src={`${base}img/logo-branca-640.webp`} width={640} height={603} alt="" />
          <img src={`${base}img/logo-azul-640.webp`} width={640} height={603} alt="" />
        </a>
        <nav className="header__nav" aria-label="Principal">
          {NAV.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
          <a className="btn btn--small header__cta" href={whatsappLink(generalMessage)} target="_blank" rel="noopener">
            <WhatsAppIcon />WhatsApp
          </a>
        </nav>
        <button
          ref={menuButton}
          type="button"
          className="menu-btn"
          aria-expanded={open}
          aria-controls={open ? 'menu-celular' : undefined}
          onClick={openMenu}
          onPointerEnter={preload}
          onTouchStart={preload}
          onFocus={preload}
        >
          <span className="menu-icon" aria-hidden="true"><i /><i /></span>Menu
        </button>
      </div>
      {menuLoaded && (
        <Suspense fallback={null}>
          <MobileMenu open={open} onClose={() => setOpen(false)} nav={NAV} message={generalMessage} />
        </Suspense>
      )}
    </header>
  )
}
