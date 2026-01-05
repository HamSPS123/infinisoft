import { motion } from "framer-motion";
import SEO from "../components/SEO";
import { FiPhone, FiMail, FiMapPin, FiSend, FiClock } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import "./contact.css";
import { sendMailSchema, type SendMailType } from "../types/send-mail.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import api from "../config/axios";
import { toast } from "react-toastify";

// Animation components
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};

const SectionTransition = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: delay }}
    >
      {children}
    </motion.div>
  );
};

const FadeInElement = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: delay }}
    >
      {children}
    </motion.div>
  );
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SendMailType>({
    resolver: zodResolver(sendMailSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: SendMailType) => {
    try {
      const response = await api.post("/mail/contact", data);
      if (response.status === 201) {
        reset();
        toast.success("Message sent successfully");
      }
    } catch (error) {
      const errMsg =
        error instanceof Error ? error.message : "Failed to send message";
      toast.error(errMsg);
    }
  };

  const contactInfo = [
    {
      icon: <FiPhone size={24} />,
      title: "Phone",
      details: "(+856)20 58289955",
      action: "tel:+85620-58289955",
    },
    {
      icon: <FiMail size={24} />,
      title: "Email",
      details: "souksawat@infinisoft.info",
      action: "mailto:souksawat@infinisoft.info",
    },
    {
      icon: <FaWhatsapp size={24} />,
      title: "WhatsApp",
      details: "(+856)20 77898984",
      action: "https://wa.me/85620-77898984",
    },
    {
      icon: <FiClock size={24} />,
      title: "Business Hours",
      details: "Mon-Fri: 8:30AM - 5:30PM",
      action: null,
    },
  ];

  return (
    <PageTransition>
      <div className="contact-page">
        <SEO
          title="Contact InfiniSoft - Get in Touch With Our IT Solutions Team"
          description="Contact InfiniSoft for all your IT equipment and network solution needs. Our team is ready to assist with your business technology requirements."
          keywords="contact InfiniSoft, IT solutions contact, technology support, business IT help, network solutions contact"
          ogImage="/images/logo.png"
        />

        {/* Hero Section */}
        <section className="contact-hero">
          <div className="contact-hero-bg"></div>
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center relative z-10">
              <SectionTransition>
                <span className="bg-gradient-to-r from-sky-600 to-cyan-600 text-sky-50 px-4 py-1 rounded-full text-sm font-medium inline-block mb-4">
                  GET IN TOUCH
                </span>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                  Contact Infinisoft Solutions
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Ready to equip your business with the best IT hardware
                  solutions? Our team is standing by to discuss your
                  requirements and provide expert recommendations tailored to
                  your business needs.
                </p>
              </SectionTransition>
            </div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {contactInfo.map((item, index) => (
                <FadeInElement key={index} delay={0.1 * index}>
                  <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-transform duration-300 hover:-translate-y-1 h-full">
                    <div className="mb-4 text-sky-50 bg-gradient-to-r from-sky-600 to-cyan-600 p-2 rounded-full inline-block ">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-1 text-gray-800">
                      {item.title}
                    </h3>
                    {item.action ? (
                      <a
                        href={item.action}
                        className="text-sky-600 hover:text-sky-800 transition-colors"
                      >
                        {item.details}
                      </a>
                    ) : (
                      <p className="text-sky-600">{item.details}</p>
                    )}
                  </div>
                </FadeInElement>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form + Address */}
        <section className="contact-section contact-section-alt">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
              <SectionTransition>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600 mb-8">
                    Have questions about our products or services? Fill out the
                    form below and our team will get back to you as soon as
                    possible.
                  </p>

                  <form
                    className="contact-form"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block mb-2 font-medium text-gray-700">
                          Name
                        </label>
                        <input
                          type="text"
                          {...register("name")}
                          className={`contact-input ${
                            errors.name ? "border-red-500" : ""
                          }`}
                          placeholder="Your name"
                          required
                        />
                        <small className="text-red-500">
                          {errors.name?.message}
                        </small>
                      </div>
                      <div>
                        <label className="block mb-2 font-medium text-gray-700">
                          Email
                        </label>
                        <input
                          type="email"
                          {...register("email")}
                          className={`contact-input ${
                            errors.email ? "border-red-500" : ""
                          }`}
                          placeholder="your@email.com"
                          required
                        />
                        <small className="text-red-500">
                          {errors.email?.message}
                        </small>
                      </div>
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 font-medium text-gray-700">
                        Subject
                      </label>
                      <input
                        type="text"
                        {...register("subject")}
                        className="contact-input"
                        placeholder="How can we help you?"
                      />
                      <small className="text-red-500">
                        {errors.subject?.message}
                      </small>
                    </div>
                    <div className="mb-6">
                      <label className="block mb-2 font-medium text-gray-700">
                        Message
                      </label>
                      <textarea
                        {...register("message")}
                        rows={5}
                        className={`contact-input contact-textarea ${
                          errors.message ? "border-red-500" : ""
                        }`}
                        placeholder="Tell us more about your project, needs, and timeline..."
                        required
                      />
                      <small className="text-red-500">
                        {errors.message?.message}
                      </small>
                    </div>
                    <button
                      type="submit"
                      className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-2 rounded-full transition-colors"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <FiSend size={18} className="mr-2" />
                          Sending...
                        </span>
                      ) : (
                        <span className="flex items-center">
                          Send Message <FiSend size={18} className="ml-2" />
                        </span>
                      )}
                    </button>

                    {isSubmitting && (
                      <div
                        className={`mt-4 p-3 rounded-md ${
                          isSubmitting
                            ? "bg-green-50 text-green-800 border border-green-200"
                            : "bg-red-50 text-red-800 border border-red-200"
                        }`}
                      >
                        {isSubmitting}
                      </div>
                    )}
                  </form>
                </div>
              </SectionTransition>

              <SectionTransition delay={0.2}>
                <div>
                  <h2 className="text-3xl font-bold text-gray-800 mb-6">
                    Our Location
                  </h2>
                  <p className="text-gray-600 mb-6 flex items-start gap-3">
                    <span className="mt-1">
                      <FiMapPin size={20} className="text-sky-600" />
                    </span>
                    <span>
                      Thongkhankham building, 1-4th floors, thongkhankham road,
                      thongkhankham village chanthabuly District, Vientiane
                      Capital, Lao P.D.R
                    </span>
                  </p>

                  <div className="map-container">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1476.1246486510715!2d102.60758623684532!3d17.970826275831886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312469000ddaf60d%3A0x7a97dc54e7be3a5e!2sInfinisoft%20Solutions%20Company!5e0!3m2!1sen!2sth!4v1752386639188!5m2!1sen!2sth"
                      className="w-full h-96"
                      title="Infinisoft Solutions Sole Co., Ltd."
                      allowFullScreen
                      loading="lazy"
                    ></iframe>
                  </div>

                  <div className="mt-6 p-4 bg-sky-50 rounded-lg border border-sky-100">
                    <h3 className="font-semibold text-sky-800 mb-2">
                      Visit Our Office
                    </h3>
                    <p className="text-sky-700 text-sm">
                      We welcome you to visit our office during business hours.
                      Please call ahead to schedule a meeting with our team for
                      the best experience.
                    </p>
                  </div>
                </div>
              </SectionTransition>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact;
