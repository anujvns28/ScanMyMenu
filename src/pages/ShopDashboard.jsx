import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import BottomNav from "../components/core/shop/BottomNav";
import TopNav from "../components/core/shop/TopNav";
import { fetchMyShop } from "../service/operations/shop";
import { useDispatch, useSelector } from "react-redux";

export const ProgressBar = ({ progress }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-sm font-semibold text-gray-700">
          Shop Setup Progress
        </p>
        <span className="text-sm font-bold text-blue-600">{progress}%</span>
      </div>

      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      {progress < 100 ? (
        <p className="text-xs text-gray-500">
          Complete your shop details to unlock QR Code
        </p>
      ) : (
        <p className="text-xs text-green-600 font-medium">
          🎉 QR Code unlocked! Your shop is live
        </p>
      )}
    </div>
  );
};

const ShopDashboard = () => {
  const { shopDetails } = useSelector((state) => state.shop);

  return (
    <div className="min-h-screen w-full bg-gray-100 pb-16">
      <TopNav />

      {shopDetails?.progress > 0 && shopDetails?.progress < 100 && (
        <div className="px-4 mt-2">
          <ProgressBar progress={shopDetails.progress} />
        </div>
      )}

      <Outlet />

      <BottomNav />
    </div>
  );
};

export default ShopDashboard;
