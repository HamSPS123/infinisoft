import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  FiUsers,
  FiTarget,
  FiAward,
  FiCheck,
  FiArrowRight,
} from "react-icons/fi";
import images from "../constants/images";
import SEO from "../components/SEO";
import "./about.css";
import { useEffect } from "react";
import useCustomerStore from "../stores/customers.store";

// Animation components
const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
    {children}
  </motion.div>
);

const SectionTransition = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

const FadeInElement = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, delay }}
  >
    {children}
  </motion.div>
);

const About = () => {
  const {customers, getCustomers} = useCustomerStore();

  useEffect(() => {
    getCustomers();
  }, []);

  const coreValues = [
    {
      icon: <FiUsers />,
      title: "Customer-Centric",
      description:
        "We put our customers first, understanding their unique needs and delivering tailored solutions that exceed expectations.",
    },
    {
      icon: <FiTarget />,
      title: "Excellence",
      description:
        "We strive for excellence in every aspect of our business, from product quality to customer service and technical support.",
    },
    {
      icon: <FiAward />,
      title: "Innovation",
      description:
        "We embrace innovation and continuously seek new technologies and solutions to help our clients stay ahead in the digital landscape.",
    },
  ];

  return (
    <PageTransition>
      <div className="about-page">
        <SEO
          title="About InfiniSoft - IT Equipment & Network Solutions Provider"
          description="Learn about InfiniSoft, a leading provider of premium IT equipment and reliable network accessories designed to enhance connectivity, performance, and scalability."
          keywords="IT equipment provider, network accessories, business IT solutions, network infrastructure, IT consulting"
          ogImage="/images/logo.png"
        />

        {/* Hero Section */}
        <section className="about-hero">
          <div className="about-hero-bg"></div>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <SectionTransition>
                <span className="bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">
                  ABOUT OUR COMPANY
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  About Infinisoft Solutions
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  <strong>Infinisoft Solutions</strong> empowers businesses with
                  premium IT equipment and reliable{" "}
                  <strong>network accessories</strong> designed to enhance
                  connectivity, performance, and scalability. Our mission is to
                  provide essential technology infrastructure that enables
                  organizations to grow with confidence in an increasingly
                  digital world.
                </p>
              </SectionTransition>
            </div>
          </div>
        </section>

        {/* What We Offer */}
        <section className="about-section about-section-alt">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
              <SectionTransition>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    What We Offer
                  </h2>
                  <p className="text-gray-600 mb-6">
                    We specialize in supplying high-quality IT equipment and
                    network accessories tailored to modern business needs.
                    Whether you're building a new network or upgrading your
                    infrastructure, our solutions ensure stability, speed, and
                    reliability.
                  </p>

                  <div className="space-y-4">
                    {[
                      "Network switches, routers, and firewalls",
                      "Patch panels, Ethernet cables, and connectors",
                      "Racks, enclosures, and cable management systems",
                      "Enterprise laptops, desktops, and peripherals",
                      "IT consulting and infrastructure support",
                    ].map((item, index) => (
                      <FadeInElement key={index} delay={0.1 * index}>
                        <div className="flex items-start gap-3">
                          <div className="bg-gradient-to-r from-sky-400 to-cyan-400 text-sky-600 p-1 rounded-full mt-1">
                            <FiCheck size={16} />
                          </div>
                          <p className="text-gray-700">{item}</p>
                        </div>
                      </FadeInElement>
                    ))}
                  </div>
                </div>
              </SectionTransition>

              <SectionTransition delay={0.2}>
                <div className="relative">
                  <img
                    src={
                      images.missionImage ||
                      "https://via.placeholder.com/600x400"
                    }
                    alt="Network Equipment"
                    className="rounded-lg shadow-lg w-full"
                    crossOrigin="anonymous"
                  />
                  <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-r from-sky-400 to-cyan-400 text-sky-600 p-2 rounded-full">
                        <FiCheck size={20} />
                      </div>
                      <div>
                        <p className="font-bold">Premium Quality</p>
                        <p className="text-sm text-gray-500">
                          Enterprise-grade solutions
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionTransition>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="about-section">
          <div className="container mx-auto px-4">
            <SectionTransition>
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">
                  OUR CORE VALUES
                </span>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  What Drives Us Forward
                </h2>
                <p className="text-gray-600">
                  Our values define who we are and guide our decisions as we
                  work to deliver the best solutions for our clients.
                </p>
              </div>
            </SectionTransition>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {coreValues.map((value, index) => (
                <FadeInElement key={index} delay={0.1 * index}>
                  <div className="bg-white p-6 rounded-lg shadow-lg">
                    <div className="bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 inline-block p-2 rounded mb-4 text-2xl">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">{value.description}</p>
                  </div>
                </FadeInElement>
              ))}
            </div>
          </div>
        </section>

        {/* Mission */}
        <section className="about-section about-section-alt">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
              <SectionTransition>
                <img
                  src={
                    images.transform || "https://via.placeholder.com/600x400"
                  }
                  alt="Our Mission"
                  className="rounded-lg shadow-lg w-full"
                  crossOrigin="anonymous"
                />
              </SectionTransition>

              <SectionTransition delay={0.2}>
                <div>
                  <span className="bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">
                    OUR MISSION
                  </span>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Empowering Digital Transformation
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Our mission is to equip businesses with dependable IT and
                    networking tools that simplify connectivity and strengthen
                    infrastructure. We believe in quality, performance, and
                    long-term partnerships with our clients.
                  </p>

                  <div className="space-y-4">
                    {[
                      "Provide reliable, high-performance IT solutions",
                      "Support businesses in their digital transformation journey",
                      "Build lasting relationships based on trust and expertise",
                    ].map((item, index) => (
                      <FadeInElement key={index} delay={0.1 * index}>
                        <div className="flex items-start gap-3">
                          <div className="bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 p-1 rounded-full mt-1">
                            <FiCheck size={16} />
                          </div>
                          <p className="text-gray-700">{item}</p>
                        </div>
                      </FadeInElement>
                    ))}
                  </div>
                </div>
              </SectionTransition>
            </div>
          </div>
        </section>

        {/* Our Customers */}
        <section className="about-section">
          <div className="container mx-auto px-4">
            <SectionTransition>
              <div className="text-center max-w-3xl mx-auto mb-12">
                <span className="bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">
                  OUR CLIENTS
                </span>
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Trusted By Leading Organizations
                </h2>
                <p className="text-gray-600">
                  We're proud to work with a diverse range of clients across
                  various industries.
                </p>
              </div>
            </SectionTransition>

            <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 max-w-5xl mx-auto">
              {customers.map((customer, index) => (
                <FadeInElement key={index} delay={0.1 * index}>
                  <Link to={`/customer/${customer.id}`}>
                    <img
                      src={`${customer.logo}`}
                      alt={customer.name}
                      className="customer-logo"
                    />
                  </Link>
                </FadeInElement>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="container mx-auto px-4 py-16">
          <SectionTransition>
            <div className="relative overflow-hidden bg-gradient-to-br from-sky-500 to-cyan-500 rounded-2xl px-8 py-16">
              {/* Optional glow circle effect */}
              <div className="absolute top-[-50%] right-[-50%] w-full h-full bg-white/10 rounded-full pointer-events-none"></div>

              <div className="max-w-3xl mx-auto text-center text-white relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Transform Your IT Infrastructure?
                </h2>
                <p className="text-lg mb-8">
                  Reach out to our team to discover how Infinisoft can help
                  elevate your technology ecosystem.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-white text-sky-600 px-8 py-3 rounded-md font-semibold transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(255,255,255,0.25)]"
                >
                  Contact Us <FiArrowRight />
                </Link>
              </div>
            </div>
          </SectionTransition>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;
