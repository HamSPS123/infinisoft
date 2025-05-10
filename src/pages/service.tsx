const Service = () => {
  const services = [
    {
      title: "IT Solutions",
      description: "Reliable infrastructure, cloud services, and support tailored to your business.",
    },
    {
      title: "System Integrations",
      description: "Seamless integration across platforms to streamline business operations.",
    },
    {
      title: "Large-Scale Software",
      description: "Robust, scalable software built for enterprises and public sector needs.",
    },
    {
      title: "Project Management",
      description: "Agile-driven execution and governance for complex IT projects.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300"
            >
              <h3 className="text-xl font-bold text-sky-600 mb-2">{service.title}</h3>
              <p className="text-gray-700 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default Service