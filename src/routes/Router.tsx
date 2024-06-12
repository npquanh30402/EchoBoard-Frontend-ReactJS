import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import {
  AcceptedFriends,
  AdminPage,
  ConversationPage,
  CreatePostPage,
  EmailVerificationStatusPage,
  FriendPage,
  FriendRequest,
  GlobalChatPage,
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
import { ChatItem } from "../pages/Conversation/components/ChatItem.tsx";
import { PostPage } from "../pages/Post/PostPage.tsx";
import { ViewPostPage } from "../pages/Post/ViewPostPage.tsx";
import { GuestProtectedRoute } from "./GuestProtectedRoute.tsx";

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
        element: (
          <GuestProtectedRoute>
            <Register />
          </GuestProtectedRoute>
        ),
      },
      {
        path: RouteEnum.LOGIN,
        element: (
          <GuestProtectedRoute>
            <Login />
          </GuestProtectedRoute>
        ),
      },
      {
        path: RouteEnum.FORGOT_PASSWORD,
        element: (
          <GuestProtectedRoute>
            <Homepage />
          </GuestProtectedRoute>
        ),
      },
      {
        path: RouteEnum.POST,
        element: (
          <AuthProtectedRoute>
            <PostPage />
          </AuthProtectedRoute>
        ),
        children: [
          {
            path: RouteEnum.CREATE_POST,
            element: <CreatePostPage />,
          },
          {
            path: ":postId",
            element: <ViewPostPage />,
          },
        ],
      },
      {
        path: RouteEnum.NOTIFICATION,
        element: (
          <AuthProtectedRoute>
            <NotificationPage />
          </AuthProtectedRoute>
        ),
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
            element: <AcceptedFriends />,
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
        element: (
          <AuthProtectedRoute>
            <ConversationPage />
          </AuthProtectedRoute>
        ),
        children: [
          {
            path: ":conversationId",
            element: <ChatItem />,
          },
        ],
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
        path: RouteEnum.GLOBAL_CHAT,
        element: (
          <AuthProtectedRoute>
            <GlobalChatPage />
          </AuthProtectedRoute>
        ),
      },
      {
        path: "/verification-status",
        element: (
          // <GuestProtectedRoute>
          <EmailVerificationStatusPage />
          // </GuestProtectedRoute>
        ),
      },
      {
        path: "/*",
        element: <PageNotFound />,
      },
    ],
  },
]);
