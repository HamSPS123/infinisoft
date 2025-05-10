import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import { routes } from "./routes";

const router = createBrowserRouter(routes, {
  basename: "/infinisoft"
})

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}
export default App