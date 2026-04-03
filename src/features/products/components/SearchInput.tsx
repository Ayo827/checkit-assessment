"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function SearchInput({ className }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (value) {
        params.set("q", value);
        params.delete("page");
      } else {
        params.delete("q");
      }
      
      const newQuery = params.toString();
      const currentQuery = searchParams.toString();

      if (newQuery !== currentQuery) {
        const query = newQuery ? `?${newQuery}` : "";
        router.push(`${pathname}${query}`, { scroll: false });
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [value, pathname]);

  useEffect(() => {
    const q = searchParams.get("q") ?? "";
    if (q !== value) {
      setValue(q);
    }
  }, [searchParams]);

  const clearSearch = () => {
    setValue("");
  };

  return (
    <div className={cn("relative group", className)}>
      <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
      <input
        type="text"
        placeholder="Search for items..."
        className="h-12 w-full rounded-2xl border border-gray-200 text-black bg-white pl-10 pr-10 text-sm font-medium outline-none transition-all focus:border-blue-500 focus:ring-4 focus:ring-blue-100 placeholder:text-gray-400"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button
          onClick={clearSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 active:scale-90 transition-all"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
