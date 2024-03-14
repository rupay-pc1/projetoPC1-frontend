import Login from "@/pages/login";
import Register from "@/pages/register";
import { createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
