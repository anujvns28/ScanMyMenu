import { useEffect, useState } from "react";
import { X, ChevronRight, Camera, Trash2, CheckCircle } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRatingAndReview,
  editRatingAndReview,
  getUserReviewOfProduct,
} from "../../../../service/operations/rating&review";

export default function OrderRatingFlow({ onClose }) {
  const [step, setStep] = useState(0);
  const [products, setProducts] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  // 🔥 single product state
  const [productRating, setProductRating] = useState(0);
  const [productComment, setProductComment] = useState("");
  const [productImages, setProductImages] = useState([]);
  const [reviewId, setReviewId] = useState(null);

  const { activeOrder } = useSelector((state) => state.order);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const currentProduct = products[step];

  /* ---------------- STARS ---------------- */
  const renderStars = (value, onChange) => (
    <div className="flex justify-center gap-4 mt-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className={`text-5xl transition-all duration-300 ${
            star <= value
              ? "text-yellow-400 scale-110 drop-shadow-lg"
              : "text-gray-300 hover:scale-110"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );

  /* ---------------- IMAGE UPLOAD ---------------- */
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      type: "new",
      file,
    }));

    setProductImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (idx) => {
    const updated = [...productImages];
    updated.splice(idx, 1);
    setProductImages(updated);
  };

  /* ---------------- FETCH EXISTING REVIEW ---------------- */
  const fetchRatingAndReviewHandler = async () => {
    if (!token || !currentProduct) return;

    const res = await getUserReviewOfProduct(
      { productId: currentProduct.productId },
      token,
      dispatch
    );

    if (res?.hasReviewed) {
      setReviewId(res.review._id);
      setProductRating(res.review.rating);
      setProductComment(res.review.reviewText || "");

      // 👇 convert existing URLs to editable format
      setProductImages(
        res.review.images.map((url) => ({
          type: "existing",
          url,
        }))
      );
    } else {
      setReviewId(null);
      setProductRating(0);
      setProductComment("");
      setProductImages([]);
    }
  };

  useEffect(() => {
    fetchRatingAndReviewHandler();
  }, [currentProduct]);

  useEffect(() => {
    if (activeOrder) {
      setProducts(activeOrder.items);
    }
  }, [activeOrder]);

  /* ---------------- SUBMIT REVIEW ---------------- */
  const handleSubmitReview = async () => {
    if (!productRating) return;

    const formData = new FormData();
    formData.append("productId", currentProduct.productId);
    formData.append("shopId", activeOrder.shopId);
    formData.append("rating", productRating);
    formData.append("reviewText", productComment);

    if (reviewId) {
      formData.append("reviewId", reviewId);
    }

    // 👇 separate keepImages & new uploads
    const keepImages = [];

    productImages.forEach((img) => {
      if (img.type === "existing") {
        keepImages.push(img.url);
      } else {
        formData.append("images", img.file);
      }
    });

    formData.append("keepImages", JSON.stringify(keepImages));

    reviewId
      ? await editRatingAndReview(formData, token, dispatch)
      : await addRatingAndReview(formData, token, dispatch);

    // reset for next product
    setProductRating(0);
    setProductComment("");
    setProductImages([]);
    setReviewId(null);

    if (step < products.length - 1) {
      setStep(step + 1);
    } else {
      setSubmitted(true);
    }
  };

  /* ---------------- THANK YOU ---------------- */
  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
        <div className="bg-white w-full rounded-t-3xl h-[60vh] flex flex-col justify-center items-center text-center p-6">
          <CheckCircle size={64} className="text-green-500 mb-4" />
          <h2 className="text-xl font-bold mb-2">Thank you! ❤️</h2>
          <p className="text-gray-500 text-sm mb-6">
            Your feedback helps the chef and other customers.
          </p>
          <button
            onClick={onClose}
            className="bg-black text-white px-8 py-3 rounded-xl"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  if (!currentProduct) return null;

  /* ---------------- UI ---------------- */
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl h-[80vh] p-6 overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-1">
          <p className="font-bold text-xl">How was {currentProduct.name}? 😋</p>
          <X onClick={onClose} />
        </div>

        <p className="text-sm text-gray-500 mb-6">
          Your feedback helps the chef and other customers ❤️
        </p>

        {/* Progress */}
        <div className="mb-6">
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all"
              style={{
                width: `${((step + 1) / products.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-[11px] text-gray-400 mt-2 text-center">
            Rating item {step + 1} of {products.length}
          </p>
        </div>

        {/* Product Card */}
        <div className="w-full flex items-center gap-4 bg-white rounded-2xl p-3 shadow border mb-4">
          <img
            src={currentProduct.image}
            alt={currentProduct.name}
            className="w-20 h-20 rounded-xl object-cover"
          />
          <div className="flex-1">
            <p className="text-lg font-bold">{currentProduct.name}</p>
            <p className="text-sm text-gray-500">
              Share your experience with this dish
            </p>
          </div>
        </div>

        {renderStars(productRating, setProductRating)}

        <textarea
          value={productComment}
          onChange={(e) => setProductComment(e.target.value)}
          placeholder={`Any feedback for ${currentProduct.name}?`}
          className="w-full mt-5 border-2 border-gray-200 rounded-2xl p-4 text-sm resize-none"
          rows={3}
        />

        {/* Image Upload */}
        <div className="w-full mt-6">
          <label className="flex flex-col items-center justify-center gap-2 text-sm font-semibold cursor-pointer border-2 border-dashed border-gray-300 rounded-2xl py-6 bg-gray-50">
            <Camera size={22} />
            Add food photos
            <input
              type="file"
              accept="image/*"
              multiple
              hidden
              onChange={handleImageUpload}
            />
          </label>

          {/* Preview */}
          <div className="flex gap-3 mt-4 overflow-x-auto">
            {productImages.map((img, idx) => (
              <div key={idx} className="relative">
                <img
                  src={
                    img.type === "existing"
                      ? img.url
                      : URL.createObjectURL(img.file)
                  }
                  alt="food"
                  className="w-20 h-20 rounded-xl object-cover shadow"
                />
                <button
                  onClick={() => removeImage(idx)}
                  className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1"
                >
                  <Trash2 size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          disabled={!productRating}
          onClick={handleSubmitReview}
          className={`mt-8 w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all
    ${
      productRating
        ? "bg-gradient-to-r from-black to-gray-800 text-white shadow-xl active:scale-95"
        : "bg-gray-200 text-gray-400 cursor-not-allowed"
    }
  `}
        >
          {step < products.length - 1 ? (
            <>
              <span>Next item</span>
              <ChevronRight className="w-5 h-5" />
            </>
          ) : (
            <>
              <span>Submit reviews</span>
              <span className="text-lg">✔</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
