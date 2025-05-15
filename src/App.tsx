import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { routes } from "./routes";

const router = createBrowserRouter(routes)

const App = () => {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  )
}
export default App