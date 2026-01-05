import { createBrowserRouter } from 'react-router';
import MainLayout from "./layouts/main";
import DashboardLayout from "./layouts/DashboardLayout";
import About from "./pages/about";
import Contact from "./pages/contact";
import Home from "./pages/home";
import Service from "./pages/service";
import Dashboard from "./pages/dashboard";
import Login from './components/Login';
import type { RouteObject } from "react-router";
import { RequireAuth } from './components/RequireAuth';

// Dashboard components
import PartnersList from './components/dashboard/partners/PartnersList';
import PartnerForm from './components/dashboard/partners/PartnerForm';
import ProductsList from './components/dashboard/products/ProductsList';
import ProductForm from './components/dashboard/products/ProductForm';
import ProductCategories from './components/dashboard/product-category/ProductCategories';
import PartnersPage from './pages/partners';
import PartnersDetails from './pages/partners-details';
import ProductsDetails from './pages/products-details';
import CustomerDetails from './pages/customer';
import AdminCustomersPage from './pages/dashboard/Customer';
import UsersPage from './pages/dashboard/Users';
import ChangePassword from './pages/dashboard/ChangePassword';
import Profile from './pages/dashboard/Profile';
import ProjectsPage from './pages/projects';
import ProjectDetailsPage from './pages/project-details';
import Projects from './pages/dashboard/Projects';

// Routes configuration
export const routes: RouteObject[] = [
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "projects",
        element: <ProjectsPage />
      },
      {
        path: "projects/:id",
        element: <ProjectDetailsPage />
      },
      {
        path: "service",
        element: <Service />
      },
      {
        path: "partners",
        element: <PartnersPage />
      },
      {
        path: 'partners/:id',
        element: <PartnersDetails />
      },
      {
        path: 'partners/:partnerId/products/:id',
        element: <ProductsDetails />
      },
      {
        path: 'customer/:id',
        element: <CustomerDetails />
      },
      {
        path: "contact",
        element: <Contact />
      }
    ]
  },
  {
    path: "/admin",
    element: (
      <RequireAuth>
        <DashboardLayout />
      </RequireAuth>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path: "partners",
        element: <PartnersList />
      },
      {
        path: 'partners/create',
        element: <PartnerForm />
      },
      {
        path: 'partners/edit/:id',
        element: <PartnerForm />
      },
      {
        path: "products",
        element: <ProductsList />
      },
      {
        path: 'products/create',
        element: <ProductForm />
      },
      {
        path: 'products/edit/:id',
        element: <ProductForm />
      },
      {
        path: 'products/categories',
        element: <ProductCategories />
      },
      {
        path: "partners/products",
        element: <ProductsList />
      },
      {
        path: "partners/product-categories",
        element: <ProductCategories />
      },
      {
        path: "projects",
        element: <Projects />
      },
      {
        path: "customers",
        element: <AdminCustomersPage />
      },
      {
        path: "users",
        element: <UsersPage />
      },
      {
        path: 'profile',
        element: <Profile />
      },
      {
        path: 'change-password',
        element: <ChangePassword />
      },
      {
        path: "pages/404",
        element: <div className="p-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-lg text-gray-600 mb-8">Page not found</p>
          <a href="/dashboard" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Back to Dashboard</a>
        </div>
      },
    ]
  }
];

// Create router
export const router = createBrowserRouter(routes);  