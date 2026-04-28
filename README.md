# Vertika — Estructura del Proyecto

```
vertika/
├── index.html          → La web completa
├── products.json       → Todos los productos (editar aquí)
├── README.md           → Este archivo
└── img/                → Carpeta de fotos
    ├── poleron-disenchantment.jpg
    ├── poleron-disenchantment-back.jpg
    ├── hoodie-tribal.jpg
    ├── hoodie-tribal-back.jpg
    ├── tee-nights-with-sun.jpg
    ├── tee-nights-with-sun-back.jpg
    ├── jorts-printed.jpg
    ├── jorts-printed-back.jpg
    ├── cargo-wide-leg.jpg
    ├── cargo-wide-leg-back.jpg
    ├── tee-varsity-stripe.jpg
    ├── tee-varsity-stripe-back.jpg
    ├── shirt-linen-ss.jpg
    ├── shirt-linen-ss-back.jpg
    ├── pant-track-vertika.jpg
    ├── pant-track-vertika-back.jpg
    ├── beanie-vertika.jpg
    ├── beanie-vertika-2.jpg
    ├── hat-bucket-print.jpg
    ├── hat-bucket-print-2.jpg
    ├── bag-tote-canvas.jpg
    ├── bag-tote-canvas-2.jpg
    ├── socks-pack-x3.jpg
    ├── socks-pack-x3-2.jpg
    ├── overshirt-flannel.jpg
    ├── overshirt-flannel-back.jpg
    ├── tee-long-sleeve-graphic.jpg
    └── tee-long-sleeve-graphic-back.jpg
```

---

## Cómo agregar o editar productos

Abre `products.json` y edita o agrega objetos. Cada producto tiene esta forma:

```json
{
  "id": 15,
  "name": "Nombre de la prenda",
  "category": "Poleras",         ← Poleras | Polerones | Pantalones | Accesorios
  "price": 24990,
  "originalPrice": 29990,        ← Solo si tiene descuento (eliminar si no)
  "badge": "nuevo",              ← "nuevo" | "sale" | null
  "desc": "Descripción corta de la prenda.",
  "details": {
    "Material": "Algodón 100%",
    "Fit": "Regular",
    "Lavado": "Normal, 30°C",
    "Producción": "Local — Santiago, Chile"
  },
  "sizes": ["S", "M", "L", "XL"],
  "img": "img/nombre-foto-frente.jpg",
  "imgHover": "img/nombre-foto-atras.jpg"
}
```

---

## Cambiar el número de WhatsApp

En `index.html`, busca la línea:

```js
const WHATSAPP_NUMBER = '56912345678';
```

Y reemplaza `56912345678` con tu número real (código de país sin el +).

---

## Fotos recomendadas

- **Formato:** JPG o WEBP
- **Tamaño:** 800×1067px (ratio 3:4, vertical)
- **Peso:** Menos de 300KB por foto idealmente
- **Nombre:** Sin espacios ni mayúsculas — usa guiones (`poleron-nombre.jpg`)

---

## Para correr localmente

**Opción A — VS Code:**
Instala la extensión "Live Server" y haz click en "Go Live"

**Opción B — Python:**
```bash
cd vertika/
python3 -m http.server 8080
# Abrir http://localhost:8080
```

> ⚠️ El archivo `products.json` se carga con `fetch()`, por eso necesitas un servidor local.
> No funcionará si abres `index.html` directo haciendo doble click.
