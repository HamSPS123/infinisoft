import React, { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { FaPhone } from "react-icons/fa6";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa6";
import { FiMenu, FiX } from "react-icons/fi";
import images from "../constants/images";

import "./header.css";

const navItems = [
  { label: "Home", path: "/" },
  { label: "About Us", path: "/about" },
  { label: "Services", path: "/service" },
  { label: "Partners & Products", path: "/partners" },
  { label: "Our Projects", path: "/projects" },
  { label: "Contact Us", path: "/contact" },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar hidden md:block">
        <div className="container max-w-[1400px] mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2"><FaPhone className="text-xs" /> (+856)20 58289955</span>
            <span className="flex items-center gap-2"><MdOutlineAlternateEmail className="text-sm" /> souksawat@infinisoft.info</span>
            <span className="flex items-center gap-2"><FaWhatsapp className="text-xs" /> (+856)20 77898984</span>
          </div>
          <div className="flex items-center gap-4">
            <NavLink to="/contact" className="hover:text-white/80 transition-colors">Support</NavLink>
            <NavLink to="/login" className="hover:text-white/80 transition-colors">Login</NavLink>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <header className={`header py-4 ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="container max-w-[1400px] mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            className="logo-container"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <NavLink to="/">
              <img src={images.logo} alt="InfiniSoft" />
            </NavLink>
          </motion.div>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `nav-link text-gray-700 font-medium ${isActive ? 'active' : ''}`
                  }
                >
                  {item.label}
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            className="mobile-menu"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className="mobile-menu-header">
              <img src={images.logo} alt="InfiniSoft" className="h-8" />
              <button onClick={() => setMenuOpen(false)} className="menu-button">
                <FiX size={24} />
              </button>
            </div>
            <nav className="flex flex-col">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="mobile-nav-item"
                >
                  <NavLink
                    to={item.path}
                    end
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      isActive ? 'text-green-600 font-medium' : 'text-gray-800'
                    }
                  >
                    {item.label}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
