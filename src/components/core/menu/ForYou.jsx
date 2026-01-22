import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { colorClasses } from "../../../utils/data";
import { getForYouProducts } from "../../../service/operations/product";
import { ForYouSkeleton } from "../../../utils/skeleton";
import ProductBottomSheet from "./ProductBottomSheet";
import { useCart } from "../../../context/CartContext";
import { getActiveOffers } from "../../../service/operations/offers";

/* ------------------ Dummy Offers (KEEP AS IS) ------------------ */
const offers = [
  {
    _id: "1",
    title: "Family Combo",
    subtitle: "2 Biryani + 2 Cold Drink",
    priceText: "Only ₹499",
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
  },
  {
    _id: "2",
    title: "Paneer Feast",
    subtitle: "Paneer Tikka + Butter Naan",
    priceText: "Save ₹80",
    image: "https://images.pexels.com/photos/461377/pexels-photo-461377.jpeg",
  },
];

/* ------------------ Skeleton ------------------ */

const ForYou = ({ setCurrCategory }) => {
  const { shopId } = useParams();

  const [loading, setLoading] = useState(true);
  const [mustTry, setMustTry] = useState(null);
  const [topRated, setTopRated] = useState([]);
  const [todaysSpecial, setTodaysSpecial] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [openReviewForm, setOpenReviewForm] = useState(false);
  const [offers, setOffers] = useState([]);
  const { addToCart } = useCart();

  const fetchForYou = async () => {
    setLoading(true);
    const res = await getForYouProducts(shopId);

    if (res?.data) {
      setMustTry(res.data.mustTry);
      setTopRated(res.data.topRated || []);
      setTodaysSpecial(res.data.todaysSpecial || []);
    }

    setLoading(false);
  };

  const daysLeft = (endDate) => {
    const diff = new Date(endDate).getTime() - new Date().getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const isExpired = (endDate) => {
    return new Date(endDate) < new Date();
  };

  const calculateActualPrice = (items = []) => {
    return items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
  };

  useEffect(() => {
    fetchForYou();
  }, [shopId]);

  useEffect(() => {
    const fetchShopOffers = async () => {
      const result = await getActiveOffers(shopId);

      if (result) {
        setOffers(result.offers);
      }
    };

    fetchShopOffers();
  }, []);

  if (loading) return <ForYouSkeleton />;

  return (
    <div className="space-y-10">
      {/* 🔥 Must Try Hero */}
      {mustTry && (
        <div className="space-y-3">
          <div>
            <h2 className="text-lg font-bold">Best of this Restaurant</h2>
            <p className="text-sm text-gray-500">
              Most loved dish by customers
            </p>
          </div>

          <div
            onClick={() => setSelectedProductId(mustTry._id)}
            className="relative rounded-3xl overflow-hidden shadow-xl"
          >
            <img
              src={mustTry.image}
              alt={mustTry.name}
              className="w-full h-64 object-cover"
            />

            <div className="absolute top-4 left-4 z-10">
              <span className="flex items-center gap-1 bg-black/60 backdrop-blur-sm text-white text-[11px] px-3 py-1 rounded-full font-medium">
                ✨ Recommended for you
              </span>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <h2 className="text-2xl font-bold">{mustTry.name}</h2>

              <p className="text-xs mt-1 text-gray-200">
                ⭐ {mustTry.rating} • {mustTry.reviewsCount} reviews •{" "}
                {mustTry.orderCount} orders
              </p>

              {/* TAGS (MAX 5) */}
              <div className="flex gap-2 mt-2 flex-wrap">
                {mustTry.tags?.slice(0, 5).map((tag) => (
                  <span
                    key={tag._id || tag.name}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      colorClasses[tag.color]
                    }`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              {/* PRICE + ADD BUTTON */}
              <div className="mt-3 flex items-center justify-between">
                <div className="text-lg font-bold">
                  ₹{mustTry.discountPrice || mustTry.price}
                  {mustTry.discountPrice && (
                    <span className="text-sm line-through opacity-70 ml-2">
                      ₹{mustTry.price}
                    </span>
                  )}
                </div>

                {/* ADD BUTTON */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(mustTry);
                  }}
                  className="bg-white text-black px-4 py-1.5 rounded-full text-sm font-semibold shadow-md active:scale-95 transition"
                >
                  Add +
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ⭐ Loved by Customers */}
      <section>
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">⭐ Loved by Customers</h3>

          <button
            onClick={() => setCurrCategory("top-rated")}
            className="text-xs text-blue-600 font-medium"
          >
            View all
          </button>
        </div>

        <p className="text-xs text-gray-500 mb-3">
          Top rated dishes from this restaurant
        </p>

        <div className="grid grid-cols-2 gap-4">
          {topRated.map((item) => (
            <div
              onClick={() => setSelectedProductId(item._id)}
              key={item._id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              {/* IMAGE AREA */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* PRICE (TOP-LEFT) */}
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur text-white px-2 py-1 rounded-lg">
                  <span className="text-xs font-bold">
                    ₹{item.discountPrice || item.price}
                  </span>

                  {item.discountPrice > 0 && (
                    <span className="ml-1 text-[10px] line-through opacity-70">
                      ₹{item.price}
                    </span>
                  )}
                </div>

                {/* ADD BUTTON (BOTTOM-RIGHT) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                  className="absolute bottom-2 right-2 bg-white/95 backdrop-blur text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md active:scale-95 transition"
                >
                  Add +
                </button>

                {/* POPULAR BADGE */}
                {
                  <span className="absolute bottom-2 left-2 bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                    🔥 Popular
                  </span>
                }
              </div>

              {/* CONTENT */}
              <div className="p-3 space-y-1">
                {/* Name */}
                <p className="font-semibold text-sm line-clamp-1">
                  {item.name}
                </p>

                {/* Rating */}
                <p className="text-[11px] text-gray-600">
                  ⭐ {item.rating} • {item.reviewsCount} reviews
                </p>

                {/* TAGS (MAX 3) */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.tags?.slice(0, 3).map((tag) => (
                    <span
                      key={tag._id || tag.name}
                      className={`text-[9px] px-2 py-px rounded-full font-medium ${
                        colorClasses[tag.color]
                      }`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 👨‍🍳 Chef’s Special */}
      <section>
        <h3 className="text-base font-semibold">👨‍🍳 Chef’s Special</h3>
        <p className="text-xs text-gray-500 mb-3">
          Today’s special dishes recommended by the restaurant
        </p>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {todaysSpecial.map((item) => (
            <div
              onClick={() => setSelectedProductId(item._id)}
              key={item._id}
              className="min-w-44 bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
            >
              {/* IMAGE AREA */}
              <div className="relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-28 object-cover"
                />

                {/* Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                {/* PRICE (TOP-LEFT) */}
                <div className="absolute top-2 left-2 bg-black/70 backdrop-blur text-white px-2 py-1 rounded-lg">
                  <span className="text-xs font-bold">
                    ₹{item.discountPrice || item.price}
                  </span>

                  {item.discountPrice && (
                    <span className="ml-1 text-[10px] line-through opacity-70">
                      ₹{item.price}
                    </span>
                  )}
                </div>

                {/* ADD BUTTON (BOTTOM-RIGHT) */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(item);
                  }}
                  className="absolute bottom-2 right-2 bg-white/95 backdrop-blur text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md active:scale-95 transition"
                >
                  Add +
                </button>

                {/* TODAY'S SPECIAL BADGE */}
                <span className="absolute bottom-2 left-2 bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
                  👨‍🍳 Today’s Special
                </span>
              </div>

              {/* CONTENT */}
              <div className="p-2 space-y-1">
                <p className="font-semibold text-sm line-clamp-1">
                  {item.name}
                </p>

                <p className="text-[11px] text-gray-600">
                  ⭐ {item.rating} • {item.reviewsCount} reviews
                </p>

                {/* TAGS (MAX 2) */}
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.tags?.slice(0, 2).map((tag) => (
                    <span
                      key={tag._id || tag.name}
                      className={`text-[9px] px-2 py-px rounded-full font-medium ${
                        colorClasses[tag.color]
                      }`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🎁 Offers & Combos (DUMMY) */}
      <section className="mt-6">
        <h3 className="text-base font-semibold mb-3">🎁 Offers & Combos</h3>

        <div className="flex gap-4 overflow-x-auto pb-3 scrollbar-hide">
          {offers.map((offer) => {
            const actualPrice = calculateActualPrice(offer.items);
            const saveAmount = actualPrice - offer.offerPrice;

            const daysLeft = Math.ceil(
              (new Date(offer.endDate) - new Date()) / (1000 * 60 * 60 * 24),
            );
            const totalQty = offer.items.reduce(
              (sum, i) => sum + i.quantity,
              0,
            );

            const expired = new Date(offer.endDate) < new Date();

            return (
              <div
                key={offer._id}
                className={`min-w-[260px] h-[360px] rounded-2xl overflow-hidden relative shadow-xl
            ${expired ? "opacity-60" : "active:scale-[0.97]"}`}
              >
                {/* IMAGE */}
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* DARK GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* BADGE */}
                <span
                  className={`absolute top-3 left-3 px-3 py-1 text-xs rounded-full font-semibold
              ${
                expired
                  ? "bg-gray-600 text-white"
                  : daysLeft <= 2
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
              }`}
                >
                  {expired
                    ? "Expired"
                    : daysLeft <= 2
                      ? "Ending Soon"
                      : "Special Offer"}
                </span>

                {/* CONTENT OVER IMAGE */}
                <div className="absolute inset-0 p-4 flex flex-col justify-end text-white">
                  {/* PRODUCTS HINT */}
                  <div className="mb-2 flex flex-wrap gap-1">
                    {/* TOTAL ITEMS */}
                    <span className="bg-white/20 backdrop-blur px-2 py-0.5 rounded-full text-[10px] font-semibold">
                      {totalQty} items combo
                    </span>

                    {/* PRODUCT NAMES */}
                    {offer.items.slice(0, 2).map((i, idx) => (
                      <span
                        key={idx}
                        className="bg-white/20 backdrop-blur px-2 py-0.5 rounded-full text-[10px]"
                      >
                        {i.product.name} × {i.quantity}
                      </span>
                    ))}

                    {/* MORE ITEMS */}
                    {offer.items.length > 2 && (
                      <span className="text-[10px] text-gray-200">
                        +{offer.items.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* TITLE */}
                  <h4 className="text-lg font-bold leading-tight mb-1 line-clamp-2">
                    {offer.title}
                  </h4>

                  {/* PRICE ROW */}
                  <div className="flex items-end justify-between mb-2">
                    <div>
                      <p className="text-xs text-gray-300 line-through">
                        ₹{actualPrice}
                      </p>
                      <p className="text-2xl font-extrabold">
                        ₹{offer.offerPrice}
                      </p>
                    </div>

                    {saveAmount > 0 && (
                      <span className="bg-green-500 text-black text-xs font-semibold px-2 py-1 rounded-full">
                        Save ₹{saveAmount}
                      </span>
                    )}
                  </div>

                  {/* EXPIRY */}
                  {!expired && (
                    <p className="text-[11px] text-gray-300 mb-3">
                      Expires in {daysLeft} day{daysLeft > 1 ? "s" : ""}
                    </p>
                  )}

                  {/* BUY NOW BUTTON */}
                  {!expired && (
                    <button className="w-full bg-white text-black text-sm font-semibold py-2 rounded-xl">
                      Buy Now
                    </button>
                  )}

                  <span className="absolute top-3 right-3 flex items-center gap-1 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    <span className="fire-bounce">🔥</span>
                    Hot Deal
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {selectedProductId && (
        <ProductBottomSheet
          productId={selectedProductId}
          setProductId={setSelectedProductId}
          openReviewForm={openReviewForm}
          setOpenReviewForm={setOpenReviewForm}
          fetchProducts={fetchForYou}
          currCategory="for-you"
        />
      )}
    </div>
  );
};

export default ForYou;
