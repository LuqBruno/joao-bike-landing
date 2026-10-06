import { event, store, whatsappLink } from '@/content/site'
import { Picture } from './Picture'
import { Trail, WhatsAppIcon } from './Icons'

export function Community() {
  // O pedal tem data: depois do dia, o bloco sai sozinho e fica só o grupo.
  const showEvent = Date.now() < new Date(event.endsAt).getTime()
  return (
    <section className="section on-light" id="comunidade" aria-labelledby="comunidade-title">
      <div className="wrap">
        <div className="section__head">
          <div data-reveal>
            <Trail />
            <h2 className="h2" id="comunidade-title">Pedalar junto</h2>
          </div>
          <p className="lead muted" data-reveal>
            A loja reúne ciclistas de Içara em um grupo no WhatsApp e promove pedais como o Outubro Rosa.
          </p>
        </div>

        <div className="community" style={showEvent ? undefined : { gridTemplateColumns: '1fr' }}>
          {showEvent && (
            <article className="ticket on-dark" data-reveal aria-labelledby="evento-title">
              <h3 className="h3" id="evento-title">{event.title}</h3>
              <p className="ticket__date"><strong>{event.dateLabel}</strong><span>às {event.time}</span></p>
              <ul role="list">
                {event.details.map((d) => <li key={d}>{d}</li>)}
              </ul>
              <p style={{ margin: 0 }}>{event.rule}</p>
              <a className="btn" href={whatsappLink(event.message)} target="_blank" rel="noopener">
                <WhatsAppIcon />Colocar meu nome na lista
              </a>
            </article>
          )}
          <div className="group" data-reveal>
            <div className="group__photo">
              <Picture name="equipe-fachada" alt="Equipe e ciclistas com camisas da João Bike reunidos em frente à loja" sizes="(min-width: 900px) 44vw, 92vw" />
            </div>
            <div>
              <h3 className="h3">Grupo de Ciclismo João Bike</h3>
              <p className="muted" style={{ margin: '12px 0 0', maxWidth: '40ch' }}>
                Entre no grupo do WhatsApp divulgado pela loja para acompanhar os próximos pedais e conversar com quem pedala na região.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
              <a className="btn" href={store.cyclingGroup} target="_blank" rel="noopener">
                <WhatsAppIcon />Entrar no grupo
              </a>
              <a className="text-link" href={store.instagram} target="_blank" rel="noopener">Acompanhar no Instagram</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
