import React, { useEffect, useMemo, useState } from "react";
import {
  getProductDetails,
  getTopRatedProducts,
} from "../../../service/operations/product";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { SkeletonCard } from "../../../utils/skeleton";
import ProductBottomSheet from "./ProductBottomSheet";
import { useCart } from "../../../context/CartContext";
import { getActiveOffers } from "../../../service/operations/offers";

const tabs = [
  { label: "All", value: "ALL" },
  { label: "Veg 🌱", value: "VEG" },
  { label: "Non-Veg 🍗", value: "NON_VEG" },
];

const TopRated = () => {
  const { shopId } = useParams();
  const dispatch = useDispatch();

  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState("ALL");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [openReviewForm, setOpenReviewForm] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const ITEMS_PER_PAGE = 15;
  const [currentPage, setCurrentPage] = useState(1);

  const { addProductToCart } = useCart();

  const getRankByTab = (product) => {
    if (activeTab === "VEG") return product.vegRank;
    if (activeTab === "NON_VEG") return product.nonVegRank;
    return product.overallRank;
  };

  const fetchProducts = async () => {
    setLoading(true);
    const result = await getTopRatedProducts(shopId, dispatch);
    setLoading(false);

    if (result?.success) {
      setProducts(result.data);
    }
  };

  //  Fetch from backend
  useEffect(() => {
    if (!shopId) return;

    fetchProducts();
  }, [shopId]);

  // 🔍 Frontend filtering + ranking display
  const filteredProducts = useMemo(() => {
    let list = products;

    if (activeTab === "VEG") {
      list = list.filter((p) => p.type === "veg");
    }

    if (activeTab === "NON_VEG") {
      list = list.filter((p) => p.type === "non-veg");
    }

    if (search) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()),
      );
    }

    return list;
  }, [products, activeTab, search]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  useEffect(() => {
    if (!selectedProductId) {
      fetchProducts();
    }
  }, [selectedProductId]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, search]);

  return (
    <div className="min-h-screen bg-neutral-50 pb-24">
      {/* Header */}
      <div className="bg-white/90 backdrop-blur p-4 border-b">
        <h1 className="text-xl font-semibold tracking-tight">
          Top Rated Dishes
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">
          Ranked by customer ratings & reviews
        </p>

        {/* Tabs */}
        <div className="flex gap-2 mt-3">
          {tabs.map((t) => (
            <button
              key={t.value}
              onClick={() => setActiveTab(t.value)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium transition
                ${
                  activeTab === t.value
                    ? "bg-black text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="mt-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search dishes..."
            className="w-full px-4 py-2.5 rounded-full bg-gray-100 text-sm
              focus:outline-none focus:ring-2 focus:ring-black/10"
          />
        </div>
      </div>

      {/* List */}
      <div className="p-4 space-y-4">
        {/* 🔹 Skeleton while loading */}
        {loading &&
          Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)}

        {/* 🔹 Real data */}
        {!loading &&
          paginatedProducts.map((item) => (
            <div
              key={item._id}
              onClick={() => setSelectedProductId(item._id)}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition flex overflow-hidden"
            >
              {/* Image + rank */}
              <div className="relative w-28 h-28 flex-shrink-0">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-l-2xl"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <span
                  className="absolute left-1 top-1 text-5xl font-extrabold 
  text-white select-none drop-shadow-lg"
                >
                  #{getRankByTab(item)}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1 p-4">
                <p className="font-medium text-sm">{item.name}</p>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-semibold text-green-700">
                    ⭐ {item.rating}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({item.reviewsCount})
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="p-4 flex flex-col justify-between items-end">
                <p className="font-semibold text-sm">₹{item.price}</p>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addProductToCart(item);
                  }}
                  className="text-xs px-4 py-1.5 rounded-full border border-black/80 font-medium hover:bg-black hover:text-white transition"
                >
                  Add
                </button>
              </div>
            </div>
          ))}

        {/* Pagination – only if products > 15 */}
        {!loading && filteredProducts.length > ITEMS_PER_PAGE && (
          <div className="flex justify-center items-center gap-3 mt-6">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-4 py-1.5 text-xs rounded-full border disabled:opacity-40"
            >
              Prev
            </button>

            <span className="text-xs text-gray-500">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-4 py-1.5 text-xs rounded-full border disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && filteredProducts.length === 0 && (
          <p className="text-center text-sm text-gray-400 mt-12">
            No dishes found
          </p>
        )}
      </div>

      {selectedProductId && (
        <ProductBottomSheet
          productId={selectedProductId}
          setProductId={setSelectedProductId}
          openReviewForm={openReviewForm}
          setOpenReviewForm={setOpenReviewForm}
          fetchProducts={fetchProducts}
          currCategory="top-rated"
        />
      )}
    </div>
  );
};

export default TopRated;
