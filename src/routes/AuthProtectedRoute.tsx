import React from "react";
import { useAppSelector } from "../hooks";
import { Login } from "../pages";

export const AuthProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAppSelector((state) => state.auth);

  if (user) {
    return children;
  }

  return <Login />;
};
