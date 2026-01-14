import { Minus, Plus, X, ChefHat, Clock } from "lucide-react";
import { useCart } from "../../../../context/CartContext";
import { useSelector } from "react-redux";
import GoogleLoginSheet from "../../../common/GoogleLoginSheet";
import { useState } from "react";
import OrderDetailsBottomSheet from "./OrderDetailsBottomSheet";

export default function CartBottomSheet({ onClose, currCategory }) {
  const { cart, increaseQty, decreaseQty, totalPrice, totalItems } = useCart();
  const { token } = useSelector((state) => state.auth);
  const { shopDetails } = useSelector((state) => state.shop);

  const [showGoogleLogin, setShowGoogleLogin] = useState(false);
  const [showOderDetailSheet, setShowOderDetailSheet] = useState(false);

  const gst = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + gst;

  if (totalItems === 0) return null;

  const handleOder = () => {
    if (!token) {
      const intent = {
        action: "PLACE_ORDER",
        shopId: shopDetails._id,
        categoryId: currCategory,
        payload: {
          cart: cart.map((item) => ({
            productId: item._id,
            name: item.name,
            price: item.price,
            qty: item.qty,
            image: item.image,
          })),
          subtotal: totalPrice,
          gst,
          total: grandTotal,
        },
      };

      localStorage.setItem("LOGIN_INTENT", JSON.stringify(intent));
      setShowGoogleLogin(true);
      return;
    }

    setShowOderDetailSheet(true);
  };

  const googleLogin = () => {
    window.location.href = `http://localhost:4000/auth/user/google?shopId=${shopDetails._id}`;
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-100 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[92vh] flex flex-col animate-slideUp">
        {/* Handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3" />

        {/* Header */}
        <div className="flex justify-between items-center px-4 pb-2 border-b">
          <div>
            <h2 className="text-lg font-bold">Your Order</h2>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
              <ChefHat size={14} />
              Your order will go directly to the kitchen
            </p>
            <p className="text-xs text-gray-400 flex items-center gap-1 mt-1">
              <Clock size={13} />
              Usually ready in 15–20 minutes
            </p>
          </div>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {cart.map((item) => (
            <div key={item._id} className="flex gap-3 items-center">
              <img
                src={item.image}
                className="w-16 h-16 rounded-xl object-cover"
              />

              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">₹{item.price}</p>
              </div>

              <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-2 py-1">
                <button onClick={() => decreaseQty(item._id)}>
                  <Minus size={16} />
                </button>
                <span className="font-semibold w-6 text-center">
                  {item.qty}
                </span>
                <button onClick={() => increaseQty(item._id)}>
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bill */}
        <div className="px-4 py-3 border-t space-y-2 text-sm">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>GST & Charges</span>
            <span>₹{gst}</span>
          </div>
          <div className="flex justify-between text-green-600 text-xs mt-1">
            <span>💸 Best price in this restaurant</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-4 border-t bg-white space-y-2">
          <p className="text-xs text-gray-500 text-center">
            You're just one step away from placing your order
          </p>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">{totalItems} items</p>
              <p className="text-lg font-bold">₹{grandTotal}</p>
            </div>

            <button
              onClick={handleOder}
              className="bg-black text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg"
            >
              Proceed to Order
            </button>
          </div>
        </div>

        {/* Google Login */}
        <GoogleLoginSheet
          open={showGoogleLogin}
          onClose={() => setShowGoogleLogin(false)}
          purpose="order"
          onGoogleLogin={googleLogin}
        />

        {/* Order Details */}
        {showOderDetailSheet && (
          <OrderDetailsBottomSheet
            onEditCart={() => setShowOderDetailSheet(false)}
            onClose={() => setShowOderDetailSheet(false)}
          />
        )}
      </div>
    </div>
  );
}
