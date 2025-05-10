import React, { useState } from "react";
import { NavLink } from "react-router";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";

// import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Service", path: "/service" },
  { label: "Contact Us", path: "/contact" },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top Bar */}
      <div className="bg-sky-500 text-white p-2 text-sm hidden md:block">
        <div className="container mx-auto flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-center sm:text-left">
          <span><FaPhone className="inline" /> (+856)20 58289955</span>
          <span><MdOutlineAlternateEmail className="inline" /> souksawat@infinisoft.info</span>
          <span><FaWhatsapp className="inline" /> (+856)20 77898984</span>
        </div>
      </div>

      {/* Main Nav */}
      <header className="border-b border-gray-200 p-4 sticky top-0 z-50 bg-white">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div>
            <img src="/images/logo.png" alt="logo" className="w-20 h-auto" />
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    isActive
                      ? "relative text-sky-500 font-semibold py-2 px-2"
                      : "relative text-gray-800 font-semibold py-2 px-2 hover:text-sky-500 group-hover:text-sky-500"
                  }
                >
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-sky-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden text-gray-800"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col gap-2">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    end
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive
                        ? "relative text-sky-500 font-semibold py-2 px-2"
                        : "relative text-gray-800 font-semibold py-2 px-2 hover:text-sky-500"
                    }
                  >
                    {item.label}
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-sky-500 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
