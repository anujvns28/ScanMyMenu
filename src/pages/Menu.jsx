import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMyShop } from "../service/operations/shop";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getShopCategories } from "../service/operations/category";

const menu = () => {
  const { shopId } = useParams();
  const { token, userLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [shopDetails, setShopDetails] = useState(null);
  const [categories, setCategories] = useState([]);
  const [currCategoryItem, setCurrCategoryItem] = useState([]);
  const [currCategory, setCurrCategory] = useState(null);

  const fetchShopDetailsHandler = async () => {
    const shop = await fetchMyShop(token, dispatch);
    const category = await getShopCategories(shopId, dispatch);
    if (shop) {
      setShopDetails(shop.data);
    }
    if (category) {
      setCategories(category.data);
    }
  };
  useEffect(() => {
    fetchShopDetailsHandler();
  }, []);

  const CategorySkeleton = () => (
    <div className="flex gap-5 overflow-x-auto no-scrollbar px-2 py-3">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div
          key={i}
          className="flex flex-col items-center min-w-20 animate-pulse"
        >
          {/* Circle */}
          <div className="w-22 h-22 rounded-full bg-linear-to-br from-gray-200 to-gray-300 shadow-sm" />

          {/* Text lines */}
          <div className="w-16 h-5 bg-gray-200 mt-3 rounded" />
        </div>
      ))}
    </div>
  );

  const ItemSkeleton = () => (
    <div className="rounded-2xl  bg-white shadow-sm overflow-hidden animate-pulse">
      <div className="w-full h-48 bg-gray-200" />
      <div className="p-4 space-y-2">
        <div className="h-4 w-1/2 bg-gray-200 rounded" />
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-3/4 bg-gray-200 rounded" />
      </div>
    </div>
  );

  const HeaderSkeleton = () => (
    <div className="animate-pulse">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <div className="h-5 w-40 bg-gray-200 rounded" />
          <div className="h-1.5 w-32 bg-gray-200 rounded" />
          <div className="h-2 w-32 bg-gray-200 rounded" />
        </div>

        <div className="space-y-2 flex flex-col items-end">
          <div className="h-6 w-24 bg-gray-200 rounded-lg" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center">
      {/* PHONE CONTAINER */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-xl flex flex-col">
        {/* HEADER */}
        <header className="px-4 pt-4 pb-3 border-b border-gray-100 sticky top-0 z-20 bg-white">
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
        <div className="px-4  py-3 bg-white sticky top-[72px] z-10 border-b border-gray-200">
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
            {categories.length == 0 ? (
              <CategorySkeleton />
            ) : (
              categories.map((cat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center min-w-[65px]"
                >
                  <div className="w-22 h-22 rounded-full overflow-hidden shadow-md bg-white">
                    <img
                      src={cat?.category?.image}
                      alt={cat?.category?.image}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="text-[11px] mt-1 font-medium text-gray-700">
                    {cat?.category?.name}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* MENU CONTENT */}
        <main className="flex-1 mt-4 overflow-y-auto pb-10 px-4 space-y-6">
          {currCategoryItem.length == 0
            ? [1, 2, 3].map((i) => <ItemSkeleton key={i} />)
            : currCategoryItem.map((item) => (
                <div
                  key={item.name}
                  className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="relative w-full h-48 overflow-hidden">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {item.tag}
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-gray-900 text-sm font-bold px-3 py-1 rounded-full shadow">
                      ₹{item.price}
                    </div>
                    <span className="absolute top-3 right-3 w-4 h-4 border border-green-700 rounded-sm grid place-items-center text-green-700 text-[10px] font-bold bg-white/80 backdrop-blur">
                      •
                    </span>
                  </div>
                  <div className="p-4 space-y-1">
                    <h2 className="text-base font-semibold text-gray-900">
                      {item.name}
                    </h2>
                    <p className="text-[12px] text-gray-500 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
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
