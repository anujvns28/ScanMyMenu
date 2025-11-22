import React from "react";
import aboutImg from "../assets/scanmenu.jpg"

const About = () => {
  return (
    <div className="w-full min-h-screen  text-gray-800 px-6 md:px-10 py-16">
      {/* HERO */}
      <section className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
          About <span className="text-blue-600">Scan My Menu</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 leading-relaxed">
          We help restaurants, street food vendors, and cloud kitchens transform
          their traditional paper menus into beautiful, fast, and smart digital menus.
        </p>
      </section>

      {/* OUR MISSION */}
      <section className="grid md:grid-cols-2 gap-12 mb-20 items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
          <p className="text-gray-700 leading-relaxed">
            At Scan My Menu, our mission is simple — to make digital menus accessible
            for every food business in India. Whether you're a small tea stall or a
            premium restaurant, we provide tools that make your service faster,
            more modern, and more engaging.
          </p>
        </div>
        <img
          src={aboutImg}
          className="rounded-3xl shadow-lg"
        />
      </section>

      {/* WHY CHOOSE US */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Why Choose Us?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white shadow-md border hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">⚡ Instant QR Menus</h3>
            <p className="text-gray-600">Create your digital menu and QR in 60 seconds.</p>
          </div>

          <div className="p-8 rounded-2xl bg-white shadow-md border hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">📸 Add Food Photos</h3>
            <p className="text-gray-600">Beautiful menu with dish photos to attract customers.</p>
          </div>

          <div className="p-8 rounded-2xl bg-white shadow-md border hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">🤖 Smart Suggestions</h3>
            <p className="text-gray-600">AI recommends popular dishes to increase orders.</p>
          </div>
        </div>
      </section>

      {/* OUR SERVICES */}
      <section className="mb-20">
        <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Our Services</h2>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="p-8 bg-white rounded-2xl shadow-md border">
            <h3 className="text-xl font-bold mb-3">Digital Menu Builder</h3>
            <p className="text-gray-600 leading-relaxed">
              Create and manage your menu anytime. Add new dishes, update prices,
              add categories, and upload photos instantly.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-md border">
            <h3 className="text-xl font-bold mb-3">Instant QR Code Generator</h3>
            <p className="text-gray-600 leading-relaxed">
              Each shop gets a unique, secure QR code. Print it and place it anywhere
              — tables, walls, or counters.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-md border">
            <h3 className="text-xl font-bold mb-3">AI Recommendation Engine</h3>
            <p className="text-gray-600 leading-relaxed">
              Show customers the best-selling and most loved dishes to increase
              conversions.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-md border">
            <h3 className="text-xl font-bold mb-3">Analytics Dashboard</h3>
            <p className="text-gray-600 leading-relaxed">
              Track views, customer actions, and performance of your top dishes.
            </p>
          </div>
        </div>
      </section>

      {/* OUR VISION */}
      <section className="text-center max-w-3xl mx-auto mb-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
        <p className="text-gray-700 leading-relaxed">
          We want to empower every food business in India with modern digital tools.
          Our vision is to make QR menus a standard for faster service, better hygiene,
          and a smarter dining experience.
        </p>
      </section>

      {/* CTA */}
      <section className="w-full bg-blue-600 text-white text-center py-14 rounded-3xl shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Ready to Go Digital?</h2>
        <p className="mb-6 text-white/90">Create your digital menu now — it's free and takes just 1 minute!</p>
        <button className="px-10 py-3 bg-white text-blue-700 font-semibold rounded-xl shadow hover:bg-gray-100">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default About;
