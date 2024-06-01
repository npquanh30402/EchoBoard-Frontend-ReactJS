import { DropdownNavbar, DropDownProfile } from "../Elements";
import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { RouteEnum } from "../../enums";

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

  const [showNavbar, setShowNavbar] = useState(true);
  const prevScrollPos = useRef(window.scrollY);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;
    const isScrollingUp = prevScrollPos.current > currentScrollPos;

    setShowNavbar(isScrollingUp);
    prevScrollPos.current = currentScrollPos;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        className={`sticky z-10 top-0 navbar bg-base-200 p-6 ${showNavbar ? "visible" : "invisible"}`}
      >
        <div className="navbar-start">
          <DropdownNavbar />
          <Link
            to={RouteEnum.HOME}
            className="btn btn-ghost text-2xl md:text-3xl"
          >
            <i className="bi bi-signpost-fill"></i>
            EchoBoard
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">
            <li>
              <NavLink to={RouteEnum.HOME}>Homepage</NavLink>
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
