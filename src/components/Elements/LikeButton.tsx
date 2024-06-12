import { PostInterface } from "../../interfaces";
import { RouteEnum } from "../../enums";
import {
  deleteALikeService,
  dislikeAPostService,
  likeAPostService,
} from "../../services";
import { useAppSelector } from "../../hooks";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

interface LikeButtonProps {
  post: PostInterface;
  setPost: Dispatch<SetStateAction<PostInterface | null>>;
}

export const LikeButton = ({ post, setPost }: LikeButtonProps) => {
  const { user } = useAppSelector((state) => state.auth);

  const navigate = useNavigate();

  function checkUser() {
    if (!user) {
      navigate(RouteEnum.LOGIN);
    }
  }

  async function handleDislike() {
    checkUser();
    if (post.likedByUser === "dislike") {
      await handleDeleteLike();
      return;
    }

    const response = await dislikeAPostService(post.postId);

    if (response) {
      updatePost("dislike", post.likedByUser === "like" ? -2 : -1);
    }
  }

  async function handleLike() {
    checkUser();
    if (post.likedByUser === "like") {
      await handleDeleteLike();
      return;
    }
    const response = await likeAPostService(post.postId);

    if (response) {
      updatePost("like", post.likedByUser === "dislike" ? 2 : 1);
    }
  }

  async function handleDeleteLike() {
    checkUser();
    if (post.likedByUser === null) return;
    const response = await deleteALikeService(post.postId);

    if (response) {
      updatePost(null, post.likedByUser === "like" ? -1 : 1);
    }
  }

  const updatePost = (
    likeStatus: "like" | "dislike" | null,
    likeCountChange: number,
  ) => {
    setPost((prevPost) => {
      if (!prevPost) return prevPost;

      return {
        ...prevPost,
        likeCount: prevPost.likeCount + likeCountChange,
        likedByUser: likeStatus,
      };
    });
  };

  return (
    <>
      <button className={"btn btn-ghost"} onClick={handleLike}>
        {post.likedByUser === "like" ? (
          <i className="bi bi-hand-thumbs-up-fill text-xl"></i>
        ) : (
          <i className="bi bi-hand-thumbs-up text-xl"></i>
        )}
      </button>
      <span>{post.likeCount}</span>
      <button className={"btn btn-ghost"} onClick={handleDislike}>
        {post.likedByUser === "dislike" ? (
          <i className="bi bi-hand-thumbs-down-fill text-xl"></i>
        ) : (
          <i className="bi bi-hand-thumbs-down text-xl"></i>
        )}
      </button>
    </>
  );
};
