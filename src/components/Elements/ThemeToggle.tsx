import { Theme } from "../../enums";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { SET_THEME } from "../../store/themeSlice.ts";

export const ThemeToggle = () => {
  const { theme } = useAppSelector((state) => state.theme);

  const dispatch = useAppDispatch();

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme as string);
    document.documentElement.setAttribute("class", theme as string);
  }, [theme]);

  const toggleTheme = () => {
    if (theme === Theme.DARK) {
      localStorage.setItem("theme", Theme.LIGHT);
      dispatch(SET_THEME(Theme.LIGHT));
    } else {
      localStorage.setItem("theme", Theme.DARK);
      dispatch(SET_THEME(Theme.DARK));
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
