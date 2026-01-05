import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { routes } from "./routes";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter(routes)

const App = () => {
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </HelmetProvider>
  )
}
export default App