import React, { useState } from "react";
import { updateProduct } from "../../../service/operations/product";
import { useSelector,useDispatch } from "react-redux";

const ViewProduct = ({viewProduct,setViewProduct,setCurrCategoryProduct}) => {
  const [editField, setEditField] = useState(null);
  const [editValue,setEditValue] = useState(null)
  const [tempPrice,setTempPrice] = useState({
    price : "",
    discountPrice : ""
  })

  const {token,userLoading} = useSelector((state)=>state.auth);
  const dispatch = useDispatch();


  const updateProductHandler = async() =>{
      let data = {itemId:viewProduct._id, field:editField, value:editValue}

      if(editField=="isAvailable"){
        data = {...data,value:editValue=="Available"?true:false}
      }

      const result = await updateProduct(data,token,dispatch)
      if(result){
        setViewProduct(result.data);
      }
      setEditField(null);
      setEditValue(null);
  }

  const updatePriceHandler = async()=>{
    const data1 = {itemId:viewProduct._id, field:"price", value:tempPrice.price}
    const data2 = {itemId:viewProduct._id, field:"discountPrice", value:tempPrice.discountPrice}

    await updateProduct(data1,token,dispatch)
    const result = await updateProduct(data2,token,dispatch)

    if(result){
        setViewProduct(result.data);
      }
      setEditField(null);
      setEditValue(null);
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-2xl max-h-[90vh] overflow-y-auto">
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
            onClick={()=>setViewProduct(null)}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
              ✕
            </button>
          </div>
        </div>

        {/* Product Image */}
        <div
          className={`relative w-full h-56 transition ${
            editField === "image" ? "ring-2 ring-blue-500" : ""
          }`}
        >
          <img
            src={viewProduct.image}
            className="w-full h-full object-cover"
            alt="item"
          />

          {editField === "image" ? (
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3">
              <button className="bg-white px-4 py-2 rounded-lg text-sm font-medium">
                Upload New Image
              </button>

              <div className="flex gap-3">
                <button
                  onClick={() => setEditField(null)}
                  className="px-4 py-2 border rounded-lg bg-white"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setEditField(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setEditField("image")}
              className="absolute bottom-3 right-3 bg-black/60 text-white px-3 py-1 rounded-lg text-sm"
            >
              Change
            </button>
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
                <p className="text-xs text-gray-500 mb-1">Item Name</p>

                {editField === "name" ? (
                  <>
                    <input
                      className="w-full border rounded-lg p-3 text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                      defaultValue={viewProduct?.name}
                      autoFocus
                      onChange={(e)=>setEditValue(e.target.value)}
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

                    <button
                      onClick={() => setEditField("name")}
                      className="text-blue-600 text-sm font-medium"
                    >
                      Edit
                    </button>
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
                    onChange={(e)=>setTempPrice({...tempPrice,price:e.target.value})}
                  />
                  <input
                    className="w-1/2 border rounded-lg p-3 text-lg"
                    placeholder="Discount"
                    defaultValue={viewProduct?.discountPrice}
                    onChange={(e)=>setTempPrice({...tempPrice,discountPrice:e.target.value})}
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
                    {userLoading?"Loading..":"Save"}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                  <span className="text-green-600 font-semibold">₹{viewProduct.price}</span>
                  <span className="line-through text-gray-400">₹{viewProduct.discountPrice}</span>
                </div>
                <button
                  onClick={() => {
                    setEditField("price");
  setTempPrice({
    price: viewProduct.price,
    discountPrice: viewProduct.discountPrice
  });
                  }}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>
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
            <p className="text-xs text-gray-500 mb-1">Description</p>

            {editField === "description" ? (
              <>
                <textarea
                  className="w-full border rounded-lg p-3"
                  rows="3"
                  defaultValue={viewProduct.description}
                  onChange={(e)=>setEditValue(e.target.value)}
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
                <button
                  onClick={() => setEditField("description")}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>
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
            <p className="text-xs text-gray-500 mb-1">Tags</p>

            {editField === "tags" ? (
              <>
                {/* Selected tags */}
                <div className="flex gap-2 flex-wrap mb-3">
                  <span className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                    Spicy ✕
                  </span>
                  <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                    Bestseller ✕
                  </span>
                </div>

                {/* Search */}
                <input
                  className="w-full border rounded-lg p-2 mb-3"
                  placeholder="Search tags..."
                />

                {/* Suggestions */}
                <div className="flex gap-2 flex-wrap">
                  {[
                    "Veg",
                    "Non-Veg",
                    "Spicy",
                    "Sweet",
                    "Bestseller",
                    "Popular",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs border rounded-full cursor-pointer hover:bg-blue-100"
                    >
                      {tag}
                    </span>
                  ))}
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
                    onClick={() => setEditField(null)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <div className="flex gap-2 flex-wrap">
                  <span className="px-3 py-1 text-xs rounded-full bg-red-100 text-red-700">
                    Spicy
                  </span>
                  <span className="px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                    Bestseller
                  </span>
                </div>

                <button
                  onClick={() => setEditField("tags")}
                  className="text-blue-600 text-sm"
                >
                  Edit
                </button>
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
                onChange={(e)=>setEditValue(e.target.value)}
                defaultValue={viewProduct.preparationTime}
                className="w-full border rounded-lg p-3">
                  <option>10</option>
                  <option >15</option>
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
                <p className="text-sm font-medium">{viewProduct.preparationTime} mins</p>
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
                defaultValue={viewProduct?.isAvailable ?"Available":"Out of Stock"}
                onChange={(e)=>setEditValue(e.target.value)}
                className="w-full border rounded-lg p-3">
                  <option >Available</option>
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
                <p className={`${viewProduct?.isAvailable ?"text-green-600":"text-red-600"} font-medium`}>{viewProduct?.isAvailable ?"Available":"Out of Stock"}</p>
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
              editField === "today"
                ? "bg-white border-2 border-blue-500 shadow-md"
                : "bg-gray-50"
            }`}
          >
            <p className="text-xs text-gray-500 mb-1">Today’s Special</p>

            {editField === "today" ? (
              <>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2">
                    <input type="radio" name="today" defaultChecked />
                    <span>Yes</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input type="radio" name="today" />
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
                    onClick={() => setEditField(null)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg"
                  >
                    Save
                  </button>
                </div>
              </>
            ) : (
              <div className="flex justify-between items-center">
                <p className="text-sm font-medium text-green-600">Yes</p>

                <button
                  onClick={() => setEditField("today")}
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
