import axios from "axios";
import { toast } from "react-toastify";

export async function createACommentService(postId: string, formData: object) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL + `/api/comments/${postId}/create`,
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

export async function fetchCommentListService(
  postId: string,
  formData: object,
) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL +
        `/api/comments/get-all-comments/${postId}`,
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

export async function fetchReplyListService(
  commentId: string,
  formData: object,
) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_SERVER_URL +
        `/api/comments/get-all-replies/${commentId}`,
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
