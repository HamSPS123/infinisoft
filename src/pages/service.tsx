import SEO from "../components/SEO";

const Service = () => {
  const services = [
    {
      title: "IT Solutions",
      description: "Comprehensive IT infrastructure solutions including servers, storage, networking equipment, and end-user devices. We provide premium hardware from trusted brands tailored to your business requirements.",
      icon: "🖥️"
    },
    {
      title: "System Integrations",
      description: "Seamless integration of hardware, software, and network systems to create a cohesive IT environment. We ensure all components work together efficiently to maximize your technology investment.",
      icon: "🔌"
    },
    {
      title: "Project Management",
      description: "Professional oversight of IT implementations from planning to execution. Our experienced project managers ensure timely delivery, budget adherence, and quality results for all technology initiatives.",
      icon: "📊"
    },
    {
      title: "Maintenance Service",
      description: "Proactive maintenance and support services to keep your IT infrastructure running at peak performance. Our technicians provide regular system checks, updates, and rapid response to any issues.",
      icon: "🛠️"
    }
  ];

  return (
    <div className="bg-white">
      <SEO 
        title="Services - InfiniSoft IT Solutions & System Integration"  
        description="Discover our comprehensive IT services including IT Solutions, System Integrations, Project Management, and Maintenance Services for your business needs."
        keywords="IT solutions, system integration, project management, IT maintenance, business technology, network infrastructure"
        ogImage="/images/logo.png"
      />
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-cyan-50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600 mb-6">Our Services</h1>
          <p className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600 max-w-3xl mx-auto">
            InfiniSoft delivers professional IT services through our four core offerings: IT Solutions, System Integrations, Project Management, and Maintenance Services. We're your trusted technology partner for complete business success.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">What We Offer</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 flex flex-col h-full"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600 mb-3">{service.title}</h3>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600 text-sm flex-grow">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center mb-12">Our Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-sky-600 to-cyan-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
              <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600 font-bold mb-2">Consultation</h3>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600 text-sm">We assess your business needs and recommend the right equipment solutions.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-sky-600 to-cyan-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
              <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600 font-bold mb-2">Procurement</h3>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600 text-sm">We source high-quality equipment at competitive prices from trusted vendors.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-sky-600 to-cyan-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
              <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600 font-bold mb-2">Implementation</h3>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600 text-sm">Our technicians handle delivery, installation, and configuration.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-12 h-12 bg-gradient-to-r from-sky-600 to-cyan-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">4</div>
              <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600 font-bold mb-2">Support</h3>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-cyan-600 text-sm">We provide ongoing maintenance and technical support for all equipment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-sky-600 to-cyan-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-4">Ready to upgrade your IT infrastructure?</h2>
          <p className="mb-8 max-w-2xl mx-auto">Contact us today for a free consultation and discover how InfiniSoft can help your business thrive with the right technology.</p>
          <a href="/contact" className="bg-white text-sky-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition inline-block">Get Started</a>
        </div>
      </section>
    </div>
  );
}
export default Service