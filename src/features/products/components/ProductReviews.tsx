"use client";

import { useState } from "react";
import { Review } from "@/types";
import { Star, CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductReviewsProps {
  reviews: Review[];
  totalRating: number;
}

export function ProductReviews({ reviews, totalRating }: ProductReviewsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 2;

  if (!reviews || reviews.length === 0) {
    return (
      <div className="py-12 text-center bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
        <p className="text-gray-500 font-medium">No reviews yet for this product.</p>
      </div>
    );
  }

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews.slice(indexOfFirstReview, indexOfLastReview);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Smooth scroll to top of reviews section
    const element = document.getElementById("reviews-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div id="reviews-section" className="space-y-10 scroll-mt-24">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-gray-100">
        <div className="space-y-1">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">Customer Reviews</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center text-yellow-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-5 w-5",
                    i < Math.floor(totalRating) ? "fill-yellow-400" : "text-gray-200"
                  )}
                />
              ))}
            </div>
            <span className="text-lg font-bold text-gray-900">{totalRating} out of 5</span>
          </div>
        </div>
        <div className="bg-blue-600 rounded-2xl px-6 py-4 text-white shadow-xl shadow-blue-100">
           <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Total Ratings</p>
           <p className="text-2xl font-black">{reviews.length} Global Reviews</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {currentReviews.map((review, index) => (
          <div key={index} className="flex flex-col sm:flex-row gap-6 p-8 rounded-3xl bg-white border border-gray-100 shadow-sm transition-all hover:shadow-md hover:border-blue-100 group">
            <div className="flex-shrink-0">
              <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform">
                {getInitials(review.reviewerName)}
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-black text-gray-900">{review.reviewerName}</h4>
                    <div className="flex items-center gap-1 text-[10px] font-black text-green-600 bg-green-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                       <CheckCircle className="h-3 w-3" />
                       Verified Purchase
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5 text-yellow-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-4 w-4",
                          i < review.rating ? "fill-yellow-400" : "text-gray-100"
                        )}
                      />
                    ))}
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-400">{formatDate(review.date)}</span>
              </div>

              <p className="text-gray-600 font-medium leading-relaxed italic">
                "{review.comment}"
              </p>
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 pt-10">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-4 rounded-2xl border border-gray-100 bg-white text-gray-900 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90 shadow-sm"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => paginate(i + 1)}
                className={cn(
                  "h-10 w-10 rounded-xl text-sm font-black transition-all",
                  currentPage === i + 1
                    ? "bg-gray-900 text-white shadow-lg shadow-gray-200 scale-110"
                    : "bg-gray-50 text-gray-400 hover:bg-gray-100"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-4 rounded-2xl border border-gray-100 bg-white text-gray-900 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-90 shadow-sm"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>
      )}
    </div>
  );
}
