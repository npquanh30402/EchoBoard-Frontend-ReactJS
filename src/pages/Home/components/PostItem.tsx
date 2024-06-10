import { PostInterface } from "../../../interfaces";
import avatarBackup from "/src/assets/images/avatar_backup.jpg";
import { formatDistanceToNow } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { RouteEnum } from "../../../enums";
import {
  deleteALikeService,
  dislikeAPostService,
  likeAPostService,
} from "../../../services";
import { useAppDispatch, useAppSelector } from "../../../hooks";
import { MODIFY_POST } from "../../../store/postSlice.ts";

export const PostItem = ({ post }: { post: PostInterface }) => {
  const { user } = useAppSelector((state) => state.auth);
  const { author } = post;

  const avatar = import.meta.env.VITE_SERVER_URL + author.avatarUrl;

  const dateCreated = formatDistanceToNow(new Date(String(post.createdAt)), {
    addSuffix: true,
  });

  const dispatch = useAppDispatch();
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
      dispatch(
        MODIFY_POST({
          ...post,
          likeCount: post.likeCount - (post.likedByUser === "like" ? 2 : 1),
          likedByUser: "dislike",
        }),
      );
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
      dispatch(
        MODIFY_POST({
          ...post,
          likeCount: post.likeCount + (post.likedByUser === "dislike" ? 2 : 1),
          likedByUser: "like",
        }),
      );
    }
  }

  async function handleDeleteLike() {
    checkUser();
    if (post.likedByUser === null) return;
    const response = await deleteALikeService(post.postId);

    if (response) {
      dispatch(
        MODIFY_POST({
          ...post,
          likeCount: post.likeCount + (post.likedByUser === "like" ? -1 : 1),
          likedByUser: null,
        }),
      );
    }
  }

  return (
    <>
      <div className="card md:w-1/2 border shadow-xl bg-base-200 hover:bg-base-100">
        <div className="card-body">
          <div>
            <div className={"flex gap-2 items-center"}>
              <Link
                to={"/profile/" + author.userId}
                className={"flex gap-2 items-center group"}
              >
                <div className="avatar">
                  <div className="w-8 rounded-full">
                    <img
                      src={author.avatarUrl ? avatar : avatarBackup}
                      alt={`${author.username}'s avatar`}
                    />
                  </div>
                </div>
                <span
                  className={
                    "font-bold group-hover:underline group-hover:underline-offset-4"
                  }
                >
                  {author.username}
                </span>
              </Link>
              <span>
                <i className="bi bi-dot text-xl"></i>
              </span>
              <span className={"text-sm"}>{dateCreated}</span>
            </div>
            <Link to={RouteEnum.POST + "/" + post.postId}>
              <h2 className="card-title text-lg text-black dark:text-white">
                {post.postContent}
              </h2>
              <p>{post.postContent}</p>
            </Link>
          </div>
          <div className="card-actions justify-start">
            <div className={"flex gap-2 items-center"}>
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
              <button className={"btn btn-ghost"}>
                <i className="bi bi-chat-square text-xl mr-2"></i>
                <span>{post.commentCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
