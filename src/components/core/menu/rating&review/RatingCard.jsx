import React from "react";
import { timeAgo } from "../../../../utils/convertTime";

const RatingCard = ({r,handleClick}) => {
  return (
    <div
      key={r._id}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-sm">
            {r.user.name.charAt(0)}
          </div>

          <div>
            <p className="text-sm font-semibold text-gray-800">{r.user.name}</p>
            <p className="text-[11px] text-gray-400">{timeAgo(r.createdAt)}</p>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-[2px] rounded-lg text-xs font-semibold">
          ⭐ {r.rating}
        </div>
      </div>

      <p className="text-sm text-gray-700 mt-3 leading-relaxed">
        {r.reviewText}
      </p>

      {/* Images */}
      {r.images?.length > 0 && (
        <div className="flex gap-2 overflow-x-auto">
          {r.images.map((img, i) => (
            <img
              key={i}
              src={img}
              onClick={() => handleClick(r,i)}
              className="w-24 h-24 rounded-xl object-cover cursor-pointer"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default React.memo(RatingCard);
