import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchMyShop, fetchShopDetails } from "../service/operations/shop";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getShopCategories } from "../service/operations/category";
import { fetchCategoryByProduct } from "../service/operations/product";
import MenuItemCard from "../components/core/menu/MenuItemCard";
import {
  ItemSkeleton,
  CategorySkeleton,
  HeaderSkeleton,
} from "../utils/skeleton";
import { colorClasses, smartFilters, smartTabs } from "../utils/data";
import ForYou from "../components/core/menu/ForYou";
import TopRated from "../components/core/menu/Toprated";
import ProductBottomSheet from "../components/core/menu/ProductBottomSheet";
import CartBottomSheet from "../components/core/menu/order/BottomCart";
import FloatingCartBar from "../components/core/menu/order/FloatingCartBar";
import { useCart } from "../context/CartContext";
import OrderOverlay from "../components/core/menu/order/OrderOverlay";
import { getMyActiveOrder } from "../service/operations/payment";

const menu = () => {
  const { shopId } = useParams();
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const itemRefs = useRef({});

  const [shopDetails, setShopDetails] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currCategoryItem, setCurrCategoryItem] = useState([]);
  const [currCategory, setCurrCategory] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState("");
  const [productId, setProductId] = useState(null);
  const [activeFilters, setActiveFilters] = useState([]);
  const [openReviewForm, setOpenReviewForm] = useState(false);
  const [filteredItems, setFilteredItems] = useState([]);
  const [showCartheet, setShowCartSheet] = useState(false);
  const { token, userLoading } = useSelector((state) => state.auth);
  const { activeOrder } = useSelector((state) => state.order);
  const { totalItems, setCart } = useCart();

  const isSmartTab = (id) => ["for-you", "top-rated"].includes(id);

  const fetchShopDetailsHandler = async () => {
    const shop = await fetchShopDetails({ shopId }, dispatch);
    const category = await getShopCategories(shopId, dispatch);
    if (shop) {
      setShopDetails(shop.data);
    }
    if (category) {
      setCategories(category.data);
      const intent = localStorage.getItem("POST_LOGIN_INTENT");
      if (!intent) {
        setCurrCategory(smartTabs[0]._id);
      }
    }
  };

  const fetchMyActiveOrder = async () => {
    const result = await getMyActiveOrder(token, dispatch);
  };

  const fetchCategoryInfoAndItems = async () => {
    const result = await fetchCategoryByProduct(
      { shopCategoryId: currCategory },
      dispatch,
    );
    if (result) {
      setCurrCategoryItem(result.data);
      setFilteredItems(result?.data?.products);
    }
  };

  const finalCategories = [
    ...smartTabs.map((t) => ({
      _id: t._id,
      name: t.name,
      icon: t.icon,
      bg: t.bg,
      isSmart: true,
    })),
    ...categories.map((c) => ({
      _id: c._id,
      name: c.category.name,
      image: c.category.image,
      isBest: c.category.isBest,
      dietType: c.category.dietType,
      isSmart: false,
    })),
  ];

  const activeCategory = finalCategories.find((c) => c._id === currCategory);

  const visibleSmartFilters = smartFilters.filter((f) => {
    if (
      (f.id === "veg" || f.id === "nonveg") &&
      activeCategory?.dietType !== "mixed"
    )
      return false;
    return true;
  });

  const restoreUIForRating = async (intent) => {
    const products = await fetchCategoryByProduct(
      { shopCategoryId: intent.categoryId },
      dispatch,
    );

    if (products) {
      const c_pro = products.data.products.find(
        (p) => p._id == intent.productId,
      );
      setProductId(c_pro._id);
    }
    setCurrCategory(intent?.categoryId);
    setOpenReviewForm(true);
  };

  const restoreUIForOder = (intent) => {
    if (!intent || intent.action !== "PLACE_ORDER") return;

    setCurrCategory(intent.categoryId);

    if (intent.payload?.cart?.length > 0) {
      setCart(intent.payload.cart);
    }

    setShowCartSheet(true);
    localStorage.removeItem("POST_LOGIN_INTENT");
  };

  useEffect(() => {
    fetchShopDetailsHandler();
    fetchMyActiveOrder();
  }, []);

  useEffect(() => {
    if (currCategory && !isSmartTab(currCategory)) fetchCategoryInfoAndItems();
  }, [currCategory]);

  useEffect(() => {
    const el = itemRefs.current[currCategory];
    if (el && scrollRef.current) {
      const container = scrollRef.current;
      const left =
        el.offsetLeft - container.clientWidth / 2 + el.clientWidth / 2;

      container.scrollTo({
        left,
        behavior: "smooth",
      });
    }
  }, [currCategory]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!token) return;

    const intent = JSON.parse(localStorage.getItem("POST_LOGIN_INTENT"));

    if (intent?.action === "SUBMIT_REVIEW") {
      restoreUIForRating(intent);
    }
    if (intent?.action === "PLACE_ORDER") {
      restoreUIForOder(intent);
    }
  }, [token]);

  useEffect(() => {
    if (!currCategoryItem?.products) return;
    let temp = [...currCategoryItem.products];

    // 🔍 SEARCH
    if (search.trim() !== "") {
      temp = temp.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase()),
      );
    }
    console.log(activeFilters);
    if (activeFilters.length > 0) {
      temp = temp.filter((item) =>
        activeFilters.every((tagName) =>
          item.tags.some((t) => t.name === tagName),
        ),
      );
    }

    setFilteredItems(temp);
  }, [search, activeFilters]);

  useEffect(() => {
    if (totalItems === 0) {
      setShowCartSheet(false);
    }
  }, [totalItems]);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center">
      {/* PHONE CONTAINER */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-xl flex flex-col">
        {/* HEADER */}
        <header className="px-4 pt-4 pb-3 border-b border-gray-100  z-20 bg-white">
          {!shopDetails ? (
            <HeaderSkeleton />
          ) : (
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl font-bold">
                  {shopDetails?.shopProfile?.name}
                </h1>
                <p className="text-[11px] text-gray-500">
                  {shopDetails?.address?.area} • {shopDetails?.address?.city} •{" "}
                  {shopDetails?.address?.pincode}
                </p>
                <p className="text-[11px] text-gray-500 mt-1">
                  🕒 Open till 11:30 PM
                </p>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="px-2 py-1 rounded-lg bg-green-100 text-[11px] font-semibold text-green-700 flex items-center gap-1">
                  <span>⭐ {shopDetails.rating}</span>
                  <span className="text-[10px] text-gray-500">
                    {shopDetails.reviewCount} ratings
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-green-700 font-semibold">
                  <span className="w-3 h-3 border border-green-700 rounded-sm grid place-items-center text-[8px]">
                    ●
                  </span>
                  <span>Pure Veg</span>
                </div>
              </div>
            </div>
          )}
        </header>

        {/* CATEGORY ICONS START */}
        <div
          className={`sticky top-12 z-20 bg-white/90 backdrop-blur border-b
  ${scrolled ? "shadow-lg" : "shadow-sm"}`}
        >
          {/* Swipe hint gradients */}
          <div className="pointer-events-none absolute left-0 top-0 h-full w-8 bg-linear-to-r from-white to-transparent z-30" />
          <div className="pointer-events-none absolute right-0 top-0 h-full w-8 bg-linear-to-l from-white to-transparent z-30" />

          {categories.length === 0 ? (
            <CategorySkeleton />
          ) : (
            <div
              ref={scrollRef}
              className="flex items-start px-4 py-3 overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-300"
            >
              {/* 🔹 SMART CATEGORIES GROUP */}
              <div className="flex gap-2">
                {finalCategories
                  .filter((cat) => cat.isSmart)
                  .map((cat) => {
                    const isActive = currCategory === cat._id;

                    return (
                      <div
                        key={cat._id}
                        ref={(el) => (itemRefs.current[cat._id] = el)}
                        onClick={() => setCurrCategory(cat._id)}
                        className="flex flex-col items-center min-w-[88px] cursor-pointer"
                      >
                        <div
                          className={`w-20 h-20 rounded-full flex items-center justify-center
                  text-white text-2xl shadow transition-all
                  ${
                    isActive
                      ? `bg-linear-to-tr ${cat.bg} scale-105`
                      : "bg-gray-200 text-gray-600"
                  }`}
                        >
                          {cat.icon}
                        </div>

                        <p
                          className={`text-[11px] mt-1 font-semibold text-center truncate w-full
                  ${isActive ? "text-orange-600" : "text-gray-700"}`}
                        >
                          {cat.name}
                        </p>
                      </div>
                    );
                  })}
              </div>

              <div className="w-2 shrink-0" />

              {/* 🔹 MAIN CATEGORIES GROUP */}
              <div className="flex ">
                {finalCategories
                  .filter((cat) => !cat.isSmart)
                  .map((cat) => {
                    const isActive = currCategory === cat._id;

                    return (
                      <div
                        key={cat._id}
                        ref={(el) => (itemRefs.current[cat._id] = el)}
                        onClick={() => setCurrCategory(cat._id)}
                        className="flex flex-col items-center min-w-[88px] cursor-pointer"
                      >
                        <div
                          className={`w-32 h-20 bg-white 
                  flex items-center justify-center
                  transition-transform duration-300
                  ${isActive ? "scale-110" : "scale-100"}`}
                        >
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-full object-contain rounded-full"
                          />
                        </div>

                        <p
                          className={`relative text-[11px] mt-1 font-semibold text-center truncate w-full
                  ${isActive ? "text-orange-600" : "text-gray-700"}`}
                        >
                          {cat.name}

                          {isActive && (
                            <span className="absolute left-1/2 -bottom-1 -translate-x-1/2 w-5 h-[2px] bg-orange-500 rounded-full" />
                          )}
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>

        {/* MENU CONTENT */}
        <main className="flex-1 mt-4 overflow-y-auto pb-16 px-4 space-y-6">
          {/* Selected Category Header */}
          {!isSmartTab(currCategory) && (
            <div className=" bg-white pb-3 flex flex-col gap-3 border-b">
              <div className="sticky top-16 mt-2">
                {/* Soft fade edges */}
                <div className="absolute left-0 top-0 h-full w-10 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 h-full w-10 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="flex gap-3 overflow-x-auto px-1 pb-2 snap-x snap-mandatory scrollbar-hide scroll-smooth items-center">
                  {/* 🔍 Search pill */}
                  <div className="snap-start shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-full bg-gray-100 border border-gray-200">
                    <span className="text-gray-400">🔍</span>
                    <input
                      type="text"
                      placeholder="Search dish..."
                      className="bg-transparent outline-none text-xs w-24 focus:w-40 transition-all"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>

                  {/* smart tags */}
                  {visibleSmartFilters.map((filter) => {
                    const active = activeFilters.includes(filter.value);

                    return (
                      <button
                        key={filter.id}
                        onClick={() =>
                          setActiveFilters((prev) =>
                            prev.includes(filter.id)
                              ? prev.filter((f) => f !== filter.id)
                              : [...prev, filter.id],
                          )
                        }
                        className={`snap-start shrink-0 px-5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200
            ${
              active
                ? "bg-orange-500 text-white shadow-lg scale-105"
                : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50"
            }
          `}
                      >
                        {filter.label}
                      </button>
                    );
                  })}
                  {/* category tags */}
                  {currCategoryItem?.tags?.map((tag) => {
                    const active = activeFilters.includes(tag._id);
                    const colorClass =
                      colorClasses[tag.color] || "bg-gray-200 text-gray-700";

                    return (
                      <button
                        key={tag._id}
                        onClick={() =>
                          setActiveFilters((prev) =>
                            prev.includes(tag._id)
                              ? prev.filter((f) => f !== tag._id)
                              : [...prev, tag._id],
                          )
                        }
                        className={`snap-start shrink-0 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 border
        ${
          active
            ? "bg-orange-500 text-white border-orange-500 shadow-md scale-105"
            : `${colorClass}  hover:shadow-sm hover:scale-[1.05]`
        }
      `}
                      >
                        {tag.name}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="space-y-5">
            {/* Loading Skeletons */}
            {userLoading &&
              [1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-2xl shadow-sm p-4">
                  <ItemSkeleton />
                </div>
              ))}

            {/* Smart Tabs */}
            {!userLoading && isSmartTab(currCategory) ? (
              <>
                {currCategory === "for-you" && (
                  <ForYou setCurrCategory={setCurrCategory} />
                )}
                {currCategory === "top-rated" && <TopRated />}
              </>
            ) : (
              filteredItems?.length > 0 &&
              filteredItems?.map((item) => (
                <div
                  key={item._id}
                  onClick={() => setProductId(item._id)}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <MenuItemCard item={item} />
                </div>
              ))
            )}

            {/* Empty State */}
            {!userLoading && currCategoryItem?.products?.length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center text-gray-500">
                <span className="text-5xl mb-3">🍽️</span>
                <p className="font-semibold">No items available</p>
                <p className="text-sm">in this category</p>
              </div>
            )}
          </div>
        </main>

        <ProductBottomSheet
          productId={productId}
          setProductId={setProductId}
          currCategory={currCategory}
          openReviewForm={openReviewForm}
          setOpenReviewForm={setOpenReviewForm}
          fetchProducts={fetchCategoryInfoAndItems}
        />

        {showCartheet && (
          <CartBottomSheet
            onClose={() => setShowCartSheet(false)}
            currCategory={currCategory}
          />
        )}

        <FloatingCartBar onOpen={() => setShowCartSheet(true)} />
        {activeOrder && <OrderOverlay />}
      </div>
    </div>
  );
};

export default menu;
