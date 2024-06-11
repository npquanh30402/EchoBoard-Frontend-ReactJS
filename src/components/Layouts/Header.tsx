import {
  DropdownNavbar,
  DropDownProfile,
  WebSocketInitialization,
} from "../Elements";
import { Link, NavLink } from "react-router-dom";
import { RouteEnum } from "../../enums";
import { ThemeToggle } from "../Elements/ThemeToggle.tsx";
import { NotificationHeader } from "../Elements/NotificationHeader.tsx";
import { useAppSelector } from "../../hooks";
import { useEffect, useState } from "react";
import { SearchModal } from "../Elements/SearchModal.tsx";
import { ConversationHeader } from "../Elements/ConversationHeader.tsx";

export const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);

  const [scrollDirection, setScrollDirection] = useState("up");
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`sticky z-10 top-0 navbar bg-base-200 p-6 transition duration-300 ease-in-out ${scrollDirection === "down" ? "-translate-y-full" : ""}`}
      >
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
            className={
              "btn btn-ghost bi bi-search text-xl cursor-pointer hidden md:block"
            }
            onClick={() => setShowModal(true)}
          ></button>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-2">
            <li>
              <NavLink to={RouteEnum.HOME}>Homepage</NavLink>
            </li>
            <li>
              <details>
                <summary>Post</summary>
                <ul className="p-2">
                  <li>
                    <NavLink to={RouteEnum.POST + "/" + RouteEnum.CREATE_POST}>
                      Create a Post
                    </NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <NavLink to={RouteEnum.GLOBAL_CHAT}>Global Chat</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end flex md:gap-2">
          {user && <ConversationHeader />}
          {user && <NotificationHeader />}
          <ThemeToggle />
          <DropDownProfile />
        </div>
      </header>
      {showModal && (
        <SearchModal setShowModal={setShowModal} title={"Search"} />
      )}
      {user && <WebSocketInitialization />}
    </>
  );
};
