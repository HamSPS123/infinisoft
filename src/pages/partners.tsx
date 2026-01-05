import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePartnerStore } from "../stores/partnerStore";
import { useProductStore } from "../stores/productStore";
import type { Partner } from "../types/partner";
import PartnerCard from "../components/partners/PartnerCard";
import { FiInfo, FiSearch, FiFilter, FiUsers, FiX, FiGrid, FiTrendingUp } from "react-icons/fi";
import SEO from "../components/SEO";
import { Link } from "react-router";
import "./partners.css";

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

const PartnersPage = () => {
  const { partners, fetchPartners, isLoading } = usePartnerStore();
  const { products, fetchProducts } = useProductStore();
  const [filteredPartners, setFilteredPartners] = useState<Partner[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract unique product categories from all products
  const productCategories = [
    "All",
    ...new Set(
      products
        .filter((p) => p.category?.name)
        .map((p) => p.category!.name)
    ),
  ];

  // Extract unique tags from all products
  const allTags = [
    ...new Set(
      products.flatMap((p) => p.tags || [])
    ),
  ].sort();

  useEffect(() => {
    fetchPartners();
    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...partners];

    // Apply search filter - search in partner name, description, and related products
    if (searchTerm.trim() !== "") {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter((partner) => {
        // Search in partner name and description
        const partnerMatch = 
          partner.name.toLowerCase().includes(searchLower) ||
          partner.description?.toLowerCase().includes(searchLower);

        // Search in related products (name, description, brand, model, sku)
        const productMatch = products.some((product) => {
          if (product.partnerId !== partner.id) return false;
          return (
            product.name.toLowerCase().includes(searchLower) ||
            product.description?.toLowerCase().includes(searchLower) ||
            product.brand.toLowerCase().includes(searchLower) ||
            product.model.toLowerCase().includes(searchLower) ||
            product.sku.toLowerCase().includes(searchLower)
          );
        });

        return partnerMatch || productMatch;
      });
    }

    // Apply category filter - filter by product category
    if (selectedCategory !== "All") {
      result = result.filter((partner) => {
        return products.some(
          (product) =>
            product.partnerId === partner.id &&
            product.category?.name === selectedCategory
        );
      });
    }

    // Apply tags filter - filter by product tags
    if (selectedTags.length > 0) {
      result = result.filter((partner) => {
        return products.some((product) => {
          if (product.partnerId !== partner.id) return false;
          return selectedTags.every((tag) => product.tags?.includes(tag));
        });
      });
    }

    setFilteredPartners(result);
  }, [partners, products, searchTerm, selectedCategory, selectedTags]);

  return (
    <PageTransition>
      <SEO
        title="Our Partners | Infinisoft Solutions"
        description="Discover our trusted partners and innovative products at Infinisoft Solutions"
      />
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50/30 to-slate-50 min-h-screen">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-200/20 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl -z-10" />
        
        {/* Hero Section */}
        <section className="relative py-16 overflow-hidden">
          <div className="container max-w-[1400px] mx-auto px-4">
            <SectionTransition>
              <div className="text-center mb-12">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="inline-block mb-4"
                >
                  <span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sky-500/10 to-cyan-500/10 border border-sky-500/20 rounded-full text-sky-700 font-medium text-sm">
                    <FiUsers className="w-4 h-4" />
                    Trusted by Industry Leaders
                  </span>
                </motion.div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-sky-600 via-cyan-600 to-sky-600 bg-clip-text text-transparent mb-6">
                  Our Partners
                </h1>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Collaborate with industry leaders to deliver exceptional solutions for your business needs
                </p>
              </div>
            </SectionTransition>
          </div>
        </section>

        <div className="container max-w-[1400px] mx-auto px-4 pb-12 flex flex-col lg:flex-row gap-8">

          {/* Search and Filter Section */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <SectionTransition delay={0.2}>
              <div className="sticky top-4">
                <div className="bg-white/80 backdrop-blur-sm py-6 px-6 shadow-xl border border-sky-100 rounded-2xl">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <FiFilter className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Filters</h3>
                  </div>

                  <form
                    className="relative space-y-6"
                    role="search"
                    onSubmit={(e: React.FormEvent) => e.preventDefault()}
                  >
                    {/* Search Input */}
                    <div className="relative">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Search
                      </label>
                      <div className="relative">
                        <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="search"
                          className="w-full py-3 pl-11 pr-4 border-2 border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 focus:bg-white transition-all placeholder:text-gray-400"
                          placeholder="Search partners..."
                          value={searchTerm}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchTerm(e.target.value)
                          }
                        />
                      </div>
                    </div>

                    {/* Product Category Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Categories
                      </label>
                      <div className="flex flex-wrap gap-2">
                        {productCategories.map((category, index) => (
                          <button
                            key={index}
                            type="button"
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                              selectedCategory === category
                                ? "bg-gradient-to-r from-sky-500 to-cyan-500 text-white shadow-lg shadow-sky-500/30"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                            onClick={() => setSelectedCategory(category)}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Product Tags Filter */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Tags
                      </label>
                      
                      {/* Selected Tags */}
                      {selectedTags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3 p-3 bg-gradient-to-r from-sky-50 to-cyan-50 rounded-xl border border-sky-200">
                          {selectedTags.map((tag, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-lg text-xs font-medium shadow-sm"
                            >
                              {tag}
                              <button
                                type="button"
                                onClick={() => setSelectedTags(selectedTags.filter((t) => t !== tag))}
                                className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                              >
                                <FiX size={12} />
                              </button>
                            </span>
                          ))}
                          <button
                            type="button"
                            onClick={() => setSelectedTags([])}
                            className="text-xs text-sky-600 hover:text-sky-700 font-medium underline"
                          >
                            Clear all
                          </button>
                        </div>
                      )}

                      {/* Available Tags */}
                      <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto custom-scrollbar">
                        {allTags.map((tag, index) => (
                          <button
                            key={index}
                            type="button"
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                              selectedTags.includes(tag)
                                ? "bg-sky-100 text-sky-700 border-2 border-sky-300"
                                : "bg-gray-100 text-gray-600 border border-transparent hover:bg-gray-200"
                            }`}
                            onClick={() => {
                              if (selectedTags.includes(tag)) {
                                setSelectedTags(selectedTags.filter((t) => t !== tag));
                              } else {
                                setSelectedTags([...selectedTags, tag]);
                              }
                            }}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </SectionTransition>
          </aside>

          {/* Partners Listing Section */}
          <main className="flex-1 min-w-0">
            <SectionTransition delay={0.4}>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-sky-200"></div>
                    <div className="animate-spin rounded-full h-16 w-16 border-4 border-t-sky-600 absolute top-0"></div>
                  </div>
                  <p className="mt-4 text-gray-600 font-medium">Loading partners...</p>
                </div>
              ) : filteredPartners.length === 0 ? (
                <div className="text-center py-16 max-w-lg mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-sky-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiInfo size={40} className="text-sky-600" />
                  </div>
                  <h5 className="text-2xl font-bold text-gray-900 mb-3">
                    No partners found
                  </h5>
                  <p className="text-gray-600 mb-8">
                    Try adjusting your search or filter criteria
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("All");
                      setSelectedTags([]);
                    }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-500 to-cyan-500 text-white rounded-xl font-medium hover:from-sky-600 hover:to-cyan-600 transition-all shadow-lg shadow-sky-500/30 hover:shadow-xl hover:shadow-sky-500/40"
                  >
                    <FiX size={18} />
                    Reset Filters
                  </button>
                </div>
              ) : (
                <>
                  {/* Results Header */}
                  <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-sky-100">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-cyan-500 rounded-xl flex items-center justify-center">
                          <FiGrid className="text-white" size={24} />
                        </div>
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900">
                            {selectedCategory !== "All"
                              ? `${selectedCategory} Partners`
                              : "All Partners"}
                          </h2>
                          <p className="text-gray-600 flex items-center gap-2">
                            <FiTrendingUp className="text-sky-600" size={16} />
                            {filteredPartners.length} {filteredPartners.length === 1 ? "partner" : "partners"} available
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Partners Grid */}
                  <div className="grid grid-cols-1 gap-6">
                    {filteredPartners.map((partner, index) => (
                      <FadeInElement
                        key={partner.id}
                        delay={0.05 * (index % 8)}
                      >
                        <PartnerCard partner={partner} />
                      </FadeInElement>
                    ))}
                  </div>
                </>
              )}
            </SectionTransition>
          </main>

          {/* Featured Products Sidebar */}
          <aside className="hidden xl:block w-80 flex-shrink-0">
            <SectionTransition delay={0.6}>
              <div className="sticky top-4">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-sky-100">
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-sky-500 rounded-lg flex items-center justify-center">
                      <FiTrendingUp className="text-white" size={20} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900">Featured Products</h3>
                  </div>

                  <div className="space-y-3 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                    {products.slice(0, 10).map((product, index) => (
                      <Link
                        to={`/partners/${product.partner?.id}/products/${product.id}`}
                        key={index}
                        className="group block bg-gradient-to-br from-gray-50 to-white rounded-xl overflow-hidden border border-gray-200 hover:border-sky-300 hover:shadow-lg transition-all duration-300"
                      >
                        <div className="flex gap-3 p-3">
                          <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={product.image}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              alt={product.name}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <span className="inline-block text-xs bg-gradient-to-r from-sky-500 to-cyan-500 text-white px-2 py-0.5 rounded-md mb-1">
                              {product.category?.name}
                            </span>
                            <h4 className="font-semibold text-sm text-gray-900 line-clamp-1 group-hover:text-sky-600 transition-colors">
                              {product.name}
                            </h4>
                            <p className="text-xs text-gray-500 line-clamp-1 mt-1">
                              {product.partner?.name}
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </SectionTransition>
          </aside>

          {/* Call to Action Section */}
          {/* <SectionTransition delay={0.6}>
                    <section className="container mx-auto px-4 mb-16 mt-16">
                        <div className="bg-gradient-to-br from-sky-600 to-cyan-600 py-16 rounded-2xl text-center text-white">
                            <div className="container mx-auto px-4">
                                <h2 className="text-4xl font-bold mb-4">Become Our Partner</h2>
                                <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">Join our network of industry-leading partners and grow your business with innovative solutions</p>
                                <a href="/contact" className="inline-flex items-center gap-2 bg-white text-sky-600 px-6 py-3 rounded-full font-semibold shadow-lg transition-all hover:translate-y-[-2px] hover:shadow-xl">
                                    <FiUsers size={18} />
                                    Contact Us Today
                                </a>
                            </div>
                        </div>
                    </section>
                </SectionTransition> */}
        </div>
      </div>
    </PageTransition>
  );
};

export default PartnersPage;
