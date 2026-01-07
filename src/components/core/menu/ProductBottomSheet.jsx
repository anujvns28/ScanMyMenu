import { X, Star, Flame, Clock } from "lucide-react";
import { useState } from "react";
import WriteReviewSheet from "./WriteReviewSheet";
import ProductReviewsSheet from "./ProductReviewsSheet";

const ProductBottomSheet = ({ product, setProductSheetDetails }) => {
  if (!product) return null;

  const [openReviewForm, setOpenRevewForm] = useState(false);
  const [openReviewSheet, setOpenReviewSheet] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Bottom Sheet */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col animate-slide-up">
        {/* Drag handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-2"></div>

        {/* Close */}
        <button
          onClick={() => setProductSheetDetails(null)}
          className="absolute top-4 right-4 p-1 rounded-full bg-gray-100"
        >
          <X size={18} />
        </button>

        {/* ================= SCROLLABLE CONTENT ================= */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-52 object-cover rounded-2xl"
          />

          {/* Name + Rating */}
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold">{product.name}</h2>
              <p className="text-sm text-gray-500 mt-1">
                {product.description}
              </p>

              {/* Tags & Today Special */}
              <div className="flex flex-wrap gap-2 mt-2">
                {product.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-xs rounded-full bg-orange-100 text-orange-700"
                  >
                    {tag}
                  </span>
                ))}

                {product.isTodaySpecial && (
                  <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700">
                    ⭐ Today’s Special
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm font-semibold">
              <Star size={14} />
              {product.rating}
            </div>
          </div>

          {/* Meta */}
          <div className="flex gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <Clock size={14} />
              {product.preparationTime} mins
            </div>
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <Flame size={14} />
              {product.spiceLevel || "Medium spicy"}
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-sm font-semibold mb-2">Ingredients</p>
            <div className="flex flex-wrap gap-2">
              {product.ingredients?.map((i, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white rounded-full text-xs shadow-sm"
                >
                  {i}
                </span>
              ))}
            </div>
          </div>

          {/* Reviews Preview */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-sm font-semibold mb-3">What people say</p>

            {product.reviews?.slice(0, 3).map((r, i) => (
              <div key={i} className="border-b last:border-none py-2">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold">{r.user}</span>
                  <span className="text-gray-400">{r.time}</span>
                </div>
                <p className="text-sm mt-1">{r.text}</p>
              </div>
            ))}

            {product.reviews?.length > 1 && (
              <button
                onClick={() => setOpenReviewSheet(true)}
                className="mt-3 text-orange-600 text-sm font-semibold"
              >
                View all {product.reviews.length} reviews →
              </button>
            )}

            <button
              onClick={() => setOpenRevewForm(true)}
              className="w-full mt-3 py-2 border border-orange-500 text-orange-600 rounded-xl text-sm font-semibold"
            >
              ✍ Write a review
            </button>
          </div>
        </div>

        {/* ================= STICKY CTA ================= */}
        <div className="shrink-0 bg-white p-4 flex items-center justify-between border-t">
          <p className="text-xl font-bold">₹{product.price}</p>
          <button className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-md">
            Add to plate
          </button>
        </div>
      </div>

      {openReviewForm && (
        <WriteReviewSheet
          open={openReviewForm}
          onClose={() => setOpenRevewForm(false)}
          product={product}
        />
      )}

      {openReviewSheet && (
        <ProductReviewsSheet
          open={openReviewSheet}
          onClose={() => setOpenReviewSheet(false)}
          product={product}
        />
      )}
    </div>
  );
};

export default ProductBottomSheet;
