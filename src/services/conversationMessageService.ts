import axios from "axios";
import { toast } from "react-toastify";

export async function fetchConversationMessagesService(
  id: string,
  formData: object,
) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/api/conversation-message/" + id,
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
