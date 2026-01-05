import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { FiChevronRight } from 'react-icons/fi';

interface BreadcrumbItem {
  label: string;
  path: string;
}

const Breadcrumb = () => {
  const location = useLocation();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  useEffect(() => {
    const generateBreadcrumbs = () => {
      const pathSegments = location.pathname.split('/').filter((segment: string) => segment);
      
      // Start with dashboard as the root
      const breadcrumbItems: BreadcrumbItem[] = [];
      
      // Add home/dashboard item
      if (pathSegments.length > 0 && pathSegments[0] === 'dashboard') {
        breadcrumbItems.push({ label: 'Dashboard', path: '/dashboard' });
      }
      
      // Add subsequent path segments
      let currentPath = '';
      for (let i = 1; i < pathSegments.length; i++) {
        currentPath += `/${pathSegments[i]}`;
        const fullPath = `/dashboard${currentPath}`;
        
        // Format the label (capitalize first letter, replace hyphens with spaces)
        const label = pathSegments[i]
          .replace(/-/g, ' ')
          .replace(/\b\w/g, (char: string) => char.toUpperCase());
        
        breadcrumbItems.push({ label, path: fullPath });
      }
      
      return breadcrumbItems;
    };
    
    setBreadcrumbs(generateBreadcrumbs());
  }, [location.pathname]);


  return (
    <div className="bg-white py-4 px-4 md:px-6 mb-6 shadow-sm">
      <div className="flex items-center space-x-2 text-sm">
        {/* <Link to="/dashboard" className="flex items-center text-gray-600 hover:text-sky-500">
          <FiHome className="mr-1" />
          Dashboard
        </Link> */}
        
        {breadcrumbs.map((breadcrumb, index) => (
          <div key={breadcrumb.path} className="flex items-center">
            
            {index === breadcrumbs.length - 1 ? (
              <span className="text-sky-500 font-medium">{breadcrumb.label}</span>
            ) : (
              <Link to={breadcrumb.path} className="text-gray-600 hover:text-sky-500">
                {breadcrumb.label}
              </Link>
            )}
            {index !== breadcrumbs.length - 1 && (
              <FiChevronRight className="text-gray-400 mx-1" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Breadcrumb;