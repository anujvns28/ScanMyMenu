import { useEffect, useState } from "react";
import { Store, User, MapPin, Clock, Pencil } from "lucide-react";

const ShopProfile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [showSheet, setShowSheet] = useState(false);
  const [preview, setPreview] = useState(null);
  const [editSection, setEditSection] = useState(null);
  const [shop, setShop] = useState({});


  const handleCreateShop = () =>{
    
  }

  useEffect(() => {
    //fetch shop deatils
  
  }, []);

  if (Object.keys(shop).length!=0) {
    return (
      <div className="p-4 md:p-6 space-y-6 mt-10">
        {/* MAIN CREATE SHOP CARD */}
        <div className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-gray-800">
              Create Your Shop
            </h1>
            <p className="text-sm text-gray-500 max-w-xs mx-auto">
              Set up your digital menu in just a few minutes. No technical
              skills required.
            </p>
          </div>

          {/* Steps Container */}
          <div className="bg-gray-50 rounded-xl p-4 space-y-4">
            {/* Step 1 */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Store size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-800">Shop Image & Name</p>
                <p className="text-xs text-gray-500">
                  Upload your shop logo and enter shop name
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <User size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-800">Basic Information</p>
                <p className="text-xs text-gray-500">
                  Owner name and contact details
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <MapPin size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-800">Shop Address</p>
                <p className="text-xs text-gray-500">Area, city and pincode</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <Clock size={20} />
              </div>
              <div>
                <p className="font-medium text-gray-800">Shop Timing</p>
                <p className="text-xs text-gray-500">
                  Opening and closing time
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <button
              onClick={handleCreateShop}
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white py-3 rounded-xl font-semibold text-lg"
            >
              Start Creating Shop →
            </button>

            {/* Trust Line */}
            <div className="flex items-center justify-center gap-2 text-xs text-green-600 mt-2">
              <span className="w-2 h-2 bg-green-600 rounded-full"></span>
              Takes less than 2 minutes
            </div>

            {/* Helper Text */}
            <p className="text-xs text-center text-gray-400">
              You can edit all details later
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 space-y-6">
      {/*1 ===== HEADER ===== */}
      <div className="bg-white rounded-xl shadow p-4 flex items-center gap-4">
        {/*1  Logo  */}
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {!isEdit ? (
            <span className="text-sm text-gray-500">Logo</span>
          ) : (
            <input type="file" className="text-xs" />
          )}
        </div>

        {/*  Name + Location */}
        <div className="flex-1">
          {!isEdit ? (
            <>
              <h1 className="text-xl font-bold">{shop.name || "Your Shop Name" }</h1>
              <p className="text-sm text-gray-500">
                {shop.area || "area"}, {shop.city || "city"}
              </p>
            </>
          ) : (
            <input
              className="input"
              defaultValue={shop.name}
              placeholder="Shop Name"
            />
          )}
        </div>

        {/* Edit Button */}
        <button
          onClick={() => setShowSheet(true)}
          className="text-blue-600 text-sm font-medium"
        >
          Edit
        </button>
      </div>

      {/* ===== STEP 2 : BASIC INFORMATION ===== */}
      <div className="bg-white rounded-xl shadow p-4 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="font-semibold text-sm text-gray-800">
            Basic Information
          </h3>

          {editSection !== "basic" && (
            <button
              onClick={() => setEditSection("basic")}
              className="flex items-center gap-1 text-blue-600 text-sm font-medium"
            >
              Edit
            </button>
          )}
        </div>

        {/* View Mode */}
        {editSection !== "basic" ? (
          <div className="grid grid-cols-1 gap-2 text-sm">
            <p>
              <span className="text-gray-500">Owner</span>
              <br />
              <span className="font-medium text-gray-900">
                {shop?.owner || "Owner Name"}
              </span>
            </p>

            <p>
              <span className="text-gray-500">Mobile</span>
              <br />
              <span className="font-medium text-gray-900">
                {shop?.phone || "Mobile Number"}
              </span>
            </p>

            <p>
              <span className="text-gray-500">Email</span>
              <br />
              <span className="font-medium text-gray-900">
                {shop?.email || "Email Address"}
              </span>
            </p>
          </div>
        ) : (
          /* Edit Mode */
          <div className="space-y-2">
            <div className="">
              <label className="text-xs text-gray-500 ">Owner Name</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg
             text-sm text-gray-800 placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter owner name"
                defaultValue={shop?.owner || ""}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Mobile Number</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg
             text-sm text-gray-800 placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter mobile number"
                defaultValue={shop?.phone || ""}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500">Email Address</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg
             text-sm text-gray-800 placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
                defaultValue={shop?.email || ""}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setEditSection(null)}
                className="w-1/2 border border-gray-300 text-gray-700 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => setEditSection(null)}
                className="w-1/2 bg-blue-600 text-white py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===== STEP 3 : SHOP ADDRESS ===== */}
      <div className="bg-white rounded-xl shadow p-4 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="font-semibold text-sm text-gray-800">Shop Address</h3>

          {editSection !== "address" && (
            <button
              onClick={() => setEditSection("address")}
              className="flex items-center gap-1 text-blue-600 text-sm font-medium"
            >
              Edit
            </button>
          )}
        </div>

        {/* View Mode */}
        {editSection !== "address" ? (
          <div className="text-sm text-gray-700 leading-relaxed">
            <p className="text-gray-500">Address</p>
            <p className="font-medium">
              {shop?.area || "Area"}, {shop?.city || "City"} –{" "}
              {shop?.pincode || "Pincode"}
            </p>
          </div>
        ) : (
          /* Edit Mode */
          <div className="space-y-2">
            <div>
              <label className="text-xs text-gray-500 ">Area</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg
             text-sm text-gray-800 placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter area"
                defaultValue={shop?.area || ""}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 ">City</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg
             text-sm text-gray-800 placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter city"
                defaultValue={shop?.city || ""}
              />
            </div>

            <div>
              <label className="text-xs text-gray-500 ">Pincode</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg
             text-sm text-gray-800 placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter pincode"
                defaultValue={shop?.pincode || ""}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setEditSection(null)}
                className="w-1/2 border border-gray-300 text-gray-700 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => setEditSection(null)}
                className="w-1/2 bg-blue-600 text-white py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===== STEP 4 : SHOP TIMINGS ===== */}
      <div className="bg-white rounded-xl shadow p-4 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="font-semibold text-sm text-gray-800">Shop Timings</h3>

          {editSection !== "timing" && (
            <button
              onClick={() => setEditSection("timing")}
              className="flex items-center gap-1 text-blue-600 text-sm font-medium"
            >
              Edit
            </button>
          )}
        </div>

        {/* View Mode */}
        {editSection !== "timing" ? (
          <div className="text-sm">
            <p className="text-gray-500">Opening Hours</p>
            <p className="font-medium text-gray-900">
              {shop?.openTime || "10:00"} – {shop?.closeTime || "22:00"}
            </p>
          </div>
        ) : (
          /* Edit Mode */
          <div className="space-y-4">
            <div className="flex gap-4">
              <div>
                <label className="text-xs text-gray-500 block mb-2">
                  Opening Time
                </label>
                <input
                  type="time"
                  defaultValue={shop?.openTime || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg
             text-sm text-gray-800 placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-2">
                  Closing Time
                </label>
                <input
                  type="time"
                  defaultValue={shop?.closeTime || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg
             text-sm text-gray-800 placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setEditSection(null)}
                className="w-1/2 border border-gray-300 text-gray-700 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={() => setEditSection(null)}
                className="w-1/2 bg-blue-600 text-white py-2 rounded-lg"
              >
                Save
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ===== MENU QR CODE ===== */}
      {!shop && (
        <div className="bg-white rounded-xl shadow p-4 text-center">
          <h2 className="font-semibold mb-2">Menu QR Code</h2>

          <div className="w-40 h-40 mx-auto my-4 bg-gray-100 flex items-center justify-center rounded-lg">
            QR
          </div>

          <p className="text-sm text-gray-500 mb-3">
            Customers scan this QR to view your menu
          </p>

          <button className="w-full bg-green-600 text-white py-2 rounded-lg">
            Download QR
          </button>
        </div>
      )}


      {/* ===== BOTTOM SHEET ===== */}
      {showSheet && (
        <div className="fixed inset-0 z-50 bottom-16">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setShowSheet(false)}
          />

          {/* Sheet */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl p-5 animate-slideUp">
            <h2 className="text-lg font-semibold mb-4">Edit Shop Details</h2>

            {/* Image Preview */}
            <div className="flex flex-col items-center gap-3 mb-4">
              <div className="w-32 h-32 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center">
                {preview ? (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-sm text-gray-500">Logo</span>
                )}
              </div>

              <label className="text-blue-600 text-sm cursor-pointer">
                Change Photo
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                    }
                  }}
                />
              </label>
            </div>

            {/* Shop Name */}
            <div className="mb-5">
              <label className="text-sm text-gray-600">Shop Name</label>
              <input
                className="input mt-1"
                value={shop.name}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowSheet(false)}
                className="w-1/2 border py-2 rounded-lg"
              >
                Cancel
              </button>
              <button className="w-1/2 bg-blue-600 text-white py-2 rounded-lg">
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShopProfile;




