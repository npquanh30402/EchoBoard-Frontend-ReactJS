import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { LOGOUT } from "../../store/authSlice.ts";
import avatarBackup from "/public/assets/images/avatar_backup.jpg";

export const DropDownProfile = () => {
  const { user, profile } = useAppSelector((state) => state.auth);

  const profileImage =
    import.meta.env.VITE_SERVER_URL + "/" + profile?.profilePictureUrl;

  const dispatch = useAppDispatch();
  return (
    <>
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src={profile?.profilePictureUrl ? profileImage : avatarBackup}
            />
          </div>
        </div>
        <ul
          tabIndex={0}
          className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
        >
          {user ? (
            <>
              <li className={"border-b mb-2 py-2"}>
                <Link to={"/profile"}>{user.username}</Link>
              </li>
              <li>
                <Link to={"/settings"}>Settings</Link>
              </li>
              <li>
                <button onClick={() => dispatch(LOGOUT())}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={"/register"}>Register</Link>
              </li>
              <li>
                <Link to={"/login"}>Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};
