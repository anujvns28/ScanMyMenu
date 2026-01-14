import { useCart } from "../../../../context/CartContext";


export default function FloatingCartBar({ onOpen }) {
  const { totalItems, totalPrice } = useCart();

  if (totalItems === 0) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 z-50">
      <button
        onClick={onOpen}
        className="w-full bg-black text-white rounded-2xl px-4 py-3 flex items-center justify-between shadow-lg"
      >
        <div>
          <p className="text-sm font-semibold">
            {totalItems} items added
          </p>
          <p className="text-xs text-gray-300">
            ₹{totalPrice} • Taxes extra
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">
            View Cart
          </span>
          <div className="bg-white text-black rounded-full px-2 py-1 text-xs font-bold">
            →
          </div>
        </div>
      </button>
    </div>
  );
}
