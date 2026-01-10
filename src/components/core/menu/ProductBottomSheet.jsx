import { X, Star, Flame, Clock } from "lucide-react";
import { useState } from "react";
import WriteReviewSheet from "./WriteReviewSheet";
import ProductReviewsSheet from "./ProductReviewsSheet";
import { colorClasses } from "../../../utils/data";
import { useEffect } from "react";
import {
  getAllReview,
  getProductRatingSummary,
  getUserReviewOfProduct,
} from "../../../service/operations/rating&review";
import { useDispatch, useSelector } from "react-redux";
import { timeAgo } from "../../../utils/convertTime";

const ProductBottomSheet = ({
  product,
  setProductSheetDetails,
  currCategory,
  openReviewForm,
  setOpenReviewForm,
}) => {
  if (!product) return null;
  const [openReviewSheet, setOpenReviewSheet] = useState(false);

  const [allReview, setAllReview] = useState([]);
  const [userRatingAndReview, setUserRatingAndReview] = useState(null);
  const [editingReview, setEditingReview] = useState(null);

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const dummyProduct = {
    _id: "1",
    name: "Butter Chicken",
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    description: "Creamy tomato gravy with smoky tandoori chicken",
    price: 299,
    discountPrice: 349,

    rating: 4.6,
    reviewsCount: 128,

    preparationTime: 15,
    spiceLevel: "Medium",

    isVeg: false,
    isBestseller: true,
    isTodaySpecial: true,

    tags: ["Bestseller", "Creamy", "Spicy", "North Indian"],

    ingredients: [
      "Chicken",
      "Butter",
      "Tomato",
      "Fresh Cream",
      "Cashew Paste",
      "Garam Masala",
      "Kashmiri Chilli",
    ],

    reviews: [
      {
        user: "Rahul",
        rating: 5,
        text: "Absolutely delicious! The gravy was rich and perfectly spiced.",
        time: "2 days ago",
      },
      {
        user: "Ankit",
        rating: 4,
        text: "Very creamy and well cooked chicken. Would order again.",
        time: "1 week ago",
      },
      {
        user: "Neha",
        rating: 5,
        text: "Best butter chicken I've had in a long time!",
        time: "3 days ago",
      },
      {
        user: "Amit",
        rating: 4,
        text: "Great taste, portion size could be slightly bigger.",
        time: "5 days ago",
      },
    ],
  };

  const hasReviews = allReview && allReview.length > 0;

  const fetchRatingAndReviewHandler = async () => {
    const reviews = await getAllReview({ productId: product._id }, dispatch);
    if (reviews) {
      setAllReview(reviews.data);
    }

    if (token) {
      const userReview = await getUserReviewOfProduct(
        { productId: product._id },
        token,
        dispatch
      );
      if (userReview) {
        if (userReview?.hasReviewed) {
          setUserRatingAndReview(userReview.review);
        }
      }
    }
  };

  useEffect(() => {
    fetchRatingAndReviewHandler();
  }, []);

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
            <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
              <Flame size={14} />
              {product?.spiceLevel || "Medium spicy"}
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-gray-50 rounded-2xl p-4">
            <p className="text-sm font-semibold mb-2">Ingredients</p>
            <div className="flex flex-wrap gap-2">
              {dummyProduct.ingredients?.map((i, index) => (
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
          <div className="bg-gray-50 rounded-2xl p-4 space-y-4">
            {/* MY REVIEW */}
            {userRatingAndReview && (
              <div className="bg-gradient-to-r from-orange-50 to-white rounded-2xl p-4 border border-orange-200 shadow-sm">
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
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
                      setEditingReview(userRatingAndReview);
                    }}
                    className="text-xs font-semibold text-orange-600 hover:underline"
                  >
                    Edit
                  </button>
                </div>

                {/* Stars */}
                <div className="flex items-center gap-1 mb-2">
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

                {/* Review text */}
                <p className="text-sm text-gray-700 leading-relaxed">
                  {userRatingAndReview.reviewText}
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
                      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
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

                      <p className="text-sm text-gray-700 mt-3 leading-relaxed">
                        {r.reviewText}
                      </p>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setOpenReviewSheet(true)}
                  className="mt-4 w-full py-2 rounded-xl border border-orange-200 text-orange-600 text-sm font-semibold hover:bg-orange-50"
                >
                  View all {allReview.length} reviews →
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
          onClose={() => setOpenReviewForm(false)}
          product={{
            image: product.image,
            _id: product._id,
            name: product.name,
          }}
          category={currCategory}
          existingReview={editingReview}
          setUserRatingAndReview={setUserRatingAndReview}
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
    </div>
  );
};

export default ProductBottomSheet;
