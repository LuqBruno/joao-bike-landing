import { store, whatsappLink, workshop } from '@/content/site'
import { Picture } from './Picture'
import { PhoneIcon, Trail, WhatsAppIcon } from './Icons'

export function Workshop() {
  return (
    <section className="section on-light" id="oficina" aria-labelledby="oficina-title">
      <div className="wrap">
        <div className="section__head">
          <div data-reveal>
            <Trail />
            <h2 className="h2" id="oficina-title">Oficina especializada</h2>
          </div>
          <p className="lead muted" data-reveal>
            Manutenção preventiva e corretiva para bicicletas em geral e elétricas, para garantir mais segurança, desempenho e durabilidade.
          </p>
        </div>

        <div className="workshop">
          <div className="workshop__photos">
            <div className="main">
              <Picture name="oficina-mecanico" alt="Mecânico da João Bike concentrado durante a manutenção de uma bicicleta" sizes="(min-width: 1024px) 46vw, 92vw" />
            </div>
            <div className="sub">
              <Picture name="oficina-roda" alt="Mecânico com camiseta da João Bike trabalhando em uma roda" sizes="(min-width: 1024px) 28vw, 56vw" />
            </div>
            <div className="workshop__quote">
              <p>Manutenção não é gasto. É prevenção.</p>
              <small>Traga sua bike para uma avaliação na João Bike.</small>
            </div>
          </div>

          <div>
            {workshop.plans.map((plan) => (
              <div className="sheet-spec" key={plan.title} data-reveal>
                <h3 className="h3">{plan.title}</h3>
                <ul role="list">
                  {plan.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <p className="sheet-spec__result">{plan.result}</p>
              </div>
            ))}

            <div className="services" data-reveal>
              <h3 className="h3" style={{ fontSize: '1.2rem' }}>Também na oficina</h3>
              <ul role="list">
                {workshop.services.map((s) => <li key={s}>{s}</li>)}
              </ul>
            </div>

            <h3 className="sr-only">Como solicitar atendimento</h3>
            <ol className="steps" data-reveal>
              {workshop.steps.map((step) => (
                <li key={step.title}><strong>{step.title}</strong><p>{step.text}</p></li>
              ))}
            </ol>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <a className="btn" href={whatsappLink('Olá, João Bike! Quero agendar uma revisão para a minha bike.')} target="_blank" rel="noopener">
                <WhatsAppIcon />Agendar revisão
              </a>
              <a className="btn btn--ghost" href={store.phoneHref}>
                <PhoneIcon />{store.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
