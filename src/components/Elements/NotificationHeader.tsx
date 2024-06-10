import { RouteEnum } from "../../enums";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useEffect } from "react";
import { SET_UNREAD_COUNT } from "../../store/notificationSlice.ts";
import { fetchNotificationUnreadCountService } from "../../services";

export const NotificationHeader = () => {
  const { unreadCount } = useAppSelector((state) => state.notification);

  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      const response = await fetchNotificationUnreadCountService();

      if (response) {
        dispatch(SET_UNREAD_COUNT(response));
      }
    }

    fetchData();
  }, [dispatch]);

  return (
    <div>
      <Link to={RouteEnum.NOTIFICATION} className="btn btn-ghost btn-circle">
        <div className={"indicator"}>
          <i className="bi bi-bell text-xl"></i>
          {unreadCount > 0 && (
            <span className="badge badge-sm indicator-item bg-red-500 text-white">
              {unreadCount}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};
