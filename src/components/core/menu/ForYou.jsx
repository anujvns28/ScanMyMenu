import React from "react";

/* ------------------ Dummy Products (Food style) ------------------ */
const dummyForYouProducts = [
  {
    _id: "1",
    name: "Butter Chicken",
    image:
      "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.8,
    reviewsCount: 420,
    orderCount: 850,
    price: 299,
    discountPrice: 249,
    isTodaySpecial: true,
    tags: [
      { name: "Bestseller", color: "yellow" },
      { name: "Spicy", color: "red" },
    ],
  },
  {
    _id: "2",
    name: "Paneer Tikka Masala",
    image:
      "https://images.pexels.com/photos/461377/pexels-photo-461377.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.7,
    reviewsCount: 380,
    orderCount: 690,
    price: 259,
    tags: [
      { name: "Veg", color: "green" },
      { name: "Bestseller", color: "yellow" },
    ],
  },
  {
    _id: "3",
    name: "Veg Fried Rice",
    image:
      "https://images.pexels.com/photos/357756/pexels-photo-357756.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.5,
    reviewsCount: 320,
    orderCount: 580,
    price: 199,
    discountPrice: 179,
    tags: [{ name: "Veg", color: "green" }],
  },
  {
    _id: "4",
    name: "Spicy Chicken Wings",
    image:
      "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.6,
    reviewsCount: 350,
    orderCount: 630,
    price: 289,
    tags: [{ name: "Spicy", color: "red" }],
  },
  {
    _id: "5",
    name: "Cheese Burst Pizza",
    image:
      "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=800",
    rating: 4.9,
    reviewsCount: 480,
    orderCount: 920,
    price: 399,
    discountPrice: 349,
    tags: [{ name: "Bestseller", color: "yellow" }],
  },
];

const offers = [
  {
    _id: "1",
    title: "Family Combo",
    subtitle: "2 Biryani + 2 Cold Drink",
    priceText: "Only ₹499",
    image: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
  },
  {
    _id: "2",
    title: "Paneer Feast",
    subtitle: "Paneer Tikka + Butter Naan",
    priceText: "Save ₹80",
    image: "https://images.pexels.com/photos/461377/pexels-photo-461377.jpeg",
  },
];

/* ------------------ Smart Logic ------------------ */
const score = (p) => p.rating * 2 + p.orderCount * 0.3 + p.reviewsCount * 0.5;

const sorted = [...dummyForYouProducts].sort((a, b) => score(b) - score(a));

const mustTry = sorted[0];
const loved = sorted.filter((p) => p.rating >= 4.6);
const trending = [...sorted].sort((a, b) => b.orderCount - a.orderCount);
const deals = sorted.filter((p) => p.discountPrice);

const ForYou = () => {
  return (
    <div className="space-y-10">
      {/* 🔥 Must Try Hero */}
      {mustTry && (
        <div className="space-y-3">
          {/* Section Header */}
          <div>
            <h2 className="text-lg font-bold">Best of this Restaurant</h2>
            <p className="text-sm text-gray-500">
              Most loved dish by customers
            </p>
          </div>

          {/* Hero Card */}
          <div className="relative rounded-3xl overflow-hidden shadow-xl">
            <img
              src={mustTry.image}
              alt={mustTry.name}
              className="w-full h-64 object-cover"
            />

            {/* Soft gradient for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Food info */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <h2 className="text-2xl font-bold">{mustTry.name}</h2>

              <p className="text-xs mt-1 text-gray-200">
                ⭐ {mustTry.rating} • {mustTry.reviewsCount} reviews •{" "}
                {mustTry.orderCount} orders
              </p>

              <div className="flex gap-2 mt-2">
                {mustTry.tags.map((tag) => (
                  <span
                    key={tag.name}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold bg-${tag.color}-100 text-${tag.color}-700`}
                  >
                    {tag.name}
                  </span>
                ))}
              </div>

              <div className="mt-3 flex items-center gap-3 text-lg font-bold">
                ₹{mustTry.discountPrice || mustTry.price}
                {mustTry.discountPrice && (
                  <span className="text-sm line-through opacity-70">
                    ₹{mustTry.price}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ⭐ Loved by Customers */}
      <section>
        <div className="flex items-center justify-between">
  <h3 className="text-base font-semibold">⭐ Loved by Customers</h3>
  <button
    onClick={() => navigate("/menu/top-rated")}
    className="text-xs text-blue-600 font-medium"
  >
    View all
  </button>
</div>

        <p className="text-xs text-gray-500 mb-3">
          Top rated dishes from this restaurant
        </p>

        <div className="grid grid-cols-2 gap-4">
          {loved.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-28 object-cover"
              />

              <div className="p-3">
                <p className="font-semibold text-sm">{item.name}</p>

                {/* Rating */}
                <p className="text-[11px] text-gray-600 mt-0.5">
                  ⭐ {item.rating} • {item.reviewsCount} reviews
                </p>

                {/* Category */}
                <p className="text-[10px] text-gray-500 mt-0.5">
                  {item.categoryName || "Main Course"}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag.name}
                      className={`text-[9px] px-2 py-px rounded-full bg-${tag.color}-100 text-${tag.color}-700`}
                    >
                      {tag.name}
                    </span>
                  ))}
                </div>

                {/* Popular badge */}
                {item.orderCount > 500 && (
                  <p className="text-[10px] text-orange-600 mt-2">
                    🔥 Popular choice
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 👨‍🍳 Chef’s Special */}
      <section>
        <h3 className="text-base font-semibold">👨‍🍳 Chef’s Special</h3>
        <p className="text-xs text-gray-500 mb-3">
          Today’s special dishes recommended by the restaurant
        </p>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {dummyForYouProducts.map((item) => (
            <div
              key={item._id}
              className="min-w-40 bg-white rounded-xl shadow-md"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-28 object-cover rounded-t-xl"
              />

              <div className="p-2">
                <p className="font-semibold text-sm">{item.name}</p>

                <p className="text-[11px] text-gray-600 mt-0.5">
                  ⭐ {item.rating} • {item.reviewsCount} reviews
                </p>

                <p className="text-xs text-green-600 mt-1">
                  👨‍🍳 Today’s Special
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🎁 Offers & Combos */}
      <section>
        <h3 className="text-base font-semibold">🎁 Offers & Combos</h3>
        <p className="text-xs text-gray-500 mb-3">
          Special offers from this restaurant
        </p>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {offers.map((offer) => (
            <div
              key={offer._id}
              className="min-w-[260px] rounded-2xl overflow-hidden shadow-lg relative"
            >
              {/* Background Image */}
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-40 object-cover"
              />

              {/* Dark overlay */}
              <div className="absolute inset-0 bg-black/50" />

              {/* Poster Content */}
              <div className="absolute inset-0 p-4 flex flex-col justify-between text-white">
                <div>
                  <p className="text-xs uppercase tracking-wide text-yellow-300">
                    Limited Time Offer
                  </p>
                  <h4 className="text-lg font-bold mt-1">{offer.title}</h4>
                  <p className="text-xs mt-1 text-gray-200">{offer.subtitle}</p>
                </div>

                <div>
                  <p className="text-lg font-bold">{offer.priceText}</p>
                  <button className="mt-2 bg-yellow-400 text-black px-4 py-1.5 rounded-full text-xs font-semibold">
                    View Offer
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default ForYou;
