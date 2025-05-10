const About = () => {
  return (
    <div className="container mx-auto px-4 py-16 space-y-20">
      {/* Intro Section */}
      <section className="text-center max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-sky-600">Why Verisette?</h2>
        <p className="text-gray-700 text-lg">
          Verisette assists organizations in aligning IT solutions with business goals and culture.
          We deliver quality-driven, cost-effective solutions that integrate legacy systems with
          modern technologies to boost efficiency and impact — all within your timeline and budget.
        </p>
      </section>

      {/* Value Proposition */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-sky-600">What Makes Us Great</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-2">
            <li>Easy-to-use, business-aligned IT solutions</li>
            <li>Integration of old and new technologies</li>
            <li>Efficiency, effectiveness, and optimized cost</li>
            <li>Deep understanding of business + IT culture</li>
          </ul>
        </div>
        <div className="bg-sky-50 rounded-xl p-6 shadow">
          <h4 className="text-xl font-bold text-sky-700 mb-2">The Verisette Advantage</h4>
          <p className="text-gray-700">
            We know what it takes to make IT initiatives successful. With decades of experience and a
            commitment to quality, we deliver great results tailored to your goals.
          </p>
        </div>
      </section>

      {/* Experience Section */}
      <section>
        <h3 className="text-2xl font-bold text-center mb-8 text-sky-600">Our Experience</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700">
          <div className="bg-white border rounded-xl p-6 shadow hover:shadow-md transition">
            <p><strong>20+ years</strong> in IT business planning, development, and integration across the U.S., Europe, and Asia.</p>
          </div>
          <div className="bg-white border rounded-xl p-6 shadow hover:shadow-md transition">
            <p>Specialized in IT solutions for <strong>Government, Finance, and Telecom</strong> industries.</p>
          </div>
          <div className="bg-white border rounded-xl p-6 shadow hover:shadow-md transition">
            <p>Expertise in IT frameworks: <strong>SDLC, CMMI, PMP</strong> and more.</p>
          </div>
          <div className="bg-white border rounded-xl p-6 shadow hover:shadow-md transition">
            <p>Proven implementations for <strong>leading Financial Firms</strong> in Thailand and across Asia.</p>
          </div>
        </div>
      </section>

      {/* Methodologies Section */}
      <section className="bg-gray-50 p-10 rounded-xl shadow-sm">
        <h3 className="text-2xl font-bold text-center mb-8 text-sky-600">Our Methodologies</h3>
        <div className="grid md:grid-cols-3 gap-6 text-gray-700">
          <div>
            <h4 className="text-lg font-semibold text-sky-500 mb-2">SDLC</h4>
            <p>
              A structured approach to software creation covering requirements, validation, training, and stakeholder ownership.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-sky-500 mb-2">CMMI</h4>
            <p>
              A framework of best practices for improving and assessing software development maturity and process performance.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold text-sky-500 mb-2">PMP</h4>
            <p>
              Recognized global standard for project management, ensuring successful delivery within budget, scope, and time.
            </p>
          </div>
        </div>
      </section>

      {/* QA Section */}
      <section className="text-center">
        <h3 className="text-2xl font-bold mb-4 text-sky-600">IT Quality Assurance (IT QA)</h3>
        <p className="text-gray-700 max-w-3xl mx-auto">
          Our QA ensures high-quality systems that meet or exceed customer expectations,
          are efficient within current infrastructure, and are cost-effective to maintain and scale.
        </p>
      </section>

      {/* Call to Action */}
      <section className="bg-sky-600 text-white text-center py-16 rounded-xl">
        <h2 className="text-3xl font-semibold mb-4">Need More Information?</h2>
        <p className="mb-6">Reach out to our team to discover how Verisette can help transform your IT landscape.</p>
        <button className="bg-white text-sky-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Contact Us
        </button>
      </section>
    </div>
  );
}
export default About