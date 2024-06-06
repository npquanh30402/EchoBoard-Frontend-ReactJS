import axios from "axios";
import { toast } from "react-toastify";

export async function acceptFriendRequestService(id: string) {
  try {
    const response = await axios.patch(
      import.meta.env.VITE_SERVER_URL +
        `/api/friend/accept-friend-request/${id}`,
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

export async function fetchFriendshipStatusService(id: string) {
  try {
    const response = await axios.get(
      import.meta.env.VITE_SERVER_URL + `/api/friend/friendship-status/${id}`,
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

export async function sendFriendRequestService(id: string) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + `/api/friend/send-friend-request/${id}`,
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

export async function deleteRequestSentService(id: string) {
  try {
    const response = await axios.delete(
      import.meta.env.VITE_SERVER_URL + `/api/friend/delete-request-sent/${id}`,
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

export async function fetchFriendRequestService(formData: object) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + `/api/friend/friend-request`,
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

export async function fetchRequestSentService(formData: object) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + `/api/friend/request-sent`,
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

export async function fetchFriendService(formData: object) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + `/api/friend/friend-list`,
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
