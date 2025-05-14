const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold text-center mb-10 text-sky-600">
        Contact Us
      </h1>

      {/* Contact Info + Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Get in Touch
            </h2>
            <p className="text-gray-600">
              Ready to equip your business with the best IT hardware solutions? Our sales team is standing by to discuss your requirements and provide expert recommendations tailored to your business needs.
            </p>
          </div>

          <div className="space-y-4 text-gray-700">
            <div>
              <strong>Phone:</strong>{" "}
              <span className="block">(+856)20 58289955</span>
            </div>
            <div>
              <strong>Email:</strong>{" "}
              <span className="block">souksawat@infinisoft.info</span>
            </div>
            <div>
              <strong>Whatsapp:</strong>{" "}
              <span className="block">(+856)20 77898984</span>
            </div>
            <div>
              <strong>Address:</strong>
              <p className="mt-1">
                Thongkhankham building , 1-4th floors , thongkhankham road ,
                thongkhankham village chanthabuly District, Vientiane Capital,
                Lao P.D.R
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form className="bg-white p-6 rounded-xl shadow space-y-6">
          <div>
            <label className="block mb-1 font-medium text-gray-700">Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="your@email.com"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              Message
            </label>
            <textarea
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-sky-500"
              placeholder="How can we help you?"
            />
          </div>
          <button
            type="submit"
            className="bg-sky-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-sky-700 transition"
          >
            Send Message
          </button>
        </form>
      </div>

      {/* Optional: Map */}
      <div className="mt-20">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d948.7925635864482!2d102.6075592695423!3d17.970814274616423!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTfCsDU4JzE0LjkiTiAxMDLCsDM2JzI5LjUiRQ!5e0!3m2!1sen!2sla!4v1747193935648!5m2!1sen!2sla"
          className="w-full h-72 rounded-xl shadow"
          title="Infinisoft Solutions Sole Co., Ltd."
          allowFullScreen
          loading="lazy"
        ></iframe>
        
      </div>
    </div>
  );
};

export default Contact;
