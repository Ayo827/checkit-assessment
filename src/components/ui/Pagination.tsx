"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
}

export function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const getVisiblePages = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      let start = Math.max(1, currentPage - 2);
      let end = Math.min(totalPages, start + maxVisible - 1);
      
      if (end === totalPages) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      for (let i = start; i <= end; i++) pages.push(i);
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <nav className="flex items-center justify-center space-x-2 py-8" aria-label="Pagination">
      <Link
        href={createPageURL(currentPage - 1)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium transition-colors hover:bg-gray-50",
          currentPage <= 1 && "pointer-events-none opacity-50"
        )}
        aria-disabled={currentPage <= 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Link>

      {getVisiblePages().map((page) => (
        <Link
          key={page}
          href={createPageURL(page)}
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-md border text-sm font-medium transition-colors",
            currentPage === page
              ? "border-blue-600 bg-blue-600 text-white"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
          )}
        >
          {page}
        </Link>
      ))}

      <Link
        href={createPageURL(currentPage + 1)}
        className={cn(
          "flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-white text-sm font-medium transition-colors hover:bg-gray-50",
          currentPage >= totalPages && "pointer-events-none opacity-50"
        )}
        aria-disabled={currentPage >= totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Link>
    </nav>
  );
}
