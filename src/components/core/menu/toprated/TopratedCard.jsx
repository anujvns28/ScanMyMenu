import React from "react";
import { useCart } from "../../../../context/CartContext";

const TopratedCard = ({item,handleClick,getRankByTab}) => {
    const {addProductToCart} = useCart();

  return (
    <div
      key={item._id}
      onClick={() => handleClick(item._id)}
      className="bg-white rounded-2xl shadow-sm hover:shadow-md transition flex overflow-hidden"
    >
      {/* Image + rank */}
      <div className="relative w-28 h-28 flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover rounded-l-2xl"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        <span
          className="absolute left-1 top-1 text-5xl font-extrabold 
      text-white select-none drop-shadow-lg"
        >
          #{getRankByTab(item)}
        </span>
      </div>

      {/* Info */}
      <div className="flex-1 p-4">
        <p className="font-medium text-sm">{item.name}</p>

        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-semibold text-green-700">
            ⭐ {item.rating}
          </span>
          <span className="text-xs text-gray-400">({item.reviewsCount})</span>
        </div>
      </div>

      {/* Price */}
      <div className="p-4 flex flex-col justify-between items-end">
        <p className="font-semibold text-sm">₹{item.price}</p>

        <button
          onClick={(e) => {
            e.stopPropagation();
            addProductToCart(item);
          }}
          className="text-xs px-4 py-1.5 rounded-full border border-black/80 font-medium hover:bg-black hover:text-white transition"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default React.memo(TopratedCard);
