const Carousal = () => {
  return (
    <section className="bg-gray-900 text-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Left Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            Infini<span className="text-sky-500">soft</span> Solutions Sole Co., Ltd.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8">
            Your professional IT Solutions Provider
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <a href="#about" className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-xl font-semibold transition">
              Get Started
            </a>
            <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="w-full md:w-1/2 mb-12 md:mb-0">
          <img
            src="/images/hero.png"
            alt="Tech Illustration"
            className="w-full max-w-md mx-auto md:mx-0"
          />
        </div>
      </div>
    </section>
  );
};
export default Carousal;
