import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import { AdminPage, Homepage, Login, PageNotFound, Register } from "../pages";
import { AdminProtectedRoute } from "./AdminProtectedRoute.tsx";

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
      {
        path: "/admin",
        element: (
          <AdminProtectedRoute>
            <AdminPage />
          </AdminProtectedRoute>
        ),
      },
      {
        path: "/*",
        element: <PageNotFound />,
      },
    ],
  },
]);
