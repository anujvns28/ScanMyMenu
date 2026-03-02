import React from "react";
import { useCart } from "../../../../context/CartContext";
import { colorClasses } from "../../../../utils/data";

const ChefSpecialCard = ({item,handleClick}) => {
    const {addProductToCart} = useCart();

  return (
    <div
      onClick={() => handleClick(item._id)}
      key={item._id}
      className="min-w-44 bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden"
    >
      {/* IMAGE AREA */}
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-28 object-cover"
        />

        {/* Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

        {/* PRICE (TOP-LEFT) */}
        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur text-white px-2 py-1 rounded-lg">
          <span className="text-xs font-bold">
            ₹{item.discountPrice || item.price}
          </span>

          {item.discountPrice && (
            <span className="ml-1 text-[10px] line-through opacity-70">
              ₹{item.price}
            </span>
          )}
        </div>

        {/* ADD BUTTON (BOTTOM-RIGHT) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            addProductToCart(item);
          }}
          className="absolute bottom-2 right-2 bg-white/95 backdrop-blur text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md active:scale-95 transition"
        >
          Add +
        </button>

        {/* TODAY'S SPECIAL BADGE */}
        <span className="absolute bottom-2 left-2 bg-green-600 text-white text-[10px] px-2 py-0.5 rounded-full font-medium">
          👨‍🍳 Today’s Special
        </span>
      </div>

      {/* CONTENT */}
      <div className="p-2 space-y-1">
        <p className="font-semibold text-sm line-clamp-1">{item.name}</p>

        <p className="text-[11px] text-gray-600">
          ⭐ {item.rating} • {item.reviewsCount} reviews
        </p>

        {/* TAGS (MAX 2) */}
        <div className="flex flex-wrap gap-1 mt-1">
          {item.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag._id || tag.name}
              className={`text-[9px] px-2 py-px rounded-full font-medium ${
                colorClasses[tag.color]
              }`}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChefSpecialCard);
