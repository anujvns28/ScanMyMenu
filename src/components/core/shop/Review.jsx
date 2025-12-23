import { useState } from "react";

const Reviews = () => {
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    {
      name: "Chicken Biryani",
      rating: 4.6,
      reviewsCount: 50,
      reviews: [
        { user: "Rahul", rating: 5, text: "Awesome taste!", time: "2 days ago" },
        { user: "Ankit", rating: 4, text: "Good quantity.", time: "1 week ago" },
        { user: "Rohit", rating: 5, text: "Loved it!", time: "3 days ago" },
        { user: "Aman", rating: 4, text: "Nice flavour.", time: "5 days ago" },
        { user: "Rahul", rating: 5, text: "Awesome taste!", time: "2 days ago" },
        { user: "Ankit", rating: 4, text: "Good quantity.", time: "1 week ago" },
        { user: "Rohit", rating: 5, text: "Loved it!", time: "3 days ago" },
        { user: "Aman", rating: 4, text: "Nice flavour.", time: "5 days ago" },

      ],
    },
    {
      name: "Paneer Tikka",
      rating: 4.4,
      reviewsCount: 22,
      reviews: [
        { user: "Rohit", rating: 5, text: "Loved it!", time: "3 days ago" },
        { user: "Aman", rating: 4, text: "Nice flavour.", time: "5 days ago" },
      ],
    },
  ];

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-6">

      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-lg font-bold text-gray-800">Reviews</h1>
        <p className="text-sm text-gray-500">
          Search products and view customer feedback
        </p>
      </div>

      {/* ===== SEARCH BAR ===== */}
      <input
        type="text"
        placeholder="🔍 Search product (Chicken, Paneer...)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-4 py-2 rounded-xl border bg-white"
      />

      {/* ===== PRODUCT LIST ===== */}
      <div className="space-y-3">
        {filteredProducts.map((product, index) => (
          <div
            key={index}
            onClick={() => setSelectedProduct(product)}
            className="bg-white rounded-xl p-4 shadow cursor-pointer"
          >
            <p className="font-semibold text-gray-800">
              {product.name}
            </p>
            <p className="text-sm text-gray-500">
              ⭐ {product.rating} ({product.reviewsCount} reviews)
            </p>
          </div>
        ))}
      </div>

      {/* ===== BOTTOM SHEET (REVIEWS) ===== */}
      {selectedProduct && (
  <div className="fixed inset-0 bg-black/40 z-50 flex items-end">
    <div className="bg-white w-full rounded-t-2xl p-5 max-h-[85vh] flex flex-col">

      {/* drag indicator */}
      <div className="w-10 h-1 bg-gray-300 rounded mx-auto mb-3" />

      {/* PRODUCT SUMMARY */}
      <div className="mb-3">
        <h2 className="text-lg font-bold">
          {selectedProduct.name}
        </h2>
        <p className="text-sm text-gray-500">
          ⭐ {selectedProduct.rating} • {selectedProduct.reviewsCount} reviews
        </p>
      </div>

      {/* USER REVIEWS (SCROLLABLE) */}
      <div className="space-y-4 overflow-y-auto pr-2 flex-1">
        {selectedProduct.reviews.map((rev, i) => (
          <div key={i} className="border-b pb-3">
            <div className="flex justify-between text-sm">
              <span className="font-medium">{rev.user}</span>
              <span className="text-gray-400">{rev.time}</span>
            </div>

            <div className="text-yellow-500 text-sm">
              ⭐ {rev.rating}
            </div>

            <p className="text-sm text-gray-700">
              {rev.text}
            </p>

            <button className="text-xs text-red-500 mt-1">
              Report
            </button>
          </div>
        ))}
      </div>

      {/* CLOSE (FIXED AT BOTTOM) */}
      <button
        onClick={() => setSelectedProduct(null)}
        className="w-full text-center text-sm text-gray-500 pt-3"
      >
        Close
      </button>

    </div>
  </div>
)}


    </div>
  );
};

export default Reviews;
