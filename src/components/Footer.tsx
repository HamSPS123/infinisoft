import { Link } from "react-router";
import { motion } from "framer-motion";
import { FaPhone, FaWhatsapp, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { MdOutlineAlternateEmail, MdLocationOn } from "react-icons/md";
// import { FiSend } from "react-icons/fi";
// import images from "../constants/images";

import "./footer.css";

const Footer = () => {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/service" },
    { name: "Partners", path: "/partners" },
    { name: "Contact", path: "/contact" },
  ];

  // const serviceLinks = [
  //   { name: "IT Consulting", path: "/service/consulting" },
  //   { name: "Network Solutions", path: "/service/network" },
  //   { name: "Hardware Supply", path: "/service/hardware" },
  //   { name: "Maintenance", path: "/service/maintenance" },
  //   { name: "Cloud Services", path: "/service/cloud" },
  // ];

  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Company Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="footer-logo">
                {/* <img src={images.logo} alt="InfiniSoft" /> */}
                <div className="text-2xl font-bold bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">Infinisoft Solutions Company Limited</div>
              </div>
              <p className="text-gray-300 mb-4">
                InfiniSoft is a leading distribution company of computer hardware and equipment, creating IT solutions by integrating the best products in the market.
              </p>
              <div className="footer-social">
                <a href="https://facebook.com" className="footer-social-icon" aria-label="Facebook">
                  <FaFacebookF />
                </a>
                <a href="https://twitter.com" className="footer-social-icon" aria-label="Twitter">
                  <FaTwitter />
                </a>
                <a href="https://linkedin.com" className="footer-social-icon" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a href="https://instagram.com" className="footer-social-icon" aria-label="Instagram">
                  <FaInstagram />
                </a>
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="footer-heading">Quick Links</h3>
              <nav>
                {quickLinks.map((link, index) => (
                  <Link key={index} to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                ))}
              </nav>
            </motion.div>

            {/* Services */}
            {/* <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="footer-heading">Our Services</h3>
              <nav>
                {serviceLinks.map((link, index) => (
                  <Link key={index} to={link.path} className="footer-link">
                    {link.name}
                  </Link>
                ))}
              </nav>
            </motion.div> */}

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="footer-heading">Contact Us</h3>
              
              <div className="footer-contact-item">
                <div className="footer-contact-icon">
                  <MdLocationOn />
                </div>
                <div>
                  <p>Thongkhankham building, 1-4th floors, Vientiane Capital, Lao P.D.R</p>
                </div>
              </div>
              
              <div className="footer-contact-item">
                <div className="footer-contact-icon">
                  <FaPhone />
                </div>
                <div>
                  <p>(+856)20 58289955</p>
                </div>
              </div>
              
              <div className="footer-contact-item">
                <div className="footer-contact-icon">
                  <MdOutlineAlternateEmail />
                </div>
                <div>
                  <p>souksawat@infinisoft.info</p>
                </div>
              </div>
              
              <div className="footer-contact-item">
                <div className="footer-contact-icon">
                  <FaWhatsapp />
                </div>
                <div>
                  <p>(+856)20 77898984</p>
                </div>
              </div>
              
              {/* <div className="footer-newsletter">
                <h4 className="text-white font-medium mb-2">Subscribe to our newsletter</h4>
                <div className="footer-newsletter-form">
                  <input 
                    type="email" 
                    placeholder="Your email" 
                    className="footer-newsletter-input" 
                  />
                  <button className="footer-newsletter-button">
                    <FiSend />
                  </button>
                </div>
              </div> */}
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="footer-bottom-text mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} InfiniSoft. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/privacy" className="footer-bottom-link">Privacy Policy</Link>
              <Link to="/terms" className="footer-bottom-link">Terms of Service</Link>
              <Link to="/sitemap" className="footer-bottom-link">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
