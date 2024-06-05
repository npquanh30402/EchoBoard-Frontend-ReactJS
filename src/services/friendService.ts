import axios from "axios";
import { toast } from "react-toastify";

export async function fetchFriendshipStatusService(id: string) {
  try {
    const response = await axios.get(
      import.meta.env.VITE_SERVER_URL + `/api/friend/friendship-status/${id}`,
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

export async function sendFriendRequestService(id: string) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + `/api/friend/send-friend-request/${id}`,
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

export async function fetchFriendService(page: number, pageSize: number) {
  try {
    const response = await axios.get(
      import.meta.env.VITE_SERVER_URL +
        `/api/friend/friend-list?page=${page}&pageSize=${pageSize}`,
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
