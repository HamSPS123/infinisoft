import { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import PageTransition from "../components/common/PageTransition";
import SectionTransition from "../components/common/SectionTransition";
import FadeInElement from "../components/common/FadeInElement";
import {
  FiArrowRight,
  FiCheck,
  FiSettings,
  FiShield,
  FiSmartphone,
  FiDownload,
} from "react-icons/fi";
// import images from "../constants/images";
import SEO from "../components/SEO";
import { usePartnerStore } from "../stores/partnerStore";
import images from "../constants/images";

const Home = () => {
  const { partners, fetchPartners } = usePartnerStore();
  const navigator = useNavigate();
  // const partners = [
  //   {
  //     name: "S.HIGH METAL ENGINEERING CO.,LTD",
  //     logo: images.partner2,
  //   },
  //   {
  //     name: "Vientiane Trading Export-Import Sole Co.,LTD",
  //     logo: images.partner3,
  //   },
  //   {
  //     name: "Everfocus",
  //     logo: images.partner1,
  //   },
  //   {
  //     name: "VRCOMM Co. Ltd",
  //     logo: images.partner5,
  //   },
  //   {
  //     name: "Vinas Tec",
  //     logo: images.partner4,
  //   },
  //   {
  //     name: "GSM Banking",
  //     logo: images.partner6,
  //   },
  // ];
  useEffect(() => {
    fetchPartners();
  }, []);
  return (
    <PageTransition>
      <div>
        <SEO
          title="InfiniSoft - Enterprise IT Equipment Solutions"
          description="InfiniSoft is a distribution company of leading computer hardware and equipment. We create IT solutions by integrating the best products in the market."
          keywords="IT equipment, enterprise solutions, computer hardware, network solutions, switches, routers, structured cabling, wireless solutions"
          ogImage="/images/logo.png"
        />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 min-h-[85vh] flex items-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%232d3748\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3C/svg%3E')] opacity-50 z-0"></div>
          <div className="container max-w-[1400px] mx-auto px-4 py-20 relative z-10">
            <SectionTransition>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <FadeInElement>
                    <span className="bg-blue-100 text-sky-600 px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">
                      ENTERPRISE IT SOLUTIONS
                    </span>
                  </FadeInElement>
                  <FadeInElement delay={0.1}>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
                      Transform Your <br />
                      <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">IT Infrastructure</span>
                    </h1>
                  </FadeInElement>
                  <FadeInElement delay={0.2}>
                    <p className="text-lg text-gray-300 mb-8 max-w-xl">
                      Discover enterprise-grade IT equipment and solutions from
                      leading manufacturers. Elevate your business with
                      cutting-edge technology.
                    </p>
                  </FadeInElement>
                  <FadeInElement delay={0.3}>
                    <div className="flex flex-wrap gap-4">
                      <Link
                        to="/partners"
                        className="bg-gradient-to-r from-sky-400 to-cyan-400 hover:bg-gradient-to-r hover:from-sky-600 hover:to-cyan-600 text-white px-8 py-4 rounded-lg font-semibold transition-all flex items-center shadow-lg hover:shadow-xl"
                      >
                        Explore Partners <FiArrowRight className="ml-2" />
                      </Link>
                      <Link
                        to="/contact"
                        className="bg-transparent border-2 border-gray-300 text-white hover:bg-white hover:text-sky-600 px-8 py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-xl"
                      >
                        Contact Us
                      </Link>
                    </div>
                  </FadeInElement>
                </div>

                <div className="relative">
                  <FadeInElement delay={0.5} direction="left">
                    <div className="relative z-10">
                      <img
                        src={images.hero}
                        alt="Enterprise IT Equipment"
                        className="rounded-[30px] shadow-2xl w-full"
                      />
                    </div>
                  </FadeInElement>
                  <div className="blob-shape -right-20 -top-20"></div>
                </div>
              </div>
            </SectionTransition>
          </div>
        </section>
        <div className="container max-w-[1400px] mx-auto px-4">
          {/* Features Section */}
          <section className="py-24">
            <div className="container max-w-[1400px] mx-auto px-4">
              <SectionTransition>
                <div className="text-center mb-16">
                  <FadeInElement>
                    <span className="bg-gradient-to-r from-sky-100 to-cyan-100  text-sky-600 px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">
                      OUR SERVICES
                    </span>
                  </FadeInElement>
                  <FadeInElement delay={0.1}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                      Enterprise IT Solutions
                    </h2>
                  </FadeInElement>
                  <FadeInElement delay={0.2}>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      We provide comprehensive IT solutions tailored to your
                      business needs
                    </p>
                  </FadeInElement>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <FadeInElement delay={0.1}>
                    <div className="rounded-xl bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 h-full">
                      <div className="w-[60px] h-[60px] flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 mb-5">
                        <FiSettings size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">
                        Network Infrastructure
                      </h3>
                      <p className="text-gray-600">
                        Design and implementation of secure, scalable network
                        solutions including switches, routers, and wireless
                        systems.
                      </p>
                    </div>
                  </FadeInElement>

                  <FadeInElement delay={0.2}>
                    <div className="rounded-xl bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 h-full">
                      <div className="w-[60px] h-[60px] flex items-center justify-center rounded-xl bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 mb-5">
                        <FiShield size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">
                        Security Solutions
                      </h3>
                      <p className="text-gray-600">
                        Comprehensive security systems including firewalls,
                        intrusion detection, and endpoint protection for your
                        business.
                      </p>
                    </div>
                  </FadeInElement>

                  <FadeInElement delay={0.3}>
                    <div className="rounded-xl bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 h-full">
                      <div className="w-[60px] h-[60px] flex items-center justify-center rounded-xl bg-gradient-to-r from-purple-100 to-fuchsia-100 text-purple-600 mb-5">
                        <FiSmartphone size={24} />
                      </div>
                      <h3 className="text-xl font-bold mb-3 text-gray-900">
                        Enterprise Hardware
                      </h3>
                      <p className="text-gray-600">
                        High-quality servers, workstations, and specialized
                        equipment from leading manufacturers with full support.
                      </p>
                    </div>
                  </FadeInElement>
                </div>
              </SectionTransition>
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-24 bg-gray-50">
            <div className="container max-w-[1400px] mx-auto px-4">
              <SectionTransition>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <div>
                    <FadeInElement>
                      <span className="bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">
                        HOW IT WORKS
                      </span>
                    </FadeInElement>

                    <FadeInElement delay={0.1}>
                      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
                        Simple Process to Get Started
                      </h2>
                    </FadeInElement>

                    <div className="space-y-8">
                      <FadeInElement delay={0.2}>
                        <div className="how-it-works-card">
                          <div className="bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">1</div>
                          <h3 className="text-xl font-bold mb-2">
                            Consultation
                          </h3>
                          <p className="text-gray-600">
                            Schedule a consultation with our IT experts to
                            discuss your business needs and requirements.
                          </p>
                        </div>
                      </FadeInElement>

                      <FadeInElement delay={0.3}>
                        <div className="how-it-works-card">
                          <div className="bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">2</div>
                          <h3 className="text-xl font-bold mb-2">
                            Solution Design
                          </h3>
                          <p className="text-gray-600">
                            Our team designs a customized IT solution tailored
                            to your specific business requirements.
                          </p>
                        </div>
                      </FadeInElement>

                      <FadeInElement delay={0.4}>
                        <div className="how-it-works-card">
                          <div className="bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">3</div>
                          <h3 className="text-xl font-bold mb-2">
                            Implementation
                          </h3>
                          <p className="text-gray-600">
                            We implement the solution with minimal disruption to
                            your business operations.
                          </p>
                        </div>
                      </FadeInElement>
                    </div>
                  </div>

                  <FadeInElement delay={0.5} direction="left">
                    <div className="relative">
                      <img
                        src="https://img.freepik.com/free-vector/isometric-server-room-digital-data-center-cloud-storage-technology-engineering-process-rack-server-database_39422-1032.jpg"
                        alt="How It Works"
                        className="rounded-xl shadow-xl w-full"
                      />
                      {/* <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 p-2 rounded-full">
                            <FiCheck size={20} />
                          </div>
                          <div>
                            <p className="font-bold">Trusted by 500+</p>
                            <p className="text-sm text-gray-500">
                              Enterprise Clients
                            </p>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </FadeInElement>
                </div>
              </SectionTransition>
            </div>
          </section>

          {/* Stats Section */}
          {/* Need to ask */}
          <section className="py-24">
            <div className="container max-w-[1400px] mx-auto px-4">
              <SectionTransition>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <FadeInElement delay={0.1}>
                    <div className="rounded-xl bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 text-center">
                      <div className="text-[2.5rem] font-bold text-sky-600 mb-2">100+</div>
                      <p className="font-medium">Enterprise Clients</p>
                    </div>
                  </FadeInElement>

                  <FadeInElement delay={0.2}>
                    <div className="rounded-xl bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 text-center">
                      <div className="text-[2.5rem] font-bold text-sky-600 mb-2">5+</div>
                      <p className="font-medium">Years Experience</p>
                    </div>
                  </FadeInElement>

                  <FadeInElement delay={0.3}>
                    <div className="rounded-xl bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 text-center">
                      <div className="text-[2.5rem] font-bold text-sky-600 mb-2">30+</div>
                      <p className="font-medium">Certified Engineers</p>
                    </div>
                  </FadeInElement>

                  <FadeInElement delay={0.4}>
                    <div className="rounded-xl bg-white shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-6 text-center">
                      <div className="text-[2.5rem] font-bold text-sky-600 mb-2">99%</div>
                      <p className="font-medium">Client Satisfaction</p>
                    </div>
                  </FadeInElement>
                </div>
              </SectionTransition>
            </div>
          </section>

          {/* Why Choose Us Section */}
          <section className="py-24 bg-gray-50">
            <div className="container max-w-[1400px] mx-auto px-4">
              <SectionTransition>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                  <FadeInElement delay={0.1} direction="right">
                    <div className="relative">
                      <img
                        src="https://img.freepik.com/free-vector/isometric-server-room-digital-data-center-cloud-storage-technology-engineering-process-rack-server-database_39422-1032.jpg"
                        alt="Why Choose Us"
                        className="rounded-xl shadow-xl w-full"
                      />
                      <div className="absolute -top-6 -left-6 bg-white p-4 rounded-lg shadow-lg">
                        <div className="flex items-center gap-3">
                          <div className="bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 p-2 rounded-full">
                            <FiDownload size={20} />
                          </div>
                          <div>
                            <p className="font-bold">1000+ Projects</p>
                            <p className="text-sm text-gray-500">
                              Successfully Delivered
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeInElement>

                  <div>
                    <FadeInElement>
                      <span className="bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">
                        WHY CHOOSE US
                      </span>
                    </FadeInElement>

                    <FadeInElement delay={0.1}>
                      <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900">
                        Enterprise IT Solutions You Can Trust
                      </h2>
                    </FadeInElement>

                    <div className="space-y-6">
                      <FadeInElement delay={0.2}>
                        <div className="flex items-start gap-4">
                          <div className="bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 p-2 rounded-full mt-1">
                            <FiCheck size={20} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold mb-2">
                              Certified Engineers
                            </h3>
                            <p className="text-gray-600">
                              Our team consists of certified engineers and
                              technical consultants with years of experience.
                            </p>
                          </div>
                        </div>
                      </FadeInElement>

                      <FadeInElement delay={0.3}>
                        <div className="flex items-start gap-4">
                          <div className="bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 p-2 rounded-full mt-1">
                            <FiCheck size={20} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold mb-2">
                              Premium Partnerships
                            </h3>
                            <p className="text-gray-600">
                              Access to top-tier brands: Cisco, Ubiquiti,
                              MikroTik, and more for the best solutions.
                            </p>
                          </div>
                        </div>
                      </FadeInElement>

                      <FadeInElement delay={0.4}>
                        <div className="flex items-start gap-4">
                          <div className="bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 p-2 rounded-full mt-1">
                            <FiCheck size={20} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold mb-2">
                              24/7 Support
                            </h3>
                            <p className="text-gray-600">
                              Dedicated support and after-sales service to
                              ensure your systems run smoothly.
                            </p>
                          </div>
                        </div>
                      </FadeInElement>
                    </div>
                  </div>
                </div>
              </SectionTransition>
            </div>
          </section>

          {/* Partner Logos Section */}
          <section className="py-24 bg-white">
            <div className="container max-w-[1400px] mx-auto px-4">
              <SectionTransition>
                <div className="text-center mb-12">
                  <FadeInElement>
                    <span className="bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">
                      OUR PARTNERS
                    </span>
                  </FadeInElement>
                  <FadeInElement delay={0.1}>
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
                      Trusted Technology Partners
                    </h2>
                  </FadeInElement>
                  <FadeInElement delay={0.2}>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                      We collaborate with industry-leading brands to deliver the
                      best IT solutions
                    </p>
                  </FadeInElement>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 max-w-5xl mx-auto">
                  {partners.map((partner, index) => (
                    <FadeInElement key={index} delay={0.1 * (index + 1)}>
                      <div className="transition duration-300">
                        <img
                          src={partner.logo}
                          alt={partner.name}
                          onClick={() => navigator(`/partners/${partner.id}`)}
                          className="w-28 md:w-32 h-auto filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                        />
                      </div>
                    </FadeInElement>
                  ))}
                </div>
              </SectionTransition>
            </div>
          </section>

          {/* Call to Action Section */}
          <section className="py-24 px-4">
            <div className="container max-w-[1400px] mx-auto">
              <SectionTransition>
                <div className="bg-gradient-to-r from-sky-400 to-cyan-400 rounded-2xl py-16 px-8 md:px-16 text-white text-center relative z-10 overflow-hidden">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' viewBox=\'0 0 100 100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'%3E%3C/svg%3E')] opacity-30 z-0"></div>
                  <FadeInElement>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                      Ready to upgrade your IT infrastructure?
                    </h2>
                  </FadeInElement>
                  <FadeInElement delay={0.1}>
                    <p className="mb-8 text-lg max-w-2xl mx-auto">
                      Talk to our experts for a free consultation and quote.
                      We'll help you design the perfect solution for your
                      business needs.
                    </p>
                  </FadeInElement>
                  <FadeInElement delay={0.2}>
                    <div className="flex flex-wrap justify-center gap-4">
                      <Link
                        to="/contact"
                        className="bg-gradient-to-r from-sky-100 to-cyan-100 text-sky-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all flex items-center"
                      >
                        Get Started <FiArrowRight className="ml-2" />
                      </Link>
                      <Link
                        to="/about"
                        className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-sky-600 transition-all"
                      >
                        Learn More
                      </Link>
                    </div>
                  </FadeInElement>
                </div>
              </SectionTransition>
            </div>
          </section>
        </div>
      </div>
    </PageTransition>
  );
};
export default Home;
