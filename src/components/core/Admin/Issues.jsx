const AdminSupport = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Support Requests
        </h1>
        <p className="text-gray-500">
          Issues raised by shopkeepers
        </p>
      </div>

      {/* Summary */}
      <div className="flex gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Open Requests</p>
          <p className="text-2xl font-bold text-gray-800">3</p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Resolved</p>
          <p className="text-2xl font-bold text-gray-800">12</p>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Shop</th>
              <th className="px-6 py-3 text-left">Issue Type</th>
              <th className="px-6 py-3 text-left">Message</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr className="border-t">
              <td className="px-6 py-4">Food Hub</td>
              <td className="px-6 py-4">Payment</td>
              <td className="px-6 py-4">
                Amount not credited after order
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                  Open
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="text-blue-600 hover:underline">
                  Mark Resolved
                </button>
              </td>
            </tr>

            <tr className="border-t">
              <td className="px-6 py-4">Cafe Brew</td>
              <td className="px-6 py-4">Menu</td>
              <td className="px-6 py-4">
                New item not showing
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700">
                  Open
                </span>
              </td>
              <td className="px-6 py-4">
                <button className="text-blue-600 hover:underline">
                  Mark Resolved
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default AdminSupport;
