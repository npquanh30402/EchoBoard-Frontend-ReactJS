import { NotificationInterface } from "../../../interfaces";
import { useAppDispatch } from "../../../hooks";
import { MARK_READ_NOTIFICATION } from "../../../store/notificationSlice.ts";
import { markNotificationAsReadService } from "../../../services";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import { useEffect, useState } from "react";

export const NotificationItem = ({
  notification,
}: {
  notification: NotificationInterface;
}) => {
  const [dateCreated, setDateCreated] = useState<string>();
  const dispatch = useAppDispatch();

  async function markAsRead() {
    const response = await markNotificationAsReadService(
      notification.notificationId!,
    );

    if (response) {
      dispatch(MARK_READ_NOTIFICATION(notification.notificationId));
      toast.success("Notification marked as read!");
    }
  }

  const notificationStyles: {
    [key: string]: {
      alertClass: string;
      iconClass: string;
    };
  } = {
    friend_request: {
      alertClass: "",
      iconClass: "bi bi-person-add",
    },
    account_activity: {
      alertClass: "alert-warning",
      iconClass: "bi bi-exclamation-diamond",
    },
    default: {
      alertClass: "",
      iconClass: "bi bi-bell",
    },
  };

  const { alertClass, iconClass } =
    notificationStyles[notification.notificationType] ||
    notificationStyles.default;

  useEffect(() => {
    if (notification.createdAt) {
      setDateCreated(
        formatDistanceToNow(new Date(notification.createdAt), {
          addSuffix: true,
        }),
      );
    }
  }, [notification.createdAt]);

  return (
    <div role="alert" className={`alert ${alertClass}`}>
      <i className={`${iconClass} text-xl`}></i>
      <div className="flex flex-col">
        <span className="font-bold">{notification.notificationContent}</span>
        <div className="text-xs">{dateCreated}</div>
      </div>
      <div>
        {!notification.isRead && (
          <button className="btn btn-sm btn-primary" onClick={markAsRead}>
            Mark as Read
          </button>
        )}
      </div>
    </div>
  );
};
