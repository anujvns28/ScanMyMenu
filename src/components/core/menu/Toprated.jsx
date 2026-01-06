import React, { useState } from "react";

/* Dummy data – later API se ayega */
const topRatedItems = [
  {
    _id: "1",
    name: "Butter Chicken",
    rating: 4.8,
    reviewsCount: 420,
    price: 299,
    image:
      "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
    tags: ["Spicy", "Bestseller"],
  },
  {
    _id: "2",
    name: "Paneer Tikka Masala",
    rating: 4.7,
    reviewsCount: 380,
    price: 259,
    image:
      "https://images.pexels.com/photos/461377/pexels-photo-461377.jpeg",
    tags: ["Veg", "Bestseller"],
  },
  {
    _id: "3",
    name: "Cheese Burst Pizza",
    rating: 4.9,
    reviewsCount: 480,
    price: 399,
    image:
      "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg",
    tags: ["Bestseller"],
  },
];

const filters = ["All", "Veg", "Spicy", "Bestseller"];

const TopRated = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? topRatedItems
      : topRatedItems.filter((i) =>
          i.tags.includes(activeFilter)
        );

  return (
    <div className="min-h-screen bg-gray-50 pb-20">

      {/* Header */}
      <div className="sticky top-0 bg-white z-10 p-4 border-b">
        <h1 className="text-xl font-bold">Top Rated</h1>
        <p className="text-sm text-gray-500">
          Most loved dishes by customers
        </p>

        {/* Filters */}
        <div className="flex gap-2 mt-3 overflow-x-auto">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap
              ${
                activeFilter === f
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {f}
            </button>
          ))}

          
        </div>

              <div className="mt-3 relative">
  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
    🔍
  </span>

  <input
    type="text"
    placeholder="Search dishes..."
    className="w-full pl-10 pr-4 py-2.5 rounded-full bg-gray-100 text-sm
               focus:outline-none focus:ring-2 focus:ring-black/10 shadow-sm"
  />
</div>
      </div>




      {/* Top Rated List */}
      <div className="p-4 space-y-4">
        {filtered.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-2xl shadow flex overflow-hidden"
          >
            {/* Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-cover"
            />

            {/* Info */}
            <div className="flex-1 p-3">
              <p className="font-semibold text-sm">
                {item.name}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                ⭐ {item.rating} • {item.reviewsCount} reviews
              </p>

              <div className="flex gap-1 mt-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] px-2 py-px rounded-full bg-gray-100 text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="p-3 flex flex-col justify-between items-end">
              <p className="font-bold text-sm">
                ₹{item.price}
              </p>

              <button className="text-xs bg-black text-white px-3 py-1 rounded-full">
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopRated;
