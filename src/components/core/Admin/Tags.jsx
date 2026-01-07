import { useEffect, useState } from "react";
import {
  createTag,
  fetchAllTag,
  toggleTagStatus,
  updateTag,
} from "../../../service/operations/tag";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../common/ConfirmationModal";

const AdminTags = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [color, setColor] = useState("");
  const [errors, setErrors] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [mode, setMode] = useState("Create");
  const [currTag, setCurrTag] = useState();
  const [tags, setTags] = useState([]);
  const [cnfModal, setCnfModal] = useState({});

  const { token, userLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const colorClasses = {
    red: "bg-red-200 text-red-700",
    green: "bg-green-200 text-green-700",
    yellow: "bg-yellow-200 text-yellow-700",
    blue: "bg-blue-200 text-blue-700",
    purple: "bg-purple-200 text-purple-700",
  };

  const validateForm = () => {
    const data = {};

    if (!name) data.name = "Tag name is required";
    if (!type) data.type = "Tag Type is required";
    if (!color) data.color = "Color is required";

    setErrors(data);
    return Object.keys(data).length === 0;
  };

  const handleEditTag = (tag) => {
    setMode("Edit");
    setOpenModal(true);
    setName(tag.name);
    setType(tag.type);
    setColor(tag.color);
    setCurrTag(tag);
  };

  const handleTag = async () => {
    if (!validateForm()) return;

    if (mode == "Create") {
      // create tag
      const data = { name, type, color };
      await createTag(data, token, dispatch);
    } else {
      const data = {};
      if (name != currTag.name) data.name = name;
      if (type != currTag.type) data.type = type;
      if (color != currTag.color) data.color = color;

      if (Object.keys(data).length > 0) {
        // edit tag
        data.tagId = currTag._id;
        await updateTag(data, token, dispatch);
      } else {
        console.log("No Changes made");
      }
    }

    setName("");
    setType("");
    setColor("");
    setMode("Create");
    setErrors({});
    setOpenModal(false);
    fetchTagHandler();
  };

  const handleCnfModal = (tag) => {
    const data = {};
    data.text = `Are you sure you want to disable the "${tag.name}" tag? 
  This tag will no longer be visible to customers.`;
    data.btn1 = "Cancel";
    data.btn2 = tag.isActive ? "Disable" : "Activate";
    data.handler1 = () => setCnfModal({});
    data.handler2 = async () => {
      await toggleTagStatus({ tagId: tag._id }, token, dispatch);
      setCnfModal({});
      fetchTagHandler();
    };

    setCnfModal(data);
  };

  const fetchTagHandler = async () => {
    const result = await fetchAllTag(token, dispatch);

    if (result) {
      setTags(result.tags);
    }
  };

  useEffect(() => {
    fetchTagHandler();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* ===== Header ===== */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Tags</h1>
          <p className="text-gray-500 text-sm mt-1">
            Manage food & shop tags used across the platform
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-medium hover:bg-blue-700 shadow"
        >
          + Create Tag
        </button>
      </div>

      {/* ===== Filters ===== */}
      <div className="bg-white p-4 rounded-xl shadow mb-6 flex items-center gap-4">
        <input
          type="text"
          placeholder="Search tag..."
          className="w-64 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />

        <select className="px-4 py-2 border rounded-lg text-sm">
          <option value="">All Types</option>
          <option value="food">Food</option>
          <option value="shop">Shop</option>
        </select>
      </div>

      {/* ===== Tags Table ===== */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-6 py-3">Tag</th>
              <th className="text-left px-6 py-3">Type</th>
              <th className="text-left px-6 py-3">Usage</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-right px-6 py-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tags.map((tag, index) => (
              <tr
                key={tag._id || index}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Tag Name */}
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      colorClasses[tag.color] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {tag.name}
                  </span>
                </td>

                {/* Type */}
                <td className="px-6 py-4 text-gray-600 capitalize">
                  {tag.type}
                </td>

                {/* Usage */}
                <td className="px-6 py-4 text-gray-600">
                  {tag.usedCount}{" "}
                  <span className="text-xs text-gray-400">
                    {tag.type === "food" ? "items" : "shops"}
                  </span>
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      tag.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {tag.isActive ? "Active" : "Disabled"}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={() => handleEditTag(tag)}
                      className="text-blue-600 font-medium hover:text-blue-700 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleCnfModal(tag)}
                      className={`font-medium hover:underline ${
                        tag.isActive
                          ? "text-red-600 hover:text-red-700"
                          : "text-green-700 hover:text-green-800"
                      }`}
                    >
                      {tag.isActive ? "Disable" : "Activate"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ===== Create Tag Modal ===== */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[420px] p-6 shadow-xl">
            {userLoading ? (
              <div className="h-[400px] w-full flex items-center justify-center ">
                <div className="custom-loader"></div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {mode} Tag
                </h2>
                <p className="text-sm text-gray-500 mb-4">
                  Tags help customers quickly identify items
                </p>

                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Tag name (e.g. Spicy)"
                      className={`w-full border rounded-lg px-4 py-2 ${
                        errors.name && "border-red-500"
                      } `}
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors({ ...errors, name: "" });
                      }}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-xs ">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <select
                      className={`w-full border rounded-lg px-4 py-2 ${
                        errors.type && "border-red-500"
                      }`}
                      value={type}
                      onChange={(e) => {
                        setType(e.target.value);
                        setErrors({ ...errors, type: "" });
                      }}
                    >
                      <option value="">Select tag type</option>
                      <option value="category">Category</option>
                      <option value="product">Product</option>
                    </select>

                    {errors.type && (
                      <p className="text-red-500 text-xs ">{errors.type}</p>
                    )}
                  </div>

                  {/* Color Picker */}
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">
                      Select color
                    </p>
                    <div className="flex gap-2">
                      {["red", "green", "yellow", "blue", "purple"].map((c) => (
                        <div
                          key={c}
                          className={`w-7 h-7 rounded-full ${
                            colorClasses[c]
                          } cursor-pointer border-2 p-1  ${
                            color == c ? "border-black" : "border-white"
                          } shadow`}
                          onClick={() => {
                            setColor(c);
                            setErrors({ ...errors, color: "" });
                          }}
                        />
                      ))}
                    </div>
                    {errors.color && (
                      <p className="text-red-500 text-xs mt-1 ">
                        {errors.color}
                      </p>
                    )}
                  </div>

                  {/* Preview */}
                  <div className="text-xs text-gray-500">
                    Preview:
                    <span
                      className={`ml-2 inline-block px-3 py-1 rounded-full ${
                        colorClasses[color] || "bg-red-200"
                      } `}
                    >
                      {name || "Spicy"}
                    </span>
                  </div>

                  <div className="flex justify-end gap-3 pt-4">
                    <button
                      onClick={() => {
                        setOpenModal(false);
                        setErrors({});
                        setName();
                        setType();
                        setColor();
                        setMode("Create");
                      }}
                      className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                    >
                      Cancel
                    </button>

                    <button
                      className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      onClick={handleTag}
                    >
                      {mode} Tag
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {Object.keys(cnfModal).length > 0 && (
        <ConfirmationModal modalData={cnfModal} />
      )}
    </div>
  );
};

export default AdminTags;
