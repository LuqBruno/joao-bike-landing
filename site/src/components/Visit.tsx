import { contactIntents, hours, store, whatsappLink } from '@/content/site'
import { Picture } from './Picture'
import { ArrowRight, PhoneIcon, PinIcon, Trail } from './Icons'

export function Visit() {
  return (
    <section className="section section--gelo on-light" id="loja" aria-labelledby="loja-title">
      <div className="wrap">
        <div className="section__head">
          <div data-reveal>
            <Trail />
            <h2 className="h2" id="loja-title">Venha até a loja</h2>
          </div>
          <p className="lead muted" data-reveal>
            No Centro de Içara, próximo ao Trilho. Se preferir, comece a conversa pelo WhatsApp já com o assunto certo.
          </p>
        </div>

        <div className="visit">
          <div>
            <div className="visit__photo" data-reveal>
              <Picture name="fachada-atual" alt="Fachada azul da loja João Bike com o letreiro branco, no Centro de Içara" sizes="(min-width: 1024px) 50vw, 92vw" />
            </div>
            <address className="visit__address">
              <strong>{store.street}</strong>
              {store.district}, {store.city} – {store.state}, {store.postalCode}<br />
              {store.landmark}
            </address>
            <table className="hours">
              <caption className="sr-only">Horário de funcionamento</caption>
              <tbody>
                {hours.map((h) => (
                  <tr key={h.days}><th scope="row">{h.days}</th><td>{h.time}</td></tr>
                ))}
              </tbody>
            </table>
            <p className="fine muted" style={{ margin: '10px 0 0' }}>Em feriados o horário pode mudar; confirme antes de ir.</p>
            <div className="visit__more">
              <a className="btn" href={store.directions} target="_blank" rel="noopener"><PinIcon />Como chegar</a>
              <a className="btn btn--ghost" href={store.phoneHref}><PhoneIcon />{store.phoneDisplay}</a>
            </div>
          </div>

          <div>
            <h3 className="h3" style={{ marginBottom: 18 }}>Sobre o que você quer falar?</h3>
            <ul className="intents" role="list">
              {contactIntents.map((intent) => (
                <li key={intent.id}>
                  <a className="intent" href={whatsappLink(intent.message)} target="_blank" rel="noopener">
                    <strong>{intent.title}</strong>
                    <span>{intent.detail}</span>
                    <ArrowRight />
                  </a>
                </li>
              ))}
            </ul>
            <p className="fine muted" style={{ margin: '16px 0 0' }}>
              Os botões abrem o WhatsApp {store.whatsappDisplay} com uma mensagem pronta, que você pode editar antes de enviar.
            </p>
            <p className="fine" style={{ margin: '22px 0 0' }}>
              <strong>Pagamento:</strong> {store.payment}
            </p>
            <p className="fine" style={{ margin: '10px 0 0' }}>
              Já é cliente? <a className="text-link" href={store.googleReviews} target="_blank" rel="noopener">Avalie a loja no Google</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
