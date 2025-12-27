import { useEffect, useState } from "react";
import {
  fetchAllActiveCategory,
  getShopCategories,
} from "../../../service/operations/category";
import { useDispatch, useSelector } from "react-redux";
import AddCategorySheet from "../menuManagementHelper/AddCategorySheet";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [showCreateShop, setShowCreateShop] = useState(false);
  const [activeCategories, setActiveCategories] = useState();
  const [showAddCategorySheet, setShowAddCategorySheet] = useState(false);

  const myShop = null; // {} karke test karo
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { shopDetails } = useSelector((state) => state.shop);

  const fetchCategoriesHandler = async () => {
    const result = await fetchAllActiveCategory(dispatch);
    if (result) {
      if (!shopDetails) {
        setActiveCategories(result?.data);
      } else {
        const result = await getShopCategories(shopDetails._id, dispatch);
        if (result) {
          setActiveCategories(result?.data);
        }
      }
    }
  };

  console.log(activeCategories);

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

        {activeCategories ? (
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {activeCategories.map((category, i) => {
              return (
                <button
                  key={i}
                  onClick={() => setOpenCategory(category)}
                  className="flex flex-col items-center min-w-[90px] focus:outline-none"
                >
                  <div className="w-20 h-20 rounded-full overflow-hidden shadow ">
                    <img
                      src={category.image || category?.category?.image}
                      alt={category.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>

                  <p className="mt-2 text-xs font-medium text-gray-700 text-center line-clamp-2">
                    {category.name || category?.category?.name}
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
        <div className="fixed inset-0 z-50 flex items-end bg-black/40">
          <div className="bg-white w-full rounded-t-2xl p-5 space-y-5">
            <div className="w-10 h-1 bg-gray-300 rounded mx-auto" />

            <img
              src={openCategory.image}
              alt={openCategory.name}
              className="w-full h-40 object-cover rounded-xl"
            />

            <div>
              <h3 className="text-lg font-bold">{openCategory.name}</h3>
              <p className="text-sm text-gray-600">
                {openCategory.description}
              </p>
            </div>

            <div className="flex gap-2 flex-wrap">
              {openCategory?.tags?.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}

              <button
                onClick={() => setShowCreateShop(true)}
                className="px-3 py-1 border border-dashed rounded-full text-sm text-blue-600"
              >
                ➕ Add Tag
              </button>
            </div>

            <button
              onClick={() => setOpenCategory(null)}
              className="w-full text-sm text-gray-500 mb-14"
            >
              Close
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

      <AddCategorySheet
        open={showAddCategorySheet}
        onClose={() => setShowAddCategorySheet(false)}
        shopCategories={activeCategories}
        onAddCategories={() => alert("add selected")}
      />
    </div>
  );
};

export default Menu;

/* ===== COMPONENTS ===== */

const CategoryItem = ({ name, image, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center min-w-[90px]">
    <img
      src={image}
      alt={name}
      className="w-16 h-16 rounded-full object-cover"
    />
    <p className="mt-2 text-xs font-medium">{name}</p>
  </button>
);
