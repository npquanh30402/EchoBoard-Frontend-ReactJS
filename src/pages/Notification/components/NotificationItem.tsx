import { NotificationInterface } from "../../../interfaces";
import { useAppDispatch } from "../../../hooks";
import { MARK_READ_NOTIFICATION } from "../../../store/notificationSlice.ts";
import { markNotificationAsReadService } from "../../../services";
import { toast } from "react-toastify";

export const NotificationItem = ({
  notification,
}: {
  notification: NotificationInterface;
}) => {
  const dispatch = useAppDispatch();

  async function markAsRead() {
    const response = await markNotificationAsReadService(notification.id);

    if (response) {
      dispatch(MARK_READ_NOTIFICATION(notification.id));
      toast.success("Notification marked as read!");
    }
  }

  return (
    <>
      <div role="alert" className="alert alert-warning">
        <i className="bi bi-exclamation-diamond text-xl"></i>
        <div className={"flex flex-col"}>
          <span className={"font-bold"}>{notification.content}</span>
          <span className={"text-sm text-gray-500"}>
            {!notification.createdAt}
          </span>
        </div>
        <div>
          {/*<button className="btn btn-sm">Deny</button>*/}
          {!notification.read && (
            <button className="btn btn-sm btn-primary" onClick={markAsRead}>
              Mark as Read
            </button>
          )}
        </div>
      </div>
    </>
  );
};
