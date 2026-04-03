import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import React from "react";

// Mock Next.js navigation hooks
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Next.js Image component
vi.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => {
    return React.createElement("img", { src, alt, referrerPolicy: "no-referrer", ...props });
  },
}));

// Mock Next.js Link component
vi.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children, ...props }: any) => {
    return React.createElement("a", { href, ...props }, children);
  },
}));

// Mock ResizeObserver for some components if needed
global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));
