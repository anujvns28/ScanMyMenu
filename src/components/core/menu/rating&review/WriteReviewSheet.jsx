import { X, Star, Camera } from "lucide-react";
import { useState } from "react";
import GoogleLoginSheet from "../../../common/GoogleLoginSheet";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import LoaderComponent from "../../../common/LoaderComponent";

const WriteReviewSheet = ({
  open,
  onClose,
  product,
  reviewState,
  onSubmit,
}) => {
  const [hover, setHover] = useState(0);
  const [previews, setPreviews] = useState([]);
  const {
    rating,
    setRating,
    comment,
    setComment,
    images,
    setImages,
    showLogin,
    setShowLogin,
    isEditReview,
    existingImages,
    setExistingImages,
  } = reviewState;
  const { shopDetails } = useSelector((state) => state.shop);
  const { userLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!open || !product) return null;

  // Handle image selection
  const handleImagePick = (e) => {
    const files = Array.from(e.target.files);

    const newFiles = [...images, ...files].slice(0, 5); // max 5
    setImages(newFiles);

    const newPreviews = newFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
  };

  // Remove selected image
  const removeImage = (index) => {
    const newFiles = images.filter((_, i) => i !== index);
    setImages(newFiles);
    setPreviews(newFiles.map((file) => URL.createObjectURL(file)));
  };

  const googleLogin = () => {
    window.location.href = `http://localhost:4000/auth/user/google?shopId=${shopDetails._id}`;
  };

  useEffect(() => {
    const intent = JSON.parse(localStorage.getItem("POST_LOGIN_INTENT"));
    if (intent?.action === "SUBMIT_REVIEW") {
      setRating(intent.payload.rating);
      setComment(intent.payload.comment);
      localStorage.removeItem("POST_LOGIN_INTENT");
    }
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

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
            <p className="text-sm font-semibold mb-2">How was it?</p>
            <div className="flex gap-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={32}
                  className={`cursor-pointer transition-all ${
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
            <p className="text-sm font-semibold mb-2">Write your review</p>
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tell us about taste, portion, and overall experience..."
              className="w-full border rounded-2xl p-4 text-sm resize-none focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 text-sm text-gray-600 w-fit cursor-pointer">
              <Camera size={16} />
              Add photos
              <input
                type="file"
                multiple
                accept="image/*"
                hidden
                onChange={handleImagePick}
              />
            </label>

            {/* Existing images (Edit mode) */}
            {existingImages.length > 0 && (
              <div className="flex gap-3 mt-3 overflow-x-auto pb-2">
                {existingImages.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border shadow-sm"
                  >
                    <img src={img} className="w-full h-full object-cover" />

                    <button
                      onClick={() =>
                        setExistingImages((prev) =>
                          prev.filter((_, idx) => idx !== i)
                        )
                      }
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* New image previews */}
            {previews.length > 0 && (
              <div className="flex gap-3 mt-3 overflow-x-auto pb-2">
                {previews.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden border shadow-sm"
                  >
                    <img src={img} className="w-full h-full object-cover" />

                    <button
                      onClick={() => removeImage(i)}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-gray-400 mt-1">
              You can upload up to 5 photos
            </p>
          </div>
        </div>

        {/* Submit */}
        <div className="shrink-0 p-4 border-t bg-white">
          <button
            disabled={rating === 0 || !comment}
            onClick={onSubmit}
            className={`w-full py-3 rounded-xl text-white font-semibold text-lg transition ${
              rating === 0 || !comment
                ? "bg-gray-300"
                : "bg-orange-500 hover:bg-orange-600 shadow-lg"
            }`}
          >
            {isEditReview ? "Update Review" : "Submit Review"}
          </button>
        </div>
      </div>

      <GoogleLoginSheet
        open={showLogin}
        onClose={() => setShowLogin(false)}
        onGoogleLogin={googleLogin}
        purpose="review"
      />

      {userLoading && <LoaderComponent />}
    </div>
  );
};

export default WriteReviewSheet;
