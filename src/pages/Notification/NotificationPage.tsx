import { useAppDispatch, useAppSelector, useDocumentTitle } from "../../hooks";
import { NotificationItem } from "./components/NotificationItem.tsx";
import { useCallback, useEffect } from "react";
import {
  MARK_ALL_NOTIFICATION_AS_READ,
  SET_NOTIFICATIONS,
} from "../../store/notificationSlice.ts";
import {
  fetchNotificationListService,
  markAllNotificationAsReadService,
} from "../../services";
import { toast } from "react-toastify";

export const NotificationPage = () => {
  useDocumentTitle("Notifications");

  const { notifications, unread_count, fetchCursor, isFinished } =
    useAppSelector((state) => state.notification);

  const dispatch = useAppDispatch();

  const fetchNotificationList = useCallback(async () => {
    if (isFinished) return;

    const formData = {
      cursor: fetchCursor,
    };

    const response = await fetchNotificationListService(formData);

    if (response) {
      dispatch(SET_NOTIFICATIONS(response));
    }
  }, [dispatch, fetchCursor]);

  useEffect(() => {
    fetchNotificationList().then();
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 5 &&
        !isFinished
      ) {
        fetchNotificationList().then();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchNotificationList, isFinished]);

  async function handleMarkAllAsRead() {
    const response = await markAllNotificationAsReadService();

    if (response) {
      toast.success("All notifications marked as read!");
      dispatch(MARK_ALL_NOTIFICATION_AS_READ());
    }
  }

  return (
    <section id={"notifications"}>
      <div className={"mx-4 flex flex-col gap-2 my-8 items-center"}>
        <div className="flex justify-between md:justify-center w-full items-center mb-6">
          <div className="md:flex-grow text-center">
            <h1 className="font-bold underline underline-offset-8">
              Notifications
            </h1>
          </div>
          {unread_count > 1 && (
            <button className="btn btn-outline" onClick={handleMarkAllAsRead}>
              Mark all as read
            </button>
          )}
        </div>

        {notifications.length > 0 &&
          notifications.map((notification) => (
            <NotificationItem
              notification={notification}
              key={notification.notificationId}
            />
          ))}
      </div>
    </section>
  );
};
