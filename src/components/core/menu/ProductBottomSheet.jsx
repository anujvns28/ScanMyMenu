import { X, Star, Flame, Clock } from "lucide-react";
import { useState } from "react";
import WriteReviewSheet from "./rating&review/WriteReviewSheet";
import ProductReviewsSheet from "./rating&review/ProductReviewsSheet";
import { colorClasses } from "../../../utils/data";
import { useEffect } from "react";
import {
  addRatingAndReview,
  editRatingAndReview,
  getAllReview,
  getUserReviewOfProduct,
} from "../../../service/operations/rating&review";
import { useDispatch, useSelector } from "react-redux";
import { timeAgo } from "../../../utils/convertTime";
import ImageLightbox from "./rating&review/ImageLightbox";
import { useCart } from "../../../context/CartContext";
import { getProductDetails } from "../../../service/operations/product";

const ProductBottomSheet = ({
  productId,
  setProductId,
  currCategory,
  openReviewForm,
  setOpenReviewForm,
  fetchProducts,
}) => {
  if (!productId) return null;

  const [openReviewSheet, setOpenReviewSheet] = useState(false);
  const [product, setProduct] = useState({});
  const [allReview, setAllReview] = useState([]);
  const [userRatingAndReview, setUserRatingAndReview] = useState(null);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [images, setImages] = useState([]);
  const [showLogin, setShowLogin] = useState(false);
  const [isEditReview, setIsEditReview] = useState(false);
  const [existingImages, setExistingImages] = useState([]);

  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [openLightbox, setOpenLightbox] = useState(false);

  const reviewState = {
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
  };

  const dispatch = useDispatch();
  const { shopDetails } = useSelector((state) => state.shop);
  const { token } = useSelector((state) => state.auth);
  const { addToCart, isCartOpen } = useCart();

  const hasReviews = allReview && allReview.length > 0;

  const fetchRatingAndReviewHandler = async () => {
    let myReview = null;

    // 1️⃣ Agar logged in hai → apna review lao
    if (token) {
      const userReview = await getUserReviewOfProduct(
        { productId: productId },
        token,
        dispatch
      );

      if (userReview?.hasReviewed) {
        myReview = userReview.review;
        setUserRatingAndReview(myReview);
      }
    }

    const reviews = await getAllReview({ productId: productId }, dispatch);

    if (reviews?.data) {
      if (myReview) {
        setAllReview(reviews.data.filter((r) => r._id !== myReview._id));
      } else {
        setAllReview(reviews.data);
      }
    }
  };

  // Submit review
  const handleSubmitReview = async () => {
    if (rating === 0) return;
    if (!token) {
      const intent = {
        action: "SUBMIT_REVIEW",
        productId: product._id,
        categoryId: currCategory,
        shopId: shopDetails._id,

        payload: {
          rating,
          comment,
        },
      };

      localStorage.setItem("LOGIN_INTENT", JSON.stringify(intent));
      setShowLogin(true);
      return;
    }

    const formData = new FormData();
    formData.append("productId", productId);
    formData.append("shopId", shopDetails._id);
    formData.append("rating", rating);
    formData.append("reviewText", comment);

    formData.append("keepImages", JSON.stringify(existingImages));

    if (userRatingAndReview) {
      formData.append("reviewId", userRatingAndReview._id);
    }

    images.forEach((img) => {
      formData.append("images", img);
    });

    const result = userRatingAndReview
      ? await editRatingAndReview(formData, token, dispatch)
      : await addRatingAndReview(formData, token, dispatch);

    if (result) {
      setUserRatingAndReview(result.review);
      setProduct((prev) => ({
        ...prev,
        rating: result.productRating,
      }));
    }
    fetchProducts();
    setOpenReviewForm(false);
    setImages([]);
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      const result = await getProductDetails(productId, dispatch);

      if (result) {
        setProduct(result.data);
      }
    };

    fetchProductDetails();
  }, []);

  useEffect(() => {
    if (userRatingAndReview) {
      setRating(userRatingAndReview.rating);
      setComment(userRatingAndReview.reviewText);
      setExistingImages(userRatingAndReview.images);
    }
  }, [isEditReview]);

  useEffect(() => {
    fetchRatingAndReviewHandler();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Bottom Sheet */}
      <div className="relative pb-36 w-full max-w-md bg-white rounded-t-3xl shadow-2xl max-h-[85vh] flex flex-col animate-slide-up">
        {/* Drag handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-2"></div>

        {/* Close */}
        <button
          onClick={() => setProductId(null)}
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
                    className={`px-2 py-0.5 text-[9px] rounded-full flex items-center gap-1 font-medium shadow-sm
                                    ${colorClasses[tag.color || "blue"]}`}
                  >
                    {tag.name}
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
            <div
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium shadow-sm
  ${
    product?.spiceLevel === "mild"
      ? "bg-green-100 text-green-700"
      : product?.spiceLevel === "medium"
      ? "bg-yellow-100 text-yellow-700"
      : product?.spiceLevel === "spicy"
      ? "bg-orange-100 text-orange-700"
      : "bg-red-100 text-red-700"
  }`}
            >
              <Flame size={14} />
              <span className="capitalize">
                {product?.spiceLevel || "medium"} spicy
              </span>
            </div>
          </div>

          {/* Ingredients */}
          {product?.ingredients && (
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
          )}
          {/* Reviews Preview */}
          <div className="bg-gray-50 rounded-2xl p-4 space-y-4">
            {/* MY REVIEW */}
            {userRatingAndReview && (
              <div className="bg-gradient-to-r from-orange-50 to-white rounded-2xl p-4 border border-orange-200 shadow-sm space-y-3">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-[2px] bg-orange-100 text-orange-600 text-[11px] font-semibold rounded-full">
                      ⭐ Your Review
                    </div>
                    <p className="text-[11px] text-gray-400">
                      {timeAgo(userRatingAndReview.createdAt)}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setOpenReviewForm(true);
                      setIsEditReview(true);
                    }}
                    className="text-xs font-semibold text-orange-600 hover:underline"
                  >
                    Edit
                  </button>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={16}
                      className={
                        s <= userRatingAndReview.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm text-gray-700 leading-relaxed">
                  {userRatingAndReview.reviewText}
                </p>

                {/* Images */}
                {userRatingAndReview.images?.length > 0 && (
                  <div className="flex gap-2 overflow-x-auto">
                    {userRatingAndReview.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        onClick={() => {
                          setLightboxImages(userRatingAndReview.images);
                          setLightboxIndex(i);
                          setOpenLightbox(true);
                        }}
                        className="w-24 h-24 rounded-xl object-cover cursor-pointer"
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Only user has reviewed */}
            {userRatingAndReview && !hasReviews && (
              <div className="bg-white rounded-xl p-4 border border-dashed border-gray-300 text-center">
                <p className="text-sm font-semibold text-gray-800">
                  You’re the first reviewer 🌟
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  No one else has reviewed this item yet.
                </p>
              </div>
            )}

            {/* IF NO REVIEWS AT ALL */}
            {!hasReviews && !userRatingAndReview && (
              <div className="bg-white rounded-xl p-6 text-center border border-dashed border-orange-300">
                <p className="text-lg font-semibold text-gray-800">
                  Be the first to review 🍽️
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Help others by sharing your experience
                </p>

                <button
                  onClick={() => setOpenReviewForm(true)}
                  className="mt-4 px-5 py-2 bg-orange-500 text-white rounded-xl text-sm font-semibold"
                >
                  ✍ Write first review
                </button>
              </div>
            )}

            {/* OTHERS REVIEWS */}
            {hasReviews && (
              <div className="mt-2">
                <p className="text-sm font-semibold mb-4 text-gray-800">
                  What others are saying
                </p>

                <div className="space-y-4">
                  {allReview.slice(0, 3).map((r, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 space-y-3"
                    >
                      {/* Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
                            {r.user.name.charAt(0)}
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-gray-800">
                              {r.user.name}
                            </p>
                            <p className="text-[11px] text-gray-400">
                              {timeAgo(r.createdAt)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-[2px] rounded-lg text-xs font-semibold">
                          ⭐ {r.rating}
                        </div>
                      </div>

                      {/* Text */}
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {r.reviewText}
                      </p>

                      {/* Images if any */}
                      {r.images?.length > 0 && (
                        <div className="flex gap-2 overflow-x-auto">
                          {r.images.map((img, i) => (
                            <img
                              key={i}
                              src={img}
                              onClick={() => {
                                setLightboxImages(r.images);
                                setLightboxIndex(i);
                                setOpenLightbox(true);
                              }}
                              className="w-24 h-24 rounded-xl object-cover cursor-pointer"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setOpenReviewSheet(true)}
                  className="mt-4 w-full py-2 rounded-xl border border-orange-200 text-orange-600 text-sm font-semibold hover:bg-orange-50"
                >
                  View all reviews →
                </button>
              </div>
            )}

            {/* CTA when user has not reviewed */}
            {!userRatingAndReview && hasReviews && (
              <button
                onClick={() => setOpenReviewForm(true)}
                className="w-full py-2 border border-orange-500 text-orange-600 rounded-xl text-sm font-semibold"
              >
                ✍ Write a review
              </button>
            )}
          </div>
        </div>

        {/* ================= STICKY CTA ================= */}
        <div
          className={`fixed left-0 right-0 bg-white p-4 flex items-center justify-between border-t transition-all duration-300
    ${isCartOpen ? "bottom-18" : "bottom-0"}
  `}
        >
          <p className="text-xl font-bold">₹{product.price}</p>

          <button
            onClick={() => addToCart(product)}
            className="px-6 py-3 rounded-xl bg-green-600 text-white font-semibold shadow-md"
          >
            Add to plate
          </button>
        </div>
      </div>

      {openReviewForm && (
        <WriteReviewSheet
          open={openReviewForm}
          onClose={() => {
            setOpenReviewForm(false);
            setImages([]);
            setRating(userRatingAndReview?.rating || "");
            setComment(userRatingAndReview?.reviewText || "");
            setExistingImages(userRatingAndReview?.images || []);
          }}
          product={{
            _id: product._id,
            name: product.name,
            image: product.image,
          }}
          reviewState={reviewState}
          onSubmit={handleSubmitReview}
        />
      )}

      {openReviewSheet && (
        <ProductReviewsSheet
          onClose={() => setOpenReviewSheet(false)}
          reviews={allReview}
          myReview={userRatingAndReview}
          product={{
            image: product.image,
            _id: product._id,
            name: product.name,
          }}
        />
      )}

      {openLightbox && (
        <ImageLightbox
          images={lightboxImages}
          startIndex={lightboxIndex}
          onClose={() => setOpenLightbox(false)}
        />
      )}
    </div>
  );
};

export default ProductBottomSheet;
