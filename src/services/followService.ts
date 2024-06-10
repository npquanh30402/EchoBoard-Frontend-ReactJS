import axios from "axios";
import { toast } from "react-toastify";

export async function FetchFollowerService(id: string, formData: object) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + `/api/follow/followers/${id}`,
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

export async function FetchFollowingService(id: string, formData: object) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + `/api/follow/following/${id}`,
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

export async function followAnUserService(id: string) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + `/api/follow/${id}`,
      {},
      {
        withCredentials: true,
      },
    );

    if (response.status === 201) {
      return response.data;
    }
  } catch (error) {
    // @ts-ignore
    toast.error(error.response.data);
    return null;
  }
}

export async function unFollowAnUserService(id: string) {
  try {
    const response = await axios.delete(
      import.meta.env.VITE_SERVER_URL + `/api/follow/${id}`,
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
