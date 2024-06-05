import { RouteEnum } from "../../enums";
import { Link } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
  useCustomWebsocket,
} from "../../hooks";
import { useEffect } from "react";
import {
  ADD_NOTIFICATION,
  SET_UNREAD_COUNT,
} from "../../store/notificationSlice.ts";
import { fetchNotificationUnreadCountService } from "../../services";

export const NotificationHeader = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { unread_count } = useAppSelector((state) => state.notification);

  const dispatch = useAppDispatch();

  const { lastJsonMessage } = useCustomWebsocket(
    import.meta.env.VITE_WEBSOCKET_URL +
      `/api/notification/private-notification/${user?.id}`,
    "Private Notification",
  );

  useEffect(() => {
    async function fetchData() {
      const response = await fetchNotificationUnreadCountService();

      if (response) {
        dispatch(SET_UNREAD_COUNT(response));
      }
    }

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (lastJsonMessage !== null) {
      dispatch(ADD_NOTIFICATION(lastJsonMessage));
    }
  }, [dispatch, lastJsonMessage]);

  return (
    <div>
      <Link to={RouteEnum.NOTIFICATION} className="btn btn-ghost btn-circle">
        <div className={"indicator"}>
          <i className="bi bi-bell text-xl"></i>
          {unread_count > 0 && (
            <span className="badge badge-sm indicator-item bg-red-500 text-white">
              {unread_count}
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};
