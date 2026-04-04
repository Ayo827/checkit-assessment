# Checkit Assessment — Product Explorer

A modern, performant product catalogue built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**. Built as a technical assessment, it demonstrates best practices in Server Components, data fetching, caching, granular loading states, and component testing.

---

## Features

- **Product Listing** — Browse a paginated grid of products fetched from [DummyJSON](https://dummyjson.com)
- **Search** — Real-time debounced search with instant URL sync
- **Category Filtering** — Filter products by category via sticky filter bar
- **Product Detail Page** — Full product view with images, ratings, stock status, delivery/warranty info, and an interactive "Add to Cart" system
- **Product Reviews** — Customer feedback section with star ratings, reviewer details, and "Verified Purchase" badges
- **Review Pagination** — Client-side pagination for product reviews (2 per page) with smooth scroll-to-top interaction
- **Shopping Cart** — Persistent cart (localStorage) with stock-aware quantity controls, subtotals, and premium UI
- **Checkout Process** — Simulated multi-step checkout flow with form validation and order confirmation. The "Buy Now" button leads directly here for a fast checkout.
- **Navigation** — Sticky premium Navbar with dynamic cart count badge
- **SEO & Performance** — Server Components for initial load, Client Components for interactivity, and dynamic OpenGraph metadata
- **Testing** — Component tests for core UI elements using Vitest

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Data Source | [DummyJSON API](https://dummyjson.com/docs/products) |
| Testing | Vitest + React Testing Library + jest-dom |
| State | React Context + LocalStorage |
| Deployment | **Vercel** (originally Cloudflare Workers) |

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── cart/
│   │   └── page.tsx            # Cart — item review & quantity management
│   ├── checkout/
│   │   └── page.tsx            # Checkout — simulated payment & confirmation
│   ├── products/
│   │   └── [id]/
│   │       └── page.tsx        # Product detail page (dynamic route)
│   ├── layout.tsx              # Root layout with CartProvider & Navbar
│   ├── loading.tsx             # Global loading skeleton
│   └── error.tsx               # Global error boundary UI
│
├── features/
│   └── products/
│       └── components/
│           ├── ProductCard.tsx      # Individual product card
│           ├── ProductCard.test.tsx # Unit tests for ProductCard
│           ├── ProductGrid.tsx      # Responsive grid + empty/loading states
│           ├── ProductResults.tsx   # Server Component — fetches & renders results
│           ├── ProductReviews.tsx   # Client Component — paginated customer reviews
│           ├── AddToCartButton.tsx  # Client Component — cart interaction
│           ├── SearchInput.tsx      # Debounced search with URL sync
│           └── CategoryFilter.tsx   # Category pills with active state
│
├── components/
│   ├── layout/
│   │   └── Navbar.tsx          # Sticky navigation with cart badge
│   └── ui/
│       ├── Skeleton.tsx         # Reusable skeleton animation component
│       ├── Pagination.tsx       # URL-based pagination
│       └── Breadcrumbs.tsx      # Breadcrumb navigation
│
├── lib/
│   ├── api/
│   │   └── client.ts            # All fetch functions with Next.js caching
│   └── utils.ts                 # cn() utility (clsx + tailwind-merge)
│
├── types/
│   └── index.ts                 # Product, Review, ProductResponse interfaces
│
└── test/
    └── setup.ts                 # Vitest global setup — mocks for Next.js APIs
```

---

## Data Fetching & Caching Strategy

All data fetching is done using native `fetch` on the server, leveraging Next.js's built-in Data Cache:

| Endpoint | Cache Strategy | Reason |
|---|---|---|
| `GET /products` | `force-cache` + `revalidate: 3600` | Listing data changes infrequently; cached for 1 hour |
| `GET /products/search` | `no-store` | Search results should always be fresh |
| `GET /products/:id` | `force-cache` + `revalidate: 3600` | Product details are stable |
| `GET /products/category-list` | `force-cache` | Categories rarely change |
| `GET /products/category/:name` | `force-cache` + `revalidate: 3600` | Category listings cached 1 hour |

> This approach is preferred over client-side libraries (like TanStack Query) for the initial page load because it reduces client bundle size, improves SEO, and leverages server-side persistent caching shared across all users.

---

## Loading State Architecture

Loading states are implemented using a **Suspense + dynamic key** pattern:

```tsx
// page.tsx
<Suspense
  key={`${query}-${category}-${page}`}  // ← Forces fallback on param change
  fallback={<ProductGrid products={[]} isLoading={true} />}
>
  <ProductResults query={query} category={category} page={page} />
</Suspense>
```

- The **Header**, **Search Input**, and **Category Filter** render instantly (they don't depend on product data).
- Only the **Product Grid** shows a skeleton while new results load.
- Changing the `key` prop forces React to unmount and remount the `Suspense` boundary, triggering the fallback skeleton on every navigation.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Run tests

```bash
npm test
```

Or for a single run (no watch mode):

```bash
npm test -- --run
```

---

## Environment Variables

No environment variables are required — the app uses the public [DummyJSON API](https://dummyjson.com) with no authentication.

---

## API Reference

All API calls are centralised in `src/lib/api/client.ts`:

| Function | Description |
|---|---|
| `getProducts(limit, skip)` | Fetch a paginated list of products |
| `searchProducts(query, limit, skip)` | Search products by keyword |
| `getProductById(id)` | Fetch a single product by ID |
| `getCategories()` | Fetch all available category slugs |
| `getProductsByCategory(category, limit, skip)` | Fetch products filtered by category |

---

## Deployment

This project was originally intended to be deployed on **Cloudflare Workers** using `open-next`. However, due to persistent configuration errors with the `wrangler.jsonc` file, the deployment strategy was shifted to **Vercel** as a reliable alternative.

Vercel provides seamless integration for Next.js 16 applications, ensuring that Server Components, dynamic data fetching, and caching strategies work out of the box with zero configuration overhead for this assessment.
