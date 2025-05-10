
import MainLayout from "./layouts/main";
import About from "./pages/about";
import Contact from "./pages/contact";
import Home from "./pages/home";
import Service from "./pages/service";
import type { RouteObject } from "react-router";

export const routes: RouteObject[] = [
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
          path: "service",
          element: <Service />
        },
        {
          path: "contact",
          element: <Contact />
        }
      ]
    }
  ]