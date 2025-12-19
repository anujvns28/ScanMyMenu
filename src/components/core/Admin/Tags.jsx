import { useState } from "react";

const AdminTags = () => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Tags
          </h1>
          <p className="text-gray-500">
            Reusable labels for food items and shops
          </p>
        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 text-white px-5 py-2 rounded-xl font-medium hover:bg-blue-700"
        >
          + Add Tag
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <input
          type="text"
          placeholder="Search tags..."
          className="w-72 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Tags Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="text-left px-6 py-3">Tag Name</th>
              <th className="text-left px-6 py-3">Type</th>
              <th className="text-left px-6 py-3">Used In</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-left px-6 py-3">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="px-6 py-4 font-medium">Veg</td>
              <td className="px-6 py-4">Food</td>
              <td className="px-6 py-4">24 items</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                  Active
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="text-red-600 hover:underline">
                  Disable
                </button>
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-4 font-medium">Spicy</td>
              <td className="px-6 py-4">Food</td>
              <td className="px-6 py-4">18 items</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                  Active
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="text-red-600 hover:underline">
                  Disable
                </button>
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-4 font-medium">Popular</td>
              <td className="px-6 py-4">Shop</td>
              <td className="px-6 py-4">6 shops</td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">
                  Active
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="text-red-600 hover:underline">
                  Disable
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Add Tag Modal */}
      {openModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[380px] p-6 shadow-xl">

            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add New Tag
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Tag name (e.g. Spicy)"
                className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
              />

              <select className="w-full border rounded-lg px-4 py-2">
                <option>Select tag type</option>
                <option>Food</option>
                <option>Shop</option>
              </select>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  onClick={() => setOpenModal(false)}
                  className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Create Tag
                </button>
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTags;
