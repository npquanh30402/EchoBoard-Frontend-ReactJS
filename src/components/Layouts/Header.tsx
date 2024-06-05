import { DropdownNavbar, DropDownProfile } from "../Elements";
import { Link } from "react-router-dom";
import { RouteEnum } from "../../enums";
import { ThemeToggle } from "../Elements/ThemeToggle.tsx";
import { NotificationLink } from "../Elements/NotificationLink.tsx";
import { useAppSelector } from "../../hooks";
import { useState } from "react";
import { SearchModal } from "../Elements/SearchModal.tsx";

export const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <header className={"sticky z-10 top-0 navbar bg-base-200 p-6"}>
        <div className="navbar-start gap-2">
          <DropdownNavbar />
          <Link
            to={RouteEnum.HOME}
            className="btn btn-ghost text-2xl md:text-3xl hidden md:block"
          >
            <div className={"flex justify-center items-center gap-2"}>
              <i className="bi bi-signpost-fill"></i>
              <span>EchoBoard</span>
            </div>
          </Link>
          {/*<form className={"form-control hidden md:block"}>*/}
          {/*  <label className="input input-bordered flex items-center gap-2">*/}
          {/*    <i className={"bi bi-search text-xl"}></i>*/}
          {/*    <input type="text" className="grow" placeholder="Search..." />*/}
          {/*  </label>*/}
          {/*</form>*/}
          <button
            className={"btn btn-ghost bi bi-search text-xl cursor-pointer"}
            onClick={() => setShowModal(true)}
          ></button>
        </div>
        <div className="navbar-end flex gap-2">
          {user && <NotificationLink user={user} />}
          <ThemeToggle />
          <DropDownProfile />
        </div>
      </header>
      {showModal && (
        <SearchModal setShowModal={setShowModal} title={"Search"} />
      )}
    </>
  );
};
