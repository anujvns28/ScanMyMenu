import { useState } from "react";
import { X, ChevronRight, Camera, Trash2 } from "lucide-react";

export default function OrderRatingFlow({ onClose }) {
  const [step, setStep] = useState(0);

  const [orderRating, setOrderRating] = useState(0);
  const [orderComment, setOrderComment] = useState("");

  const [productRatings, setProductRatings] = useState({});
  const [productComments, setProductComments] = useState({});
  const [productImages, setProductImages] = useState({});

  // 🔥 Dummy ordered products
  const products = [
    {
      id: 1,
      name: "Butter Chicken",
      image:
        "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    },
    {
      id: 2,
      name: "Garlic Naan",
      image:
        "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    },
    {
      id: 3,
      name: "Paneer Tikka",
      image:
        "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    },
  ];

  const currentProduct = products[step - 1];

  const renderStars = (value, onChange) => (
    <div className="flex justify-center gap-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className={`text-5xl transition-transform ${
            star <= value
              ? "text-yellow-400 scale-110 drop-shadow"
              : "text-gray-300"
          }`}
        >
          ★
        </button>
      ))}
    </div>
  );

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setProductImages({
      ...productImages,
      [currentProduct.id]: [
        ...(productImages[currentProduct.id] || []),
        ...files,
      ],
    });
  };

  const removeImage = (idx) => {
    const updated = [...(productImages[currentProduct.id] || [])];
    updated.splice(idx, 1);

    setProductImages({
      ...productImages,
      [currentProduct.id]: updated,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-3xl h-[78vh] p-6 animate-slideUp overflow-y-auto shadow-2xl">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <p className="font-bold text-xl">
            {step === 0
              ? "Rate your experience"
              : `Rate ${currentProduct?.name}`}
          </p>
          <X onClick={onClose} />
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all"
              style={{
                width:
                  step === 0
                    ? "30%"
                    : step <= products.length
                    ? `${30 + (step / products.length) * 60}%`
                    : "100%",
              }}
            />
          </div>
          <p className="text-[11px] text-gray-400 mt-2 text-center">
            {step === 0
              ? "Overall experience"
              : `Rating item ${step} of ${products.length}`}
          </p>
        </div>

        {/* STEP 0 — Overall Order */}
        {step === 0 && (
          <div>
            <p className="text-gray-500 text-center mb-6">
              How was your experience with this restaurant?
            </p>

            {renderStars(orderRating, setOrderRating)}

            <textarea
              value={orderComment}
              onChange={(e) => setOrderComment(e.target.value)}
              placeholder="Tell us what you liked or what could be better..."
              className="w-full mt-6 border rounded-xl p-3 text-sm resize-none"
              rows={3}
            />

            <button
              disabled={!orderRating}
              onClick={() => setStep(1)}
              className="mt-8 w-full bg-black text-white py-4 rounded-xl font-semibold disabled:bg-gray-300"
            >
              Rate food items →
            </button>
          </div>
        )}

        {/* STEP 1+ — Product Reviews */}
        {step > 0 && step <= products.length && (
          <div className="flex flex-col items-center">

            {/* Product Card */}
            <div className="w-full bg-white rounded-3xl p-3 shadow-xl border mb-6">
              <img
                src={currentProduct.image}
                alt={currentProduct.name}
                className="w-full h-44 object-cover rounded-2xl"
              />
              <p className="mt-4 text-lg font-bold text-center">
                {currentProduct.name}
              </p>
            </div>

            {renderStars(
              productRatings[currentProduct.id] || 0,
              (value) =>
                setProductRatings({
                  ...productRatings,
                  [currentProduct.id]: value,
                })
            )}

            <textarea
              value={productComments[currentProduct.id] || ""}
              onChange={(e) =>
                setProductComments({
                  ...productComments,
                  [currentProduct.id]: e.target.value,
                })
              }
              placeholder={`Any feedback for ${currentProduct.name}?`}
              className="w-full mt-6 border rounded-xl p-3 text-sm resize-none"
              rows={3}
            />

            {/* Image Upload */}
            <div className="w-full mt-6">
              <label className="flex items-center justify-center gap-2 text-sm font-semibold cursor-pointer border rounded-xl py-3 bg-gray-50">
                <Camera size={18} />
                Add food photos
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleImageUpload}
                />
              </label>

              {/* Preview */}
              <div className="flex gap-3 mt-3 overflow-x-auto">
                {(productImages[currentProduct.id] || []).map((file, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt="food"
                      className="w-20 h-20 rounded-xl object-cover"
                    />
                    <button
                      onClick={() => removeImage(idx)}
                      className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              disabled={!productRatings[currentProduct.id]}
              onClick={() => {
                if (step < products.length) {
                  setStep(step + 1);
                } else {
                  console.log({
                    orderRating,
                    orderComment,
                    productRatings,
                    productComments,
                    productImages,
                  });
                  onClose();
                }
              }}
              className="mt-8 w-full bg-black text-white py-4 rounded-xl font-semibold flex justify-center items-center gap-2 disabled:bg-gray-300"
            >
              {step < products.length ? (
                <>
                  Next item <ChevronRight />
                </>
              ) : (
                "Submit reviews ✔"
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
