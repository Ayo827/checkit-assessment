import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProductCard } from "./ProductCard";
import { Product } from "@/types";

const mockProduct: Product = {
  id: 1,
  title: "Test Product",
  description: "A test description",
  price: 99.99,
  discountPercentage: 10,
  rating: 4.5,
  stock: 50,
  brand: "Test Brand",
  category: "test-category",
  thumbnail: "https://example.com/thumb.jpg",
  images: ["https://example.com/img1.jpg"],
};

describe("ProductCard", () => {
  it("renders product title and price correctly", () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("$99.99")).toBeInTheDocument();
    expect(screen.getByText("test-category")).toBeInTheDocument();
    expect(screen.getByText("4.5")).toBeInTheDocument();
  });

  it("shows discount percentage if available", () => {
    render(<ProductCard product={mockProduct} />);
    
    expect(screen.getByText("10% OFF")).toBeInTheDocument();
  });

  it("links to the correct product detail page", () => {
    render(<ProductCard product={mockProduct} />);
    
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/products/1");
  });
});
