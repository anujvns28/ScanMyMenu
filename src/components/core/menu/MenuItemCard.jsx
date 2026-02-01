import { Star, Flame, Heart, Clock } from "lucide-react";
import { colorClasses } from "../../../utils/data";
import { useCart } from "../../../context/CartContext";

const MenuItemCard = ({ item }) => {
  const { addProductToCart } = useCart();

  return (
    <div className="relative bg-white rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Not Available */}
      {!item.isAvailable && (
        <div className="absolute inset-0 bg-black/60 z-30 flex items-center justify-center">
          <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-md">
            Not Available
          </span>
        </div>
      )}

      {/* IMAGE */}
      <div className="relative h-60">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />

        {/* Strong Gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute top-3 left-3 flex items-center gap-2 z-20">
  {/* Rating Badge */}
  <div className="flex items-center gap-1 bg-white text-black px-2.5 py-1 rounded-full shadow-md">
    <Star size={12} className="text-yellow-500 fill-yellow-500" />
    <span className="text-xs font-bold">{item.rating}</span>
  </div>

  {/* Review Count */}
  {item.reviewsCount > 0 && (
    <span className="text-[11px] text-white font-medium bg-black/50 px-2 py-1 rounded-full">
      {item.reviewsCount} reviews
    </span>
  )}
</div>



        {/* CONTENT ON IMAGE */}
        <div className="absolute bottom-3 left-3 right-3 space-y-1">
          {/* Name */}
          <h3 className="text-white font-semibold text-base leading-tight line-clamp-1">
            {item.name}
          </h3>

          {/* Description */}
          <p className="text-[11px] text-gray-200 line-clamp-2">
            {item.description || "Chef special preparation"}
          </p>

          {/* Tags + Time */}
          <div className="flex flex-wrap gap-1">
            {item.tags?.slice(0, 5).map((tag, i) => (
              <span
                key={i}
                className={`px-2 py-0.5 text-[9px] rounded-full font-medium
                ${colorClasses[tag.color || "blue"]}`}
              >
                {tag.name}
              </span>
            ))}

            <span className="px-2 py-0.5 text-[9px] rounded-full bg-black/50 text-white flex items-center gap-1">
              <Clock size={9} /> {item.preparationTime}m
            </span>
          </div>

          {/* Price + Add */}
          {item.isAvailable && (
            <div className="flex items-center justify-between pt-1">
              <div>
                <p className="text-white font-bold text-lg">₹{item.price}</p>
                {item.discountPrice && (
                  <p className="text-[10px] line-through text-gray-300">
                    ₹{item.discountPrice}
                  </p>
                )}
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addProductToCart(item);
                }}
                className="px-4 py-1.5 text-xs font-semibold rounded-full
                bg-green-600 text-white hover:bg-green-700 transition"
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
