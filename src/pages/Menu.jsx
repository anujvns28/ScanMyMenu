import React, { useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { fetchMyShop } from "../service/operations/shop";
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
import { smartTabs } from "../utils/data";

const menu = () => {
  const { shopId } = useParams();
  const { token, userLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const scrollRef = useRef(null);
  const itemRefs = useRef({});

  const [shopDetails, setShopDetails] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currCategoryItem, setCurrCategoryItem] = useState([]);
  const [currCategory, setCurrCategory] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  const fetchShopDetailsHandler = async () => {
    const shop = await fetchMyShop(token, dispatch);
    const category = await getShopCategories(shopId, dispatch);
    if (shop) {
      setShopDetails(shop.data);
    }
    if (category) {
      setCategories(category.data);
      setCurrCategory(smartTabs[0]._id);
    }
  };

  const fetchCategoryByProductHandler = async () => {
    const result = await fetchCategoryByProduct(
      { shopCategoryId: currCategory },
      token,
      dispatch
    );
    if (result) {
      setCurrCategoryItem(result.data);
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
      isSmart: false,
    })),
  ];

  useEffect(() => {
    fetchShopDetailsHandler();
  }, []);

  useEffect(() => {
    if (currCategory) fetchCategoryByProductHandler();
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
                  <span>⭐ 4.6</span>
                  <span className="text-[10px] text-gray-500">
                    1.2k+ ratings
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
              className="flex gap-6 px-4 py-3 overflow-x-auto scroll-smooth scrollbar-thin scrollbar-thumb-gray-300"
            >
              {finalCategories.map((cat) => {
                const isActive = currCategory === cat._id;
                return (
                  <div
                    key={cat._id}
                    ref={(el) => (itemRefs.current[cat._id] = el)}
                    onClick={() => setCurrCategory(cat._id)}
                    className="flex flex-col items-center min-w-[72px] cursor-pointer"
                  >
                    {/* SMART TAB */}
                    {cat.isSmart ? (
                      <div
                        className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl shadow transition
        ${
          isActive
            ? `bg-linear-to-tr ${cat.bg} scale-105 shadow-lg`
            : "bg-gray-200 text-gray-600"
        }`}
                      >
                        {cat.icon}
                      </div>
                    ) : (
                      /* NORMAL CATEGORY */
                      <div
                        className={`relative p-[3px] rounded-full transition-all duration-300
        ${
          isActive
            ? "bg-linear-to-tr from-orange-500 via-red-500 to-pink-500 scale-105 shadow-md"
            : cat.isBest
            ? "bg-linear-to-tr from-yellow-400 to-orange-500"
            : ""
        }`}
                      >
                        <div className="w-20 h-20 rounded-full overflow-hidden bg-white shadow-inner">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    )}

                    <p
                      className={`text-[11px] mt-2 font-semibold truncate w-full text-center
      ${isActive ? "text-orange-600" : "text-gray-700"}`}
                    >
                      {cat.name}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* MENU CONTENT */}
        <main className="flex-1 mt-4 overflow-y-auto pb-16 px-4 space-y-6">
          {/* 1️⃣ Loading */}
          {userLoading && [1, 2, 3].map((i) => <ItemSkeleton key={i} />)}

          {/* 2️⃣ Data Loaded with Products */}
          {!userLoading &&
            currCategoryItem?.products?.length > 0 &&
            currCategoryItem.products.map((item) => (
              <MenuItemCard key={item._id} item={item} />
            ))}

          {/* 3️⃣ Data Loaded but Empty */}
          {!userLoading && currCategoryItem?.products?.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-20 text-center text-gray-500">
              <span className="text-5xl mb-3">🍽️</span>
              <p className="font-semibold">No items available</p>
              <p className="text-sm">in this category</p>
            </div>
          )}
        </main>

        {/* FOOTER */}
        <footer className="px-4 py-3 text-center text-[11px] text-gray-500 border-t border-gray-200 bg-white">
          View-only digital menu • Scan My Menu
        </footer>
      </div>
    </div>
  );
};

export default menu;
