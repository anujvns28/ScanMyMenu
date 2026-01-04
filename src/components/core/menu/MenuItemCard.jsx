const MenuItemCard = ({ item }) => {
  const hasDiscount =
    item.discountPrice && item.discountPrice < item.price;

  const isVeg = item.tags?.some((tag) => tag.slug === "veg");
  const isSpicy = item.tags?.some((tag) => tag.slug === "spicy");
  const isBestseller = item.tags?.some((tag) => tag.slug === "bestseller");

  return (
    <div className="rounded-2xl bg-white shadow-sm hover:shadow-lg transition overflow-hidden border border-gray-100">
      {/* IMAGE */}
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />

        {/* Dark Gradient */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />

        {/* Today Special */}
        {item.isTodaySpecial && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
            🔥 Today’s Special
          </span>
        )}

        {/* Bestseller */}
        {isBestseller && (
          <span className="absolute top-12 left-3 bg-yellow-400 text-black text-[10px] font-semibold px-2 py-0.5 rounded-full shadow">
            ⭐ Bestseller
          </span>
        )}

        {/* Veg / Non Veg */}
        <span
          className={`absolute top-3 right-3 w-4 h-4 border rounded-sm grid place-items-center text-[10px] font-bold
          ${
            isVeg
              ? "border-green-700 text-green-700 bg-white/80"
              : "border-red-700 text-red-700 bg-white/80"
          }`}
        >
          •
        </span>

        {/* Price */}
        <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full shadow text-sm font-bold">
          ₹{hasDiscount ? item.discountPrice : item.price}
        </div>

        {/* Tags */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          {item.tags?.slice(0, 2).map((tag) => (
            <span
              key={tag._id}
              className={`px-2 py-[2px] text-[10px] font-semibold rounded-full bg-${tag.color}-100 text-${tag.color}-700`}
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-1">
        <div className="flex justify-between items-start">
          <h2 className="text-base font-semibold text-gray-900">
            {item.name}
          </h2>

          {hasDiscount && (
            <span className="text-xs line-through text-gray-400">
              ₹{item.price}
            </span>
          )}
        </div>

        <p className="text-[12px] text-gray-500 leading-relaxed line-clamp-2">
          {item.description}
        </p>

        {/* Meta */}
        <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
          <div className="flex gap-3">
            <span>⏱ {item.preparationTime} min</span>
            <span>⭐ {item.rating || "New"}</span>
          </div>

          {item.orderCount > 10 && (
            <span className="text-orange-600 font-semibold">
              Popular
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;
