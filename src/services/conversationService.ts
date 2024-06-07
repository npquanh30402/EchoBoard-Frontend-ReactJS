import axios from "axios";
import { toast } from "react-toastify";

export async function fetchConversationListService() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_SERVER_URL + `/api/conversation`,
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

export async function createConversationService(formData: object) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/api/conversation/",
      formData,
      {
        withCredentials: true,
      },
    );

    if (response.status === 201) {
      toast.success("Register successfully!");
      return response.data;
    }
  } catch (error) {
    // @ts-ignore
    toast.error(error.response.data);
    return null;
  }
}
