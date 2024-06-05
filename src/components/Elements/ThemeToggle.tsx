import { Theme } from "../../enums";
import { useEffect, useState } from "react";

export const ThemeToggle = () => {
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
      <div>
        <button onClick={toggleTheme} className="btn btn-ghost btn-circle">
          {theme !== Theme.DARK ? (
            <i className="bi bi-brightness-high text-xl"></i>
          ) : (
            <i className="bi bi-moon text-xl"></i>
          )}
        </button>
      </div>
    </>
  );
};
