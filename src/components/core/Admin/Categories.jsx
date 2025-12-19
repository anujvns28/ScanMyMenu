import { useEffect, useState } from "react";
import { createCategory } from "../../../service/operations/category";
import { useDispatch, useSelector } from "react-redux";

const AdminCategories = () => {
  const [openModal, setOpenModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const [image, setImg] = useState();
  const [name,setName] = useState();
  const [description,setDescription] = useState();

  const dispatch = useDispatch();
  const {token} = useSelector((state)=>state.auth);

  const handleCreateCategory = async() =>{
     const data = {name,description,image};

     await createCategory(data,token,dispatch);
  }


  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Categories</h1>
          <p className="text-gray-500">
            Manage menu categories used by shopkeepers
          </p>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search category..."
            className="w-64 px-4 py-2 rounded-xl border focus:ring-2 focus:ring-blue-500 outline-none"
          />

          <button
            onClick={() => setOpenModal(true)}
            className="bg-blue-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-700 transition"
          >
            + Add Category
          </button>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-4 gap-6">
        {/* Category Card */}
        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092"
            alt="Starters"
            className="h-36 w-full object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">Starters</h3>
            <p className="text-sm text-gray-500 mt-1">
              Used by <span className="font-medium text-gray-700">12</span>{" "}
              shopkeepers
            </p>

            <button className="mt-3 text-blue-600 text-sm hover:underline">
              Edit
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe"
            alt="Drinks"
            className="h-36 w-full object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800">Drinks</h3>
            <p className="text-sm text-gray-500 mt-1">
              Used by <span className="font-medium text-gray-700">8</span>{" "}
              shopkeepers
            </p>

            <button className="mt-3 text-blue-600 text-sm hover:underline">
              Edit
            </button>
          </div>
        </div>
      </div>

      {/* Add Category Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[440px] p-6 shadow-xl">
            {/* Header */}
            <div className="mb-5">
              <h2 className="text-xl font-semibold text-gray-800">
                Add Category
              </h2>
              <p className="text-sm text-gray-500">
                Create a new menu category for shops
              </p>
            </div>

            {/* Form */}
            <div className="space-y-4">
              {/* Category Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Starters"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  onChange={(e)=>setName(e.target.value)}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Short description about this category"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  onChange={(e)=>setDescription(e.target.value)}
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Image
                </label>

                {!preview ? (
                  /* Upload Box */
                  <label className="block cursor-pointer">
                    <div
                      className="border-2 border-dashed border-gray-300 rounded-xl
                      h-[200px] flex flex-col items-center justify-center
                      text-center hover:bg-gray-50 transition"
                    >
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          setImg(e.target.files[0]);
                          setPreview(URL.createObjectURL(e.target.files[0]));
                        }}
                      />

                      <p className="text-3xl mb-2">📷</p>

                      <p className="text-sm text-blue-600 font-medium">
                        Click to upload image
                      </p>

                      <p className="text-xs text-gray-400 mt-1">
                        JPG or PNG (recommended size: 600×400)
                      </p>
                    </div>
                  </label>
                ) : (
                  /* Preview Box */
                  <div className="border rounded-xl p-3">
                    <img
                      src={preview}
                      alt="Category Preview"
                      className="h-[200px] w-full object-cover rounded-lg"
                    />

                    <div className="flex justify-between items-center mt-3">
                      <p className="text-xs text-gray-500">Image selected</p>

                      {/* Change Image */}
                      <label className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">
                        Change image
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => {
                            setImg(e.target.files[0]);
                            setPreview(URL.createObjectURL(e.target.files[0]));
                          }}
                        />
                      </label>
                    </div>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setPreview(null);
                    setImg(null);
                    setOpenModal(false)
                  }}
                  className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                  onClick={handleCreateCategory}
                >
                  Create Category
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategories;
