import React from "react";

const ConfirmationModal = ({modalData}) => {
   
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      
      {/* Modal Box */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        
        {/* Icon */}
        <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mx-auto">
          <span className="text-2xl">⚠️</span>
        </div>

        {/* Title */}
        <h2 className="mt-4 text-xl font-semibold text-center text-gray-800">
          Confirm Action
        </h2>

        {/* Description */}
        <p className="mt-2 text-sm text-center text-gray-500">
          {modalData.text}
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            className="w-full cursor-pointer py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
            onClick={modalData.handler1}
          >
            {modalData.btn1}
          </button>

          <button
            className="w-full cursor-pointer py-2.5 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition"
            onClick={modalData.handler2}
          >
            {modalData.btn2}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmationModal;
