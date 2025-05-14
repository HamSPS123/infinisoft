import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import { routes } from "./routes";

const router = createBrowserRouter(routes)

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}
export default App