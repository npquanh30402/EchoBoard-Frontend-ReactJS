import axios from "axios";
import { toast } from "react-toastify";

export async function fetchProfileService(id: string) {
  try {
    const response = await axios.get(
      import.meta.env.VITE_SERVER_URL + "/api/profiles/" + id,
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

export async function updateProfileService(formData: object) {
  try {
    const response = await axios.patch(
      import.meta.env.VITE_SERVER_URL + "/api/profiles",
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
