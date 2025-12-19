const Dashboard = () => {
  return (
    <div className="space-y-8">

      {/* ===== Stats Cards ===== */}
      <div className="grid grid-cols-5 gap-6">
        <Stat title="Total Shops" value="124" />
        <Stat title="Active Shops" value="118" />
        <Stat title="Categories" value="18" />
        <Stat title="Reviews" value="1,420" />
        <Stat title="QR Scans" value="9,850" />
      </div>

      {/* ===== Middle Section ===== */}
      <div className="grid grid-cols-3 gap-6">

        {/* Recent Shops */}
        <div className="col-span-2 bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Shops</h2>

          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b text-gray-500">
                <th className="pb-3">Shop</th>
                <th className="pb-3">Owner</th>
                <th className="pb-3">Scans</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>

            <tbody className="text-gray-700">
              <tr className="border-b">
                <td className="py-3">Food Plaza</td>
                <td>Rahul</td>
                <td>1250</td>
                <td className="text-green-600 font-medium">Active</td>
              </tr>

              <tr className="border-b">
                <td className="py-3">Cafe Delight</td>
                <td>Ankit</td>
                <td>820</td>
                <td className="text-green-600 font-medium">Active</td>
              </tr>

              <tr>
                <td className="py-3">Spice Hub</td>
                <td>Neha</td>
                <td>430</td>
                <td className="text-red-500 font-medium">Blocked</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Top Rated Shops */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Top Rated Shops
          </h2>

          <ul className="space-y-4 text-sm">
            <li className="flex justify-between">
              <span>Food Plaza</span>
              <span className="font-medium">4.6 ⭐</span>
            </li>
            <li className="flex justify-between">
              <span>Cafe Delight</span>
              <span className="font-medium">4.4 ⭐</span>
            </li>
            <li className="flex justify-between">
              <span>Urban Tadka</span>
              <span className="font-medium">4.2 ⭐</span>
            </li>
          </ul>
        </div>

      </div>

      {/* ===== Bottom Section ===== */}
      <div className="grid grid-cols-3 gap-6">

        {/* Needs Attention */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4 text-red-600">
            Needs Attention
          </h2>

          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex justify-between">
              <span>Spice Hub</span>
              <span className="text-red-500 font-medium">2.1 ⭐</span>
            </li>
            <li className="flex justify-between">
              <span>Street Bites</span>
              <span className="text-red-500 font-medium">2.4 ⭐</span>
            </li>
          </ul>
        </div>

        {/* Top Scanned Shops */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Top Scanned Shops
          </h2>

          <ul className="space-y-3 text-sm text-gray-700">
            <li className="flex justify-between">
              <span>Food Plaza</span>
              <span className="font-medium">1,250 scans</span>
            </li>
            <li className="flex justify-between">
              <span>Cafe Delight</span>
              <span className="font-medium">980 scans</span>
            </li>
            <li className="flex justify-between">
              <span>Urban Tadka</span>
              <span className="font-medium">740 scans</span>
            </li>
          </ul>
        </div>

        {/* 🔔 Admin Notifications (NEW) */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">
            Notifications
          </h2>

          <ul className="space-y-4 text-sm text-gray-700">
            <li className="border-l-4 border-blue-500 pl-3">
              <p className="font-medium">Menu Update Issue</p>
              <p className="text-gray-500">
                Food Plaza owner reported a menu update problem.
              </p>
            </li>

            <li className="border-l-4 border-yellow-500 pl-3">
              <p className="font-medium">Payment Query</p>
              <p className="text-gray-500">
                Cafe Delight asked about subscription charges.
              </p>
            </li>

            <li className="border-l-4 border-red-500 pl-3">
              <p className="font-medium">QR Not Working</p>
              <p className="text-gray-500">
                Spice Hub reported QR scan issue.
              </p>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
};

const Stat = ({ title, value }) => (
  <div className="bg-white p-6 rounded-xl shadow">
    <p className="text-gray-500 text-sm">{title}</p>
    <h3 className="text-2xl font-bold mt-1">{value}</h3>
  </div>
);

export default Dashboard;
