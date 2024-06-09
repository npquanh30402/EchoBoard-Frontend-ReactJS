import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { LOGOUT } from "../../store/authSlice.ts";
import avatarBackup from "/src/assets/images/avatar_backup.jpg";
import { RouteEnum } from "../../enums";
import { toast } from "react-toastify";
import { logoutService } from "../../services";

export const DropDownProfile = () => {
  const { user, profile } = useAppSelector((state) => state.auth);

  const profileImage =
    import.meta.env.VITE_SERVER_URL + "/" + profile?.avatarUrl;

  const dispatch = useAppDispatch();

  async function handleLogout() {
    const response = await logoutService();

    if (response) {
      dispatch(LOGOUT());
      toast.success("Logout Successful!");
    }
  }

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
              src={profile?.avatarUrl ? profileImage : avatarBackup}
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
                <a>{user.username}</a>
              </li>
              <li>
                <Link to={RouteEnum.FRIEND}>Friends</Link>
              </li>
              <li>
                <Link to={RouteEnum.SETTINGS}>Settings</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to={RouteEnum.REGISTER}>Register</Link>
              </li>
              <li>
                <Link to={RouteEnum.LOGIN}>Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </>
  );
};
