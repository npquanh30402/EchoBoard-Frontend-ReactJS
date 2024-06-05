import { useAppDispatch, useAppSelector, useDocumentTitle } from "../../hooks";
import { NotificationItem } from "./components/NotificationItem.tsx";
import { useEffect, useState } from "react";
import { SET_NOTIFICATIONS } from "../../store/notificationSlice.ts";
import { fetchNotificationListService } from "../../services";

export const NotificationPage = () => {
  useDocumentTitle("Notifications");
  const { notifications, fetchCursor } = useAppSelector(
    (state) => state.notification,
  );
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    const formData = {
      cursor: fetchCursor,
    };

    const response = await fetchNotificationListService(formData);

    if (response) {
      dispatch(SET_NOTIFICATIONS(response));
      setHasMore(response.length > 0);
      setLoading(false);
    }
  }

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 5 &&
        !loading &&
        hasMore
      ) {
        fetchData();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchData, hasMore, loading]);

  return (
    <section id={"notifications"}>
      <div className={"mx-4 flex flex-col gap-2 my-4 items-center"}>
        <h1 className={"font-bold text-2xl underline underline-offset-8 mb-6"}>
          Notifications
        </h1>
        {notifications.length > 0 &&
          notifications.map((notification) => (
            <NotificationItem
              notification={notification}
              key={notification.id}
            />
          ))}
      </div>
    </section>
  );
};
