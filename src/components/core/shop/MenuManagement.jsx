import React, { useCallback } from "react";
import { lazy, Suspense, useEffect, useState } from "react";
import {
  fetchAllActiveCategory,
  getShopCategories,
  pickCategoriesForShop,
} from "../../../service/operations/category";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCategoryByProduct } from "../../../service/operations/product";
import ProductCard from "./menuManagementHelper/ProductCard";
const ViewCategory = lazy(() => import("./menuManagementHelper/ViewCategory"));
const ViewProduct = lazy(() => import("./menuManagementHelper/ViewProduct"));
const AddProduct = lazy(() => import("./menuManagementHelper/AddProduct"));
const AddCategorySheet = lazy(
  () => import("./menuManagementHelper/AddCategorySheet"),
);

const Menu = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [showCreateShop, setShowCreateShop] = useState(false);
  const [shopCategories, setShopCategories] = useState();
  const [currCategoryProduct, setCurrCategoryProduct] = useState([]);
  const [currSelectedCategory, setCurrSelectedCategory] = useState(null);

  const [showAddCategorySheet, setShowAddCategorySheet] = useState(false);
  const [selected, setSelected] = useState([]);

  const [viewProduct, setViewProduct] = useState(null);
  const [showAddProductSheet, setShowAddProductSheet] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shopDetails } = useSelector((state) => state.shop);
  const { token } = useSelector((state) => state.auth);

  const fetchCategoriesHandler = async () => {
    if (!shopDetails) {
      const result = await fetchAllActiveCategory(dispatch);
      setShopCategories(result?.data);
      if (result?.data.length > 0) {
        setCurrSelectedCategory(result?.data[0]);
      }
    } else {
      const result = await getShopCategories(shopDetails._id, dispatch);
      if (result) {
        setShopCategories(result?.data);
        if (result?.data.length > 0) {
          setCurrSelectedCategory(result?.data[0]);
        }
      }
    }
  };

  const picakCategoriesHandler = useCallback(async () => {
    const categoriesId = selected.map((cat) => cat._id);
    const data = { categories: categoriesId, shopId: shopDetails._id };
    const result = await pickCategoriesForShop(data, dispatch, token);
    if (result) {
      setShopCategories((prev) => [...prev, ...result?.data]);
    }
    setShowAddCategorySheet(false);
    setSelected([]);
  }, [selected, shopDetails, token, dispatch]);

  const fetchCategoryWiseProduct = async () => {
    // fetched product of current category if and set
    const result = await fetchCategoryByProduct(
      { shopCategoryId: currSelectedCategory._id },
      dispatch,
    );
    if (result) {
      setCurrCategoryProduct(result?.data?.products);
    }
  };

  const handleViewProduct = useCallback((item) => {
    setViewProduct(item);
  }, []);

  useEffect(() => {
    fetchCategoriesHandler();
  }, []);

  useEffect(() => {
    if (currSelectedCategory && shopDetails) {
      fetchCategoryWiseProduct();
    }
  }, [currSelectedCategory, shopDetails]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-2">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-lg font-bold text-gray-800">Menu Management</h1>
        <p className="text-sm text-gray-500">
          Manage categories, tags & products
        </p>
      </div>
      {/* ===== CATEGORIES ===== */}
      <div className="bg-white rounded-xl p-4 shadow space-y-4 ">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-700">📂 Categories</h2>
          {shopDetails?.status?.isProfileComplete && (
            <button
              className="text-sm font-medium text-blue-600"
              onClick={() => setShowAddCategorySheet(true)}
            >
              {" "}
              ➕ Add Category{" "}
            </button>
          )}
        </div>

        {shopCategories?.length > 0 ? (
          <div className="flex gap-2 overflow-x-auto p-2 scrollbar-hide">
            {shopCategories.map((cat, i) => {
              const id = cat._id;
              const isSelected = currSelectedCategory?._id === id;

              return (
                <div
                  key={i}
                  className="flex flex-col items-center min-w-[100px]"
                >
                  <button
                    onClick={() => setCurrSelectedCategory(cat)}
                    className="focus:outline-none"
                  >
                    <div
                      className={`w-28 h-16 bg-white flex items-center justify-center
            transition-transform duration-300
            ${isSelected ? "scale-115" : "scale-100"}`}
                    >
                      <img
                        src={cat.image || cat?.category?.image}
                        alt={cat.name}
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                  </button>

                  {/* NAME (COLOR CHANGE ON SELECT) */}
                  <p
                    className={`mt-2 text-xs font-medium text-center line-clamp-2
          ${isSelected ? "text-orange-600" : "text-gray-700"}`}
                  >
                    {cat.name || cat?.category?.name}
                  </p>

                  <button
                    onClick={() => setOpenCategory(cat)}
                    className="mt-1 text-[10px] text-blue-600 hover:underline"
                  >
                    Manage
                  </button>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex overflow-x-auto pb-2 scrollbar-hide">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex flex-col items-center min-w-[90px] animate-pulse"
              >
                <div className="w-20 h-20 bg-gray-200 rounded-full" />
                <div className="h-5  bg-gray-200 rounded w-16 mt-2" />
              </div>
            ))}
          </div>
        )}
      </div>
      {/* add product button */}
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left Side: Category Info */}
        <div>
          <p className="text-xs text-gray-500">Category</p>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold text-gray-800">
              {currSelectedCategory?.name ||
                currSelectedCategory?.category?.name}
            </p>
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
              {currCategoryProduct.length} items
            </span>
          </div>
        </div>

        {/* Right Side: Add Item */}
        {currSelectedCategory && (
          <button
            onClick={() => {
              if (!shopDetails) setShowCreateShop(true);
              else setShowAddProductSheet(true);
            }}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium shadow hover:bg-blue-700 transition"
          >
            <span className="text-lg leading-none">＋</span>
            Add Item
          </button>
        )}
      </div>
      {/* ===== PRODUCT SECTION ===== */}
      {!shopDetails || currCategoryProduct.length === 0 ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-4 animate-pulse"
            >
              <div className="h-32 bg-gray-200 rounded-lg mb-4"></div>

              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>

                <div className="flex justify-between">
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>

                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                  <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {currCategoryProduct.map((item, i) => {
            return (
              <ProductCard
                key={item._id}
                i={i}
                item={item}
                handleClick={handleViewProduct}
              />
            );
          })}
        </div>
      )}
      {/* ===== CATEGORY DETAILS ===== */}
      <Suspense fallback={null}>
        {openCategory && (
          <ViewCategory
            openCategory={openCategory}
            setOpenCategory={setOpenCategory}
            setShopCategories={setShopCategories}
          />
        )}
      </Suspense>
      {/* ===== CREATE SHOP CTA ===== */}
      {showCreateShop && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40 mb-14">
          <div className="bg-white w-full rounded-t-2xl p-6 space-y-5">
            <div className="w-10 h-1 bg-gray-300 rounded mx-auto" />

            <h3 className="text-lg font-bold text-center">
              Create your shop first
            </h3>

            <p className="text-sm text-gray-500 text-center">
              To start building your digital menu, create your shop.
            </p>

            <button
              onClick={() => navigate("/shop")}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
            >
              Create My Shop
            </button>

            <button
              onClick={() => setShowCreateShop(false)}
              className="w-full text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      <Suspense fallback={null}>
        {showAddCategorySheet && (
          <AddCategorySheet
            open={showAddCategorySheet}
            onClose={() => {
              setShowAddCategorySheet(false);
              setSelected([]);
            }}
            shopCategories={shopCategories}
            onAddCategories={picakCategoriesHandler}
            selected={selected}
            setSelected={setSelected}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {viewProduct && (
          <ViewProduct
            viewProduct={viewProduct}
            setViewProduct={setViewProduct}
            setCurrCategoryProduct={setCurrCategoryProduct}
            categoryName={currSelectedCategory.displayName}
          />
        )}
      </Suspense>

      <Suspense fallback={null}>
        {showAddProductSheet && (
          <AddProduct
            setShowAddProductSheet={setShowAddProductSheet}
            setCurrCategoryProduct={setCurrCategoryProduct}
            currSelectedCategory={currSelectedCategory}
          />
        )}
      </Suspense>
    </div>
  );
};

export default React.memo(Menu);
