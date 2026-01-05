import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router";
import {
  FiHome,
  FiUser,
  FiX,
  FiChevronDown,
  FiChevronUp,
  FiShoppingBag,
  FiTag,
  FiUsers
} from "react-icons/fi";
import { LuFileCheck2 } from 'react-icons/lu';

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface MenuItem {
  name: string;
  path: string;
  icon: React.ReactNode;
  items?: MenuItem[];
}

const menuItems: MenuItem[] = [
  { name: "Dashboard", path: "/admin", icon: <FiHome size={20} /> },
  { name: "Partners", path: "/admin/partners", icon: <FiUser size={20} /> },
  { name: "Projects", path: "/admin/projects", icon: <LuFileCheck2 /> },
  { name: "Products", path: "/admin/products", icon: <FiShoppingBag size={20} /> },
  { name: "Products Category", path: "/admin/products/categories", icon: <FiTag size={20} /> },
  { name: "Customers", path: "/admin/customers", icon: <FiUsers size={20} /> },
  { name: "Users", path: "/admin/users", icon: <FiUsers size={20} /> },
  // { name: "Pages", path: "/admin/pages", icon: <FiCalendar size={20} /> },
  // {
  //   name: "Partners",
  //   path: "/admin/partners",
  //   icon: <FiUser size={20} />,
  //   items: [
  //     {
  //       name: "Partners",
  //       path: "/admin/partners",
  //       icon: <FiUser size={20} />,
  //     },
  //     {
  //       name: "Products",
  //       path: "/admin/products",
  //       icon: <FiUser size={20} />,
  //     },
  //     {
  //       name: "Product Categories",
  //       path: "/admin/products/categories",
  //       icon: <FiUser size={20} />,
  //     },
  //   ],
  // },
  // {
  //   name: "Customers",
  //   path: "/admin/customers",
  //   icon: <FiUser size={20} />,
  // },
  // {
  //   name: "Settings",
  //   path: "/admin/settings",
  //   icon: <FiSettings size={20} />,
  //   items: [
  //     {
  //       name: "Users",
  //       path: "/admin/settings/users",
  //       icon: <FiUser size={20} />,
  //     },
  //   ],
  // },
];

const Menu = ({ toggleSidebar }: { toggleSidebar: boolean }) => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const location = useLocation();

  // Effect to close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenMenus({});
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const toggleMenu = (menuName: string, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the document click from immediately closing it
    setOpenMenus((prev) => {
      // If this menu is already open, close all menus
      if (prev[menuName]) {
        return {};
      }
      // Otherwise, close all other menus and open this one
      return { [menuName]: true };
    });
  };
  return (
    <ul
      className={`flex flex-col gap-2 ${
        toggleSidebar ? "px-4 md:px-5" : "px-2"
      }`}
    >
      {menuItems.map((item) => {
        if (item.items) {
          const isOpen = openMenus[item.name] || false;

          const isActive = location.pathname.startsWith(item.path);
          return (
            <li key={item.name} className="flex flex-col gap-2 relative">
              <button
                onClick={(e) => toggleMenu(item.name, e)}
                className={`flex items-center ${
                  !toggleSidebar ? "justify-center" : "justify-start"
                } cursor-pointer gap-2 py-2 rounded-md hover:bg-sky-100 hover:text-sky-500 ${
                  toggleSidebar ? "px-4" : "px-2"
                } ${isActive ? "bg-sky-100 text-sky-500" : ""}`}
              >
                {item.icon}
                {toggleSidebar && item.name}
                {toggleSidebar &&
                  (isOpen ? (
                    <FiChevronUp className="ml-auto" size={16} />
                  ) : (
                    <FiChevronDown className="ml-auto" size={16} />
                  ))}
              </button>
              <ul
                className={`flex flex-col gap-2 ${
                  !toggleSidebar
                    ? "absolute left-16 top-0 bg-white shadow-md border border-gray-200 rounded-md py-3 px-4 min-w-56 z-50"
                    : "px-4"
                } ${isOpen ? "block" : "hidden"}
                `}
              >
                {item.items.map((subItem) => {
                  return (
                    <li key={subItem.name}>
                      <NavLink
                        end
                        to={subItem.path}
                        className={({ isActive }: { isActive: boolean }) =>
                          isActive
                            ? `flex items-center ${
                                !toggleSidebar
                                  ? "justify-between"
                                  : "justify-start"
                              } gap-2 rounded-md bg-sky-100 py-2 text-sky-500 px-4`
                            : `flex items-center ${
                                !toggleSidebar
                                  ? "justify-between"
                                  : "justify-start"
                              } gap-2 rounded-md hover:bg-sky-100 hover:text-sky-500 py-2 px-4`
                        }
                      >
                        {subItem.icon}
                        {subItem.name}
                      </NavLink>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        } else {
          return (
            <li key={item.name}>
              <NavLink
                end
                to={item.path}
                className={({ isActive }: { isActive: boolean }) =>
                  isActive
                    ? `flex items-center ${
                        !toggleSidebar ? "justify-center" : "justify-start"
                      } gap-2 rounded-md bg-sky-100 py-2 text-sky-500 ${
                        toggleSidebar ? "px-4" : "px-2"
                      }`
                    : `flex items-center ${
                        !toggleSidebar ? "justify-center" : "justify-start"
                      } gap-2 rounded-md hover:bg-sky-100 hover:text-sky-500 py-2 ${
                        toggleSidebar ? "px-4" : "px-2"
                      }`
                }
              >
                {item.icon}
                {toggleSidebar && item.name}
              </NavLink>
            </li>
          );
        }
      })}
    </ul>
  );
};

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
  toggleSidebar,
}: SidebarProps) => {
  return (
    <aside
      className={`absolute left-0 top-0 border-r border-gray-200 shadow z-50 flex h-screen ${
        toggleSidebar ? "w-72" : "md:w-16"
      } flex-col bg-white duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Sidebar header */}
      <div
        className={`flex items-center justify-between gap-2 px-6 py-5 md:py-6 overflow-hidden`}
      >
        <Link to="/admin">
          <div className="flex items-center gap-2">
            {toggleSidebar ? (
              <span className="text-xl font-bold text-gray-800">
                Infini<span className="text-sky-500">soft</span>
              </span>
            ) : (
              <span className="text-xl font-bold text-gray-800">In</span>
            )}
          </div>
        </Link>

        <button
          onClick={() => setSidebarOpen(false)}
          className="block lg:hidden text-gray-800"
        >
          <FiX size={24} />
        </button>
      </div>

      {/* Sidebar menu */}
      <Menu toggleSidebar={toggleSidebar} />
    </aside>
  );
};

export default Sidebar;
