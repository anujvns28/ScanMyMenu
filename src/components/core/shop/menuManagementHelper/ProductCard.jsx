import React from "react";
import { colorClasses } from "../../../../utils/data";

const ProductCard = ({item,i,handleClick}) => {
  return (
    <div
      key={i}
      className={`rounded-2xl overflow-hidden transition cursor-pointer bg-white
      ${!item.isAvailable ? "opacity-60" : "hover:shadow-xl"}`}
      onClick={() => handleClick(item)}
    >
      {/* IMAGE */}
      <div className="relative w-full h-52">
        <img
          src={item.image}
          alt={item.name}
          className={`w-full h-full object-cover ${
            !item.isAvailable ? "grayscale" : ""
          }`}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        {/* Availability */}
        <span
          className={`absolute top-3 left-3 text-xs px-2 py-0.5 rounded-full text-white
          ${item.isAvailable ? "bg-green-600" : "bg-gray-700"}`}
        >
          {item.isAvailable ? "Available" : "Out of Stock"}
        </span>

        {/* Today Special */}
        {item.isTodaySpecial && (
          <span className="absolute top-3 right-3 bg-yellow-400 text-black text-xs px-2 py-0.5 rounded-full font-semibold">
            ⭐ Today’s Special
          </span>
        )}

        {/* Rating + Reviews (FOCUS) */}
        <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
          ⭐ {item.rating || 0}
          <span className="text-gray-300">({item.reviewsCount || 0})</span>
        </div>

        {/* Name + Price + Time */}
        <div className="absolute bottom-3 left-3 right-16 text-white space-y-1">
          <h3 className="font-semibold text-sm leading-tight">{item.name}</h3>

          <div className="flex items-center justify-between text-xs">
            <div className="flex gap-2 items-center">
              <span className="font-semibold text-green-400">
                ₹{item.price}
              </span>
              {item.discountPrice > 0 && (
                <span className="line-through text-gray-300">
                  ₹{item.discountPrice}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT (MINIMAL) */}
      <div className="p-3 space-y-2">
        {/* Description */}
        <p className="text-xs text-gray-600 line-clamp-2">{item.description}</p>

        {/* Tags */}
        {item.tags?.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {item.tags.map((tag) => (
              <span
                key={tag._id}
                className={`text-xs ${
                  colorClasses[tag.color]
                } px-2 py-0.5 rounded-full`}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
