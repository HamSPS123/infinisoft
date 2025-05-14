import logo from "../assets/images/logo.png";
import hero from "../assets/images/hero.png";
import partner1 from "../assets/images/partners/everfocus.png";
import partner2 from "../assets/images/partners/skd_logo.png";
import partner3 from "../assets/images/partners/vientiane_trading.jpg";
import partner4 from "../assets/images/partners/vinas_tec.png";
import partner5 from "../assets/images/partners/vrcomm.png";
import partner6 from "../assets/images/partners/gsm.gif"
import customer1 from '../assets/images/customers/lao_airline.png'
import customer2 from '../assets/images/customers/monre.jpg'
import customer3 from '../assets/images/customers/bol.png'
import customer4 from '../assets/images/customers/philprint.webp'

// Carousel background images from internet URLs
const carousel1 =
  "https://images.unsplash.com/photo-1520869562399-e772f042f422?q=80&w=1920&auto=format&fit=crop";
const carousel2 =
  "https://images.unsplash.com/photo-1588508065123-287b28e013da?q=80&w=1920&auto=format&fit=crop";
const carousel3 =
  "https://images.unsplash.com/photo-1581092921461-7031e4f48f85?q=80&w=1920&auto=format&fit=crop";

export default {
  logo,
  hero,
  carousel: [
    {
      id: 1,
      image: carousel1,
      title: "Premium IT Equipment",
      subtitle: "High-performance hardware for businesses of all sizes",
    },
    {
      id: 2,
      image: carousel2,
      title: "Enterprise Networking",
      subtitle: "Switches, routers, and security appliances from top brands",
    },
    {
      id: 3,
      image: carousel3,
      title: "Complete IT Solutions",
      subtitle: "From servers to end-user devices with expert support",
    },
  ],
  partner1,
  partner2,
  partner3,
  partner4,
  partner5,
  partner6,
  customer1,
  customer2,
  customer3,
  customer4
};
