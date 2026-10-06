import { categories, whatsappLink } from '@/content/site'
import { Picture } from './Picture'
import { Trail } from './Icons'

export function Categories() {
  return (
    <section className="section on-light" aria-labelledby="categorias-title">
      <div className="wrap">
        <div className="section__head">
          <div data-reveal>
            <Trail />
            <h2 className="h2" id="categorias-title">Tudo para pedalar, em um só lugar.</h2>
          </div>
          <p className="lead muted" data-reveal>
            Da primeira bicicleta da criança à revisão completa da sua: escolha o assunto e fale direto com a loja.
          </p>
        </div>
        <ul className="index" role="list" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {categories.map((item) => (
            <li className="index__row" key={item.id} data-reveal>
              <div className="index__title">
                <div className="index__thumb">
                  <Picture name={item.image} alt={item.alt} sizes="88px" />
                </div>
                <h3 className="h3">{item.title}</h3>
              </div>
              <p>{item.text}</p>
              {'anchor' in item ? (
                <a className="btn btn--ghost btn--small" href={item.anchor}>Ver serviços da oficina</a>
              ) : (
                <a className="btn btn--ghost btn--small" href={whatsappLink(item.message)} target="_blank" rel="noopener">{item.action}</a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
