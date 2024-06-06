import { Tab } from "./components/Tab.tsx";
import { Outlet, useNavigate } from "react-router-dom";
import { useDocumentTitle } from "../../hooks";
import { RouteEnum } from "../../enums";
import { useEffect } from "react";

export const FriendPage = () => {
  useDocumentTitle("Friends");
  const navigate = useNavigate();

  useEffect(() => {
    navigate(RouteEnum.All_FRIEND);
  }, [navigate]);

  return (
    <>
      <Tab />
      <Outlet />
    </>
  );
};
