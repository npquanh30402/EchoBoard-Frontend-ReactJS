import { Tab } from "./components/Tab.tsx";
import { Outlet } from "react-router-dom";
import { useDocumentTitle } from "../../hooks";

export const FriendPage = () => {
  useDocumentTitle("Friends");

  return (
    <>
      <Tab />
      <Outlet />
    </>
  );
};
