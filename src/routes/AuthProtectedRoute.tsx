import React from "react";
import { useAppSelector } from "../hooks";
import { EmailVerificationPage, Login } from "../pages";

export const AuthProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAppSelector((state) => state.auth);

  if (user) {
    if (user.emailVerified) {
      return children;
    } else {
      return <EmailVerificationPage />;
    }
  }

  return <Login />;
};
