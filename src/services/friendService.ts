import axios from "axios";
import { toast } from "react-toastify";

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
