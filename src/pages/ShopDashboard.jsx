import React from 'react'
import { Outlet } from 'react-router-dom'
import BottomNav from '../components/core/shop/BottomNav'
import TopNav from '../components/core/shop/TopNav'

const ShopDashboard = () => {
  return (
     <div className="min-h-screen w-full bg-gray-100 pb-16">
      {/* Desktop Top Navigation */}
      <TopNav />

      {/* Main Content */}
      <Outlet />

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  )
}

export default ShopDashboard
