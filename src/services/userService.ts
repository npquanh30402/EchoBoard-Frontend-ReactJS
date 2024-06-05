import axios from "axios";
import { toast } from "react-toastify";

export async function UserSearchService(formData: object) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + `/api/user/search`,
      formData,
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
