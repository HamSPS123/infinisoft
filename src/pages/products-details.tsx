import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router";
import { useProductStore } from "../stores/productStore";
import images from "../constants/images";
// Import only the icons we're using
import {
  FiFileText,
  FiList,
  FiImage,
  FiShoppingBag,
  FiArrowLeft,
  FiGlobe,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
// import './products-details.css'

const ProductsDetails: React.FC = () => {
  const { partnerId, id } = useParams<{ partnerId: string; id: string }>();
  const navigate = useNavigate();
  const { fetchProductById, currentProduct, isLoading, error } =
    useProductStore();
  const [tabValue, setTabValue] = useState<number>(0);
  const [mainImage, setMainImage] = useState<string>("");
  const [thumbnailStartIndex, setThumbnailStartIndex] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [imageTransition, setImageTransition] = useState<boolean>(false);
  const thumbnailsPerView = 4;
  const autoPlayInterval = 3000; // 3 seconds
  
  const handleTabChange = (
    _event: React.MouseEvent<HTMLButtonElement>,
    newValue: number
  ) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
  }, [id, fetchProductById]);

  useEffect(() => {
    if (currentProduct?.image) {
      setMainImage(currentProduct.image);
    } else if (
      currentProduct?.productGalleries &&
      currentProduct.productGalleries.length > 0
    ) {
      setMainImage(currentProduct.productGalleries[0]);
    } else if (images.productHero) {
      setMainImage(images.productHero);
    }
  }, [currentProduct]);

  // Autoplay effect for main image
  useEffect(() => {
    if (!isAutoPlaying || !currentProduct) return;

    const allImages = [
      ...(currentProduct.image ? [currentProduct.image] : []),
      ...(currentProduct.productGalleries || [])
    ];

    if (allImages.length <= 1) return;

    const interval = setInterval(() => {
      const currentIndex = allImages.indexOf(mainImage);
      const nextIndex = (currentIndex + 1) % allImages.length;
      
      // Trigger fade animation
      setImageTransition(true);
      setTimeout(() => {
        setMainImage(allImages[nextIndex]);
        setImageTransition(false);
        
        // Update thumbnail carousel position if needed
        if (nextIndex >= thumbnailStartIndex + thumbnailsPerView) {
          setThumbnailStartIndex(nextIndex - thumbnailsPerView + 1);
        } else if (nextIndex < thumbnailStartIndex) {
          setThumbnailStartIndex(nextIndex);
        }
      }, 150);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, mainImage, currentProduct, thumbnailStartIndex, thumbnailsPerView, autoPlayInterval]);

  // Handle manual image selection (pause autoplay temporarily)
  const handleImageSelect = (image: string) => {
    setImageTransition(true);
    setTimeout(() => {
      setMainImage(image);
      setImageTransition(false);
    }, 150);
    setIsAutoPlaying(false);
    // Resume autoplay after 5 seconds
    setTimeout(() => setIsAutoPlaying(true), 5000);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-white">
        <div className="text-center">
          <div
            className="inline-block h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent align-[-0.125em]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading product details...
          </p>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !currentProduct) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
        <div className="bg-white border border-red-200 shadow-sm rounded-lg p-6 mb-6 max-w-lg w-full text-center">
          <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
            <span className="text-red-500 text-2xl">!</span>
          </div>
          <h2 className="text-xl font-bold mb-2 text-gray-800">
            Error Loading Product
          </h2>
          <p className="text-gray-600 mb-6">
            {error ||
              "Product not found. The requested product may have been removed or is temporarily unavailable."}
          </p>
          <Link
            to={partnerId ? `/partners/${partnerId}` : "/partners"}
            className="inline-flex items-center justify-center px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors w-full md:w-auto"
          >
            <FiArrowLeft className="mr-2" fontSize="small" />
            {partnerId ? "Back to Partner" : "Back to Partners"}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb navigation */}
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
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link
                    to="/partners"
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    Partners
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <Link
                    to={`/partners/${partnerId}`}
                    className="text-sm text-gray-500 hover:text-gray-700"
                  >
                    {currentProduct?.partner?.name || "Partner Details"}
                  </Link>
                </div>
              </li>
              <li>
                <div className="flex items-center">
                  <span className="mx-2 text-gray-400">/</span>
                  <span className="text-sm text-gray-700 font-medium">
                    {currentProduct.name}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Product Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container max-w-[1400px] mx-auto py-6 px-4 flex gap-6 items-start">
          <div className="w-[500px] flex-shrink-0">
            {/* Main product image - 1:1 aspect ratio */}
            <div className="aspect-square w-full overflow-hidden bg-gray-100 rounded-lg border border-gray-200 flex items-center justify-center mb-4 relative group">
              <img
                src={mainImage}
                alt={currentProduct.name}
                className={`object-contain w-full h-full p-4 transition-opacity duration-300 ${
                  imageTransition ? 'opacity-0' : 'opacity-100'
                }`}
              />
              
              {/* Autoplay indicator */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="bg-white/90 hover:bg-white border border-gray-300 rounded-full p-2 shadow-md transition-all opacity-0 group-hover:opacity-100"
                  title={isAutoPlaying ? "Pause autoplay" : "Resume autoplay"}
                >
                  {isAutoPlaying ? (
                    <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-gray-700" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Thumbnail carousel */}
            {(() => {
              const allImages = [
                ...(currentProduct.image ? [currentProduct.image] : []),
                ...(currentProduct.productGalleries || [])
              ];
              
              if (allImages.length <= 1) return null;
              
              const visibleImages = allImages.slice(
                thumbnailStartIndex,
                thumbnailStartIndex + thumbnailsPerView
              );
              const canScrollLeft = thumbnailStartIndex > 0;
              const canScrollRight = thumbnailStartIndex + thumbnailsPerView < allImages.length;
              
              return (
                <div className="relative">
                  {/* Previous button */}
                  {canScrollLeft && (
                    <button
                      onClick={() => {
                        setThumbnailStartIndex(Math.max(0, thumbnailStartIndex - 1));
                        setIsAutoPlaying(false);
                        setTimeout(() => setIsAutoPlaying(true), 5000);
                      }}
                      className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-1.5 shadow-md transition-all hover:scale-110"
                      aria-label="Previous thumbnails"
                    >
                      <FiChevronLeft className="w-4 h-4 text-gray-700" />
                    </button>
                  )}
                  
                  {/* Thumbnails */}
                  <div className="flex gap-2 px-8 transition-all duration-300">
                    {visibleImages.map((image, idx) => {
                      const actualIndex = thumbnailStartIndex + idx;
                      return (
                        <button
                          key={actualIndex}
                          onClick={() => handleImageSelect(image)}
                          className={`aspect-square w-full rounded-lg border-2 overflow-hidden transition-all duration-300 transform hover:scale-105 ${
                            mainImage === image
                              ? "border-blue-500 ring-2 ring-blue-200 scale-105"
                              : "border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`Thumbnail ${actualIndex + 1}`}
                            className="w-full h-full object-contain p-1 bg-white transition-transform duration-200"
                          />
                        </button>
                      );
                    })}
                  </div>
                  
                  {/* Next button */}
                  {canScrollRight && (
                    <button
                      onClick={() => {
                        setThumbnailStartIndex(thumbnailStartIndex + 1);
                        setIsAutoPlaying(false);
                        setTimeout(() => setIsAutoPlaying(true), 5000);
                      }}
                      className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white border border-gray-300 rounded-full p-1.5 shadow-md transition-all hover:scale-110"
                      aria-label="Next thumbnails"
                    >
                      <FiChevronRight className="w-4 h-4 text-gray-700" />
                    </button>
                  )}
                </div>
              );
            })()}
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              {currentProduct.category && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                  <FiList className="mr-1" size={14} />
                  {currentProduct.category.name}
                </span>
              )}
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                {currentProduct.name}
              </h1>
              <p className="text-gray-600 mt-2">
                SKU: <span className="font-bold">{currentProduct.sku}</span>
              </p>
              <p className="text-gray-600 mt-2">
                Brand: <span className="font-bold">{currentProduct.brand}</span>
              </p>
              <p className="text-gray-600 mt-2">
                Model: <span className="font-bold">{currentProduct.model}</span>
              </p>
              <p className="text-gray-600 mt-2 text-sm">
                Description: {currentProduct.description}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full">
            <div className="border-b border-gray-200">
              <nav className="flex overflow-x-auto max-w-[1400px] mx-auto" aria-label="Tabs">
                <button
                  onClick={(e) => handleTabChange(e, 0)}
                  className={`inline-flex items-center px-4 py-3 border-b-2 text-sm font-medium ${
                    tabValue === 0
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  aria-current={tabValue === 0 ? "page" : undefined}
                >
                  <FiFileText className="mr-2" />
                  Description
                </button>
                <button
                  onClick={(e) => handleTabChange(e, 1)}
                  className={`inline-flex items-center px-4 py-3 border-b-2 text-sm font-medium ${
                    tabValue === 1
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                  aria-current={tabValue === 1 ? "page" : undefined}
                >
                  <FiList className="mr-2" />
                  Specifications
                </button>
                {currentProduct.productGalleries &&
                  currentProduct.productGalleries.length > 0 && (
                    <button
                      onClick={(e) => handleTabChange(e, 2)}
                      className={`inline-flex items-center px-4 py-3 border-b-2 text-sm font-medium ${
                        tabValue === 2
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                      aria-current={tabValue === 2 ? "page" : undefined}
                    >
                      <FiImage className="mr-2" />
                      Gallery
                    </button>
                  )}
                {currentProduct.partner && (
                  <button
                    onClick={(e) => handleTabChange(e, 3)}
                    className={`inline-flex items-center px-4 py-3 border-b-2 text-sm font-medium ${
                      tabValue === 3
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                    aria-current={tabValue === 3 ? "page" : undefined}
                  >
                    <FiShoppingBag className="mr-2" />
                    Partner
                  </button>
                )}
              </nav>
            </div>

            {/* Tab content */}
            <div className="p-6 max-w-[1400px] mx-auto">
              {tabValue === 0 && (
                <div>
                  {currentProduct.content && (
                    <div
                      className="mt-4 prose partner-details-page prose-slate max-w-none text-gray-700"
                      dangerouslySetInnerHTML={{
                        __html: currentProduct.content,
                      }}
                    />
                  )}
                </div>
              )}

              {tabValue === 1 && (
                <div>
                  {currentProduct.specifications &&
                  currentProduct.specifications.length > 0 ? (
                    <table className="w-full border-collapse">
                      <tbody>
                        {currentProduct.specifications.map((spec, index) => (
                          <tr key={index} className="border-b border-gray-200">
                            <th className="py-3 text-left text-gray-600 w-1/3">
                              {spec.title}
                            </th>
                            <td className="py-3 text-gray-800">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <p className="text-gray-500 italic">
                      No specifications available for this product.
                    </p>
                  )}
                </div>
              )}

              {tabValue === 2 && currentProduct.productGalleries && (
                <div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {currentProduct.productGalleries.map((image, index) => (
                      <div
                        key={index}
                        className="aspect-square overflow-hidden rounded-lg bg-gray-100 border border-gray-200"
                      >
                        <img
                          src={image}
                          alt={`${currentProduct.name} - Image ${index + 1}`}
                          className="object-contain w-full h-full p-2 hover:scale-105 transition-transform cursor-pointer"
                          onClick={() => {
                            setMainImage(image);
                            setTabValue(0);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {tabValue === 3 && currentProduct.partner && (
                <div>
                  <div className="flex items-center p-4 border rounded-lg">
                    {currentProduct.partner.logo ? (
                      <img
                        src={currentProduct.partner.logo}
                        alt={currentProduct.partner.name}
                        className="w-16 h-16 rounded object-cover mr-4"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded bg-gray-200 flex items-center justify-center mr-4">
                        <span className="text-gray-400 text-xs">No logo</span>
                      </div>
                    )}
                    <div>
                      <h3 className="font-semibold text-lg">
                        {currentProduct.partner.name}
                      </h3>
                      <div className="mt-2 flex space-x-3">
                        <Link
                          to={`/partners/${
                            partnerId || currentProduct.partner?.id
                          }`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium mb-2"
                          onClick={(e) => {
                            if (!partnerId && currentProduct.partner?.id) {
                              e.preventDefault();
                              navigate(
                                `/partners/${currentProduct.partner.id}`
                              );
                            }
                          }}
                        >
                          View Partner
                        </Link>
                        {currentProduct.partner?.website && (
                          <a
                            href={
                              currentProduct.partner.website.startsWith("http")
                                ? currentProduct.partner.website
                                : `https://${currentProduct.partner.website}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
                          >
                            <FiGlobe className="mr-1" size={16} />
                            Visit Website
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
      </div>

      {/* Additional Information Section */}
      <div className="container max-w-[1400px] mx-auto py-8 px-4">
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Tags */}
          {currentProduct.tags && currentProduct.tags.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {currentProduct.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-block bg-gray-100 text-gray-800 text-xs px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-3">Product Information</h3>
            <div className="text-sm space-y-2">
              <p className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span
                  className={`font-medium ${
                    currentProduct.isActive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {currentProduct.isActive ? "Active" : "Inactive"}
                </span>
              </p>
              {currentProduct.createdAt && (
                <p className="flex justify-between">
                  <span className="text-gray-600">Added:</span>
                  <span className="font-medium">
                    {new Date(currentProduct.createdAt).toLocaleDateString()}
                  </span>
                </p>
              )}
              {currentProduct.updatedAt && (
                <p className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">
                    {new Date(currentProduct.updatedAt).toLocaleDateString()}
                  </span>
                </p>
              )}
              {currentProduct.category && (
                <p className="flex justify-between">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium">
                    {currentProduct.category.name}
                  </span>
                </p>
              )}
            </div>
          </div>

          {/* Related products placeholder */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-3">Related Products</h3>
            <p className="text-gray-500 text-sm">
              No related products available at this time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsDetails;
