import { useState, useEffect } from 'react';
import { Outlet } from 'react-router';
import Sidebar from '../components/dashboard/Sidebar';
import Header from '../components/dashboard/Header';
import Breadcrumb from '../components/dashboard/Breadcrumb';

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} toggleSidebar={toggleSidebar} setToggleSidebar={setToggleSidebar} />

        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Main content */}
        <main className="@container flex-grow p-4 sm:p-6">
          {loading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="w-16 h-16 border-4 border-gray-300 border-t-green-500 rounded-full animate-spin"></div>
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
