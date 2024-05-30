import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import { Homepage } from "../pages/Home/Homepage.tsx";
import { Register } from "../pages/Auth/Register.tsx";
import { Login } from "../pages/Auth/Login.tsx";

export const Router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/forgot-password",
        element: <Homepage />,
      },
    ],
  },
]);
