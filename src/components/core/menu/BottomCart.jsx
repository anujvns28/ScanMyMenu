import { Minus, Plus, X } from "lucide-react";
import { useCart } from "../../../context/CartContext";

export default function CartBottomSheet({ onClose }) {
  const {
    cart,
    increaseQty,
    decreaseQty,
    totalPrice,
    totalItems,
  } = useCart();

  const gst = Math.round(totalPrice * 0.05);
  const grandTotal = totalPrice + gst;

  if (totalItems === 0) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-100 flex items-end">
      <div className="bg-white w-full rounded-t-3xl max-h-[90vh] flex flex-col animate-slideUp">

        {/* Handle */}
        <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto my-3" />

        {/* Header */}
        <div className="flex justify-between items-center px-4 pb-3 border-b">
          <h2 className="text-lg font-bold">Your Order</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-4">
          {cart.map((item) => (
            <div key={item._id || item.id} className="flex gap-3 items-center">
              <img
                src={item.image}
                className="w-16 h-16 rounded-xl object-cover"
              />

              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-sm text-gray-500">₹{item.price}</p>
              </div>

              <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-2 py-1">
                <button onClick={() => decreaseQty(item._id || item.id)}>
                  <Minus size={16} />
                </button>
                <span className="font-semibold w-6 text-center">
                  {item.qty}
                </span>
                <button onClick={() => increaseQty(item._id || item.id)}>
                  <Plus size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bill */}
        <div className="px-4 py-3 border-t space-y-2 text-sm text-gray-600">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>GST & Charges</span>
            <span>₹{gst}</span>
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-4 border-t flex items-center justify-between bg-white">
          <div>
            <p className="text-xs text-gray-500">
              {totalItems} items
            </p>
            <p className="text-lg font-bold">
              ₹{grandTotal}
            </p>
          </div>

          <button className="bg-black text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg">
            Proceed to Order
          </button>
        </div>
      </div>
    </div>
  );
}
