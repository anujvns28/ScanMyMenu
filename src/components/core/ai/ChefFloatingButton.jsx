import React from "react";

const ChefFloatingButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full
      bg-white shadow-xl border border-gray-200
      flex items-center justify-center
      animate-bounce hover:scale-105 transition-all"
    >
      <span className="text-2xl">👨‍🍳</span>
    </button>
  );
};

export default ChefFloatingButton;
