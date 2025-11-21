import React from 'react'
import scaneMenu from '../assets/scanemenu.mp4'

const Home = () => {
  return (
    <div className="w-full min-h-screen  from-white to-blue-50 text-gray-900">
      {/* ================= HERO SECTION ================= */}
      <section className="w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-14 gap-12">
        {/* Left Content */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Create Your <span className="text-blue-600">Digital Menu</span> in 60 Seconds
          </h1>
          <p className="text-lg text-gray-700 max-w-md">
            Generate QR, share instantly, and give customers a smarter way to explore your menu.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-xl shadow-md hover:bg-blue-700 hover:scale-105 transition-all">
              Create Free Menu
            </button>
            <button className="px-8 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 hover:scale-105 transition-all">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Right Menu Card */}
        <div className="md:w-1/2 flex justify-center">
          <div className="w-80 bg-white rounded-3xl shadow-2xl p-5 border border-gray-200 flex flex-col overflow-hidden hover:shadow-[0_0_30px_rgba(0,0,0,0.15)] transition-all">
            {/* Top Banner */}
            <div className="relative w-full h-40 rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?w=800"
                className="w-full h-full object-cover"
                alt="Food Banner"
              />
              <div className="absolute top-3 left-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-semibold">
                ⭐ 4.6 • Popular
              </div>
            </div>

            {/* Restaurant Info */}
            <div className="mt-4">
              <h3 className="font-bold text-lg">Yadav Family Dhaba</h3>
              <p className="text-[12px] text-gray-500">North Indian • South Indian • Snacks</p>
              <p className="text-[12px] text-gray-600 mt-1 flex items-center gap-1">🕒 Open till 11:30 PM</p>
            </div>

            {/* Recommended Title */}
            <h4 className="font-semibold text-sm mt-4 mb-3 flex items-center gap-2">
              <span>🔥</span> Recommended For You
            </h4>

            {/* Items */}
            <ul className="space-y-3 text-sm text-gray-700 overflow-y-auto pr-1 h-52">
              {/* Paneer Tikka */}
              <li className="p-3 bg-gray-50 rounded-xl shadow-sm flex items-center gap-3 hover:bg-gray-100 transition">
                <img
                  src="https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?w=200"
                  className="w-14 h-14 rounded-xl object-cover"
                  alt="Paneer Tikka"
                />
                <div className="flex justify-between w-full items-center">
                  <div>
                    <p className="font-semibold">Paneer Tikka</p>
                    <p className="text-[11px] text-gray-500">Spicy • Chef special</p>
                  </div>
                  <span className="font-semibold">₹120</span>
                </div>
              </li>

              {/* Masala Dosa */}
              <li className="p-3 bg-gray-50 rounded-xl shadow-sm flex items-center gap-3 hover:bg-gray-100 transition">
                <img
                  src="https://images.unsplash.com/photo-1631515242809-105fabd2a8f5?w=200"
                  className="w-14 h-14 rounded-xl object-cover"
                  alt="Masala Dosa"
                />
                <div className="flex justify-between w-full items-center">
                  <div>
                    <p className="font-semibold">Masala Dosa</p>
                    <p className="text-[11px] text-gray-500">Crispy • With Sambar</p>
                  </div>
                  <span className="font-semibold">₹90</span>
                </div>
              </li>

              {/* Veg Thali */}
              <li className="p-3 bg-gray-50 rounded-xl shadow-sm flex items-center gap-3 hover:bg-gray-100 transition">
                <img
                  src="https://images.unsplash.com/photo-1604908177522-0400102923f3?w=200"
                  className="w-14 h-14 rounded-xl object-cover"
                  alt="Veg Thali"
                />
                <div className="flex justify-between w-full items-center">
                  <div>
                    <p className="font-semibold">Veg Thali</p>
                    <p className="text-[11px] text-gray-500">Unlimited sabzi & roti</p>
                  </div>
                  <span className="font-semibold">₹150</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ================= QR DEMO SECTION ================= */}
      <section className="px-8 md:px-24 py-24 flex flex-col md:flex-row items-center gap-16 bg-gradient-to-r from-blue-50 to-white">
        {/* LEFT: Phone + Video */}
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-gray-300 bg-black hover:shadow-[0_0_40px_rgba(0,0,0,0.25)] transition-all">
            <div className="absolute inset-0 rounded-3xl border-4 border-gray-700 pointer-events-none" />

            <video
              src={scaneMenu}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
          </div>
        </div>

        {/* RIGHT: Explanation */}
        <div className="md:w-1/2 space-y-6">
          <h3 className="text-4xl font-bold leading-snug text-gray-900">Scan QR &amp; Open Menu Instantly</h3>

          <p className="text-gray-700 text-lg leading-relaxed">
            Your customers simply scan your QR code using their camera, and the full digital menu loads instantly —
            clean, fast and modern.
          </p>

          <div className="space-y-4 text-gray-800 text-sm">
            <div className="flex items-center gap-3">
              <span className="text-blue-600 text-xl">⚡</span>
              <p>Super-fast scanning experience</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-600 text-xl">📱</span>
              <p>Works on all smartphone cameras</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-600 text-xl">🍽️</span>
              <p>Menu loads with images &amp; recommendations</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-blue-600 text-xl">🧾</span>
              <p>No re-printing cost — update anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="px-8 md:px-24 py-16 grid md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl shadow-md bg-white border hover:shadow-lg transition flex flex-col items-start gap-2">
          <div className="text-5xl mb-2">📸</div>
          <h3 className="text-xl font-bold mt-1">Add Menu Photos</h3>
          <p className="text-gray-600 mt-1 text-sm">Upload dish photos to attract more customers.</p>
        </div>

        <div className="p-8 rounded-2xl shadow-md bg-white border hover:shadow-lg transition flex flex-col items-start gap-2">
          <div className="text-5xl mb-2">🔳</div>
          <h3 className="text-xl font-bold mt-1">Auto QR Generate</h3>
          <p className="text-gray-600 mt-1 text-sm">Print and place your shop&apos;s unique QR code.</p>
        </div>

        <div className="p-8 rounded-2xl shadow-md bg-white border hover:shadow-lg transition flex flex-col items-start gap-2">
          <div className="text-5xl mb-2">🔥</div>
          <h3 className="text-xl font-bold mt-1">AI Suggestions</h3>
          <p className="text-gray-600 mt-1 text-sm">Highlight best-selling items automatically.</p>
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="px-8 md:px-24 py-20 bg-gray-50">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How Scan My Menu Works</h2>

        <div className="grid md:grid-cols-4 gap-10">
          <div className="text-center">
            <div className="text-4xl mb-2">1️⃣</div>
            <h3 className="font-bold text-lg mt-1">Create Account</h3>
            <p className="text-gray-600 mt-2 text-sm">Sign up easily and start creating.</p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-2">2️⃣</div>
            <h3 className="font-bold text-lg mt-1">Add Menu Items</h3>
            <p className="text-gray-600 mt-2 text-sm">Add prices, images and categories.</p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-2">3️⃣</div>
            <h3 className="font-bold text-lg mt-1">Get QR Code</h3>
            <p className="text-gray-600 mt-2 text-sm">Download and print your QR instantly.</p>
          </div>

          <div className="text-center">
            <div className="text-4xl mb-2">4️⃣</div>
            <h3 className="font-bold text-lg mt-1">Customers Scan</h3>
            <p className="text-gray-600 mt-2 text-sm">Menu opens instantly with suggestions.</p>
          </div>
        </div>
      </section>

      {/* ================= TRUSTED BY ================= */}
      <section className="px-8 md:px-24 py-20 text-center">
        <h2 className="text-3xl font-bold mb-6">Trusted By 5,000+ Food Businesses</h2>
        <p className="text-gray-600 mb-10">
          From local stalls to premium restaurants — everyone loves Scan My Menu.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 items-center justify-center">
          {/* Card 1 */}
          <div className="bg-white shadow-md hover:shadow-xl transition-all p-6 rounded-2xl border border-gray-100 flex flex-col items-center gap-3">
            <div className="text-4xl">🍔</div>
            <h4 className="font-semibold text-gray-800">Street Food Corners</h4>
            <p className="text-xs text-gray-500">Quick QR menu for fast ordering</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white shadow-md hover:shadow-xl transition-all p-6 rounded-2xl border border-gray-100 flex flex-col items-center gap-3">
            <div className="text-4xl">🍛</div>
            <h4 className="font-semibold text-gray-800">Family Restaurants</h4>
            <p className="text-xs text-gray-500">Smart ordering &amp; menu suggestions</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white shadow-md hover:shadow-xl transition-all p-6 rounded-2xl border border-gray-100 flex flex-col items-center gap-3">
            <div className="text-4xl">🥘</div>
            <h4 className="font-semibold text-gray-800">Dhabas</h4>
            <p className="text-xs text-gray-500">Simple QR menu for daily customers</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white shadow-md hover:shadow-xl transition-all p-6 rounded-2xl border border-gray-100 flex flex-col items-center gap-3">
            <div className="text-4xl">🍕</div>
            <h4 className="font-semibold text-gray-800">Fast Food Shops</h4>
            <p className="text-xs text-gray-500">Show combos &amp; bestsellers easily</p>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="px-8 md:px-24 py-20 text-center">
        <h2 className="text-3xl font-bold mb-10">What Shop Owners Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow rounded-xl text-sm text-gray-700">
            “Menu banana bohot easy tha!”
          </div>
          <div className="bg-white p-6 shadow rounded-xl text-sm text-gray-700">
            “QR scan karte hi menu open ho gaya.”
          </div>
          <div className="bg-white p-6 shadow rounded-xl text-sm text-gray-700">
            “Customers ko suggestions bahut pasand aaye.”
          </div>
        </div>
      </section>

      {/* ================= CTA BAR ================= */}
    <section className="w-full bg-gradient-to-br from-indigo-700 via-purple-600 to-blue-600 text-white text-center py-24 mt-4 relative overflow-hidden rounded-t-[40px] shadow-[0_-10px_40px_rgba(0,0,0,0.25)]">
{/* Floating Glow Orbs */}
<div className="absolute -top-16 -left-10 w-60 h-60 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
<div className="absolute top-10 right-0 w-40 h-40 bg-blue-300/20 rounded-full blur-2xl"></div>
<div className="absolute bottom-0 left-1/4 w-56 h-56 bg-purple-300/20 rounded-full blur-3xl"></div>


<h2 className="text-4xl md:text-5xl font-extrabold drop-shadow-md tracking-tight">
Power Your Restaurant with Smart QR Menus
</h2>
<p className="mt-5 text-lg opacity-95 max-w-2xl mx-auto leading-relaxed">
Modern, beautiful and fast. Give customers a pro-quality digital menu experience in seconds.
</p>


<button className="mt-10 px-14 py-4 bg-white text-purple-700 font-bold rounded-2xl shadow-2xl hover:bg-gray-100 hover:scale-110 active:scale-95 transition-all duration-300">
🚀 Create Your Free Menu
</button>


<p className="mt-5 text-sm opacity-80">No credit card needed • Set up in under 1 minute</p>
</section>
    </div>
  )
}

export default Home
