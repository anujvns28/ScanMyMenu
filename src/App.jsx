import { useState } from 'react'
import './App.css'
import Navbar from './components/common/Navbar'
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/common/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import About from "./pages/About";
import MobilePremiumMenu from "./pages/Menu";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto flex">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<MobilePremiumMenu />} />
          <Route path="/dashbord" element={<Dashboard />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App
