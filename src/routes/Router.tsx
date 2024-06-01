import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import {
  AdminPage,
  ConversationPage,
  Homepage,
  Login,
  PageNotFound,
  Register,
} from "../pages";
import { AdminProtectedRoute } from "./AdminProtectedRoute.tsx";
import { RouteEnum } from "../enums";

export const Router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: RouteEnum.HOME,
        element: <Homepage />,
      },
      {
        path: RouteEnum.REGISTER,
        element: <Register />,
      },
      {
        path: RouteEnum.LOGIN,
        element: <Login />,
      },
      {
        path: RouteEnum.FORGOT_PASSWORD,
        element: <Homepage />,
      },
      {
        path: RouteEnum.ADMIN,
        element: (
          <AdminProtectedRoute>
            <AdminPage />
          </AdminProtectedRoute>
        ),
      },
      {
        path: RouteEnum.CONVERSATION,
        element: <ConversationPage />,
      },
      {
        path: "/*",
        element: <PageNotFound />,
      },
    ],
  },
]);
