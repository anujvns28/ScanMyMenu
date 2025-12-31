import React, { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import LoaderComponent from "../../common/LoaderComponent";
import { addProduct } from "../../../service/operations/product";

const AddProduct = ({
  setShowAddProductSheet,
  setCurrCategoryProduct,
  currSelectedCategory,
}) => {
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const {userLoading,token} = useSelector((state) => state.auth)
  const dispatch = useDispatch();

  const formValidation = () => {
    const newError = {};

    if (!image) newError.image = "Item image is required";
    if (!name.trim()) newError.name = "Item name is required";
    if (!description.trim()) newError.description = "Description is required";
    if (!price) newError.price = "Price is required";


    setErrors(newError);
    return Object.keys(newError).length === 0;
  };

  const handleAddProduct = async () => {
    if (!formValidation()) return;

    const data = { image, name, description, price,categoryId:currSelectedCategory._id };

    // API call here
    const result = await addProduct(data,token,dispatch);
    if(result){
        setCurrCategoryProduct(prev => [...prev,result.data])
    }
    setShowAddProductSheet(false)
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-2xl max-h-[80vh] overflow-y-auto">

        {/* Drag handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3"></div>

        {/* Header */}
        <div className="flex justify-between items-center px-5 pb-3">
          <div>
            <h2 className="text-lg font-bold">Add Item</h2>
            <p className="text-xs text-gray-500">
              Adding to: {currSelectedCategory?.category?.name}
            </p>
          </div>
          <button
            onClick={() => setShowAddProductSheet(false)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="p-5 space-y-4">

          {/* Image Upload */}
          <div
            className={`relative w-full h-40 border-2 border-dashed rounded-xl overflow-hidden ${
              errors.image ? "border-red-500" : "border-gray-300"
            }`}
          >
            <input
              type="file"
              accept="image/*"
              className="absolute inset-0 opacity-0 cursor-pointer z-10"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  setPreview(URL.createObjectURL(file));
                  setImage(file);
                  setErrors({ ...errors, image: "" });
                }
              }}
            />

            {!preview && (
              <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                <div className="text-4xl">📸</div>
                <p className="text-sm font-medium text-gray-600 mt-1">
                  Upload item image
                </p>
                <p className="text-xs text-gray-400">JPG, PNG up to 5MB</p>
              </div>
            )}

            {preview && (
              <>
                <img
                  src={preview}
                  className="w-full h-full object-cover"
                  alt="preview"
                />
                <div className="absolute inset-0 bg-black/40 flex items-end justify-end p-2">
                  <button className="bg-white px-3 py-1 rounded-lg text-sm font-medium">
                    Change
                  </button>
                </div>
              </>
            )}
          </div>

          {errors.image && (
            <p className="text-red-500 text-xs">{errors.image}</p>
          )}

          {/* Item Name */}
          <input
            className={`w-full border rounded-lg p-3 ${
              errors.name ? "border-red-500" : ""
            }`}
            placeholder="Item name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setErrors({ ...errors, name: "" });
            }}
          />
          {errors.name && (
            <p className="text-red-500 text-xs">{errors.name}</p>
          )}

          {/* Description */}
          <textarea
            className={`w-full border rounded-lg p-3 ${
              errors.description ? "border-red-500" : ""
            }`}
            placeholder="Short description"
            rows="3"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
              setErrors({ ...errors, description: "" });
            }}
          />
          {errors.description && (
            <p className="text-red-500 text-xs">{errors.description}</p>
          )}

          {/* Price */}
          <input
            className={`w-full border rounded-lg p-3 ${
              errors.price ? "border-red-500" : ""
            }`}
            placeholder="Price ₹"
            value={price}
            onChange={(e) => {
              setPrice(e.target.value);
              setErrors({ ...errors, price: "" });
            }}
          />
          {errors.price && (
            <p className="text-red-500 text-xs">{errors.price}</p>
          )}

          {/* Save Button */}
          <button
            onClick={handleAddProduct}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold mt-4 mb-14"
          >
            Add Item
          </button>

        </div>
      </div>
      {userLoading && <LoaderComponent/>}
    </div>
  );
};

export default AddProduct;
