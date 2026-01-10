import { X } from "lucide-react";

const GoogleLoginSheet = ({
  open,
  onClose,
  onGoogleLogin,
  purpose = "review", // "review" | "order"
}) => {
  if (!open) return null;

  const content = {
    review: {
      title: "Continue to submit review",
      subtitle:
        "Sign in to share your experience and help others discover great food.",
      icon: "⭐",
    },
    order: {
      title: "Continue to place order",
      subtitle:
        "Sign in to confirm your order and get live updates on your food.",
      icon: "🛒",
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Sheet */}
      <div className="relative w-full max-w-md bg-white rounded-t-3xl shadow-2xl animate-slide-up">

        {/* Handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mt-3 mb-2"></div>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-100"
        >
          <X size={18} />
        </button>

        {/* Content */}
        <div className="p-6 space-y-6 text-center">
          
          <div className="text-3xl">{content[purpose].icon}</div>

          <h2 className="text-xl font-bold">
            {content[purpose].title}
          </h2>

          <p className="text-sm text-gray-500">
            {content[purpose].subtitle}
          </p>

          {/* Google Button */}
          <button
            onClick={onGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-xl shadow-sm hover:bg-gray-50 transition"
          >
            <img
              src="https://developers.google.com/identity/images/g-logo.png"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="font-semibold text-gray-700">
              Continue with Google
            </span>
          </button>

          <p className="text-xs text-gray-400">
            We’ll use your Google profile to keep your orders and reviews safe.
          </p>
        </div>
      </div>
    </div>
  );
};

export default GoogleLoginSheet;
