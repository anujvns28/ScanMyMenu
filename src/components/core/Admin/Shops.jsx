import React from "react";

const Shops = () => {
  return (
    <div className="space-y-6 w-full ">

      {/* ===== Page Header ===== */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">
          Shops Management
        </h1>

        <div className="flex gap-3">
          <input
            type="text"
            placeholder="Search shop / owner..."
            className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>Status</option>
            <option>Active</option>
            <option>Blocked</option>
          </select>

          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>Rating</option>
            <option>Below 3 ⭐</option>
            <option>Above 4 ⭐</option>
          </select>
        </div>
      </div>

      {/* ===== Shops Table ===== */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-4">Shop</th>
              <th className="px-6 py-4">Owner</th>
              <th className="px-6 py-4">Scans</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>

          <tbody className="text-gray-700">

            <tr className="border-t">
              <td className="px-6 py-4 font-medium">Food Plaza</td>
              <td className="px-6 py-4">Rahul Sharma</td>
              <td className="px-6 py-4">1,250</td>
              <td className="px-6 py-4">4.6 ⭐</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-600">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 space-x-2">
                <button className="text-blue-600 hover:underline">
                  View
                </button>
                <button className="text-red-600 hover:underline">
                  Block
                </button>
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-4 font-medium">Cafe Delight</td>
              <td className="px-6 py-4">Ankit Verma</td>
              <td className="px-6 py-4">820</td>
              <td className="px-6 py-4">4.3 ⭐</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-xs bg-green-100 text-green-600">
                  Active
                </span>
              </td>
              <td className="px-6 py-4 space-x-2">
                <button className="text-blue-600 hover:underline">
                  View
                </button>
                <button className="text-red-600 hover:underline">
                  Block
                </button>
              </td>
            </tr>

            <tr className="border-t bg-red-50">
              <td className="px-6 py-4 font-medium">Spice Hub</td>
              <td className="px-6 py-4">Neha Singh</td>
              <td className="px-6 py-4">430</td>
              <td className="px-6 py-4 text-red-600">2.1 ⭐</td>
              <td className="px-6 py-4">
                <span className="px-3 py-1 rounded-full text-xs bg-red-100 text-red-600">
                  Blocked
                </span>
              </td>
              <td className="px-6 py-4 space-x-2">
                <button className="text-blue-600 hover:underline">
                  View
                </button>
                <button className="text-green-600 hover:underline">
                  Unblock
                </button>
              </td>
            </tr>

          </tbody>
        </table>
      </div>

      {/* ===== Pagination ===== */}
      <div className="flex justify-end gap-2 text-sm">
        <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">
          Prev
        </button>
        <button className="px-3 py-1 border rounded-lg bg-blue-600 text-white">
          1
        </button>
        <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">
          2
        </button>
        <button className="px-3 py-1 border rounded-lg hover:bg-gray-100">
          Next
        </button>
      </div>

    </div>
  );
};

export default Shops;
