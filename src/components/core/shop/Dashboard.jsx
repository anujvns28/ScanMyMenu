const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-6">

      {/* ===== SHOP INFO ===== */}
      <div className="bg-white rounded-xl p-4 shadow">
        <h1 className="text-lg font-bold text-gray-800">
          Sharma Dhaba
        </h1>
        <p className="text-sm text-gray-500">
          ⭐ 4.6 · 120 Reviews
        </p>
      </div>

      {/* ===== SUMMARY CARDS ===== */}
      <div className="flex gap-4 overflow-x-auto md:grid md:grid-cols-4">
        <StatCard title="Rating" value="⭐ 4.6" />
        <StatCard title="Products" value="42" />
        <StatCard title="Today Scans" value="85" />
        <StatCard title="Notifications" value="3 New" highlight />
      </div>

      {/* ===== NOTIFICATIONS PREVIEW ===== */}
      <div className="bg-white rounded-xl p-4 shadow space-y-3">
        <h2 className="font-semibold text-gray-700">
          🔔 Notifications
        </h2>

        <div className="text-sm text-gray-600">
          ⭐ New review added on <b>Chicken Biryani</b>
        </div>

        <div className="text-sm text-gray-600">
          🛠️ Admin replied to your support ticket
        </div>

        <div className="text-sm text-gray-600">
          ⚠️ <b>Veg Noodles</b> is out of stock
        </div>
      </div>

      {/* ===== TODAY'S SPECIAL ===== */}
      <div className="bg-white rounded-xl p-4 shadow space-y-2">
        <h2 className="font-semibold text-gray-700">
          🔥 Today’s Special
        </h2>
        <p className="font-semibold text-gray-800">
          Chicken Biryani
        </p>
        <p className="text-sm text-gray-500">
          ⭐ 4.8 • ₹180
        </p>
        <button className="text-sm font-medium text-blue-600">
          Edit Special
        </button>
      </div>

      {/* ===== ALERTS ===== */}
      <div className="bg-white rounded-xl p-4 shadow space-y-3">
        <h2 className="font-semibold text-gray-700">
          ⚠️ Attention Needed
        </h2>

        <Alert text="Veg Noodles" status="Out of Stock" color="red" />
        <Alert text="Cold Drink" status="Low Stock" color="yellow" />
      </div>

      {/* ===== TOP ITEMS ===== */}
      <div className="bg-white rounded-xl p-4 shadow space-y-3">
        <h2 className="font-semibold text-gray-700">
          🏆 Top Rated Items
        </h2>

        <Item name="Chicken Biryani" rating="4.8" />
        <Item name="Paneer Tikka" rating="4.6" />
        <Item name="Butter Naan" rating="4.5" />
      </div>

      {/* ===== RECENT REVIEWS ===== */}
      <div className="bg-white rounded-xl p-4 shadow space-y-3">
        <h2 className="font-semibold text-gray-700">
          💬 Recent Reviews
        </h2>

        <Review rating="5" text="Awesome taste!" />
        <Review rating="4" text="Quantity was good." />

        <button className="text-sm font-medium text-blue-600">
          View All Reviews
        </button>
      </div>

      {/* ===== QUICK ACTIONS ===== */}
      <div className="bg-white rounded-xl p-4 shadow space-y-3">
        <h2 className="font-semibold text-gray-700">
          ⚡ Quick Actions
        </h2>

        <div className="grid grid-cols-3 gap-3">
          <Action label="➕ Add Product" />
          <Action label="🎁 Offer" />
          <Action label="🛠️ Support" />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;


const StatCard = ({ title, value, highlight }) => (
  <div
    className={`min-w-[140px] rounded-xl p-4 shadow bg-white ${
      highlight ? "border border-blue-500" : ""
    }`}
  >
    <p className="text-sm text-gray-500">{title}</p>
    <p className="text-xl font-bold text-gray-800">{value}</p>
  </div>
);

const Alert = ({ text, status, color }) => (
  <div className="flex justify-between text-sm">
    <span>{text}</span>
    <span
      className={
        color === "red" ? "text-red-500 font-medium" : "text-yellow-500 font-medium"
      }
    >
      {status}
    </span>
  </div>
);

const Item = ({ name, rating }) => (
  <div className="flex justify-between text-sm">
    <span>{name}</span>
    <span className="text-yellow-500">⭐ {rating}</span>
  </div>
);

const Review = ({ rating, text }) => (
  <div className="text-sm">
    <span className="text-yellow-500">⭐ {rating}</span>
    <p className="text-gray-600">{text}</p>
  </div>
);

const Action = ({ label }) => (
  <button className="rounded-xl bg-gray-50 border p-3 text-sm font-medium hover:bg-gray-100">
    {label}
  </button>
);
