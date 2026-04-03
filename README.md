# Checkit Assessment — Product Explorer

A modern, performant product catalogue built with **Next.js 16**, **TypeScript**, and **Tailwind CSS v4**. Built as a technical assessment, it demonstrates best practices in Server Components, data fetching, caching, granular loading states, and component testing.

---

## Features

- **Product Listing** — Browse a paginated grid of products fetched from [DummyJSON](https://dummyjson.com)
- **Search** — Real-time debounced search with instant URL sync
- **Category Filtering** — Filter products by category via sticky filter bar
- **Product Detail Page** — Full product view with images, ratings, reviews count, delivery/warranty/return info, and an "Add to Cart" CTA
- **Granular Loading States** — Skeleton UI for the product grid during search/category transitions, powered by React `Suspense` with dynamic keys
- **SEO** — Dynamic `generateMetadata` per product page with OpenGraph support
- **Error Handling** — Custom error boundary UI (`error.tsx`) and 404 handling via `notFound()`
- **Component Tests** — Unit tests for `ProductCard` using Vitest + React Testing Library

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
| Test Environment | jsdom |

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── page.tsx                # Home — product listing with search & categories
│   ├── layout.tsx              # Root layout
│   ├── loading.tsx             # Global loading skeleton
│   ├── error.tsx               # Global error boundary UI
│   └── products/
│       └── [id]/
│           └── page.tsx        # Product detail page (dynamic route)
│
├── features/
│   └── products/
│       └── components/
│           ├── ProductCard.tsx      # Individual product card
│           ├── ProductCard.test.tsx # Unit tests for ProductCard
│           ├── ProductGrid.tsx      # Responsive grid + empty/loading states
│           ├── ProductResults.tsx   # Server Component — fetches & renders results
│           ├── SearchInput.tsx      # Debounced search with URL sync
│           └── CategoryFilter.tsx   # Category pills with active state
│
├── components/
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
