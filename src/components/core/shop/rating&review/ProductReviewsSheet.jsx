import { Star, X } from "lucide-react";
import { useState } from "react";

/* ---------- HELPERS ---------- */

function StarRating({ rating, size = 14 }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          className={
            i <= rating
              ? "fill-yellow-400 stroke-yellow-400"
              : "stroke-gray-300"
          }
        />
      ))}
    </div>
  );
}

/* ---------- MAIN COMPONENT ---------- */

export default function ProductReviewsSheet({
  product,
  reviews,
  onClose,
}) {
  const [starFilter, setStarFilter] = useState(null);

  const filteredReviews = starFilter
    ? reviews.filter((r) => r.rating === starFilter)
    : reviews;

  const breakdown = [5, 4, 3, 2, 1].map((s) => ({
    star: s,
    count: reviews.filter((r) => r.rating === s).length,
  }));

  return (
    <div className="fixed inset-0 bg-black/40 flex items-end z-50">
      <div className="bg-white w-full rounded-t-2xl pb-16 max-h-[90vh] overflow-y-auto">

        {/* ---------- HEADER ---------- */}
        <div className="sticky top-0 bg-white p-5 border-b z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="font-semibold text-lg">{product.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <StarRating rating={Math.round(product.avgRating)} />
                <span className="text-sm text-gray-600">
                  {product.avgRating} ({product.totalReviews} reviews)
                </span>
              </div>
            </div>

            <button onClick={onClose}>
              <X />
            </button>
          </div>
        </div>

        {/* ---------- SUMMARY ---------- */}
        <div className="p-5 border-b">
          <h3 className="text-sm font-medium mb-3">Rating Summary</h3>

          <div className="space-y-2">
            {breakdown.map((b) => (
              <div key={b.star} className="flex items-center gap-3">
                <span className="w-10 text-sm">{b.star} ⭐</span>
                <div className="flex-1 bg-gray-100 h-2 rounded-full">
                  <div
                    className="h-2 rounded-full bg-yellow-400"
                    style={{
                      width: `${
                        reviews.length
                          ? (b.count / reviews.length) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
                <span className="text-sm text-gray-500">
                  {b.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ---------- STAR FILTER ---------- */}
        <div className="px-5 py-3 border-b">
          <div className="flex gap-2 flex-wrap">
            {[5, 4, 3, 2, 1].map((s) => (
              <button
                key={s}
                onClick={() =>
                  setStarFilter(starFilter === s ? null : s)
                }
                className={`px-3 py-1 text-sm rounded-full border transition
                  ${
                    starFilter === s
                      ? "bg-yellow-400 text-white border-yellow-400"
                      : "bg-white text-gray-600 hover:bg-gray-100"
                  }`}
              >
                ⭐ {s}
              </button>
            ))}
          </div>
        </div>

        {/* ---------- REVIEWS LIST ---------- */}
        <div className="p-5 space-y-4">
          {filteredReviews.length === 0 && (
            <p className="text-sm text-gray-400 text-center">
              No reviews found
            </p>
          )}

          {filteredReviews.map((r) => (
            <div
              key={r.id}
              className="border rounded-xl p-4"
            >
              <div className="flex justify-between">
                <p className="font-medium">{r.user || "Customer"}</p>
                <span className="text-xs text-gray-400">
                  {r.date}
                </span>
              </div>

              <StarRating rating={r.rating} />

              <p className="mt-2 text-sm text-gray-700">
                {r.comment}
              </p>

              {r.rating <= 2 && (
                <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-red-100 text-red-600">
                  Needs Attention
                </span>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
