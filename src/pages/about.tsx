import { Link } from "react-router";
import images from "../constants/images";
import SEO from "../components/SEO";

const About = () => {
  const customers = [
      {
        name: 'Lao Airline',
        logo: images.customer1
      },
      {
        name: 'Ministry of Natural Resources and Environment',
        logo: images.customer2
      },
      {
        name: 'Bank of Laos',
        logo: images.customer3
      },
      {
        name: 'Philprint',
        logo: images.customer4
      }
    ]
  return (
    <div className="container mx-auto px-4 py-16 space-y-20">
      <SEO 
        title="About InfiniSoft - IT Equipment & Network Solutions Provider"
        description="Learn about InfiniSoft, a leading provider of premium IT equipment and reliable network accessories designed to enhance connectivity, performance, and scalability."
        keywords="IT equipment provider, network accessories, business IT solutions, network infrastructure, IT consulting"
        ogImage="/images/logo.png"
      />
      {/* Hero Section */}
      <section className="bg-white shadow-md py-16 px-6 sm:px-12 md:px-20">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-sky-700 mb-6">
            About Infinisoft Solutions
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            <strong>Infinisoft Solutions</strong> empowers businesses with
            premium IT equipment and reliable{" "}
            <strong>network accessories</strong> designed to enhance
            connectivity, performance, and scalability. Our mission is to
            provide essential technology infrastructure that enables
            organizations to grow with confidence in an increasingly digital
            world.
          </p>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-14 px-6 sm:px-12 md:px-20 bg-gray-100">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-2xl font-semibold text-sky-600 mb-4">
              What We Offer
            </h2>
            <p className="text-gray-700 mb-4">
              We specialize in supplying high-quality IT equipment and network
              accessories tailored to modern business needs. Whether you're
              building a new network or upgrading your infrastructure, our
              solutions ensure stability, speed, and reliability.
            </p>
            <ul className="list-disc pl-5 text-gray-700 space-y-1">
              <li>Network switches, routers, and firewalls</li>
              <li>Patch panels, Ethernet cables, and connectors</li>
              <li>Racks, enclosures, and cable management systems</li>
              <li>Enterprise laptops, desktops, and peripherals</li>
              <li>IT consulting and infrastructure support</li>
            </ul>
          </div>
          {/* <div>
            <img
              src="https://via.placeholder.com/600x400"
              alt="Network Equipment"
              className="rounded-lg shadow-lg"
            />
          </div> */}
        </div>
      </section>

      {/* Mission */}
      <section className="py-14 px-6 sm:px-12 md:px-20 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold text-sky-600 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our mission is to equip businesses with dependable IT and networking
            tools that simplify connectivity and strengthen infrastructure. We
            believe in quality, performance, and long-term partnerships with our
            clients.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      {/* <section className="py-14 px-6 sm:px-12 md:px-20 bg-sky-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Why Choose Infinisoft?
          </h2>
          <p className="text-lg mb-6">
            We are more than a supplier—we are a partner in your growth. With a
            focus on precision, quality, and technical expertise, we help
            businesses build resilient, future-proof IT ecosystems.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
            <div>
              <h3 className="text-xl font-bold">Trusted Hardware</h3>
              <p className="text-sm mt-2">
                Only the most reliable brands and certified components.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Network Expertise</h3>
              <p className="text-sm mt-2">
                Specialized in structured cabling, routing, and secure
                networking.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Customer First</h3>
              <p className="text-sm mt-2">
                Tailored solutions with responsive support and guidance.
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* <section className="py-14 px-6 sm:px-12 md:px-20 bg-sky-700 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">Why Choose Infinisoft?</h2>
        <p className="text-lg mb-6">
          Our commitment to quality, integrity, and customer satisfaction makes us a preferred partner in IT infrastructure. We work closely with every client to understand their
          unique needs and deliver customized solutions that ensure long-term value.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
          <div>
            <h3 className="text-xl font-bold">Expertise</h3>
            <p className="text-sm mt-2">Years of experience in IT hardware and business technology solutions.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Quality</h3>
            <p className="text-sm mt-2">Only trusted brands and products that meet international standards.</p>
          </div>
          <div>
            <h3 className="text-xl font-bold">Support</h3>
            <p className="text-sm mt-2">Responsive customer service and technical assistance you can count on.</p>
          </div>
        </div>
      </div>
    </section> */}

      {/* Our Customers */}
      <section className="py-16 bg-white">
          <div className="container mx-auto">
            <h2 className="text-2xl font-semibold text-center mb-8 text-gray-700">
              Our Customers
            </h2>
            <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 max-w-5xl mx-auto">
              {
                customers.map((customer, index) => (
                  <div key={index} className="transition duration-300 opacity-80 hover:opacity-100">
                    <img 
                      src={customer.logo} 
                      alt={customer.name} 
                      className="h-20 md:h-24 w-auto" 
                    />
                  </div>
                ))
              }
            </div>
          </div>
        </section>

      {/* Call to Action */}
      <section className="bg-sky-500 text-white text-center py-16 rounded-xl">
        <h2 className="text-3xl font-semibold mb-4">Need More Information?</h2>
        <p className="mb-6">
          Reach out to our team to discover how Infinisoft can help transform
          your IT landscape.
        </p>
        <Link
          to="/contact"
          className="bg-white text-sky-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Contact Us
        </Link>
      </section>
    </div>
  );
};
export default About;
