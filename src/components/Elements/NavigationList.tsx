import { NavLink } from "react-router-dom";
import { RouteEnum } from "../../enums";
import { useState } from "react";
import { SearchModal } from "./SearchModal.tsx";

export const NavigationList = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <ul className="menu menu-horizontal px-1 space-x-2">
        <li>
          <NavLink to={RouteEnum.HOME}>Homepage</NavLink>
        </li>
        <li>
          <details>
            <summary>Search</summary>
            <ul className="p-2">
              <li>
                <a onClick={() => setShowModal(true)}>for Users</a>
              </li>
              <li>
                <a>for Posts</a>
              </li>
            </ul>
          </details>
        </li>
      </ul>
      {showModal && (
        <SearchModal setShowModal={setShowModal} title={"Search"} />
      )}
    </>
  );
};
