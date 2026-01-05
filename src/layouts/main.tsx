import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet, useLocation } from "react-router";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../components/common/PageTransition";
import { useEffect } from "react";
import { MdArrowUpward } from "react-icons/md";

const MainLayout = () => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      <Header />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </AnimatePresence>
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 flex items-center justify-center p-2 bg-blue-100 rounded cursor-pointer shadow-md"
        >
          <MdArrowUpward className="text-blue-500" />
        </button>
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
