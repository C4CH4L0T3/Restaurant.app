# Melli's · Plataforma de pedidos directos (Demo de ventas)

Prototipo premium de sitio web + panel de negocio para restaurantes de Medellín.
Pensado como **demo comercial**: la pantalla debe hacer que cualquier dueño de
restaurante piense *"necesito esto para mi negocio"*.

Propuesta de valor central: **dejar de pagar 25–30% de comisión a las apps de
domicilio** con una plataforma de pedidos propia.

## Cómo correrlo

```bash
npm install
npm run dev      # http://localhost:3000
```

- **/** — Sitio público (experiencia de pedido del cliente)
- **/admin** — Panel del negocio (dueño del restaurante)

`npm run build` genera el build de producción (listo para Vercel).

## Stack y por qué

| Tecnología | Por qué |
|---|---|
| **Next.js 15 (App Router)** | SSR + rutas estáticas = SEO y Core Web Vitals altos, clave para aparecer en Google local. Deploy en 1 clic a Vercel. |
| **TypeScript** | Menos bugs en el flujo de pedido/pago; escala a producción. |
| **Tailwind v4** | Design system por tokens, consistencia y velocidad. |
| **Framer Motion** | Microinteracciones elegantes (modal, drawer) sin sacrificar performance. |
| **next/font (Fraunces + Hanken Grotesk)** | Tipografía editorial de lujo, self-hosted (sin bloqueo de render). |
| **next/image** | Optimización automática de fotos de comida (formatos modernos, lazy). |

Datos actualmente **mock** (`src/lib/`) para que la demo sea rápida y sin
backend. Camino a producción abajo.

## Design system

- **Estética:** dark editorial-luxury, cálida. Carbón casi negro + crema + acento
  **ámbar/brasa** (fuego a la parrilla) + grano de película sutil.
- **Tokens** en `src/app/globals.css` (`@theme`): colores, fuentes, radios,
  utilidades (`glass`, `ember-glow`, `grain-card`, `reveal`, `marquee`).

## Arquitectura

```
src/
  app/
    layout.tsx        # fuentes, metadata SEO, JSON-LD Restaurant schema
    page.tsx          # home del cliente (compone las secciones)
    admin/page.tsx    # panel del negocio
    globals.css       # design system (Tailwind v4 @theme)
  components/
    CartProvider.tsx  # estado global: carrito + modal de producto
    Nav, Hero, Marquee, Featured, MenuExperience, ProductCard,
    ProductModal, CartDrawer, WhyDirect, Reviews, Loyalty, Faq,
    Contact, Footer, MobileOrderBar
    admin/AdminDashboard.tsx
    icons.tsx, ui.tsx
  lib/
    data.ts, admin-data.ts, types.ts, format.ts (COP)
```

## Funcionalidades incluidas en la demo

**Cliente**
- Hero con propuesta de valor + calculadora de ahorro flotante
- Menú digital: categorías, búsqueda, filtros dietarios (veggie/picante/sin gluten),
  badges (más vendido, nuevo), tiempo de prep. y calorías
- Página de producto (modal): adiciones, término, salsas, cantidad, notas a cocina,
  cross-sell ("va perfecto con")
- Carrito world-class: domicilio/recoger/en mesa, cupones (`MELLIS10`, `BIENVENIDO`),
  propina, upsell, totales dinámicos
- **Checkout por WhatsApp** con mensaje estructurado automático
- "¿Por qué directo?" con calculadora de ahorro interactiva (ROI para el dueño)
- Reseñas, programa de puntos, FAQ, contacto con mapa, footer
- SEO: metadata Open Graph, JSON-LD `Restaurant`, `es-CO`, mobile-first, `prefers-reduced-motion`

**Panel del negocio (/admin)**
- KPIs del día, gráfico de ventas por hora, top productos
- Pedidos en vivo (avanzar estado con un toque, canal Web/WhatsApp/QR)
- Menú: **editar precio** y **agotar producto** al instante (los pedidos clave del dueño)
- Toggles de "Abierto" y "Domicilios"

## Roadmap a producción

1. **Backend:** Supabase (Postgres + Auth + Realtime) o Firebase. Prisma si se usa Postgres directo.
2. **Pagos Colombia:** Wompi / Bold / Mercado Pago (PSE, Nequi, Daviplata, Bancolombia QR).
3. **Órdenes en tiempo real** a cocina (Realtime/websockets) + notificaciones.
4. **CRM y campañas** por WhatsApp Cloud API + email (Resend).
5. **QR dinámico** por mesa, zonas de domicilio con mapa (Google Maps).
6. **Analítica avanzada**, carritos abandonados, facturación electrónica (integraciones CO).
7. **Multi-tenant**: mismo producto revendible a cualquier restaurante de Medellín.

> Nota: `next@15.5.4` reporta advisories de npm audit (principalmente DoS/cache en
> despliegues self-hosted públicos, no relevantes para este prototipo local). Al ir a
> producción, fijar la última versión parchada de Next.
