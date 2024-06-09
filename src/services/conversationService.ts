import axios from "axios";
import { toast } from "react-toastify";

export async function fetchConversationListService() {
  try {
    const response = await axios.get(
      import.meta.env.VITE_SERVER_URL + `/api/conversations`,
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

export async function fetchAConversationService(id: string) {
  try {
    const response = await axios.get(
      import.meta.env.VITE_SERVER_URL + `/api/conversations/` + id,
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

export async function createConversationService(id: string) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/api/conversations/" + id,
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
