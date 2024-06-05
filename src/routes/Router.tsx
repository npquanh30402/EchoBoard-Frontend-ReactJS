import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import {
  AdminPage,
  AllFriends,
  ConversationPage,
  FriendPage,
  FriendRequest,
  Homepage,
  Login,
  NotificationPage,
  PageNotFound,
  ProfilePage,
  Register,
  SentRequest,
  SettingPage,
} from "../pages";
import { AdminProtectedRoute } from "./AdminProtectedRoute.tsx";
import { RouteEnum } from "../enums";
import { AuthProtectedRoute } from "./AuthProtectedRoute.tsx";

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
        path: RouteEnum.NOTIFICATION,
        element: <NotificationPage />,
      },
      {
        path: RouteEnum.PROFILE,
        element: (
          <AuthProtectedRoute>
            <ProfilePage />
          </AuthProtectedRoute>
        ),
      },
      {
        path: RouteEnum.FRIEND,
        element: (
          <AuthProtectedRoute>
            <FriendPage />
          </AuthProtectedRoute>
        ),
        children: [
          {
            path: RouteEnum.All_FRIEND,
            element: <AllFriends />,
          },
          {
            path: RouteEnum.FRIEND_REQUEST,
            element: <FriendRequest />,
          },
          {
            path: RouteEnum.SENT_REQUEST,
            element: <SentRequest />,
          },
        ],
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
        path: RouteEnum.SETTINGS,
        element: (
          <AuthProtectedRoute>
            <SettingPage />
          </AuthProtectedRoute>
        ),
      },
      {
        path: "/*",
        element: <PageNotFound />,
      },
    ],
  },
]);
