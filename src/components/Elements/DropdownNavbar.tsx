import { NavLink } from "react-router-dom";
import { RouteEnum } from "../../enums";

export const DropdownNavbar = () => {
  return (
    <>
      <div className="dropdown">
        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
          <i className="bi bi-menu-button text-xl"></i>
        </div>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <NavLink to={RouteEnum.HOME}>Homepage</NavLink>
          </li>
          <li>
            <a>Post</a>
            <ul className="p-2">
              <li>
                <NavLink to={RouteEnum.POST + "/" + RouteEnum.CREATE_POST}>
                  Create a Post
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to={RouteEnum.GLOBAL_CHAT}>Global Chat</NavLink>
          </li>
        </ul>
      </div>
    </>
  );
};
