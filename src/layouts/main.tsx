import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      <Header />
      <main className="flex-1">
          <Outlet />
      </main>
      <Footer />
    </div>
  );
};
export default MainLayout;
