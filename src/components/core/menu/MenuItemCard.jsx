import { Star, Flame, Heart, Clock, Plus, Minus } from "lucide-react";
import { useState } from "react";

const MenuItemCard = ({ item }) => {
  const [qty, setQty] = useState(0);

  return (
    <div className="relative bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition group">
      {/* ❌ Not Available Overlay */}
      {!item.isAvailable && (
        <div className="absolute inset-0 bg-black/60 z-20 flex items-center justify-center">
          <span className="px-4 py-2 bg-red-500 text-white text-sm font-semibold rounded-lg">
            Not Available
          </span>
        </div>
      )}

      {/* ================= IMAGE SECTION ================= */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-105 transition"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent"></div>

        {/* ⭐ Rating */}
        {true && (
          <div className="absolute top-3 left-3 bg-green-600 text-white px-2 py-1 rounded-lg text-xs flex items-center gap-1 z-10">
            <Star size={12} />
            4.5
          </div>
        )}

        {/* ❤️ Wishlist */}
        <button className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow z-10">
          <Heart size={16} className="text-gray-700" />
        </button>

        {/* 🟢 Veg / 🔴 Non-Veg */}
        <div className="absolute top-3 right-12 z-10">
          <div
            className={`w-4 h-4 rounded-full border-2 ${
              true
                ? "bg-green-500 border-green-700"
                : "bg-red-500 border-red-700"
            }`}
          ></div>
        </div>

        {/* 🔥 Bestseller / ⭐ Today Special */}
        {true && (
          <div className="absolute top-12 left-3 bg-orange-500 text-white px-2 py-0.5 rounded-lg text-[10px] font-semibold z-10">
            🔥 Bestseller
          </div>
        )}
        {true && (
          <div className="absolute top-12 left-3 bg-purple-600 text-white px-2 py-0.5 rounded-lg text-[10px] font-semibold z-10">
            ⭐ Today’s Special
          </div>
        )}

        {/* Name + Tags */}
        <div className="absolute bottom-3 left-3 right-3 z-10">
          <h3 className="text-white font-bold text-lg leading-tight drop-shadow">
            {item.name}
          </h3>

          <div className="flex flex-wrap gap-2 mt-1">
            {item.tags?.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] px-2 py-0.5 rounded-full bg-white/90 text-gray-800 flex items-center gap-1"
              >
                <Flame size={10} />
                {tag.name || tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ================= BOTTOM CONTENT ================= */}
      <div className="p-4 space-y-2">
        {/* Description */}
        <p className="text-xs text-gray-500 line-clamp-2 leading-snug">
          {item.description || "Delicious chef-style preparation"}
        </p>

        {/* Low Stock Alert */}
        {item.stock <= 5 && item.isAvailable && (
          <p className="text-[11px] text-red-500 font-semibold">
            Only {item.stock} left
          </p>
        )}

        {/* Price + Time */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-gray-900 text-lg">₹{item.price}</p>
            {item.discountPrice && (
              <p className="text-xs line-through text-gray-400">
                ₹{item.discountPrice}
              </p>
            )}
          </div>

          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Clock size={14} />
            {item.preparationTime} mins
          </div>
        </div>
      </div>

      {/* ================= ADD TO PLATE ================= */}
      {item.isAvailable && (
        <div className="px-4 pb-4">
          {qty === 0 ? (
            <button
              onClick={() => setQty(1)}
              className="w-full py-2 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700 transition"
            >
              ➕ Add to plate
            </button>
          ) : (
            <div className="flex items-center justify-between bg-gray-100 rounded-xl px-3 py-2">
              <button
                onClick={() => setQty(qty - 1)}
                className="p-1 rounded-full bg-white shadow"
              >
                <Minus size={16} />
              </button>

              <span className="font-semibold">{qty}</span>

              <button
                onClick={() => setQty(qty + 1)}
                className="p-1 rounded-full bg-white shadow"
              >
                <Plus size={16} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuItemCard;
