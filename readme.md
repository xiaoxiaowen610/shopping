# NOMAD — React Storefront Starter

An interview portfolio starter for a fictional DTC travel accessories store. This is a frontend demo using local mock data; it does not connect to a real commerce backend.

## Included

- React + TypeScript + Vite
- Responsive storefront with mock products
- Search, category filter and price sorting
- Product detail with image thumbnails and color/variant choice
- Cart drawer and cart page
- Add/remove items and quantity controls
- Subtotal calculation and `localStorage` cart persistence
- Empty states and responsive layout

## Not included by design

Authentication, checkout/payment integration, backend APIs, admin dashboard, coupons, orders and inventory synchronization.

## Requirements

- Node.js 18 or later (Node.js 20 LTS recommended)
- npm

## Start locally

```bash
npm install
npm run dev
```

Open the local address printed by Vite.

## Validate a production build

```bash
npm run typecheck
npm run build
npm run preview
```

## Structure

```text
src/
  components/   Shared header, product cards, cart drawer, layout
  data/         Mock product data and variant inventory
  pages/        Storefront, product detail, cart, not found
  lib/          Currency formatting helper
  CartContext.tsx
  App.tsx
  main.tsx
  styles.css
```

## Demo path

1. Browse products on the home page.
2. Search by name or filter by category.
3. Open a product and choose an available color.
4. Add it to your bag.
5. Change quantity or remove items from the cart drawer or `/cart`.
6. Refresh the browser to verify that the cart is persisted.

## Notes

- Product data lives in `src/data/products.ts` and is intentionally easy to replace.
- Prices are integer cents; UI formatting uses `Intl.NumberFormat`.
- A cart row is identified by product ID + selected variant.
- Product photography currently uses remote Unsplash image URLs. For a final interview submission, ensure the chosen images are suitable and you have permission to use them.
