import { X, Star } from "lucide-react";
import { useState } from "react";
import { timeAgo } from "../../../../utils/convertTime";
import {
  getAllReview,
  getProductRatingSummary,
} from "../../../../service/operations/rating&review";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ImageLightbox from "./ImageLightbox";
import { getProductDetails } from "../../../../service/operations/product";

const ProductReviewsSheet = ({
  onClose,
  reviews,
  setReview,
  productId,
  myReview,
  product,
}) => {
  const [ratingSummary, setRatingSummary] = useState(null);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [openLightbox, setOpenLightbox] = useState(false);

  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();

  const getStarCount = (star) => {
    return ratingSummary?.starCounts?.[star] || 0;
  };

  const filtered =
    filter === "all" ? reviews : reviews.filter((r) => r.rating === filter);

  const allImages = [
    ...(myReview?.images || []),
    ...reviews.flatMap((r) => r.images || []),
  ];

  const fetchRatingSummary = async () => {
    const overAllRating = await getProductRatingSummary(
      { productId: product._id },
      dispatch,
    );
    if (overAllRating) {
      setRatingSummary(overAllRating.data);
    }
  };

  useEffect(() => {
    fetchRatingSummary();
  }, []);

  useEffect(() => {
    const fetchProductRating = async () => {
      const result = await getAllReview({ productId: productId }, dispatch);

      if (result) {
        setReview(result.data);
      }
    };
    fetchProductRating();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-end ">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white rounded-t-3xl shadow-2xl flex flex-col h-[85vh] pb-16">
        {/* Header */}
        <div className="p-4 border-b  ">
          <div className="flex justify-between items-center">
            <p className="font-bold text-lg">Ratings & Reviews</p>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-gray-100 hover:bg-gray-200"
            >
              <X size={18} />
            </button>
          </div>

          <div className="flex items-center gap-3 mt-3">
            <img
              src={product.image}
              alt={product.name}
              className="w-10 h-10 rounded-lg object-cover border"
            />

            <div>
              <p className="text-sm font-semibold text-gray-800">
                {product.name}
              </p>
              <p className="text-[11px] text-gray-400">
                What people think about this dish
              </p>
            </div>
          </div>
        </div>

        {/* SCROLL CONTAINER */}
        <div className="flex-1 overflow-y-auto">
          {/* Rating Summary (scrolls away) */}
          <div className="p-4 border-b space-y-4">
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-green-600">
                {ratingSummary?.averageRating || 0}
              </div>
              <div className="text-sm text-gray-500">
                Based on {ratingSummary?.totalRatings || 0} ratings
              </div>
            </div>

            {[5, 4, 3, 2, 1].map((star) => {
              const count = getStarCount(star);
              const percentage =
                ratingSummary?.totalRatings > 0
                  ? (count / ratingSummary.totalRatings) * 100
                  : 0;

              return (
                <div key={star} className="flex items-center gap-3 text-xs">
                  <span className="w-6">{star}★</span>

                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>

                  <span className="w-6 text-right">{count}</span>
                </div>
              );
            })}
          </div>

          {allImages.length > 0 && (
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-semibold text-gray-800 mb-2">
                Customer Photos
              </p>

              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    onClick={() => {
                      setLightboxImages(allImages);
                      setLightboxIndex(idx);
                      setOpenLightbox(true);
                    }}
                    className="w-20 h-20 rounded-xl object-cover cursor-pointer border"
                  />
                ))}
              </div>
            </div>
          )}

          {/* FILTERS (STICKY) */}
          <div className="sticky top-0 z-20 bg-white border-b px-4 py-2 flex gap-2 overflow-x-auto">
            {["all", 5, 4, 3, 2, 1].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap
                  ${
                    filter === f
                      ? "bg-orange-500 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
              >
                {f === "all" ? "All" : `${f}★`}
              </button>
            ))}
          </div>

          {/* Reviews */}
          <div className="p-4 space-y-4">
            {myReview && (
              <div className="p-4 border-b bg-orange-50">
                <div className="bg-white rounded-2xl p-4 border border-orange-200 shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-[2px] bg-orange-100 text-orange-600 text-[11px] font-semibold rounded-full">
                        ⭐ Your Review
                      </div>
                      <p className="text-[11px] text-gray-400">
                        {timeAgo(myReview.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={16}
                        className={
                          s <= myReview.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed pb-1">
                    {myReview.reviewText}
                  </p>

                  {/* Images */}
                  {myReview.images?.length > 0 && (
                    <div className="flex gap-2 overflow-x-auto">
                      {myReview.images.map((img, i) => (
                        <img
                          key={i}
                          src={img}
                          onClick={() => {
                            setLightboxImages(myReview.images);
                            setLightboxIndex(i);
                            setOpenLightbox(true);
                          }}
                          className="w-24 h-24 rounded-xl object-cover cursor-pointer"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {filtered.map((r, i) => (
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

                {/* Images */}
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

            {filtered.length === 0 && (
              <p className="text-center text-sm text-gray-400 mt-10">
                No reviews found
              </p>
            )}
          </div>
        </div>

        {openLightbox && (
          <ImageLightbox
            images={lightboxImages}
            startIndex={lightboxIndex}
            onClose={() => setOpenLightbox(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ProductReviewsSheet;
