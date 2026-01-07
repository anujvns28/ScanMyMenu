import { X, Star, Image, Filter } from "lucide-react";
import { useState } from "react";

const ProductReviewsSheet = ({ open, onClose, product }) => {
  const [filter, setFilter] = useState("all");

  if (!open || !product) return null;

  const totalReviews = product.reviews.length;

  const ratingCounts = [5,4,3,2,1].map(r =>
    product.reviews.filter(x => x.rating === r).length
  );

  const filteredReviews =
    filter === "all"
      ? product.reviews
      : product.reviews.filter(r => r.rating === filter);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-t-3xl shadow-2xl max-h-[90vh] flex flex-col animate-slide-up">

  {/* Header */}
  <div className="px-4 py-3 border-b flex justify-between items-center">
    <p className="font-bold text-lg">Ratings & Reviews</p>
    <button onClick={onClose} className="p-2 bg-gray-100 rounded-full">
      <X size={18}/>
    </button>
  </div>

  {/* Rating summary */}
  <div className="px-4 py-3 border-b space-y-3">
    <div className="flex items-center gap-4">
      <div className="text-4xl font-bold text-green-600">
        {product.rating}
      </div>
      <div className="text-sm text-gray-500">
        {product.reviews.length} ratings
      </div>
    </div>

    {[5,4,3,2,1].map((star, i) => (
      <div key={star} className="flex items-center gap-2 text-xs">
        <span>{star}★</span>
        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{
              width: `${
                (product.reviews.filter(r => r.rating === star).length /
                product.reviews.length) * 100 || 0
              }%`
            }}
          />
        </div>
        <span>
          {product.reviews.filter(r => r.rating === star).length}
        </span>
      </div>
    ))}
  </div>

  {/* Sticky Filters */}
  <div className="px-4 py-2 border-b bg-white sticky top-0 z-10 flex gap-2 overflow-x-auto">
    {["all",5,4,3,2,1].map(f => (
      <button
        key={f}
        onClick={() => setFilter(f)}
        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap
          ${
            filter === f
              ? "bg-orange-500 text-white"
              : "bg-gray-100 text-gray-700"
          }`}
      >
        {f === "all" ? "All" : `${f}★`}
      </button>
    ))}
  </div>

  {/* Reviews scroll */}
  <div className="flex-1 overflow-y-auto p-4 space-y-4">
    {filteredReviews.map((r,i)=>(
      <div key={i} className="bg-gray-50 rounded-xl p-4">
        <div className="flex justify-between">
          <p className="font-semibold">{r.user}</p>
          <div className="flex items-center gap-1 text-yellow-500">
            <Star size={14} className="fill-yellow-400"/>
            {r.rating}
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-1">{r.text}</p>

        {r.images && (
          <div className="flex gap-2 mt-2">
            {r.images.map((img,idx)=>(
              <img
                key={idx}
                src={img}
                className="w-16 h-16 rounded-lg object-cover"
              />
            ))}
          </div>
        )}

        <p className="text-xs text-gray-400 mt-1">{r.time}</p>
      </div>
    ))}
  </div>

</div>

    </div>
  );
};

export default ProductReviewsSheet;
