import axios from "axios";
import { toast } from "react-toastify";

export async function fetchMessagesService(id: string, formData: object) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/api/messages/" + id,
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

export async function storeMessagesService(formData: object) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/api/messages",
      formData,
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
