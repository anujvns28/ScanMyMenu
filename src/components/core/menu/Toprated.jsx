import React, {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { getTopRatedProducts } from "../../../service/operations/product";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { SkeletonCard } from "../../../utils/skeleton";
import TopratedCard from "./toprated/TopratedCard";
const ProductBottomSheet = lazy(() => import("./ProductBottomSheet"));

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

  const getRankByTab = useCallback((product) => {
    if (activeTab === "VEG") return product.vegRank;
    if (activeTab === "NON_VEG") return product.nonVegRank;
    return product.overallRank;
  },[])

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const result = await getTopRatedProducts(shopId, dispatch);
    setLoading(false);

    if (result?.success) {
      setProducts(result.data);
    }
  }, []);

  const handleClick = useCallback((id) =>{
    setSelectedProductId(id);
  })

  // Frontend filtering + ranking display
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

  //  Fetch from backend
  useEffect(() => {
    if (!shopId) return;

    fetchProducts();
  }, [shopId]);

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
            <TopratedCard
              key={item._id}
              item={item}
              handleClick={handleClick}
              getRankByTab={getRankByTab}
            />
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

      <Suspense fallback={null}>
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
      </Suspense>
    </div>
  );
};

export default TopRated;
