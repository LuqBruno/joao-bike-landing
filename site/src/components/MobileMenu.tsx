import { useEffect, useRef, type KeyboardEvent } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react'
import { store, whatsappLink } from '@/content/site'
import { useReducedMotion } from '@/hooks/useMediaQuery'
import { WhatsAppIcon } from './Icons'

// Caminho relativo ao documento: funciona na raiz e em subpasta (GitHub Pages), também no HTML pré-renderizado.
const base = './'

type Props = {
  open: boolean
  onClose: () => void
  nav: { href: string; label: string }[]
  message: string
}

/** Painel do menu no celular. Carregado só na primeira abertura (Motion fica fora do pacote inicial). */
export default function MobileMenu({ open, onClose, nav, message }: Props) {
  const reduced = useReducedMotion()
  const sheet = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const main = document.getElementById('conteudo')
    main?.setAttribute('inert', '')
    document.documentElement.style.overflow = 'hidden'
    sheet.current?.querySelector<HTMLElement>('button, a')?.focus()
    return () => {
      main?.removeAttribute('inert')
      document.documentElement.style.overflow = ''
    }
  }, [open])

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') { onClose(); return }
    if (event.key !== 'Tab' || !sheet.current) return
    const items = [...sheet.current.querySelectorAll<HTMLElement>('a, button')]
    const first = items[0]
    const last = items[items.length - 1]
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus() }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus() }
  }

  // Mola criticamente amortecida: sem quique, interrompível, nasce do botão Menu (canto superior direito).
  const spring = reduced ? { duration: 0 } : { type: 'spring' as const, bounce: 0, duration: 0.38 }

  return createPortal(
    <LazyMotion features={domAnimation} strict>
      <AnimatePresence>
        {open && (
          <>
            <m.div
              key="scrim"
              className="sheet-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduced ? { duration: 0 } : { duration: 0.22 }}
              onClick={onClose}
            />
            <m.div
              key="sheet"
              ref={sheet}
              id="menu-celular"
              className="sheet"
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              onKeyDown={onKeyDown}
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: -8, transition: { duration: 0.18 } }}
              transition={spring}
            >
              <div className="sheet__top">
                <img src={`${base}img/logo-azul-640.webp`} width={640} height={603} alt="João Bike" />
                <button type="button" className="sheet__close" onClick={onClose}>Fechar</button>
              </div>
              <nav aria-label="Menu do celular">
                {nav.map((item) => <a key={item.href} href={item.href} onClick={onClose}>{item.label}</a>)}
              </nav>
              <a className="btn" href={whatsappLink(message)} target="_blank" rel="noopener">
                <WhatsAppIcon />Falar no WhatsApp
              </a>
              <a className="btn btn--ghost on-light" style={{ marginTop: 10, width: '100%' }} href={store.phoneHref}>
                Ligar {store.phoneDisplay}
              </a>
            </m.div>
          </>
        )}
      </AnimatePresence>
    </LazyMotion>,
    document.body,
  )
}
