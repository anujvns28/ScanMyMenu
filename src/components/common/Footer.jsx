import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-10 mt-10">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="font-bold text-lg mb-3 text-white">Scan My Menu</h3>
            <p className="text-sm text-gray-400">
              Digital menu solution for restaurants, dhabas and street food sellers.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm transition-all duration-300 hover:translate-x-1">
              <li>Home</li>
              <li>Create Menu</li>
              <li>Features</li>
              <li>Demo</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>Contact Us</li>
              <li>Help Center</li>
              <li>Privacy Policy</li>
              <li>Terms & Conditions</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-white mb-3">Get Updates</h4>
            <p className="text-sm text-gray-400 mb-3">Subscribe to get product updates.</p>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-sm"
            />
            <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg text-sm hover:bg-blue-700">
              Subscribe
            </button>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-10">
          © 2025 Scan My Menu. All rights reserved. • Made in India 🇮🇳
        </p>
      </footer>
  )
}

export default Footer
