import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllActiveCategory, pickCategoriesForShop } from "../../../../service/operations/category";
import LoaderComponent from "../../../common/LoaderComponent";


const AddCategorySheet = ({
  open,
  onClose,
  shopCategories = [],
  onAddCategories,
  selected,
  setSelected,
}) => {
  const [adminCategories, setAdminCategories] = useState();
  const dispatch = useDispatch();
  const { shopDetails } = useSelector((state) => state.shop);
  const { token, userLoading } = useSelector((state) => state.auth);

  const toggleSelect = (cat) => {
    setSelected((prev) =>
      prev.find((c) => c._id === cat._id)
        ? prev.filter((c) => c._id !== cat._id)
        : [...prev, cat]
    );
  };

  const fetchAdminCategoriesHandler = async () => {
    const shopCatId = shopCategories.map((shopCat) => shopCat.category._id);
    console.log(shopCatId, "this is shop category");
    const result = await fetchAllActiveCategory(dispatch);
    if (result) {
      setAdminCategories(result?.data);
      const notPickedCategory = result?.data.filter(
        (cat) => !shopCatId.includes(cat._id)
      );
      setAdminCategories(notPickedCategory);
    }
  };

  useEffect(() => {
    fetchAdminCategoriesHandler();
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end bg-black/40">
      <div className="bg-white w-full rounded-t-2xl p-5 max-h-[88vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-bold">Add Categories</h3>
          <button onClick={onClose} className="text-gray-400 text-2xl">
            ✕
          </button>
        </div>

        <p className="text-sm text-gray-500 ">
          Select the categories you want to show in your restaurant menu
        </p>

        {/*  Selected Preview */}
        {selected.length > 0 && (
          <div className="flex items-center gap-3  pt-4 overflow-x-auto  mb-1">
            {selected.length > 0 && (
              <div className="flex gap-4 overflow-x-auto pb-2 mb-3">
                {selected.map((cat) => (
                  <div
                    key={cat._id}
                    className="flex flex-col items-center min-w-[70px]"
                  >
                    <div className="relative flex items-center justify-center">
                      {/* Outer ring */}
                      <div className="w-16 h-16 rounded-full bg-white shadow flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full overflow-hidden">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() => toggleSelect(cat)}
                        className="absolute top-0 right-0 bg-white shadow rounded-full w-5 h-5 flex items-center justify-center text-xs text-gray-600"
                      >
                        ✕
                      </button>
                    </div>

                    <p className="mt-1 text-xs text-gray-700 text-center line-clamp-2">
                      {cat.name}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Search */}
        <input
          placeholder="Search categories..."
          className="mb-4 px-4 py-2 border rounded-xl"
        />

        {/* Category List */}
        <div className="flex-1 overflow-y-auto space-y-3">
          {!adminCategories ? (
            <div className="flex flex-col gap-1">
              {[1, 2, 3, 4, 5].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-2xl bg-gray-100 animate-pulse"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-200 rounded-full" />
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-32" />
                      <div className="h-3 bg-gray-200 rounded w-44" />
                    </div>
                  </div>
                  <div className="w-6 h-6 bg-gray-200 rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-3 mb-2">
              {adminCategories?.map((cat) => {
                const isSelected = selected.find((c) => c._id === cat._id);
                return (
                  <div
                    key={cat._id}
                    onClick={() => toggleSelect(cat)}
                    className={`flex items-center justify-between p-3 rounded-xl cursor-pointer transition
                ${
                  isSelected
                    ? "bg-blue-50 border border-blue-400"
                    : "bg-gray-50 hover:bg-gray-100"
                }`}
                  >
                    <div className="flex gap-3">
                      <img src={cat.image} className="w-16 h-12 rounded-full" />
                      <div>
                        <p className="font-medium">{cat.name}</p>
                        <p className="text-xs text-gray-500">
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                  ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "border-gray-300"
                  }`}
                    >
                      {isSelected && "✓"}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="border-t pt-4 space-y-2 mb-16">
          <button
            disabled={selected.length === 0}
            onClick={onAddCategories}
            className={`w-full py-3 rounded-xl font-semibold
              ${
                selected.length > 0
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-400"
              }`}
          >
            Add {selected.length || ""} Categories
          </button>
        </div>
      </div>

      {userLoading && <LoaderComponent/>}
    </div>
  );
};

export default AddCategorySheet;
