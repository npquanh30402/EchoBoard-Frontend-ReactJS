import axios from "axios";
import { toast } from "react-toastify";

export async function loginService(formData: object) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/api/auth/login",
      formData,
      {
        withCredentials: true,
      },
    );

    if (response.status === 200) {
      toast.success("Login successfully!");
      return response.data;
    }
  } catch (error) {
    // @ts-ignore
    toast.error(error.response.data);
    return null;
  }
}

export async function registerService(formData: object) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/api/auth/register",
      formData,
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

export async function logoutService() {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + "/api/auth/logout",
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
