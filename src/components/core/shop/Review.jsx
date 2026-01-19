import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import ProductReviewsSheet from "./rating&review/ProductReviewsSheet";

/* ---------------- DUMMY DATA ---------------- */

const summary = {
  avgRating: 4.3,
  totalReviews: 128,
  breakdown: [
    { star: 5, count: 76 },
    { star: 4, count: 32 },
    { star: 3, count: 12 },
    { star: 2, count: 5 },
    { star: 1, count: 3 },
  ],
};

const products = [
  { id: "p1", name: "Paneer Burger", avgRating: 4.6, totalReviews: 42 },
  { id: "p2", name: "Veg Pizza", avgRating: 3.2, totalReviews: 18 },
  { id: "p3", name: "Cold Coffee", avgRating: 2.8, totalReviews: 9 },
];

const reviewsByProduct = {
  p1: [
    {
      id: 1,
      user: "Rahul",
      rating: 5,
      comment: "Best burger I’ve had!",
      date: "2 days ago",
    },
    {
      id: 2,
      user: "Anjali",
      rating: 4,
      comment: "Very tasty, will order again.",
      date: "4 days ago",
    },
  ],
  p2: [
    {
      id: 3,
      user: "Amit",
      rating: 3,
      comment: "Taste ok but cheese was less.",
      date: "1 day ago",
    },
  ],
  p3: [
    {
      id: 4,
      user: "Neha",
      rating: 2,
      comment: "Coffee was cold 😕",
      date: "5 days ago",
    },
  ],
};

/* ---------------- HELPERS ---------------- */

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

function StatusBadge({ rating }) {
  if (rating >= 4)
    return (
      <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-700">
        🔥 Best
      </span>
    );
  if (rating >= 3)
    return (
      <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
        ⚠ Improve
      </span>
    );
  return (
    <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">
      🚨 Critical
    </span>
  );
}

/* ---------------- SKELETON (NO DESIGN CHANGE) ---------------- */

function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm animate-pulse">
      <div className="flex justify-between items-start">
        <div>
          <div className="h-4 w-40 bg-gray-200 rounded mb-2" />
          <div className="h-3 w-24 bg-gray-200 rounded mb-1" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
        <div className="h-6 w-20 bg-gray-200 rounded-full" />
      </div>

      <div className="mt-4 h-3 w-40 bg-gray-200 rounded" />
    </div>
  );
}

function ProductSkeletonList() {
  return (
    <div className="space-y-4">
      {[1, 2, 3, 4].map((i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

/* ---------------- MAIN PAGE ---------------- */

export default function ShopkeeperRatingsReviews() {
  const [search, setSearch] = useState("");
  const [starFilter, setStarFilter] = useState(null);
  const [healthFilter, setHealthFilter] = useState(null);
  const [category, setCategory] = useState("all");
  const [reviewCount, setReviewCount] = useState("all");
  const [recent, setRecent] = useState("all");

  const [openProduct, setOpenProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const isAnyFilterActive =
  search.trim() !== "" ||
  starFilter !== null ||
  healthFilter !== null ||
  category !== "all" ||
  reviewCount !== "all" ||
  recent !== "all";


  const filteredProducts = products.filter((p) => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (starFilter && Math.floor(p.avgRating) !== starFilter) return false;

    if (healthFilter === "best" && p.avgRating < 4) return false;
    if (healthFilter === "improve" && (p.avgRating < 3 || p.avgRating >= 4))
      return false;
    if (healthFilter === "critical" && p.avgRating >= 3) return false;

    if (reviewCount === "low" && p.totalReviews >= 5) return false;
    if (reviewCount === "high" && p.totalReviews <= 10) return false;

    return true;
  });

  const clearAllFilters = () => {
    setSearch("");
    setStarFilter(null);
    setHealthFilter(null);
    setCategory("all");
    setReviewCount("all");
    setRecent("all");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-6">Ratings & Reviews</h1>

      {/* SUMMARY */}
      <div className="bg-white rounded-xl p-5 shadow mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-4xl font-bold text-yellow-500">
            {summary.avgRating} ⭐
          </h2>
          <p className="text-gray-500">
            Based on {summary.totalReviews} reviews
          </p>
        </div>

        <div className="mt-4 space-y-2">
          {summary.breakdown.map((b) => (
            <div key={b.star} className="flex items-center gap-3">
              <span className="w-10 text-sm">{b.star} ⭐</span>
              <div className="flex-1 bg-gray-100 h-2 rounded-full">
                <div
                  className="h-2 rounded-full bg-yellow-400"
                  style={{ width: `${b.count}%` }}
                />
              </div>
              <span className="text-sm text-gray-500">{b.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- PREMIUM FILTER SECTION ---------------- */}
      <div className="bg-white rounded-xl p-4 shadow mb-6 space-y-4">
        {/* 🔍 Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-lg px-4 py-2 pl-10 text-sm
                 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
        </div>

        {/* ⭐ Star Filter */}
        <div className="flex gap-2 flex-wrap">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setStarFilter(starFilter === star ? null : star)}
              className={`px-3 py-1 text-sm rounded-full border transition
          ${
            starFilter === star
              ? "bg-yellow-400 text-white border-yellow-400"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
            >
              ⭐ {star}
            </button>
          ))}
        </div>

        {/* 🔥 Health Filter */}
        <div className="flex gap-2 flex-wrap">
          {[
            { key: "best", label: "🔥 Best" },
            { key: "improve", label: "⚠ Improve" },
            { key: "critical", label: "🚨 Critical" },
          ].map((h) => (
            <button
              key={h.key}
              onClick={() =>
                setHealthFilter(healthFilter === h.key ? null : h.key)
              }
              className={`px-3 py-1 text-sm rounded-full border transition
          ${
            healthFilter === h.key
              ? "bg-gray-900 text-white"
              : "bg-white text-gray-600 hover:bg-gray-100"
          }`}
            >
              {h.label}
            </button>
          ))}
        </div>

        {/* ⬇ More Filters */}
        <details className="group">
          <summary className="cursor-pointer text-sm text-gray-600 list-none flex items-center gap-1">
            More filters
            <span className="group-open:rotate-180 transition">▾</span>
          </summary>

          <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Category */}
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Categories</option>
              <option value="burger">Burger</option>
              <option value="pizza">Pizza</option>
              <option value="beverage">Beverage</option>
            </select>

            {/* Review Count */}
            <select
              value={reviewCount}
              onChange={(e) => setReviewCount(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Reviews</option>
              <option value="low">Less than 5 reviews</option>
              <option value="high">More than 10 reviews</option>
            </select>

            {/* Recent */}
            <select
              value={recent}
              onChange={(e) => setRecent(e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm"
            >
              <option value="all">All Time</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
            </select>
          </div>
        </details>

        
{isAnyFilterActive && (
  <div className="flex justify-end">
    <button
      onClick={clearAllFilters}
      className="text-sm text-gray-500 hover:text-gray-700 underline"
    >
      Clear all filters
    </button>
  </div>
)}

      </div>

      {/* PRODUCT CARDS */}
      {loading ? (
        <ProductSkeletonList />
      ) : filteredProducts.length === 0 ? (
        <div className="bg-white rounded-xl p-10 text-center text-sm text-gray-400 shadow">
          No products match your filters
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((p) => {
            const status =
              p.avgRating >= 4
                ? "best"
                : p.avgRating >= 3
                  ? "improve"
                  : "critical";

            const accent =
              status === "best"
                ? "bg-green-500"
                : status === "improve"
                  ? "bg-yellow-400"
                  : "bg-red-500";

            const gradient =
              status === "best"
                ? "from-green-50 to-white"
                : status === "improve"
                  ? "from-yellow-50 to-white"
                  : "from-red-50 to-white";

            return (
              <div
                key={p.id}
                onClick={() => setOpenProduct(p)}
                className="group relative bg-gradient-to-r rounded-xl p-5 shadow-sm
                   hover:shadow-lg transition cursor-pointer"
              >
                <div
                  className={`absolute left-0 top-0 h-full w-1 rounded-l-xl ${accent}`}
                />

                <div className={`rounded-xl bg-gradient-to-r ${gradient} p-5`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {p.name}
                      </h3>

                      <div className="flex items-center gap-2 mt-2">
                        <StarRating rating={Math.round(p.avgRating)} />
                        <span className="text-sm text-gray-600">
                          {p.avgRating}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 mt-1">
                        {p.totalReviews} reviews
                      </p>
                    </div>

                    <StatusBadge rating={p.avgRating} />
                  </div>

                  <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
                    <span>
                      {status === "best" && "Customers love this product"}
                      {status === "improve" && "Can be improved"}
                      {status === "critical" && "Needs immediate attention"}
                    </span>

                    <span className="group-hover:text-gray-600 transition">
                      Tap to view reviews →
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {openProduct && (
        <ProductReviewsSheet
          product={openProduct}
          reviews={reviewsByProduct[openProduct.id] || []}
          onClose={() => setOpenProduct(null)}
        />
      )}
    </div>
  );
}
