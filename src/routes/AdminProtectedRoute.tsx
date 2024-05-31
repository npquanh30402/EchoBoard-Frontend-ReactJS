import React from "react";
import { useAppSelector } from "../hooks";
import { PageNotFound } from "../pages";

export const AdminProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useAppSelector((state) => state.auth);

  if (user?.isAdmin) {
    return children;
  }

  return <PageNotFound />;
};
