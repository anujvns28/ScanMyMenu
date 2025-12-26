import { useEffect, useState } from "react";
import { Store, User, MapPin, Clock, Pencil, Loader } from "lucide-react";
import LoaderComponent from "../../common/LoaderComponent";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchMyShop,
  updateContactInfo,
  updateShopAddress,
  updateShopProfile,
  updateShopTiming,
} from "../../../service/operations/shop";
import { useNavigate } from "react-router-dom";

const ShopProfile = () => {
  const [editSection, setEditSection] = useState(null);
  const [shop, setShop] = useState({});
  const [currentStep, setCurrentStep] = useState("");
  const edit = ["shop", "basic", "address", "timing"];
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});

  const [shopForm, setShopForm] = useState({
    name: "",
    logo: null,
  });

  const [basicForm, setBasicForm] = useState({
    ownerName: "",
    phone: "",
    email: "",
  });

  const [addressForm, setAddressForm] = useState({
    area: "",
    city: "",
    pincode: "",
  });

  const [timingForm, setTimingForm] = useState({
    openTime: "",
    closeTime: "",
  });

  const { token, userLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCTAbutton = () => {
    setCurrentStep(1);
    setEditSection("shop");
  };

  const handleEditShop = async () => {
    let newErrors = {};
    if (editSection === edit[0]) {
      if (!shopForm.logo) newErrors.logo = "Shop photo is required";
      if (!shopForm.name) newErrors.name = "Shop name is required";
      if (Object.keys(newErrors).length === 0) {
        // make api call
        const result = await updateShopProfile(shopForm, token, dispatch);
        if (result) {
          console.log(result.data);
        }
        if (currentStep < 5) {
          setEditSection(edit[1]);
          setCurrentStep(2);
        }
      }
    } else if (editSection === edit[1]) {
      if (!basicForm.email) newErrors.email = "Email is required";
      if (!basicForm.ownerName) newErrors.ownerName = "Owner name is required";
      if (!basicForm.phone) newErrors.phone = "Phone number is required";

      if (Object.keys(newErrors).length === 0) {
        // make api call
        await updateContactInfo(basicForm, token, dispatch);
        if (currentStep < 5) {
          setEditSection(edit[2]);
          setCurrentStep(3);
        }
      }
    } else if (editSection === edit[2]) {
      if (!addressForm.area) newErrors.area = "Area is required";
      if (!addressForm.city) newErrors.city = "City is required";
      if (!addressForm.pincode) newErrors.pincode = "Pincode is required";

      if (Object.keys(newErrors).length === 0) {
        await updateShopAddress(addressForm, token, dispatch);
        if (currentStep < 5) {
          setEditSection(edit[3]);
          setCurrentStep(4);
        }
      }
    } else {
      if (!timingForm.closeTime) newErrors.closeTime = "Closeing time required";
      if (!timingForm.openTime) newErrors.openTime = "Open time required";

      if (Object.keys(newErrors).length === 0) {
        await updateShopTiming(timingForm, token, dispatch);
        if (currentStep < 5) {
          setEditSection(4);
          setCurrentStep(5);
        }
      }
    }

    setErrors(newErrors);
    if (currentStep > 5 && Object.keys(newErrors).length === 0) {
      setEditSection(null);
    }
    newErrors = {};
  };

  const fetchShopHandler = async () => {
    const result = await fetchMyShop(token, dispatch);

    if (result?.data) {
      console.log(result.data);
      setShop(result.data);
      if (result?.data?.shopProfile) {
        setShopForm(result.data.shopProfile);
      }
      if (result?.data?.contactInfo) {
        setBasicForm(result.data.contactInfo);
      }
      if (result?.data?.address) {
        setAddressForm(result.data.address);
      }
      if (result?.data?.timing) {
        setTimingForm(result.data.timing);
      }
      setCurrentStep(Number(result?.data?.status.creationStep) + 1);
      setEditSection(edit[Number(result?.data?.status.creationStep)]);
    } else {
      setCurrentStep(0);
    }
  };

  console.log(shop);

  useEffect(() => {
    fetchShopHandler();
  }, []);

  if (currentStep === 0) {
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
              onClick={handleCTAbutton}
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
          {shopForm.logo ? (
            <img src={shop?.shopProfile?.logo || preview} />
          ) : (
            <span className="text-sm text-gray-500">Logo</span>
          )}
        </div>

        {/*  Name + Location */}
        <div className="flex-1">
          {
            <>
              <h1 className="text-xl font-bold">
                {shop?.shopProfile?.name || shopForm?.name || "Your Shop Name"}
              </h1>
              <p className="text-sm text-gray-500">
                {addressForm.area || "area"}, {addressForm.city || "city"}
              </p>
            </>
          }
        </div>

        {/* Edit Button */}
        {currentStep > 4 && editSection !== "shop" && (
          <button
            onClick={() => setEditSection("shop")}
            className="flex items-center gap-1 text-blue-600 text-sm font-medium"
          >
            Edit
          </button>
        )}
      </div>

      {/* ===== STEP 2 : BASIC INFORMATION ===== */}
      <div className="bg-white rounded-xl shadow p-4 space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2">
          <h3 className="font-semibold text-sm text-gray-800">
            Basic Information
          </h3>

          {currentStep > 4 && editSection !== "basic" && (
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
                {shop?.contactInfo?.ownerName ||
                  basicForm?.ownerName ||
                  "Owner Name"}
              </span>
            </p>

            <p>
              <span className="text-gray-500">Mobile</span>
              <br />
              <span className="font-medium text-gray-900">
                {shop?.contactInfo?.phone ||
                  basicForm?.phone ||
                  "Mobile Number"}
              </span>
            </p>

            <p>
              <span className="text-gray-500">Email</span>
              <br />
              <span className="font-medium text-gray-900">
                {shop?.contactInfo?.email ||
                  basicForm?.email ||
                  "Email Address"}
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
                value={basicForm?.ownerName || ""}
                onChange={(e) => {
                  setBasicForm({ ...basicForm, ownerName: e.target.value });
                  setErrors({ ...errors, ownerName: "" });
                }}
              />
              {errors.ownerName && (
                <p className="text-red-500 text-xs mt-1">{errors.ownerName}</p>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-500">Mobile Number</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg
             text-sm text-gray-800 placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter mobile number"
                defaultValue={basicForm?.phone || ""}
                onChange={(e) => {
                  setBasicForm({ ...basicForm, phone: e.target.value });
                  setErrors({ ...errors, phone: "" });
                }}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-500">Email Address</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg
             text-sm text-gray-800 placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
                defaultValue={basicForm?.email || ""}
                onChange={(e) => {
                  setBasicForm({ ...basicForm, email: e.target.value });
                  setErrors({ ...errors, email: "" });
                }}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              {currentStep >= 5 && (
                <button
                  onClick={() => setEditSection(null)}
                  className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg"
                >
                  Cancel
                </button>
              )}

              <button
                onClick={handleEditShop}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
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

          {currentStep > 4 && editSection !== "address" && (
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
              {shop?.address?.area || addressForm?.area || "Area"},
              {shop?.address?.city || addressForm?.city || "City"} –{" "}
              {shop?.address?.pincode || addressForm?.pincode || "Pincode"}
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
                value={addressForm?.area || ""}
                onChange={(e) => {
                  setAddressForm({ ...addressForm, area: e.target.value });
                  setErrors({ ...errors, area: "" });
                }}
              />
              {errors.area && (
                <p className="text-red-500 text-xs mt-1">{errors.area}</p>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-500 ">City</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg
             text-sm text-gray-800 placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter city"
                value={addressForm?.city || ""}
                onChange={(e) => {
                  setAddressForm({ ...addressForm, city: e.target.value });
                  setErrors({ ...errors, city: "" });
                }}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>

            <div>
              <label className="text-xs text-gray-500 ">Pincode</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg
             text-sm text-gray-800 placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter pincode"
                value={addressForm?.pincode || ""}
                onChange={(e) => {
                  setAddressForm({ ...addressForm, pincode: e.target.value });
                  setErrors({ ...errors, pincode: "" });
                }}
              />
              {errors.pincode && (
                <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              {currentStep >= 5 && (
                <button
                  onClick={() => setEditSection(null)}
                  className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg"
                >
                  Cancel
                </button>
              )}

              <button
                onClick={handleEditShop}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
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

          {currentStep > 4 && editSection !== "timing" && (
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
              {timingForm?.openTime || "10:00"} –{" "}
              {timingForm?.closeTime || "22:00"}
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
                  value={timingForm?.openTime || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg
             text-sm text-gray-800 placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => {
                    setTimingForm({ ...timingForm, openTime: e.target.value });
                    setErrors({ ...errors, openTime: "" });
                  }}
                />
                {errors.openTime && (
                  <p className="text-red-500 text-xs mt-1">{errors.openTime}</p>
                )}
              </div>

              <div>
                <label className="text-xs text-gray-500 block mb-2">
                  Closing Time
                </label>
                <input
                  type="time"
                  value={timingForm?.closeTime || ""}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg
             text-sm text-gray-800 placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onChange={(e) => {
                    setTimingForm({ ...timingForm, closeTime: e.target.value });
                    setErrors({ ...errors, closeTime: "" });
                  }}
                />
                {errors.closeTime && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.closeTime}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-2">
              {currentStep >= 5 && (
                <button
                  onClick={() => setEditSection(null)}
                  className="w-full border border-gray-300 text-gray-700 py-2 rounded-lg"
                >
                  Cancel
                </button>
              )}

              <button
                onClick={handleEditShop}
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
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
      {editSection == "shop" && (
        <div className="fixed inset-0 z-50 bottom-16">
          <div className="absolute inset-0 bg-black/40" />

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
                ) : shopForm.logo ? (
                  <img src={shopForm?.logo} />
                ) : (
                  <span className="text-sm text-gray-500">Logo</span>
                )}
              </div>
              {errors.logo && (
                <p className="text-red-500 text-xs mt-1">{errors.logo}</p>
              )}

              <label className="text-blue-600 text-sm cursor-pointer">
                Change Photo
                <input
                  type="file"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      setPreview(URL.createObjectURL(file));
                      setShopForm({ ...shopForm, logo: file });
                      setErrors({ ...errors, logo: "" });
                    }
                  }}
                />
              </label>
            </div>

            {/* Shop Name */}
            <div className="mb-5">
              <label className="text-sm text-gray-600">Shop Name</label>
              <input
                className="w-full px-3 py-2 border border-gray-300 rounded-lg
             text-sm text-gray-800 placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-1"
                value={shopForm.name}
                onChange={(e) => {
                  setShopForm({ ...shopForm, name: e.target.value });
                  setErrors({ ...errors, name: "" });
                }}
                placeholder="Enter Shop Name"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 w-full">
              {currentStep >= 5 && (
                <button
                  onClick={() => {
                    setEditSection(null);
                  }}
                  className="w-full border py-2 rounded-lg"
                >
                  Cancel
                </button>
              )}
              <button
                className="w-full bg-blue-600 text-white py-2 rounded-lg"
                onClick={handleEditShop}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {currentStep >= 5 && (
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-5 rounded-xl shadow text-white text-center">
          <h3 className="text-lg font-semibold">
            Your shop profile is ready 🎉
          </h3>
          <p className="text-sm text-blue-100 mt-1">
            Now start adding food items to your digital menu
          </p>

          <button
            onClick={() => navigate(`/shop/menu`)}
            className="mt-4 w-full bg-white text-blue-600 py-3 rounded-xl font-bold"
          >
            Continue to Menu Setup →
          </button>
        </div>
      )}

      {userLoading && <LoaderComponent />}
    </div>
  );
};

export default ShopProfile;
