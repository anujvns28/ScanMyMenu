import { useState } from "react";

const Menu = () => {
  const [openCategory, setOpenCategory] = useState(null);

  return (
    <div className="min-h-screen bg-gray-100 p-4 space-y-6">

      {/* ===== HEADER ===== */}
      <div>
        <h1 className="text-lg font-bold text-gray-800">
          Menu Management
        </h1>
        <p className="text-sm text-gray-500">
          Manage categories, tags & products
        </p>
      </div>

      {/* ===== CATEGORIES (SWIGGY STYLE) ===== */}
      <div className="bg-white rounded-xl p-4 shadow space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-semibold text-gray-700">
            📂 Categories
          </h2>
          <button className="text-sm font-medium text-blue-600">
            ➕ Add Category
          </button>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          <CategoryItem
            name="Chicken"
            image="https://images.unsplash.com/photo-1604908177522-429a0b9a3f6c"
            onClick={() =>
              setOpenCategory({
                name: "Chicken",
                image:
                  "https://images.unsplash.com/photo-1604908177522-429a0b9a3f6c",
                description:
                  "Delicious non-veg chicken dishes prepared with authentic spices.",
                tags: ["Non-Veg", "Spicy"],
              })
            }
          />

          <CategoryItem
            name="Veg"
            image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c"
            onClick={() =>
              setOpenCategory({
                name: "Veg",
                image:
                  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
                description:
                  "Pure vegetarian dishes made with fresh vegetables.",
                tags: ["Veg", "Healthy"],
              })
            }
          />

          <CategoryItem
            name="Noodles"
            image="https://images.unsplash.com/photo-1585032226651-759b368d7246"
            onClick={() =>
              setOpenCategory({
                name: "Noodles",
                image:
                  "https://images.unsplash.com/photo-1585032226651-759b368d7246",
                description:
                  "Chinese style noodles with rich flavours.",
                tags: ["Chinese"],
              })
            }
          />
        </div>
      </div>

      {/* ===== PRODUCTS (DEMO) ===== */}
      

      {/* ===== PRODUCT LIST ===== */}
      <ProductCard
        image="https://images.unsplash.com/photo-1604908177522-429a0b9a3f6c"
        name="Chicken Biryani"
        price="₹180"
        rating="4.8"
        reviews="210"
        stock="In Stock"
        tags={["Best Seller", "Spicy"]}
        special
      />

      <ProductCard
        image="https://images.unsplash.com/photo-1551183053-bf91a1d81141"
        name="Butter Chicken"
        price="₹220"
        rating="4.6"
        reviews="160"
        stock="Low Stock"
        tags={["Creamy"]}
      />

      <ProductCard
        image="https://images.unsplash.com/photo-1600628422019-64c8e0eaa1c5"
        name="Chicken Noodles"
        price="₹150"
        rating="3.9"
        reviews="58"
        stock="Out of Stock"
        tags={["Chinese"]}
      />

      {/* ===== CATEGORY DETAILS + TAGS (BOTTOM SHEET) ===== */}
      {openCategory && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/40">
          <div className="bg-white w-full rounded-t-2xl p-5 pb-24 space-y-5">

            {/* drag indicator */}
            <div className="w-10 h-1 bg-gray-300 rounded mx-auto" />

            {/* image */}
            <img
              src={openCategory.image}
              alt={openCategory.name}
              className="w-full h-40 object-cover rounded-xl"
            />

            {/* details */}
            <div>
              <h3 className="text-lg font-bold">
                {openCategory.name}
              </h3>
              <p className="text-sm text-gray-600">
                {openCategory.description}
              </p>
            </div>

            {/* TAGS SECTION */}
            <div className="space-y-2">
              <h4 className="font-semibold text-gray-700">
                🏷️ Category Tags
              </h4>

              <div className="flex gap-2 flex-wrap">
                {openCategory.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                    <button className="text-red-500 text-xs">✕</button>
                  </span>
                ))}

                <button className="px-3 py-1 border border-dashed rounded-full text-sm text-blue-600">
                  ➕ Add Tag
                </button>
              </div>
            </div>

            {/* ACTION */}
            <button className="w-full bg-red-100 text-red-600 rounded-xl py-2 font-medium">
              Disable Category
            </button>

            {/* CLOSE */}
            <button
              onClick={() => setOpenCategory(null)}
              className="w-full text-center text-sm text-gray-500"
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Menu;


const CategoryItem = ({ name, image, onClick }) => (
  <button
    onClick={onClick}
    className="flex flex-col items-center min-w-[90px]"
  >
    <img
      src={image}
      alt={name}
      className="w-16 h-16 rounded-full object-cover"
    />
    <p className="mt-2 text-xs font-medium">{name}</p>
  </button>
);

const ProductCard = ({
  image,
  name,
  price,
  rating,
  reviews,
  stock,
  tags,
  special,
}) => (
  <div className="bg-white rounded-xl shadow overflow-hidden">

    {/* IMAGE */}
    <img
      src={image}
      alt={name}
      className="w-full h-40 object-cover"
    />

    {/* CONTENT */}
    <div className="p-4 space-y-3">

      {/* TITLE + EDIT */}
      <div className="flex justify-between items-start">
        <div>
          <p className="font-semibold text-gray-800">
            {name}
          </p>
          <p className="text-sm text-gray-500">
            ⭐ {rating} ({reviews} reviews)
          </p>
        </div>

        <button className="text-sm text-blue-600 font-medium">
          Edit
        </button>
      </div>

      {/* PRICE + STOCK */}
      <div className="flex justify-between text-sm">
        <span className="font-medium">{price}</span>
        <span
          className={
            stock === "In Stock"
              ? "text-green-600"
              : stock === "Low Stock"
              ? "text-yellow-500"
              : "text-red-500"
          }
        >
          {stock}
        </span>
      </div>

      {/* TAGS */}
      <div className="flex gap-2 flex-wrap">
        {tags.map((tag, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-gray-100 rounded-full text-xs"
          >
            {tag}
          </span>
        ))}

        <button className="px-2 py-1 border border-dashed rounded-full text-xs text-blue-600">
          + Tag
        </button>

        {special && (
          <span className="px-2 py-1 bg-red-100 text-red-600 rounded-full text-xs">
            Today’s Special
          </span>
        )}
      </div>

    </div>
  </div>
);

