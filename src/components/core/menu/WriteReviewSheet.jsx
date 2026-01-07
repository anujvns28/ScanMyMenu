import { X, Star, Camera } from "lucide-react";
import { useState } from "react";

const WriteReviewSheet = ({ open, onClose, product }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl shadow-2xl max-h-[80vh] flex flex-col animate-slide-up">

        {/* Handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-2"></div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">

          {/* Product */}
          <div className="flex items-center gap-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 object-cover rounded-xl shadow"
            />
            <div>
              <p className="font-bold text-lg">{product.name}</p>
              <p className="text-sm text-gray-500">
                Share your experience with this dish
              </p>
            </div>
          </div>

          {/* Rating */}
          <div>
            <p className="text-sm font-semibold mb-2">
              How was it?
            </p>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  className={`cursor-pointer transition-all
                    ${
                      (hover || rating) >= star
                        ? "text-yellow-400 fill-yellow-400 scale-110"
                        : "text-gray-300"
                    }`}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>

            {rating > 0 && (
              <p className="mt-2 text-sm text-gray-500">
                {rating === 5 && "Loved it 😍"}
                {rating === 4 && "Very good 👍"}
                {rating === 3 && "It was okay 🙂"}
                {rating === 2 && "Could be better 😕"}
                {rating === 1 && "Did not like it 😞"}
              </p>
            )}
          </div>

          {/* Comment */}
          <div>
            <p className="text-sm font-semibold mb-2">
              Write your review
            </p>
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about taste, portion, and overall experience..."
              className="w-full border rounded-2xl p-4 text-sm resize-none focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* Upload Photo (future ready) */}
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-sm text-gray-600">
              <Camera size={16} />
              Add photo
            </button>
            <p className="text-xs text-gray-400">
              (optional)
            </p>
          </div>

        </div>

        {/* Submit */}
        <div className="shrink-0 p-4 border-t bg-white">
          <button
            disabled={rating === 0}
            className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition
              ${
                rating === 0
                  ? "bg-gray-300"
                  : "bg-orange-500 hover:bg-orange-600 shadow-lg"
              }
            `}
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default WriteReviewSheet;
