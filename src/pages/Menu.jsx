import React from "react";
import chicken from "../assets/chicken.png";
import noodels from "../assets/noodels.png";
import panner from "../assets/paneer.png";
import rice from "../assets/rices.png";
import soup from "../assets/soup.png";

// FULL-WIDTH INSTAGRAM STYLE MENU (MOBILE FIRST)
const MobilePremiumMenu = () => {
  const items = [
    {
      name: "Paneer Tikka",
      price: 120,
      veg: true,
      tag: "🔥 Best Seller",
      desc: "Smoky • Soft • Chef special starter",
      img: "https://myrahandijunction.com/wp-content/uploads/2021/08/paneer-tikka-scaled.jpg",
    },
    {
      name: "Masala Dosa",
      price: 90,
      veg: true,
      tag: "⭐ Most Ordered",
      desc: "Crispy dosa with masala & hot sambar",
      img: "https://www.maharajawhiteline.com/assests/blogs-banner/210106621_(1000x667)_(1).jpg",
    },
    {
      name: "Cold Coffee",
      price: 70,
      veg: true,
      tag: "Chilled & Creamy",
      desc: "Smooth cold coffee with ice",
      img: "https://qz.com/cdn-cgi/image/width=1920,quality=85,format=auto/https://assets.qz.com/media/a21ff37514a44539e69a1a9221be1d2c.jpg",
    },
  ];

  const categories = [
    {
      name: "Chinese",
      img: noodels,
    },
    {
      name: "Pizzas",
      img: rice,
    },
    {
      name: "Burgers",
      img: panner,
    },
    {
      name: "Shawarma",
      img: chicken,
    },
    {
      name: "Dosa",
      img: soup,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center">
      {/* PHONE CONTAINER */}
      <div className="w-full max-w-md bg-white min-h-screen shadow-xl flex flex-col">
        {/* HEADER */}
        <header className="px-4 pt-4 pb-3 border-b border-gray-100 sticky top-0 z-20 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold">Yadav Family Dhaba</h1>
              <p className="text-[11px] text-gray-500">
                North Indian • South Indian • Snacks
              </p>
              <p className="text-[11px] text-gray-500 mt-1">
                🕒 Open till 11:30 PM
              </p>
            </div>
            <div className="flex flex-col items-end gap-1">
              <div className="px-2 py-1 rounded-lg bg-green-100 text-[11px] font-semibold text-green-700 flex items-center gap-1">
                <span>⭐ 4.6</span>
                <span className="text-[10px] text-gray-500">1.2k+ ratings</span>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-green-700 font-semibold">
                <span className="w-3 h-3 border border-green-700 rounded-sm grid place-items-center text-[8px]">
                  ●
                </span>
                <span>Pure Veg</span>
              </div>
            </div>
          </div>
        </header>

        {/* CATEGORY ICONS START */}
        <div className="px-4 py-3 bg-white sticky top-[72px] z-10 border-b border-gray-200">
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
            {categories.map((cat) => (
              <div
                key={cat.name}
                className="flex flex-col items-center min-w-[65px]"
              >
                <div className="w-16 h-16 rounded-full overflow-hidden shadow-md bg-white">
                  <img
                    src={cat.img}
                    alt={cat.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[11px] mt-1 font-medium text-gray-700">
                  {cat.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CATEGORY ICONS END */}

        {/* MENU CONTENT */}
        <main className="flex-1 overflow-y-auto pb-10 px-4 space-y-6">
          {items.map((item) => (
            <div
              key={item.name}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all overflow-hidden"
            >
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={item.img}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {item.tag}
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur text-gray-900 text-sm font-bold px-3 py-1 rounded-full shadow">
                  ₹{item.price}
                </div>
                <span className="absolute top-3 right-3 w-4 h-4 border border-green-700 rounded-sm grid place-items-center text-green-700 text-[10px] font-bold bg-white/80 backdrop-blur">
                  •
                </span>
              </div>
              <div className="p-4 space-y-1">
                <h2 className="text-base font-semibold text-gray-900">
                  {item.name}
                </h2>
                <p className="text-[12px] text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </main>

        {/* FOOTER */}
        <footer className="px-4 py-3 text-center text-[11px] text-gray-500 border-t border-gray-200 bg-white">
          View-only digital menu • Scan My Menu
        </footer>
      </div>
    </div>
  );
};

export default MobilePremiumMenu;
