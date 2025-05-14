import { Link } from "react-router";
import Carousal from "../components/Carousal";
import images from "../constants/images";

const Home = () => {
  const partners = [
    {
      name: 'S.HIGH METAL ENGINEERING CO.,LTD',
      logo: images.partner2
    },
    {
      name: 'Vientiane Trading Export-Import Sole Co.,LTD',
      logo: images.partner3
    },
    {
      name: 'Everfocus',
      logo: images.partner1
    },
    {
      name: 'VRCOMM Co. Ltd',
      logo: images.partner5
    },
    {
      name: 'Vinas Tec',
      logo: images.partner4
    },
    {
      name: 'GSM Banking',
      logo: images.partner6
    }
  ]
  return (
    <div>
      <Carousal />
      <div className="container mx-auto p-4">
        <section className="py-16 px-6">
          <div className="container mx-auto">
            <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
              <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                {/* Left Content */}
                <div className="flex-1">
                  <div className="inline-block px-4 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium mb-4">
                    OUR COMPANY
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                    "Successful IT Equipment Solutions <br />
                    InfiniSoft - Your Technology Partner"
                  </h2>
                  
                  <p className="text-gray-700 mb-6">
                    InfiniSoft is a distribution company of leading computer hardware and equipment. We create IT solutions by integrating the best products in the market and delivering them to the end user. We focus on Enterprise IT Equipment solutions which is today's necessity as well as the future's trend.
                  </p>
                  
                  <a href="/about" className="inline-block px-6 py-3 bg-green-600 text-white rounded-md font-medium hover:bg-green-700 transition">
                    Read More
                  </a>
                </div>
                
                {/* Right Image */}
                <div className="flex-1 flex justify-center">
                  <img 
                    src="https://img.freepik.com/free-vector/isometric-server-room-digital-data-center-cloud-storage-technology-engineering-process-rack-server-database_39422-1032.jpg" 
                    alt="Enterprise IT Equipment Solutions" 
                    className="max-w-full h-auto rounded-lg shadow-md" 
                  />
                </div>
              </div>
            </div>
          </div>
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

        {/* Partner Logos Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-8 text-gray-700">
              Our Technology Partners
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-5xl mx-auto">
              {
                partners.map((partner, index) => (
                  <div key={index} className="transition duration-300 opacity-80 hover:opacity-100">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="w-28 h-auto" 
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-sky-500 text-white text-center py-20 rounded-lg">
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
