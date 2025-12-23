import { useEffect, useState } from "react";
import {
  createCategory,
  fetchAllCategory,
  updateCategory,
  toggleCategoryStatus,
} from "../../../service/operations/category";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../common/ConfirmationModal";

const AdminCategories = () => {
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("Add");
  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(null);
  const [image, setImg] = useState();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [currCategory, setCurrCategory] = useState();
  const [modalData, setModalData] = useState();

  const dispatch = useDispatch();
  const { token, userLoading } = useSelector((state) => state.auth);

  const validateForm = () => {
    const newErrors = {};

    if (!name) {
      newErrors.name = "Category name is required";
    }

    if (!description) {
      newErrors.description = "Description is required";
    }

    if (!image) {
      newErrors.image = "Category image is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCategory = async () => {
    if (!validateForm()) return;

    if (mode == "Add") {
      const data = { name, description, image };
      await createCategory(data, token, dispatch);
    } else {
      const data = {};
      if (name !== currCategory.name) data.name = name;
      if (description !== currCategory.description)
        data.description = description;
      if (typeof image !== "string") data.image = image;

      if (Object.keys(data).length > 0) {
        data.categoryId = currCategory._id;
        await updateCategory(data, token, dispatch);
      } else console.log("No Changes made");
    }

    setName("");
    setDescription("");
    setImg(null);
    setPreview(null);
    setErrors({});
    setOpenModal(false);
    setMode("Add");
    fetchAllCategoryHandler();
  };

  const handleEditCategory = async (category) => {
    setMode("Edit");
    setOpenModal(true);
    setName(category.name);
    setDescription(category.description);
    setPreview(category.image);
    setImg(category.image);
    setCurrCategory(category);
  };

  const fetchAllCategoryHandler = async () => {
    const response = await fetchAllCategory(token, dispatch);

    if (response) {
      setCategories(response?.data);
    }
  };

  const handleCnfModal = (category) => {
    const data = {};
    data.text = `Are you sure you want to disable the "${category.name}" category? 
This category will no longer be visible to customers.`;
    data.btn1 = "Cancel";
    data.btn2 = category.isActive ? "Disable" : "Activate";
    data.handler1 = () => setModalData(null);
    data.handler2 = async () => {
      await toggleCategoryStatus({ categoryId: category._id }, token, dispatch);
      setModalData(null);
      fetchAllCategoryHandler();
    };

    setModalData(data);
  };

  useEffect(() => {
    fetchAllCategoryHandler();
  }, []);

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
        {categories.map((category, index) => (
          <div
            key={index}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={category?.image}
                alt={category?.name}
                className="h-36 w-full object-cover"
              />

              {/* Status Badge */}
              <span
                className={`absolute top-2 right-2 px-2.5 py-1 text-xs font-medium rounded-full
          ${
            category.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
              >
                {category.isActive ? "Active" : "Disabled"}
              </span>
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
              <h3 className="text-base font-semibold text-gray-800">
                {category?.name}
              </h3>

              <p className="text-sm text-gray-500 ">{category?.description}</p>

              <div className="text-xs text-gray-500">
                Used by <span className="font-medium text-gray-700">12</span>{" "}
                shopkeepers
              </div>

              {/* Divider */}
              <div className="pt-3 border-t flex items-center justify-between">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="text-sm cursor-pointer text-blue-600 hover:text-blue-700 font-medium"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleCnfModal(category)}
                  className={`text-sm font-medium cursor-pointer ${
                    category.isActive
                      ? "text-red-600 hover:text-red-700"
                      : "text-green-700 hover:text-green-800"
                  }`}
                >
                  {category.isActive ? "Disable" : "Activate"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Category Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white   rounded-2xl w-[440px] p-6 shadow-xl">
            {!userLoading ? (
              <div>
                {/* Header */}
                <div className="mb-5">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {mode} Category
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
                      placeholder="Enter category name"
                      className={`w-full border rounded-lg px-4 py-2
    ${errors.name ? "border-red-500" : ""}`}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors({ ...errors, name: "" });
                      }}
                    />

                    {errors.name && (
                      <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Short description about this category"
                      className={`w-full border rounded-lg px-4 py-2
    ${errors.description ? "border-red-500" : ""}`}
                      value={description}
                      onChange={(e) => {
                        setDescription(e.target.value);
                        setErrors({ ...errors, description: "" });
                      }}
                    />

                    {errors.description && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.description}
                      </p>
                    )}
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
                          className={`border-2 border-dashed border-gray-300 rounded-xl
                      h-[200px] flex flex-col items-center justify-center
                      text-center hover:bg-gray-50 transition ${
                        errors.image && "border-red-500"
                      }`}
                        >
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              setImg(e.target.files[0]);
                              setPreview(
                                URL.createObjectURL(e.target.files[0])
                              );
                              setErrors({ ...errors, image: "" });
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
                          <p className="text-xs text-gray-500">
                            Image selected
                          </p>

                          {/* Change Image */}
                          <label className="text-sm text-blue-600 font-medium cursor-pointer hover:underline">
                            Change image
                            <input
                              type="file"
                              className="hidden"
                              onChange={(e) => {
                                setImg(e.target.files[0]);
                                setPreview(
                                  URL.createObjectURL(e.target.files[0])
                                );
                              }}
                            />
                          </label>
                        </div>
                      </div>
                    )}
                    {errors.image && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.image}
                      </p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <button
                      onClick={() => {
                        setPreview(null);
                        setImg(null);
                        setOpenModal(false);
                        setErrors({});
                        setMode("Add");
                      }}
                      className="px-4 py-2 cursor-pointer rounded-lg border text-gray-600 hover:bg-gray-100"
                    >
                      Cancel
                    </button>

                    <button
                      className="px-5 py-2 cursor-pointer  rounded-lg bg-blue-600 text-white hover:bg-blue-700"
                      onClick={handleCategory}
                    >
                      {mode} Category
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-[500px] w-full flex items-center justify-center ">
                <div className="custom-loader"></div>
              </div>
            )}
          </div>
        </div>
      )}

      {modalData && <ConfirmationModal modalData={modalData} />}
    </div>
  );
};

export default AdminCategories;
