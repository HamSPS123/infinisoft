import { Link } from "react-router";
import Carousal from "../components/Carousal";

const Home = () => {
  return (
    <div>
      <Carousal />
      <div className="container mx-auto p-4">
        <section id="about" className="py-20 px-6 bg-gray-50">
          <div className="flex justify-between items-center">
              <h2 className="text-4xl font-semibold mb-6 flex-1 text-center">Welcom to InfiniSoft</h2>
              <p className="text-2xl text-gray-700 mb-6 flex-1">
                Are you searching for the professional IT Solutions Provider? Well
                here’s the perfect place to get all the services done for you.
              </p>
          </div>
          {/* <ul className="list-disc list-inside text-gray-700 max-w-3xl">
            <li>Industry-certified experts</li>
            <li>Custom solutions for SMBs and Enterprises</li>
            <li>Fast logistics and professional support</li>
          </ul> */}
        </section>

        {/* Products & Services Section */}
        <section className="py-20 bg-white">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Our Core Offerings
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-2">Switches & Routers</h3>
              <p className="text-gray-600">
                High-performance, scalable, and secure network hardware from top
                brands.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-2">Structured Cabling</h3>
              <p className="text-gray-600">
                Design and installation of Cat6/Cat7 cabling for efficient data
                flow.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow hover:shadow-md transition">
              <h3 className="text-xl font-bold mb-2">Wireless Solutions</h3>
              <p className="text-gray-600">
                Enterprise-grade Wi-Fi setups for seamless connectivity.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20 bg-gray-50">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
            <div className="flex flex-col items-center">
              <span className="text-sky-500 text-4xl mb-2">✓</span>
              <p>Certified engineers and technical consultants</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sky-500 text-4xl mb-2">✓</span>
              <p>
                Access to top-tier brands: Cisco, Ubiquiti, MikroTik, and more
              </p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sky-500 text-4xl mb-2">✓</span>
              <p>Tailored solutions for any scale of business</p>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sky-500 text-4xl mb-2">✓</span>
              <p>Dedicated support and after-sales service</p>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-sky-500 text-white text-center py-20">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to upgrade your network?
          </h2>
          <p className="mb-6">
            Talk to our experts for a free consultation and quote.
          </p>
          <Link to="/contact" className="bg-white text-sky-500 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Contact Us
          </Link>
        </section>
      </div>
    </div>
  );
};
export default Home;
