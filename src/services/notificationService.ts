import axios from "axios";
import { toast } from "react-toastify";

export async function fetchNotificationUnreadCountService() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_SERVER_URL +
        "/api/notification/notification-unread-count",
      {
        withCredentials: true,
      },
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    // @ts-ignore
    toast.error(error.response.data);
    return null;
  }
}

export async function fetchNotificationListService(formData: object) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/api/notification",
      formData,
      {
        withCredentials: true,
      },
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    // @ts-ignore
    toast.error(error.response.data);
    return null;
  }
}

export async function markNotificationAsReadService(id: string) {
  try {
    const response = await axios.patch(
      import.meta.env.VITE_SERVER_URL + "/api/notification/mark-as-read/" + id,
      {},
      {
        withCredentials: true,
      },
    );

    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    // @ts-ignore
    toast.error(error.response.data);
    return null;
  }
}
