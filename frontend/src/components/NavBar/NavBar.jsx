import React, { useState } from "react";
import { Link } from "react-router-dom";
import { IoReorderThreeOutline } from "react-icons/io5";
import { ImCross } from "react-icons/im";

const NavBar = () => {
  const [MobileNav, setMobileNav] = useState(false);
  const navlinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "All Podcasts", path: "/all-podcast" },
    { name: "Profile", path: "/profile" },
  ];
  console.log(MobileNav);
  
  return (
    <nav className="px-4 md:px-8 lg:px-12 py-2 bg-orange-200 relative">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center text-2xl font-bold">
          <img
            src="/podcast-symbol.svg"
            alt="Podcast Logo"
            className="w-8 h-8 mr-2"
          />
          <h1 className="merriweather-bold">Podcaster</h1>
        </Link>
        <div className="w-2/6 hidden lg:flex justify-center items-center">
          {navlinks.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="ml-4 hover:font-bold font-semibold transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="w-2/6 hidden lg:flex items-center justify-end gap-2">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-950 font-semibold text-white rounded-full border"
          >
            LogIn
          </Link>
          <Link
            to="/signup"
            className="px-6 py-3 bg-green-600 font-semibold text-white rounded-full border"
          >
            SignUp
          </Link>
        </div>
        <div className="w-4/6 flex justify-end items-center lg:hidden z-[1000]">
          <button
            aria-label="Open Navigation Menu"
            className="text-4xl"
            onClick={() => setMobileNav(!MobileNav)}
          >
            <IoReorderThreeOutline />
          </button>
        </div>
      </div>
      <div
        className={`fixed w-full h-screen bg-pink-50 top-0 left-0 transform ${
          MobileNav ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300`}
      >
        <div className="h-full flex flex-col items-center justify-center">
          {navlinks.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              onClick={() => setMobileNav(false)}
              className="mb-12 text-3xl hover:font-bold font-semibold transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/signup"
            onClick={() => setMobileNav(false)}
            className="mb-12 text-3xl hover:font-bold font-semibold transition-all duration-300"
          >
            SignUp
          </Link>
          <Link
            to="/login"
            onClick={() => setMobileNav(false)}
            className="mb-12 text-3xl hover:font-bold font-semibold transition-all duration-300"
          >
            LogIn
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
