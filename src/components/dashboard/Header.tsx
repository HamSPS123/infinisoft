import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router';
import { FiMenu, FiSearch, FiUser, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuthStore } from '../../stores/authStore';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface HeaderProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  toggleSidebar: boolean;
  setToggleSidebar: (open: boolean) => void;
}

const Header = ({ sidebarOpen, setSidebarOpen, toggleSidebar, setToggleSidebar}: HeaderProps) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const {user, logout} = useAuthStore()
  
  const trigger = useRef<HTMLButtonElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);
  const notificationTrigger = useRef<HTMLButtonElement>(null);
  const notificationDropdown = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target as Node) ||
        trigger.current?.contains(target as Node)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!notificationDropdown.current) return;
      if (
        !notificationOpen ||
        notificationDropdown.current.contains(target as Node) ||
        notificationTrigger.current?.contains(target as Node)
      )
        return;
      setNotificationOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [notificationOpen]);

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  return (
    <header className="sticky top-0 z-40 flex w-full bg-white drop-shadow-sm">
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-8">
        <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
          {/* Hamburger Toggle Button */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            className="z-40 block rounded-md border border-gray-200 bg-white p-1.5 shadow-sm lg:hidden"
          >
            <FiMenu size={24} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="hidden sm:block">
          <button
            onClick={() => setToggleSidebar(!toggleSidebar)}
            className="rounded-md cursor-pointer border border-gray-200 bg-white p-1.5"
          >
            <FiMenu size={24} />
          </button>
        </div>

        {/* Mobile search modal */}
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:hidden">
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setSearchOpen(false)}
            ></div>
            <div className="relative w-full max-w-md rounded-md bg-white p-4 shadow-lg">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-4 text-sm focus:border-blue-500 focus:outline-none"
                  autoFocus
                />
                <button className="absolute left-0 top-0 flex h-full w-10 items-center justify-center text-gray-500">
                  <FiSearch size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center gap-3 2xsm:gap-7">
          {/* <div className="relative">
            <button
              ref={notificationTrigger}
              onClick={() => setNotificationOpen(!notificationOpen)}
              className="relative flex h-8 w-8 items-center justify-center rounded-full border-[0.5px] border-gray-200 bg-gray-100 hover:bg-gray-200"
            >
              <span className="absolute -top-0.5 right-0 z-1 h-2 w-2 rounded-full bg-red-500">
                <span className="absolute -z-1 inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75"></span>
              </span>
              <FiBell size={18} />
            </button>

            {notificationOpen && (
              <div
                ref={notificationDropdown}
                className="absolute right-0 mt-2.5 flex w-80 flex-col rounded-md border border-gray-200 bg-white px-0 py-5 shadow-lg"
              >
                <div className="px-4 py-2">
                  <h5 className="text-sm font-medium text-gray-900">Notification</h5>
                </div>

                <ul className="flex h-auto flex-col overflow-y-auto">
                  <li>
                    <Link
                      to="#"
                      className="flex flex-col gap-2.5 border-t border-gray-200 px-4 py-3 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <h6 className="text-sm font-medium text-black">
                          Terry Franci
                        </h6>
                        <p className="text-xs text-gray-500">5 min ago</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        requests permission to change Project - Nganter App
                      </p>
                      <span className="text-xs font-medium text-blue-500">
                        Project
                      </span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="flex flex-col gap-2.5 border-t border-gray-200 px-4 py-3 hover:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <h6 className="text-sm font-medium text-black">
                          Alena Franci
                        </h6>
                        <p className="text-xs text-gray-500">8 min ago</p>
                      </div>
                      <p className="text-sm text-gray-600">
                        requests permission to change Project - Nganter App
                      </p>
                      <span className="text-xs font-medium text-blue-500">
                        Project
                      </span>
                    </Link>
                  </li>
                </ul>

                <div className="mt-auto border-t border-gray-200 px-4 py-3">
                  <Link
                    to="#"
                    className="flex justify-center rounded-md border border-blue-500 py-2 px-4 text-sm font-medium text-blue-500 hover:bg-blue-500 hover:text-white"
                  >
                    View All Notification
                  </Link>
                </div>
              </div>
            )}
          </div> */}

          <div className="relative">
            <button
              ref={trigger}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2"
            >
              <Avatar>
                <AvatarFallback className="bg-sky-500 text-white">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-left lg:block">
                <span className="block text-sm font-medium text-black">
                  {user?.name}
                </span>
                <span className="block text-xs text-gray-500">
                  {user?.email}
                </span>
              </span>

             
            </button>

            {/* User dropdown */}
            {dropdownOpen && (
              <div
                ref={dropdown}
                className="absolute right-0 mt-4 flex w-62.5 flex-col rounded-md border border-gray-200 bg-white px-0 py-5 shadow-lg"
              >
                <ul className="flex flex-col gap-2 border-b border-gray-200 px-4 pb-5">
                  <li>
                    <Link
                      to="/admin/profile"
                      className="flex items-center gap-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-500"
                    >
                      <FiUser size={16} />
                      Edit profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/admin/change-password"
                      className="flex items-center gap-3 py-2 text-sm font-medium text-gray-600 hover:text-blue-500"
                    >
                      <FiSettings size={16} />
                      Change password
                    </Link>
                  </li>
                </ul>
                <div className="px-4 pt-4">
                  <button onClick={logout} className="flex items-center gap-3 py-2 text-sm font-medium text-gray-600 hover:text-red-500">
                    <FiLogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
