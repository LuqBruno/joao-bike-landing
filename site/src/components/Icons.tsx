// Ícones de traço único, mesma espessura. Decorativos quando acompanham texto visível.
type P = { className?: string }
const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true }

export const WhatsAppIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="currentColor" d="M12.04 2C6.58 2 2.15 6.43 2.15 11.89c0 1.75.46 3.45 1.33 4.95L2.07 22l5.3-1.39a9.86 9.86 0 0 0 4.67 1.19h.01c5.45 0 9.89-4.43 9.89-9.89A9.9 9.9 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.14.82.84-3.06-.2-.31a8.2 8.2 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.25-8.23a8.23 8.23 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.22 8.23Zm4.51-6.16c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.13-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.22-1.46-1.37-1.7-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47a.9.9 0 0 0-.66.31c-.23.25-.86.85-.86 2.07s.88 2.4 1 2.57c.13.16 1.74 2.65 4.2 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z" />
  </svg>
)

export const ArrowLeft = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}><path d="M15 5l-7 7 7 7" /></svg>
)
export const ArrowRight = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}><path d="M9 5l7 7-7 7" /></svg>
)
export const ChatIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}><path d="M4 5h16v11H9l-5 4z" /></svg>
)
export const PhoneIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /></svg>
)
export const PinIcon = ({ className }: P) => (
  <svg viewBox="0 0 24 24" className={className} {...common}><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
)

/** Traço de rota com ponto de chegada: assinatura gráfica dos títulos. */
export const Trail = ({ className }: P) => (
  <svg viewBox="0 0 220 14" className={`trail ${className ?? ''}`} aria-hidden="true">
    <path d="M2 10 C 40 10, 52 3, 92 3 S 150 11, 196 7" pathLength={1} />
    <circle cx="208" cy="7" r="5" />
  </svg>
)
