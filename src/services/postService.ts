import axios from "axios";
import { toast } from "react-toastify";

export async function createPostService(formData: object) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/api/posts",
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

export async function fetchPostService(id: string) {
  try {
    const response = await axios.get(
      import.meta.env.VITE_SERVER_URL + "/api/posts/" + id,
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
    throw error;
    // return null;
  }
}
