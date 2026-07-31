# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary (the surface's visitor):** the dine-in diner seated at a restaurant
table, phone in hand. Job: scan the table's QR, browse the menu, customize and
send an order straight to the kitchen, call a waiter, and request/split the bill
— without waiting for a server.

**Buyer (who the demo must convince):** the independent restaurant owner/operator
in Medellín. The experience is designed for the diner, but the business goal is
that the owner sees it and wants to buy the platform.

**Secondary visitors:** takeaway/pickup and delivery customers (a secondary flow
to the in-table experience).

## Product Purpose

A digital in-restaurant menu and direct-ordering platform: diners order from
their table (or for delivery/pickup) with no commission to third-party delivery
apps. It exists as a **sales demo / white-label template** used to sell premium
ordering websites to independent restaurants across Medellín. Success = a
restaurant owner sees the demo and immediately wants it for their business (a
closed sale); for the diner, success = ordering quickly and correctly without
waiting.

## Positioning

A QR-at-the-table digital menu with self-ordering **straight to the kitchen** and
**0% third-party commission** — the restaurant keeps 100% of the sale and owns
its customer data. Differentiated from delivery marketplaces (Rappi/Uber Eats)
that charge 25–30%, and from static PDF/paper menus, by being a live,
personalized, order-capable menu the owner controls from their phone.

## Operating Context

- **Diner:** seated at a numbered table, scans a per-table QR (route
  `/mesa/[n]`), orders in rounds sent to the kitchen, calls the waiter, and
  requests/splits the bill from the phone.
- **Delivery/pickup (secondary):** cart → checkout with WhatsApp handoff or
  online checkout flow → live order tracking (`/pedido`).
- **Owner:** mobile-friendly admin panel (`/admin`) — live orders, edit prices
  and mark items sold-out instantly, promotions, and a customer CRM.
- **Sale:** shown on a phone/laptop to restaurant owners in Medellín. Branded on
  the reference restaurant "Melli's" (burger/brunch, Sabaneta), meant to be
  re-skinned per client.

## Capabilities and Constraints

- **Pinned (non-negotiable):** the dine-in **QR menu with auto-order to the
  kitchen** is the star capability; delivery/pickup is secondary.
- **Pinned (non-negotiable):** current state is a **prototype with mock data and
  no real backend** — no persistence, payments, or auth are wired; all flows are
  simulated. Preserve this honesty until a backend is deliberately chosen.
- **Present in the implementation** (currently true, but not marked
  non-negotiable by the owner): WhatsApp checkout that auto-generates a
  structured order message; Colombian payment methods shown as demo (Nequi,
  Daviplata, PSE, Bancolombia QR, card, cash); Spanish (Colombian) UI copy; COP
  pricing.
- **White-label intent:** to be adapted/re-skinned per restaurant; Melli's
  content is placeholder showcase data.
- **Terminology (ES-CO):** mesa (table), ronda (order round), pedir la cuenta
  (request the bill), domicilio (delivery), recoger (pickup).

## Brand Commitments

The showcase instance is branded **"Melli's"** (reference burger/brunch spot,
Sabaneta — Medellín). This is placeholder/demo branding, not a binding identity
for the product itself; a per-client rebrand is expected. No binding visual
constraints are recorded here (the visual world is handled outside init).

## Evidence on Hand

- Working prototype (this repo): `/` (landing), `/mesa/[n]` (table menu),
  `/checkout`, `/pedido` (tracking), `/admin` (owner panel).
- Menu content, prices, reviews, and analytics are **fabricated demo data**
  (`src/lib/data.ts`, `src/lib/admin-data.ts`) — future work must not present
  them as real. Ratings/reviews (4.8★, 1,247) and revenue figures are
  placeholder.
- Reference inspiration only (tone, not assets): Melli's (Instagram
  `@mellis_sss`, Google Maps).
- No real customers, sales, testimonials, or benchmarks exist yet — these must
  not be fabricated.

## Product Principles

1. **Diner speed first** — ordering from the table must beat waiting for a
   server; every screen removes friction.
2. **Make the owner's ROI obvious** — the demo must visibly answer "how does this
   make me money" (0% commission, owns the data, edits from a phone).
3. **Owner control without developers** — prices, availability, and promos
   editable from a phone in seconds.
4. **Reusable by design** — content is placeholder; the product must re-skin
   cleanly per restaurant.
5. **Honest about state** — it is a mock-data prototype; never imply live
   payments/backend or real reviews.

## Accessibility & Inclusion

Mobile-first (assume ~90% of visitors on phones). Respect `prefers-reduced-motion`
(already implemented). Target WCAG AA contrast. No client-specific accessibility
standard has been established.
