import { DropDownProfile } from "../Elements/DropDownProfile.tsx";
import { DropdownNavbar } from "../Elements/DropdownNavbar.tsx";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

enum Theme {
  DARK = "dark",
  LIGHT = "light",
}

export const Header = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || Theme.DARK,
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.setAttribute("class", theme);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === Theme.DARK) {
      setTheme(Theme.LIGHT);
      localStorage.setItem("theme", Theme.LIGHT);
    } else {
      setTheme(Theme.DARK);
      localStorage.setItem("theme", Theme.DARK);
    }
  };

  return (
    <>
      <header className="navbar bg-base-200 p-6">
        <div className="navbar-start">
          <DropdownNavbar />
          <Link to={"/"} className="btn btn-ghost text-2xl md:text-3xl">
            <i className="bi bi-signpost-fill"></i>
            EchoBoard
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            <li>
              <NavLink to={"/"}>Homepage</NavLink>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end flex gap-2">
          <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
            {theme !== Theme.DARK ? (
              <i className="bi bi-brightness-high text-xl"></i>
            ) : (
              <i className="bi bi-moon text-xl"></i>
            )}
          </button>
          <DropDownProfile />
        </div>
      </header>
    </>
  );
};
