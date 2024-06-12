import React from "react";
import { useAppSelector } from "../hooks";
import { Homepage } from "../pages";

export const GuestProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAppSelector((state) => state.auth);

  if (user) {
    return <Homepage />;
  }

  return children;
};
