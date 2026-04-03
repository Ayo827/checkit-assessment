"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw, Home } from "lucide-react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center p-4 text-center">
      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-red-100 p-6 text-red-600 mb-8 animate-bounce">
        <AlertCircle className="h-12 w-12" />
      </div>
      <h1 className="mb-4 text-4xl font-black text-gray-900 tracking-tight">Something went wrong!</h1>
      <p className="mb-10 text-lg text-gray-500 max-w-md mx-auto font-medium leading-relaxed">
        We encountered an unexpected error while trying to load the content. 
        Don't worry, it's not your fault!
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
        <button
          onClick={() => reset()}
          className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-gray-900 px-8 py-5 text-lg font-black text-white transition-all hover:bg-blue-600 hover:scale-105 active:scale-95 shadow-xl shadow-gray-200"
        >
          <RotateCcw className="h-5 w-5" />
          Try again
        </button>
        <Link
          href="/"
          className="flex-1 flex items-center justify-center gap-2 rounded-2xl border-2 border-gray-900 px-8 py-5 text-lg font-black text-gray-900 transition-all hover:bg-gray-50 hover:scale-105 active:scale-95"
        >
          <Home className="h-5 w-5" />
          Go Home
        </Link>
      </div>
      
      <div className="mt-12 p-4 rounded-xl bg-gray-50 border border-gray-100 max-w-lg">
        <p className="text-xs font-mono text-gray-400 break-all select-all">
          ID: {error.digest || 'Unknown error digest'} | {error.message}
        </p>
      </div>
    </div>
  );
}
