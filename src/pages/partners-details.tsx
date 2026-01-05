/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router";
import { usePartnerStore } from "../stores/partnerStore";
import { useProductStore } from "../stores/productStore";
import { FiArrowLeft, FiGlobe } from "react-icons/fi";
import images from "../constants/images";
import './partner-details.css'

// Helper function removed as it's no longer needed

// Helper function to group products by category
const groupProductsByCategory = (products: any[]) => {
  return products.reduce((acc, product) => {
    const categoryName = product.category?.name || 'Uncategorized';
    if (!acc[categoryName]) {
      acc[categoryName] = [];
    }
    acc[categoryName].push(product);
    return acc;
  }, {});
};

const PartnersDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Get partner and product data from stores
  const { 
    currentPartner, 
    isLoading: partnerLoading, 
    error: partnerError, 
    fetchPartnerById 
  } = usePartnerStore();
  
  const { 
    products, 
    isLoading: productsLoading, 
    fetchProducts 
  } = useProductStore();

  // Fetch partner data when component mounts
  useEffect(() => {
    if (id) {
      fetchPartnerById(id);
      fetchProducts();
    }
  }, [id, fetchPartnerById, fetchProducts]);

  // Filter products by partner ID
  const partnerProducts = products.filter(product => product.partnerId === id);
  
  // Group products by category
  const productsByCategory = useMemo(() => {
    return groupProductsByCategory(partnerProducts);
  }, [partnerProducts]);

  // Loading state
  if (partnerLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em]" role="status">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (partnerError || !currentPartner) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="bg-white rounded-lg shadow-md p-6 text-center">
          <p className="text-xl text-red-600 mb-4">
            {partnerError || "Partner not found"}
          </p>
          <Link to="/partners" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            <FiArrowLeft className="mr-2" size={16} />
            Back to Partners
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section with Background Image */}
      <div 
        className="relative bg-cover bg-center text-white h-[30%]" 
        style={{
          backgroundImage: images.partnerHero ? 
            `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${images.partnerHero})` : 
            'linear-gradient(to right, #1e40af, #3730a3)',
          minHeight: '400px'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70"></div>
        <div className="container max-w-[1400px] mx-auto px-4 py-16 relative z-10 flex flex-col h-full justify-end">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between">
            <div className="mb-6 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">{currentPartner.name}</h1>
              <div className="flex flex-wrap gap-2 mb-4">
                
                {currentPartner.website && (
                  <a 
                    href={currentPartner.website.startsWith('http') ? currentPartner.website : `https://${currentPartner.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-white/20 hover:bg-white/30 text-white text-xs px-2 py-1 rounded-full transition-colors"
                  >
                    <FiGlobe className="mr-1" size={14} />
                    Website
                  </a>
                )}
              </div>
              {currentPartner.description && (
                <p className="text-white/90 max-w-2xl text-lg drop-shadow-md">{currentPartner.description}</p>
              )}
            </div>
            <div className="self-start">
              <Link to="/partners" className="inline-flex items-center px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-md transition-colors">
                <FiArrowLeft className="mr-2" size={16} />
                Back to Partners
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-[1400px] min-h-screen mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Content and Products */}
          <div className="flex flex-col gap-y-2">
            {/* Partner content */}
            {currentPartner.content && (
              <div className="rounded-lg p-6 mb-6">
                <div className="prose partner-details-page prose-slate max-w-none" dangerouslySetInnerHTML={{ __html: currentPartner.content }} />
              </div>
            )}

            {/* Partner products */}
            <div className="rounded-lg bg-white p-6">
            <div className="text-2xl font-bold mb-4">Products</div>
              
              {productsLoading ? (
                <div className="flex justify-center p-8">
                  <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em]" role="status">
                    <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                  </div>
                </div>
              ) : partnerProducts.length > 0 ? (
                <div className="space-y-8">
                  {Object.entries(productsByCategory).map(([category, products]) => (
                    <div key={category} className="mb-8">
                      <h3 className="text-xl font-medium text-gray-800 mb-4 bg-gray-50 p-2 rounded">{category}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {(products as any[]).map((product) => (
                          <Link
                          to={`/partners/${product.partner?.id}/products/${product.id}`}
                          key={product.id}
                          className="bg-white rounded-xl flex gap-x-2 w-full h-32 overflow-hidden shadow cursor-pointer hover:shadow-md transition-shadow"
                        >
                          <div className="w-32">
                            <img
                              src={product.image}
                              className="w-32 object-contain h-full"
                              alt="product"
                            />
                          </div>
                          <div className="p-4">
                            <span className="text-xs truncate max-w-[100px] bg-gradient-to-r from-sky-50 to-cyan-50 text-sky-600 px-2 py-1 rounded-full">
                              {product.category?.name}
                            </span>
                            <div className="text-base font-semibold">
                              {product.name}
                            </div>
                            <div className="text-gray-600 text-sm line-clamp-2">
                              {product.description}
                            </div>
                          </div>
                        </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-8 text-center text-gray-500">
                  No products available for this partner.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnersDetails;