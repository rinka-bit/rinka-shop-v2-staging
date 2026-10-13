RINKA SHOP V2 — PHASE 6 / STAGING ONLY
BASE: Phase 5 ZIP.

Changed: rinka-v2-nav.js, rinka-v2-nav.css only.
- Concept A bottom navigation shown after scrolling >170px; hidden again at top.
- Replaced placeholder unicode icons with consistent outline SVG icons.
- Hidden links are removed from keyboard tab order; accessible labels and focus states.
- Cart opens existing openCartDrawer() where available; otherwise falls back to cart.html.
- No checkout, payment, pricing, variant, backend, or admin logic changed.

IMPORTANT: This is a small, testable stabilization increment, NOT full Concept A migration.
No real browser/API test performed. Do not deploy to Production.
Production GAS ID references found in scanned root HTML/JS: []
Check ALL endpoints and connected services before any write test.
