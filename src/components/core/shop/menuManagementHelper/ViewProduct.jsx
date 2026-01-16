import React, { useEffect, useState } from "react";
import { updateProduct } from "../../../../service/operations/product";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllActiveTag } from "../../../../service/operations/tag";
import { colorClasses } from "../../../../utils/data";

const ViewProduct = ({
  viewProduct,
  setViewProduct,
  setCurrCategoryProduct,
}) => {
  const [editField, setEditField] = useState(null);
  const [editValue, setEditValue] = useState(null);
  const [tempPrice, setTempPrice] = useState({
    price: "",
    discountPrice: "",
  });

  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedTagsIds, setSelectedTagsIds] = useState([]);
  const [allTags, setAllTags] = useState([]);
  const [preview, setPreview] = useState(null);

  const [ingredients, setIngredients] = useState([]);
  const [newIngredient, setNewIngredient] = useState("");

  const { token, userLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const updateProductHandler = async () => {
    let data = { itemId: viewProduct._id, field: editField, value: editValue };

    if (editField == "isAvailable") {
      data = { ...data, value: editValue == "Available" ? true : false };
    }

    if (editField == "ingredients") {
      data.value = ingredients;
    }

    if (editField == "tags") {
      data = { ...data, value: selectedTagsIds };
    }

    const result = await updateProduct(data, token, dispatch);
    if (result) {
      setViewProduct(result.data);
    }
    setEditField(null);
    setEditValue(null);
    setCurrCategoryProduct((prev) =>
      prev.map((item) => (item._id == viewProduct._id ? result.data : item))
    );
  };

  const updatePriceHandler = async () => {
    const data1 = {
      itemId: viewProduct._id,
      field: "price",
      value: tempPrice.price,
    };
    const data2 = {
      itemId: viewProduct._id,
      field: "discountPrice",
      value: tempPrice.discountPrice,
    };

    await updateProduct(data1, token, dispatch);
    const result = await updateProduct(data2, token, dispatch);

    if (result) {
      setViewProduct(result.data);
    }
    setEditField(null);
    setEditValue(null);

    setCurrCategoryProduct((prev) =>
      prev.map((item) => (item._id == viewProduct._id ? result.data : item))
    );
  };

  const fetchTagsHandler = async () => {
    const result = await fetchAllActiveTag(token, dispatch);
    if (result) {
      const productTags = result?.tags.filter((tag) => tag.type == "product");
      setAllTags(productTags);
    }
  };

  const toggleSelectedTag = (tag) => {
    if (selectedTagsIds.includes(tag._id)) {
      setSelectedTagsIds((prev) => prev.filter((temp) => temp != tag._id));
      setSelectedTags((prev) => prev.filter((temp) => temp._id != tag._id));
    } else {
      setSelectedTags([...selectedTags, tag]);
      setSelectedTagsIds([...selectedTagsIds, tag._id]);
    }
  };

  useEffect(() => {
    setSelectedTags(viewProduct.tags);
    setSelectedTagsIds(viewProduct.tags.map((temp) => temp._id));
    fetchTagsHandler();
    setIngredients(viewProduct.ingredients || []);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-2xl max-h-[85vh] overflow-y-auto">
        {/* Drag handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3"></div>
        {/* Top Header */}
        <div className="flex justify-between items-center px-5 pb-3">
          <div>
            <p className="text-xs text-gray-500">Category</p>
            <p className="text-sm font-semibold text-gray-800">Biryani</p>
          </div>

          <div className="flex items-center gap-4">
            {/* Rating */}
            <div className="flex items-center gap-1 text-yellow-500 text-sm">
              ⭐ <span className="text-gray-700 font-medium">4.6</span>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setViewProduct(null)}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Product Image */}
        <div
          className={`rounded-xl p-2 transition ${
            editField === "image"
              ? "bg-white border-2 border-blue-500 shadow-md"
              : "bg-gray-50"
          }`}
        >
          <div
            className={`relative w-full h-56 rounded-xl overflow-hidden transition ${
              editField === "image" ? "ring-2 ring-blue-500" : ""
            }`}
          >
            <img
              src={preview || viewProduct.image}
              className="w-full h-full object-cover"
              alt="item"
            />

            {/* Change Button */}
            {editField !== "image" && (
              <button
                onClick={() => setEditField("image")}
                className="absolute bottom-3 right-3 bg-black/60 text-white px-3 py-1 rounded-lg text-sm"
              >
                Change
              </button>
            )}
          </div>

          {/* Cancel / Save BELOW image */}
          {editField === "image" && (
            <div className="flex justify-end gap-3 mt-3 px-3">
              {editField === "image" && (
                <div className="p-2 border rounded-lg ">
                  <label className="bg-white px-4 py-2 rounded-lg text-sm font-medium cursor-pointer">
                    Pick New Image
                    <input
                      type="file"
                      hidden
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          setEditValue(e.target.files[0]);
                          setPreview(URL.createObjectURL(e.target.files[0]));
                        }
                      }}
                    />
                  </label>
                </div>
              )}

              <button
                className="px-4 py-2 border rounded-lg"
                onClick={() => {
                  setEditField(null);
                  setPreview(null);
                }}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                onClick={updateProductHandler}
              >
                {userLoading ? "loading" : "Save"}
              </button>
            </div>
          )}
        </div>

        <div className="p-5 space-y-4">
          {/* Product Name */}
          <div
            className={`rounded-xl p-4 transition
    ${
      editField === "name"
        ? "bg-white border-2 border-blue-500 shadow-md"
        : "bg-gray-50"
    }`}
          >
            <div className="flex justify-between items-start">
              <div className="w-full">
                <div className="flex flex-row items-center justify-between mb-2">
                  <p className="text-xs text-gray-500 mb-1">Item Name</p>
                  <button
                    onClick={() => setEditField("name")}
                    className="text-blue-600 text-sm font-medium"
                  >
                    Edit
                  </button>
                </div>
                {editField === "name" ? (
                  <>
                    <input
                      className="w-full border rounded-lg p-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue={viewProduct?.name}
                      autoFocus
                      onChange={(e) => setEditValue(e.target.value)}
                    />

                    <div className="flex justify-end gap-3 mt-3">
                      <button
                        onClick={() => setEditField(null)}
                        className="px-4 py-2 rounded-lg border text-gray-600"
                      >
                        Cancel
                      </button>

                      <button
                        onClick={updateProductHandler}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium"
                      >
                        {userLoading ? "loading..." : "Save"}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between items-center">
                    <p className="text-lg font-semibold">{viewProduct.name}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Price */}
          <div
            className={`rounded-xl p-4 transition ${
              editField === "price"
                ? "bg-white border-2 border-blue-500 shadow-md"
                : "bg-gray-50"
            }`}
          >
            <p className="text-xs text-gray-500 mb-1">Price</p>

            {editField === "price" ? (
              <>
                <div className="flex gap-3">
                  <input
                    className="w-1/2 border rounded-lg p-3 text-lg"
                    placeholder="Price"
                    defaultValue={viewProduct.price}
                    onChange={(e) =>
                      setTempPrice({ ...tempPrice, price: e.target.value })
                    }
                  />
                  <input
                    className="w-1/2 border rounded-lg p-3 text-lg"
                    placeholder="Discount"
                    defaultValue={viewProduct?.discountPrice}
                    onChange={(e) =>
                      setTempPrice({
                        ...tempPrice,
                        discountPrice: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={() => setEditField(null)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updatePriceHandler}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    {userLoading ? "Loading.." : "Save"}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <span className="text-green-600 font-semibold">
                    ₹{viewProduct.price}
                  </span>
                  <span className="line-through text-gray-400">
                    ₹{viewProduct.discountPrice}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setEditField("price");
                    setTempPrice({
                      price: viewProduct.price,
                      discountPrice: viewProduct.discountPrice,
                    });
                  }}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Food Type */}
          <div
            className={`rounded-xl p-4 transition ${
              editField === "type"
                ? "bg-white border-2 border-blue-500 shadow-md"
                : "bg-gray-50"
            }`}
          >
            <p className="text-xs text-gray-500 mb-1">Food Type</p>

            {editField === "type" ? (
              <>
                <select
                  defaultValue={viewProduct?.type || ""}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full border rounded-lg p-3 capitalize"
                >
                  <option value="" disabled>
                    Select type
                  </option>
                  <option value="veg">Veg 🌱</option>
                  <option value="non-veg">Non-Veg 🍗</option>
                  <option value="mix">Mix 🍱</option>
                </select>

                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={() => setEditField(null)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateProductHandler}
                    disabled={!editValue}
                    className={`px-4 py-2 rounded-lg text-white ${
                      editValue
                        ? "bg-blue-600"
                        : "bg-blue-300 cursor-not-allowed"
                    }`}
                  >
                    {userLoading ? "loading..." : "Save"}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                {viewProduct?.type ? (
                  <>
                    <p className="font-medium capitalize">
                      {viewProduct.type === "veg" && "Veg 🌱"}
                      {viewProduct.type === "non-veg" && "Non-Veg 🍗"}
                      {viewProduct.type === "mix" && "Mix 🍱"}
                    </p>

                    <button
                      onClick={() => {
                        setEditValue(viewProduct.type);
                        setEditField("type");
                      }}
                      className="text-blue-600 text-sm"
                    >
                      Edit
                    </button>
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-400 italic">
                      Type not added
                    </p>

                    <button
                      onClick={() => {
                        setEditValue("");
                        setEditField("type");
                      }}
                      className="text-blue-600 text-sm font-medium"
                    >
                      Add
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {/* Description */}
          <div
            className={`rounded-xl p-4 transition ${
              editField === "description"
                ? "bg-white border-2 border-blue-500 shadow-md"
                : "bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500 mb-1">Description</p>
              <button
                onClick={() => setEditField("description")}
                className="text-blue-600 text-sm"
              >
                Edit
              </button>
            </div>
            {editField === "description" ? (
              <>
                <textarea
                  className="w-full border rounded-lg p-3"
                  rows="3"
                  defaultValue={viewProduct.description}
                  onChange={(e) => setEditValue(e.target.value)}
                />

                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={() => setEditField(null)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateProductHandler}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    {userLoading ? "loading..." : "Save"}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-start">
                <p className="text-sm text-gray-700 w-[85%]">
                  {viewProduct.description}
                </p>
              </div>
            )}
          </div>

          {/* Tags */}
          <div
            className={`rounded-xl p-4 transition ${
              editField === "tags"
                ? "bg-white border-2 border-blue-500 shadow-md"
                : "bg-gray-50"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs text-gray-500 mb-1">Tags</p>
              <button
                onClick={() => setEditField("tags")}
                className="text-blue-600 text-sm"
              >
                Edit
              </button>
            </div>
            {editField === "tags" ? (
              <>
                {/* Selected tags */}
                <div className="flex gap-2 flex-wrap mb-3">
                  {selectedTags.map((tag) => {
                    return (
                      <span
                        onClick={() => toggleSelectedTag(tag)}
                        className={`px-3 ${
                          colorClasses[tag.color]
                        } py-1 text-xs bg-red-100  rounded-full`}
                      >
                        {tag.name} ✕
                      </span>
                    );
                  })}
                </div>

                {/* Search */}
                <input
                  className="w-full border rounded-lg p-2 mb-3"
                  placeholder="Search tags..."
                />

                {/* Suggestions */}
                <div className="flex gap-2 flex-wrap">
                  {allTags.map((tag, i) => {
                    if (!selectedTagsIds.includes(tag._id)) {
                      return (
                        <div
                          className={`${
                            selectedTags.includes(tag._id) &&
                            "border p-1 rounded-full"
                          }`}
                          onClick={() => toggleSelectedTag(tag)}
                        >
                          <span
                            key={i}
                            className={`px-3 ${
                              colorClasses[tag.color]
                            } p-1 text-xs border rounded-full cursor-pointer `}
                          >
                            {tag.name}
                          </span>
                        </div>
                      );
                    }
                  })}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={() => setEditField(null)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={updateProductHandler}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <div className="flex gap-2 flex-wrap">
                  {viewProduct.tags.map((tag) => {
                    return (
                      <span
                        className={`px-3 ${
                          colorClasses[tag.color]
                        } py-1 text-xs bg-red-100  rounded-full`}
                      >
                        {tag.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Preparation Time */}
          <div
            className={`rounded-xl p-4 transition ${
              editField === "preparationTime"
                ? "bg-white border-2 border-blue-500 shadow-md"
                : "bg-gray-50"
            }`}
          >
            <p className="text-xs text-gray-500 mb-1">Preparation Time</p>

            {editField === "preparationTime" ? (
              <>
                <select
                  onChange={(e) => setEditValue(e.target.value)}
                  defaultValue={viewProduct.preparationTime}
                  className="w-full border rounded-lg p-3"
                >
                  <option>10</option>
                  <option>15</option>
                  <option>20</option>
                </select>

                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={() => setEditField(null)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateProductHandler}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    {userLoading ? "loading..." : "Save"}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium">
                  {viewProduct.preparationTime} mins
                </p>
                <button
                  onClick={() => setEditField("preparationTime")}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Status */}
          <div
            className={`rounded-xl p-4 transition ${
              editField === "isAvailable"
                ? "bg-white border-2 border-blue-500 shadow-md"
                : "bg-gray-50"
            }`}
          >
            <p className="text-xs text-gray-500 mb-1">Status</p>

            {editField === "isAvailable" ? (
              <>
                <select
                  defaultValue={
                    viewProduct?.isAvailable ? "Available" : "Out of Stock"
                  }
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full border rounded-lg p-3"
                >
                  <option>Available</option>
                  <option>Out of Stock</option>
                </select>

                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={() => setEditField(null)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={updateProductHandler}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    {userLoading ? "loading..." : "Save"}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <p
                  className={`${
                    viewProduct?.isAvailable ? "text-green-600" : "text-red-600"
                  } font-medium`}
                >
                  {viewProduct?.isAvailable ? "Available" : "Out of Stock"}
                </p>
                <button
                  onClick={() => setEditField("isAvailable")}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Today Special */}
          <div
            className={`rounded-xl p-4 transition ${
              editField === "isTodaySpecial"
                ? "bg-white border-2 border-blue-500 shadow-md"
                : "bg-gray-50"
            }`}
          >
            <p className="text-xs text-gray-500 mb-1">Today’s Special</p>

            {editField === "isTodaySpecial" ? (
              <>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="isTodaySpecial"
                      defaultChecked={viewProduct?.isTodaySpecial}
                      onChange={() => setEditValue(true)}
                    />
                    <span>Yes</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="isTodaySpecial"
                      defaultChecked={!viewProduct?.isTodaySpecial}
                      onChange={() => setEditValue(false)}
                    />
                    <span>No</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={() => setEditField(null)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={updateProductHandler}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    {userLoading ? "loading..." : "Save"}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <p
                  className={`text-sm font-medium ${
                    viewProduct?.isTodaySpecial
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {viewProduct?.isTodaySpecial ? "Yes" : "Not"}
                </p>

                <button
                  onClick={() => setEditField("isTodaySpecial")}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Ingredients */}
          <div
            className={`rounded-xl p-4 transition ${
              editField === "ingredients"
                ? "bg-white border-2 border-blue-500 shadow-md"
                : "bg-gray-50"
            }`}
          >
            <div className="flex flex-row items-center justify-between mb-2 ">
              <p className="text-xs text-gray-500 mb-2">Ingredients</p>

              <button
                onClick={() => setEditField("ingredients")}
                className="text-blue-600 text-sm"
              >
                {viewProduct.ingredients?.length > 0 ? "Edit" : "Add"}
              </button>
            </div>

            {editField === "ingredients" ? (
              <>
                {/* Existing */}
                <div className="flex flex-wrap gap-2 mb-3">
                  {ingredients.map((ing, i) => (
                    <span
                      key={i}
                      onClick={() =>
                        setIngredients((prev) =>
                          prev.filter((_, index) => index !== i)
                        )
                      }
                      className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full cursor-pointer"
                    >
                      {ing} ✕
                    </span>
                  ))}
                </div>

                {/* Add */}
                <div className="flex gap-2">
                  <input
                    value={newIngredient}
                    onChange={(e) => setNewIngredient(e.target.value)}
                    placeholder="Add ingredient"
                    className="flex-1 border rounded-lg p-2"
                  />
                  <button
                    onClick={() => {
                      if (newIngredient.trim() !== "") {
                        setIngredients([...ingredients, newIngredient]);
                        setNewIngredient("");
                      }
                    }}
                    className="px-4 bg-green-600 text-white rounded-lg"
                  >
                    Add
                  </button>
                </div>

                <div className="flex justify-end gap-3 mt-3">
                  <button
                    onClick={() => setEditField(null)}
                    className="px-4 py-2 border rounded-lg"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={() => {
                      setEditValue(ingredients);
                      updateProductHandler();
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-start">
                {viewProduct.ingredients &&
                viewProduct.ingredients.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {viewProduct.ingredients.map((ing, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-400 italic">
                    No ingredients added yet
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Spice Level */}
          <div
            className={`rounded-xl p-4 transition ${
              editField === "spiceLevel"
                ? "bg-white border-2 border-blue-500 shadow-md"
                : "bg-gray-50"
            }`}
          >
            <p className="text-xs text-gray-500 mb-2">Spice Level</p>

            {editField === "spiceLevel" ? (
              <>
                {/* Chips */}
                <div className="flex flex-wrap gap-2">
                  {["mild", "medium", "spicy", "extra-spicy"].map((level) => (
                    <button
                      key={level}
                      onClick={() => setEditValue(level)}
                      className={`px-3 py-2 rounded-full text-xs sm:text-sm transition ${
                        editValue === level
                          ? "bg-red-600 text-white"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      🌶 {level}
                    </button>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    onClick={() => setEditField(null)}
                    className="px-4 py-2 border rounded-lg text-sm"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={updateProductHandler}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm"
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs sm:text-sm">
                  🌶 {viewProduct.spiceLevel || "medium"}
                </span>

                <button
                  onClick={() => {
                    setEditField("spiceLevel");
                    setEditValue(viewProduct.spiceLevel);
                  }}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>
              </div>
            )}
          </div>

          {/* Reviews */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium">Customer Reviews</p>
              <span className="text-xs text-blue-600">View all</span>
            </div>

            {/* Average */}
            <div className="flex items-center gap-2 mb-3">
              <div className="text-2xl font-bold text-yellow-500">4.6</div>
              <div className="text-sm text-gray-500">based on 128 reviews</div>
            </div>

            {/* Last 2 reviews */}
            <div className="space-y-3">
              <div>
                <p className="text-sm font-medium">Rahul</p>
                <p className="text-xs text-gray-600">
                  “Very tasty and spicy 🔥”
                </p>
              </div>

              <div>
                <p className="text-sm font-medium">Ankit</p>
                <p className="text-xs text-gray-600">
                  “Quantity was good, loved it.”
                </p>
              </div>
            </div>
          </div>

          <div className=" bg-white border-t p-3 mb-14">
            <div className="flex gap-2">
              <button className="flex-1 bg-yellow-100 text-yellow-700 py-3 rounded-xl font-medium">
                Disable
              </button>

              <button className="flex-1 bg-red-100 text-red-600 py-3 rounded-xl font-medium">
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
