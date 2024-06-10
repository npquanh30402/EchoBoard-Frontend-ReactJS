import axios from "axios";
import { toast } from "react-toastify";

export async function likeAPostService(id: string) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/api/like/" + id + "/like",
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

export async function dislikeAPostService(id: string) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/api/like/" + id + "/dislike",
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

export async function deleteALikeService(id: string) {
  try {
    const response = await axios.delete(
      import.meta.env.VITE_SERVER_URL + "/api/like/" + id,
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
