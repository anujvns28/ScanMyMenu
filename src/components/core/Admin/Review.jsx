const AdminFlaggedReviews = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-8">

      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          Flagged Reviews
        </h1>
        <p className="text-gray-500">
          Reviews that require admin attention
        </p>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <p className="text-gray-700 font-medium">
          ⚠ Total Flagged Reviews: <span className="font-bold">3</span>
        </p>
      </div>

      {/* Flagged Review Card */}
      <div className="space-y-5">

        {/* Review 1 */}
        <div className="bg-white border-l-4 border-red-500 rounded-xl shadow p-5">
          <p className="text-sm text-red-600 font-medium mb-2">
            ⚠ Reason: Abusive Language
          </p>

          <p className="text-yellow-500 mb-1">⭐☆☆☆☆</p>

          <p className="text-gray-800 mb-2">
            “Ye shop chor hai, bilkul bekar service.”
          </p>

          <p className="text-sm text-gray-500">
            Type: <b>Shop Review</b> · Shop: Sharma Dhaba
          </p>

          <p className="text-xs text-gray-400 mt-1">
            User: Rahul · 12 Sep 2025
          </p>

          <div className="flex gap-3 mt-4">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Hide Review
            </button>

            <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">
              Keep Review
            </button>
          </div>
        </div>

        {/* Review 2 */}
        <div className="bg-white border-l-4 border-yellow-500 rounded-xl shadow p-5">
          <p className="text-sm text-yellow-600 font-medium mb-2">
            ⚠ Reason: Low Rating
          </p>

          <p className="text-yellow-500 mb-1">⭐⭐☆☆☆</p>

          <p className="text-gray-800 mb-2">
            “Food bilkul thanda tha.”
          </p>

          <p className="text-sm text-gray-500">
            Type: <b>Food Review</b> · Item: Paneer Tikka
          </p>

          <p className="text-sm text-gray-500">
            Shop: Food Corner
          </p>

          <p className="text-xs text-gray-400 mt-1">
            User: Aman · 13 Sep 2025
          </p>

          <div className="flex gap-3 mt-4">
            <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
              Hide Review
            </button>

            <button className="px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100">
              Keep Review
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminFlaggedReviews;
