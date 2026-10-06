import { hours, store, whatsappLink } from '@/content/site'

// Caminho relativo ao documento: funciona na raiz e em subpasta (GitHub Pages), também no HTML pré-renderizado.
const base = './'

export function Footer() {
  return (
    <footer className="footer on-dark">
      <div className="wrap">
        <div className="footer__grid">
          <img className="footer__logo" src={`${base}img/logo-branca-640.webp`} width={640} height={603} alt="João Bike, desde 1983" loading="lazy" />
          <div className="footer__cols">
            <div>
              <h2>Loja</h2>
              <address>
                {store.street}<br />{store.district}, {store.city} – {store.state}<br />{store.landmark}
              </address>
            </div>
            <div>
              <h2>Horário</h2>
              {hours.map((h) => <p key={h.days}>{h.days}: {h.time}</p>)}
            </div>
            <div>
              <h2>Canais oficiais</h2>
              <ul className="footer__links" role="list">
                <li><a href={whatsappLink('Olá, João Bike! Vim pelo site.')} target="_blank" rel="noopener">WhatsApp {store.whatsappDisplay}</a></li>
                <li><a href={store.phoneHref}>Telefone {store.phoneDisplay}</a></li>
                <li><a href={store.instagram} target="_blank" rel="noopener">Instagram @joaobikeicara</a></li>
                <li><a href={store.linktree} target="_blank" rel="noopener">Linktree</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer__bottom">
          <span>João Bike. {store.tagline}.</span>
          <span>Prévia de demonstração preparada por Bruno Luque; não é o site oficial da João Bike.</span>
        </div>
      </div>
    </footer>
  )
}
