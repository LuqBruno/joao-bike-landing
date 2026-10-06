// Conteúdo único da landing. Cada dado tem origem registrada em ../../../docs/FONTES.md.
// Não acrescentar preços, estoque, avaliações ou marcas sem fonte oficial.

export const WHATSAPP_NUMBER = '5548999327190'

export function whatsappLink(message: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

export const store = {
  name: 'João Bike',
  since: 1983,
  tagline: 'Desde 1983 pedalando com você',
  phoneDisplay: '(48) 3432-4651',
  phoneHref: 'tel:+554834324651',
  whatsappDisplay: '(48) 99932-7190',
  street: 'Rua Coronel Marcos Rovaris, 111',
  district: 'Centro',
  city: 'Içara',
  state: 'SC',
  postalCode: '88820-007',
  landmark: 'Próximo ao Trilho',
  geo: { lat: -28.7108689, lng: -49.2995597 },
  directions: 'https://www.google.com/maps/dir/?api=1&destination=-28.7108689%2C-49.2995597',
  googleReviews: 'https://g.page/r/Cdov2JoNd219EAI/review',
  instagram: 'https://www.instagram.com/joaobikeicara/',
  linktree: 'https://linktr.ee/joaobikeicara',
  cyclingGroup: 'https://chat.whatsapp.com/In89QVhczrT4SMJE6wni8W',
  payment: 'Cartão e boleto em até 24x, mediante simulação na loja.',
}

export const hours = [
  { days: 'Segunda a sexta', time: '8h30 às 12h e 13h30 às 18h' },
  { days: 'Sábado', time: '8h30 às 12h' },
  { days: 'Domingo', time: 'Fechado' },
] as const

export const contactIntents = [
  {
    id: 'bike',
    title: 'Quero uma bicicleta',
    detail: 'Modelos, tamanhos, cores e condições.',
    message: 'Olá, João Bike! Estou procurando uma bicicleta e gostaria de ajuda para escolher.',
  },
  {
    id: 'pecas',
    title: 'Peças e acessórios',
    detail: 'Componentes, equipamentos de segurança e cuidados.',
    message: 'Olá, João Bike! Quero consultar peças e acessórios.',
  },
  {
    id: 'oficina',
    title: 'Serviço na oficina',
    detail: 'Revisão, regulagem, montagem ou reparo.',
    message: 'Olá, João Bike! Quero agendar um serviço na oficina para a minha bike.',
  },
] as const

export const categories = [
  {
    id: 'bicicletas',
    title: 'Bicicletas',
    text: 'Para todas as idades: infantis, mountain bikes e modelos de grau e freeride.',
    image: 'loja-interior',
    alt: 'Bicicletas expostas em suportes no interior da loja João Bike',
    message: 'Olá, João Bike! Quero conhecer as bicicletas disponíveis na loja.',
    action: 'Falar sobre bicicletas',
  },
  {
    id: 'eletricas',
    title: 'Mobilidade elétrica',
    text: 'Bicicletas elétricas e scooters, como a Ace Duos 500W, com manutenção na própria loja.',
    image: 'ace-duos-500w',
    alt: 'Scooter elétrica Ace Duos 500W, preta, com cesto dianteiro e banco duplo',
    message: 'Olá, João Bike! Quero saber mais sobre bicicletas elétricas e scooters.',
    action: 'Falar sobre elétricas',
  },
  {
    id: 'pecas',
    title: 'Peças e acessórios',
    text: 'Peças, acessórios, roupas, equipamentos de segurança e produtos para cuidar da bike.',
    image: 'historia-5-interior',
    alt: 'Balcão da loja com acessórios expostos e bicicletas à frente',
    message: 'Olá, João Bike! Quero consultar peças e acessórios.',
    action: 'Consultar peças',
  },
  {
    id: 'oficina',
    title: 'Oficina',
    text: 'Revisões, regulagens, centragem de rodas e montagem de bicicletas e elétricas.',
    image: 'oficina-mecanico',
    alt: 'Mecânico da João Bike concentrado durante uma manutenção',
    message: 'Olá, João Bike! Quero agendar um serviço na oficina para a minha bike.',
    action: 'Agendar serviço',
    anchor: '#oficina',
  },
] as const

export type Product = {
  id: string
  name: string
  kind: string
  specs: string[]
  colors: string
  image: string
  alt: string
  source: string
}

// Modelos publicados pela loja no Instagram (24/09 a 02/10/2026). Valores não exibidos:
// promoções mudam e não há catálogo confirmado.
export const products: Product[] = [
  {
    id: 'gta-gravity',
    name: 'GTA Gravity',
    kind: 'Grau e freeride',
    specs: ['Pneu Flame', 'Freio hidráulico', 'Pedivela integrado', 'Cubo cassete barulhento'],
    colors: 'Violeta Galáctico e Branca com Roxa',
    image: 'gta-gravity-branca',
    alt: 'Bicicleta GTA Gravity branca com pneus e componentes roxos, diante do painel azul da João Bike',
    source: 'https://www.instagram.com/p/Dd_uUaVFqlG/',
  },
  {
    id: 'viking-tuff-25',
    name: 'Viking Tuff 25',
    kind: 'Grau e freeride',
    specs: ['21 velocidades', 'Aro Vmaxx', 'Freios a disco mecânicos'],
    colors: 'Branca, como na foto, e outras opções na loja',
    image: 'viking-tuff-25',
    alt: 'Bicicleta Viking Tuff 25 branca com grafismos pretos e garfo com suspensão',
    source: 'https://www.instagram.com/p/Dd9pGS1iduR/',
  },
  {
    id: 'mtb-dkr-24',
    name: 'MTB DKR aro 24',
    kind: 'Mountain bike',
    specs: ['Aro 24', '18 velocidades', 'No guia da loja, indicada de 9 a 12 anos'],
    colors: 'Rosa, como na foto; consulte outras opções',
    image: 'mtb-dkr-24',
    alt: 'Mountain bike DKR aro 24 rosa com pneus de cravo',
    source: 'https://www.instagram.com/p/DeCQ4dvFh8H/',
  },
  {
    id: 'mtb-dkr-20',
    name: 'MTB DKR aro 20',
    kind: 'Infantil',
    specs: ['Aro 20', 'No guia da loja, indicada de 6 a 9 anos'],
    colors: 'Laranja e azul',
    image: 'mtb-dkr-20',
    alt: 'Bicicleta infantil MTB DKR aro 20 azul',
    source: 'https://www.instagram.com/p/Ddr1v4jCeRa/',
  },
]

// Guia "Qual o aro ideal para cada idade?", publicado pela loja em 25/09/2026.
export const wheelGuide = [
  { id: 'equilibrio', age: '1 a 2 anos', label: 'Bike de equilíbrio ou triciclo', inches: null, scale: 10,
    text: 'Sem pedais, ajuda a criança a desenvolver equilíbrio e coordenação antes de começar a pedalar.' },
  { id: 'aro12', age: 'A partir de 2 anos', label: 'Aro 12', inches: '12', scale: 12,
    text: 'Para os primeiros passos com uma bike com pedais.' },
  { id: 'aro14', age: 'A partir de 3 anos', label: 'Aro 14', inches: '14', scale: 14,
    text: 'Prepare-se para as primeiras grandes pedaladas!' },
  { id: 'aro16', age: '4 a 6 anos', label: 'Aro 16', inches: '16', scale: 16,
    text: 'Mais conforto e estabilidade para evoluir na pedalada.' },
  { id: 'aro20', age: '6 a 9 anos', label: 'Aro 20', inches: '20', scale: 20,
    text: 'Para crianças com mais equilíbrio e autonomia.' },
  { id: 'aro24', age: '9 a 12 anos', label: 'Aro 24', inches: '24', scale: 24,
    text: 'Ideal para acompanhar o crescimento e a evolução da criança.' },
  { id: 'adulto', age: 'A partir de 12 anos', label: 'Aro 26, 27,5 ou 29', inches: '29', scale: 29,
    text: 'Aqui, altura e tamanho do quadro passam a ser ainda mais importantes.' },
] as const

export const workshop = {
  plans: [
    {
      title: 'Revisão preventiva',
      items: ['Centragem de rodas', 'Reaperto de componentes', 'Regulagem de freios e marchas'],
      result: 'Mais segurança e melhor desempenho em cada pedal.',
    },
    {
      title: 'Revisão geral de graxa',
      items: [
        'Limpeza dos rolamentos e da corrente em cuba eletrostática',
        'Manutenção do freehub',
        'Engraxamento da caixa de direção, cubos e movimento central',
        'Troca de cabos e conduítes, quando necessário',
        'Centragem de rodas',
        'Regulagem de freios e marchas',
        'Reaperto de componentes',
      ],
      result: 'Sua bike mais silenciosa, leve e eficiente.',
    },
  ],
  services: [
    'Sangria de freios',
    'Remendo de câmaras e aplicação de tubeless',
    'Montagem de bicicletas e bicicletas elétricas',
    'Troca de peças e componentes',
    'Limpeza e revisão',
  ],
  steps: [
    { title: 'Agende', text: 'Chame no WhatsApp ou ligue para a loja.' },
    { title: 'Traga a bike', text: 'A avaliação é feita na oficina, no Centro de Içara.' },
    { title: 'Combine o serviço', text: 'Atendimento personalizado para encontrar a melhor solução.' },
  ],
}

// Sequência do carrossel "Mais de 40 anos de história" (10/03/2025). As frases são da loja.
export const history = [
  { image: 'historia-1-foto-antiga', phrase: 'Primeiro você começa.', caption: 'Registro antigo publicado pela loja.' },
  { image: 'historia-2-bicicletaria-do-joao', phrase: 'Com aquilo que pode.', caption: 'A Bicicletaria do João, ao lado do Nosso Bar.' },
  { image: 'historia-3-familia', phrase: 'Se arrisca.', caption: 'Na loja, entre bicicletas.' },
  { image: 'historia-4-fachada-antiga', phrase: 'Depois, confia.', caption: 'O letreiro João Bike: bicicletas, peças, serviços e acessórios.' },
  { image: 'historia-5-interior', phrase: 'Sem desistir.', caption: 'O balcão e a parede de acessórios.' },
  { image: 'historia-6-fachada-xadrez', phrase: 'Se dedica ao máximo.', caption: 'A fachada quadriculada.' },
  { image: 'historia-7-entrega', phrase: 'Entrega nas mãos de Deus.', caption: 'Um brinde da equipe.' },
  { image: 'historia-8-equipe', phrase: 'Junto com amigos incríveis.', caption: 'Equipe e ciclistas em frente à loja.' },
  { image: 'historia-9-fachada-nova', phrase: 'E melhora.', caption: 'A fachada azul de hoje, no Centro de Içara.' },
] as const

// Evento publicado em 05/10/2026. Sai da página automaticamente depois do dia do pedal.
export const event = {
  title: 'Pedal Outubro Rosa',
  date: '2026-10-17T14:00:00-03:00',
  endsAt: '2026-10-17T23:59:00-03:00',
  dateLabel: '17 de outubro, sábado',
  time: '14h',
  details: ['Saída da loja, no Centro de Içara', 'Café e frutas na chegada', 'Evento gratuito', 'Vagas limitadas a 80 pessoas'],
  rule: 'Para participar, coloque seu nome na lista pelo WhatsApp da loja.',
  message: 'Olá, João Bike! Quero colocar meu nome na lista do Pedal Outubro Rosa de 17/10.',
  source: 'https://www.instagram.com/p/DeIHArFJlNS/',
}
