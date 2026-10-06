// Geometria do selo da logo: hexágono com pontas em cima e embaixo, lados verticais
// e cantos arredondados. Proporções medidas no PNG oficial (placa interna da logo).
type Point = [number, number]

export const HEX_POINTS: Point[] = [
  [0.5, 0],
  [1, 0.176],
  [1, 0.824],
  [0.5, 1],
  [0, 0.824],
  [0, 0.176],
]

/** Polígono com cantos arredondados (curvas quadráticas nos vértices), em coordenadas 0–1. */
export function roundedPolygon(points: Point[], radius: number[] | number, scale: Point = [1, 1]) {
  const pts = points.map(([x, y]) => [x * scale[0], y * scale[1]] as Point)
  const radii = typeof radius === 'number' ? pts.map(() => radius) : radius
  const n = pts.length
  const toward = (a: Point, b: Point, d: number): Point => {
    const len = Math.hypot(b[0] - a[0], b[1] - a[1])
    const t = Math.min(0.5, d / len)
    return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t]
  }
  const f = (p: Point) => `${+p[0].toFixed(4)} ${+p[1].toFixed(4)}`
  let d = ''
  for (let i = 0; i < n; i++) {
    const prev = pts[(i - 1 + n) % n]
    const cur = pts[i]
    const next = pts[(i + 1) % n]
    const start = toward(cur, prev, radii[i])
    const end = toward(cur, next, radii[i])
    d += `${i === 0 ? 'M' : 'L'}${f(start)} Q${f(cur)} ${f(end)} `
  }
  return `${d}Z`
}

// Pontas superior/inferior mais suaves que os cantos laterais, como na placa da logo.
export const HEX_RADII = [0.11, 0.07, 0.07, 0.11, 0.07, 0.07]
export const HEX_PATH = roundedPolygon(HEX_POINTS, HEX_RADII)
