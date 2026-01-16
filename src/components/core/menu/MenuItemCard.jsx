import { Star, Flame, Heart, Clock, Plus, Minus } from "lucide-react";
import { useState } from "react";
import { colorClasses } from "../../../utils/data";

const MenuItemCard = ({ item }) => {
  const [qty, setQty] = useState(0);

  return (
    <div className="relative bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden">
      {/* ❌ Not Available */}
      {!item.isAvailable && (
        <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center">
          <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-md">
            Not Available
          </span>
        </div>
      )}

      {/* IMAGE */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* Rating */}
        <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-0.5 rounded-md text-[10px] flex items-center gap-1">
          <Star size={10} /> {item.rating}
        </div>

        {/* Wishlist */}
        <button className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">
          <Heart size={14} className="text-gray-700" />
        </button>

        {/* Name & Tags */}
        <div className="absolute bottom-2 left-2 right-2">
          <h3 className="text-white font-semibold text-sm leading-tight line-clamp-1">
            {item.name}
          </h3>

          <div className="flex flex-wrap gap-1 mt-1">
            {item.tags?.slice(0).map((tag, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 text-[9px] rounded-full flex items-center gap-1 font-medium shadow-sm
                ${colorClasses[tag.color || "blue"]}`}
              >
                <Flame size={9} />
                {tag.name}
              </span>
            ))}

            <span className="px-2 py-0.5 text-[9px] rounded-full bg-black/50 text-white flex items-center gap-1">
              <Clock size={9} />
              {item.preparationTime}m
            </span>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-3 space-y-1.5">
        <p className="text-[11px] text-gray-500 line-clamp-1">
          {item.description || "Chef special preparation"}
        </p>

        <div className="flex items-center justify-between">
          {/* Price + Time */}
          <div>
            <p className="font-bold text-gray-900 text-sm">₹{item.price}</p>

            {item.discountPrice && (
              <p className="text-[10px] line-through text-gray-400">
                ₹{item.discountPrice}
              </p>
            )}
          </div>

          {/* ADD Button */}
          {item.isAvailable && (
            <div>
              <button
                onClick={() => setQty(1)}
                className="px-4 py-1.5 border border-green-600 text-green-700 text-xs font-semibold rounded-lg bg-green-50 hover:bg-green-100"
              >
                ADD
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
