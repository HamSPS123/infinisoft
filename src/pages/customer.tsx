import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import useCustomerStore from "../stores/customers.store";
import images from "../constants/images";
import { FiArrowLeft, FiGlobe } from "react-icons/fi";
import "./customer-details.css";

const CustomerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const { customer, loading, error, getCustomer } = useCustomerStore();
  const [mainImage, setMainImage] = useState<string>("");
  // Fetch customers list if it's empty
  useEffect(() => {
    if (id) {
      getCustomer(id);
    }
  }, [id]);

  // Determine main hero image
  useEffect(() => {
    if (customer?.logo) {
      setMainImage(customer.logo);
    } else if (customer?.galleries?.length) {
      setMainImage(customer.galleries[0]);
    } else {
      // fallback hero image from constants
      setMainImage(images.partnerHero);
    }
  }, [customer]);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-center">
          <div className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent" />
          <p className="mt-4 text-gray-600 font-medium">Loading customer...</p>
        </div>
      </div>
    );
  }

  // Error or not found state
  if (error || !customer) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="bg-white border border-red-200 shadow-sm rounded-lg p-6 mb-6 max-w-lg w-full text-center">
          <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-800">
            Customer Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            {error ||
              "The requested customer may have been removed or is temporarily unavailable."}
          </p>
          <Link
            to="/about"
            className="inline-flex items-center justify-center px-5 py-2 bg-gradient-to-r from-sky-600 to-sky-600 text-white rounded-md hover:from-sky-700 hover:to-sky-700 transition-colors w-full md:w-auto"
          >
            <FiArrowLeft className="mr-2" size={16} />
            Back to About Us
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="container max-w-[1400px] mx-auto py-3 px-4">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Home
                </Link>
              </li>
              <li className="inline-flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <Link
                  to="/about"
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  About Us
                </Link>
              </li>
              <li className="inline-flex items-center">
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-sm text-gray-700 font-medium">
                  {customer.name}
                </span>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="container max-w-[1400px] mx-auto px-4 py-8">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
            {/* Left: Logo and Info */}
            <div className="flex items-start gap-6 flex-1">
              <div className="flex-shrink-0">
                <img
                  src={mainImage}
                  alt={customer.name}
                  className="rounded-xl object-contain w-32 h-32 md:w-40 md:h-40 shadow-md border-2 border-gray-100"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 break-words">
                  {customer.name}
                </h1>
                {customer.website && (
                  <a
                    href={
                      customer.website.startsWith("http")
                        ? customer.website
                        : `https://${customer.website}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 transition-colors group"
                  >
                    <FiGlobe className="w-4 h-4 flex-shrink-0" />
                    <span className="text-sm md:text-base truncate group-hover:underline">
                      {customer.website}
                    </span>
                  </a>
                )}
              </div>
            </div>

            {/* Right: Back Button */}
            <div className="flex-shrink-0 w-full lg:w-auto">
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-600 to-sky-600 text-white rounded-lg hover:from-sky-700 hover:to-sky-700 transition-all shadow-sm hover:shadow-md w-full lg:w-auto"
              >
                <FiArrowLeft className="w-4 h-4" />
                <span className="text-sm font-medium">Back to About Us</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container max-w-[1400px] mx-auto px-4 py-8">
        {/* About Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
            About {customer.name}
          </h2>
          <div
            className="customer-content"
            dangerouslySetInnerHTML={{
              __html: customer.description,
            }}
          />
        </div>

        {/* Activities/Gallery Section */}
        {customer.galleries?.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200">
              Activities & Gallery
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {customer.galleries.map((img, idx) => (
                <div
                  key={idx}
                  className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50 hover:shadow-lg transition-all duration-300"
                >
                  <img
                    src={img}
                    alt={`${customer.name} gallery ${idx + 1}`}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
