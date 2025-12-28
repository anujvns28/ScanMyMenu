import { useEffect, useState } from "react";
import {
  fetchAllActiveCategory,
  getShopCategories,
  pickCategoriesForShop,
} from "../../../service/operations/category";
import { useDispatch, useSelector } from "react-redux";
import AddCategorySheet from "../menuManagementHelper/AddCategorySheet";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [showCreateShop, setShowCreateShop] = useState(false);
  const [shopCategories, setShopCategories] = useState();

  const [showAddCategorySheet, setShowAddCategorySheet] = useState(false);
  const [selected, setSelected] = useState([]);
  const [showAddTagSheet, setShowAddTagSheet] = useState(false);

  const tags = ["Spicy", "Best Seller", "New", "Chef Special"];

  const myShop = null;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shopDetails } = useSelector((state) => state.shop);
  const { token } = useSelector((state) => state.auth);

  const fetchCategoriesHandler = async () => {
    if (!shopDetails) {
      const result = await fetchAllActiveCategory(dispatch);
      setShopCategories(result?.data);
    } else {
      const result = await getShopCategories(shopDetails._id, dispatch);
      if (result) {
        setShopCategories(result?.data);
      }
    }
  };

  const picakCategoriesHandler = async () => {
    const categoriesId = selected.map((cat) => cat._id);
    const data = { categories: categoriesId, shopId: shopDetails._id };
    const result = await pickCategoriesForShop(data, dispatch, token);
    if (result) {
      setShopCategories((prev) => [...prev, ...result?.data]);
    }
    setShowAddCategorySheet(false);
    setSelected([]);
  };

  useEffect(() => {
    fetchCategoriesHandler();
  }, []);
  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-6">
      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-lg font-bold text-gray-800">Menu Management</h1>
        <p className="text-sm text-gray-500">
          Manage categories, tags & products
        </p>
      </div>
      {/* ===== CATEGORIES ===== */}
      <div className="bg-white rounded-xl p-4 shadow space-y-4">
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
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {shopCategories.map((cat, i) => {
              return (
                <button
                  key={i}
                  onClick={() => setOpenCategory(cat)}
                  className="flex flex-col items-center min-w-[90px] focus:outline-none"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden shadow ">
                    <img
                      src={cat.image || cat?.category?.image}
                      alt={cat.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <p className="mt-2 text-xs font-medium text-gray-700 text-center line-clamp-2">
                    {cat.name || cat?.category?.name}
                  </p>
                </button>
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
      {/* ===== PRODUCT SECTION ===== */}
      {!myShop ? (
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

                {!shopDetails?.status?.isProfileComplete && (
                  <button
                    onClick={() => setShowCreateShop(true)}
                    className="w-full text-sm text-blue-600 mt-2"
                  >
                    + Add your first product
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow p-4">Product</div>
        </>
      )}

      {/* ===== CATEGORY DETAILS ===== */}
      {openCategory && (
        <div className="fixed inset-0 mb-14 z-50 flex items-end bg-black/40">
          <div className="bg-white w-full rounded-t-2xl p-5 max-h-[85vh] overflow-y-auto">
            {/* Drag handle */}
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4"></div>

            {/* Category image */}
            <img
              src={openCategory.image || openCategory.category?.image}
              alt={openCategory.name}
              className="w-full h-40 object-cover rounded-xl"
            />

            {/* Name & description */}
            <div className="mt-4">
              <h3 className="text-lg font-bold">
                {openCategory.name || openCategory.category?.name}
              </h3>
              <p className="text-sm text-gray-600">
                {openCategory.description || openCategory.category?.description}
              </p>
            </div>

            {/* ===== TAGS ===== */}
            {/* ===== TAGS ===== */}
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Category Tags
              </p>

              {/* Existing tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {tags.map((tag, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 bg-gray-100 border px-3 py-1.5 rounded-lg text-xs"
                  >
                    {tag}
                    <span className="text-red-500 cursor-pointer">✕</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action buttons */}
            <div className="mt-6 space-y-3">
              <button
                onClick={() => setShowAddTagSheet(true)}
                className="w-full border border-dashed border-blue-500 text-blue-600 py-2 rounded-lg text-sm"
              >
                ➕ Add New Tag
              </button>

              <button
                onClick={() => setOpenCategory(null)}
                className="w-full text-sm text-gray-500"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {showAddTagSheet && (
        <div className="fixed inset-0 z-[60] flex items-end bg-black/50">
          <div className="bg-white w-full rounded-t-2xl p-5 space-y-4">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto"></div>

            <h3 className="text-lg font-bold text-center">Add New Tag</h3>
            <p className="text-sm text-gray-500 text-center">
              Create labels for your category
            </p>

            <input
              placeholder="Ex: Spicy, Bestseller, Kids Special"
              className="w-full border rounded-lg px-3 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            />

            <div className="grid grid-cols-2 gap-3">
              {[
                "Spicy",
                "Veg",
                "Non-Veg",
                "Bestseller",
                "New",
                "Chef Special",
              ].map((tag, i) => (
                <button
                  key={i}
                  className="border rounded-lg py-2 text-sm text-gray-700"
                >
                  {tag}
                </button>
              ))}
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold">
              Add Tag
            </button>

            <button
              onClick={() => setShowAddTagSheet(false)}
              className="w-full text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

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
    </div>
  );
};

export default Menu;
