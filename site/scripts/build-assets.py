"""Gera os assets da landing a partir dos originais públicos da João Bike.

Fluxo: materiais/originais (cópias nomeadas e intactas; criadas de referencias/instagram na primeira vez)
-> site/public/img (recortes AVIF/WebP responsivos) + src/content/images.json (dimensões).
Recortes apenas removem tarjas de texto dos posts; cores e detalhes dos produtos não são alterados.
Execute na pasta site: npm run assets
"""
import json
import shutil
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw

SITE = Path(__file__).resolve().parents[1]
ROOT = SITE.parent
REF = ROOT / 'referencias' / 'instagram'
ORIG = ROOT / 'materiais' / 'originais'
OUT = SITE / 'public' / 'img'
MANIFEST = SITE / 'src' / 'content' / 'images.json'
BLUE = (1, 73, 175)

# nome: (arquivo de referência, recorte em frações x0,y0,x1,y1, larguras)
PHOTOS = {
    'hero-gta-gravity-violeta': ('carrossel/Dd_uUaVFqlG_2.jpg', (0.0, 0.04, 1.0, 0.9), [640, 960, 1400, 1900]),
    'gta-gravity-branca': ('carrossel/Dd_uUaVFqlG_1.jpg', (0.0, 0.08, 1.0, 0.93), [480, 800, 1200]),
    'viking-tuff-25': ('carrossel/Dd9pGS1iduR_1.jpg', (0.0, 0.03, 1.0, 0.88), [480, 800, 1200]),
    'mtb-dkr-24': ('carrossel/DeCQ4dvFh8H_1.jpg', (0.0, 0.08, 1.0, 0.93), [480, 800, 1200]),
    'mtb-dkr-20': ('carrossel/Ddr1v4jCeRa_1.jpg', (0.0, 0.1, 1.0, 0.95), [480, 800, 1200]),
    'ace-duos-500w': ('carrossel/DeKDl3wz67u_1.jpg', (0.0, 0.27, 1.0, 0.618), [480, 800, 1088]),
    'loja-interior': ('carrossel/DclTjWGluoC_4.jpg', (0.535, 0.08, 1.0, 1.0), [480, 584]),
    'oficina-mecanico': ('carrossel/DblLV0qloeC_1.jpg', (0.03, 0.175, 0.94, 0.47), [640, 1080]),
    'oficina-roda': ('carrossel/Dd4WOdDCVpz_3.jpg', (0.56, 0.04, 1.0, 0.78), [480]),
    'fachada-atual': ('carrossel/DclTjWGluoC_5.jpg', (0.0, 0.0, 1.0, 0.6), [640, 1080]),
    'equipe-fachada': ('carrossel/DHCBgo6ODTm_8.jpg', (0.0, 0.0, 1.0, 0.86), [640, 1080]),
    'historia-1-foto-antiga': ('carrossel/DHCBgo6ODTm_1.jpg', (0.0, 0.27, 1.0, 1.0), [640, 1080]),
    'historia-2-bicicletaria-do-joao': ('carrossel/DHCBgo6ODTm_2.jpg', (0.0, 0.0, 1.0, 0.78), [640, 1080]),
    'historia-3-familia': ('carrossel/DHCBgo6ODTm_3.jpg', (0.0, 0.22, 1.0, 1.0), [640, 1080]),
    'historia-4-fachada-antiga': ('carrossel/DHCBgo6ODTm_4.jpg', (0.0, 0.0, 1.0, 0.8), [640, 1080]),
    'historia-5-interior': ('carrossel/DHCBgo6ODTm_5.jpg', (0.0, 0.2, 1.0, 1.0), [640, 1080]),
    'historia-6-fachada-xadrez': ('carrossel/DHCBgo6ODTm_6.jpg', (0.0, 0.0, 1.0, 0.8), [640, 1080]),
    'historia-7-entrega': ('carrossel/DHCBgo6ODTm_7.jpg', (0.0, 0.0, 1.0, 0.7), [640, 1080]),
    'historia-8-equipe': ('carrossel/DHCBgo6ODTm_8.jpg', (0.0, 0.0, 1.0, 0.86), [640, 1080]),
    'historia-9-fachada-nova': ('carrossel/DHCBgo6ODTm_9.jpg', (0.0, 0.2, 1.0, 1.0), [640, 1080]),
}


def crop(img, box):
    w, h = img.size
    return img.crop((round(box[0] * w), round(box[1] * h), round(box[2] * w), round(box[3] * h)))


def save_variants(img, name, widths, manifest, alpha=False):
    variants = []
    for width in sorted({min(w, img.width) for w in widths}):
        height = round(img.height * width / img.width)
        resized = img.resize((width, height), Image.LANCZOS)
        if not alpha:
            resized = resized.convert('RGB')
        resized.save(OUT / f'{name}-{width}.avif', quality=58 if not alpha else 70)
        resized.save(OUT / f'{name}-{width}.webp', quality=80, method=6)
        variants.append(width)
    manifest[name] = {'w': img.width, 'h': img.height, 'widths': variants}


def original(name, rel):
    """Cópia intacta em materiais/originais; criada a partir de referencias/ só na primeira vez."""
    target = ORIG / name
    if not target.exists():
        shutil.copy2(REF / rel, target)
    return target


def logo_assets(manifest):
    src = Image.open(original('logo-oficial-linktree-2000.png', 'logo_linktree_icone.png')).convert('RGBA')
    # A marca branca (selo hexagonal, letras e 1983) é exatamente o conjunto de pixels claros
    # sobre o círculo azul. Alpha = brancura; nada é redesenhado.
    rgb = src.convert('RGB')
    r, g, b = rgb.split()
    whiteness = ImageChops.darker(ImageChops.darker(r, g), b)  # menor canal ≈ quão branco
    # 1 (azul puro) -> 0 ; 255 (branco) -> 255, com a borda antisserrilhada preservada
    alpha = whiteness.point(lambda v: max(0, min(255, round((v - 2) * 255 / 253))))
    alpha = ImageChops.multiply(alpha, src.split()[3])
    bbox = alpha.getbbox()
    alpha = alpha.crop(bbox)
    white = Image.new('RGBA', alpha.size, (255, 255, 255, 0))
    white.putalpha(alpha)
    blue = Image.new('RGBA', alpha.size, BLUE + (0,))
    blue.putalpha(alpha)
    for name, im in (('logo-branca', white), ('logo-azul', blue)):
        im.save(OUT / f'{name}.png', optimize=True)
        small = im.resize((640, round(640 * im.height / im.width)), Image.LANCZOS)
        small.save(OUT / f'{name}-640.png', optimize=True)
        small.save(OUT / f'{name}-640.webp', quality=92, method=6)
        manifest[name] = {'w': small.width, 'h': small.height, 'widths': [640]}
    # Favicons: o selo circular oficial, sem alteração.
    for size in (32, 180, 192, 512):
        src.resize((size, size), Image.LANCZOS).save(OUT.parent / f'favicon-{size}.png', optimize=True)
    src.resize((48, 48), Image.LANCZOS).save(OUT.parent / 'favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)])
    return white


def og_image(white_logo):
    W, H = 1200, 630
    canvas = Image.new('RGB', (W, H), BLUE)
    hero = crop(Image.open(original('hero-gta-gravity-violeta__Dd_uUaVFqlG_2.jpg', 'carrossel/Dd_uUaVFqlG_2.jpg')).convert('RGB'), (0.0, 0.1, 1.0, 0.82))
    hero = hero.resize((round(hero.width * H / hero.height), H), Image.LANCZOS)
    canvas.paste(hero, (W - hero.width + 120, 0))
    shade = Image.new('L', (W, H), 0)
    d = ImageDraw.Draw(shade)
    for x in range(W):
        d.line([(x, 0), (x, H)], fill=max(0, min(255, round(255 * (1 - (x - 380) / 320)))))
    canvas.paste(Image.new('RGB', (W, H), BLUE), (0, 0), shade)
    logo = white_logo.resize((420, round(420 * white_logo.height / white_logo.width)), Image.LANCZOS)
    canvas.paste(logo, (70, (H - logo.height) // 2), logo)
    canvas.save(OUT.parent / 'og-joao-bike.jpg', quality=86, optimize=True, progressive=True)


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    ORIG.mkdir(parents=True, exist_ok=True)
    MANIFEST.parent.mkdir(parents=True, exist_ok=True)
    manifest = {}
    white = logo_assets(manifest)
    for name, (rel, box, widths) in PHOTOS.items():
        source = original(f'{name}__{Path(rel).name}', rel)
        img = crop(Image.open(source).convert('RGB'), box)
        save_variants(img, name, widths, manifest)
    og_image(white)
    MANIFEST.write_text(json.dumps(manifest, indent=1), encoding='utf8')
    print(f'{len(manifest)} assets -> {OUT}')


if __name__ == '__main__':
    main()
