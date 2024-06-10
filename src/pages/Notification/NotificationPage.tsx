import { useAppDispatch, useAppSelector, useDocumentTitle } from "../../hooks";
import { NotificationItem } from "./components/NotificationItem.tsx";
import { useCallback, useEffect, useRef, useState } from "react";
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

  const dispatch = useAppDispatch();

  const { notifications, unreadCount, fetchCursor, hasMore } = useAppSelector(
    (state) => state.notification,
  );
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(null);

  const fetchNotificationList = useCallback(async () => {
    if (!hasMore) return;
    if (isLoading) return;

    setIsLoading(true);

    const formData = {
      cursor: fetchCursor,
    };

    const response = await fetchNotificationListService(formData);

    if (response) {
      dispatch(SET_NOTIFICATIONS(response));
      setIsLoading(false);
    }
  }, [dispatch, fetchCursor, hasMore, isLoading]);

  useEffect(() => {
    fetchNotificationList().then();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNotificationList().then();
        }
      },
      { threshold: 1.0 },
    );

    const currentRef = loadingRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchNotificationList]);

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
          {unreadCount > 1 && (
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

        <div id="loading" ref={loadingRef} className={"mt-12 text-lg"}>
          {isLoading ? (
            <p>Loading more content...</p>
          ) : !hasMore ? (
            <p>No more content to load</p>
          ) : (
            <p>Scroll down to load more content</p>
          )}
        </div>
      </div>
    </section>
  );
};
