import { PostInterface } from "../../../interfaces";
import avatarBackup from "/src/assets/images/avatar_backup.jpg";
import { formatDistanceToNow } from "date-fns";
import { Link } from "react-router-dom";
import { RouteEnum } from "../../../enums";
import { useState } from "react";
import { LikeButton } from "../../../components/Elements/LikeButton.tsx";

export const PostItem = ({ post }: { post: PostInterface }) => {
  const { author } = post;
  const [postState, setPostState] = useState<PostInterface>(post);

  const avatar = import.meta.env.VITE_SERVER_URL + "/" + author.avatarUrl;

  const dateCreated = formatDistanceToNow(
    new Date(String(postState.createdAt)),
    {
      addSuffix: true,
    },
  );

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
            <Link to={RouteEnum.POST + "/" + postState.postId}>
              <h2 className="card-title text-lg text-black dark:text-white uppercase">
                {postState.postTitle}
              </h2>
              <p>{postState.postContent}</p>
            </Link>
          </div>
          <div className="card-actions justify-start">
            <div className={"flex gap-2 items-center"}>
              {/*@ts-ignore*/}
              <LikeButton post={postState} setPost={setPostState} />
              <button className={"btn btn-ghost"}>
                <i className="bi bi-chat-square text-xl mr-2"></i>
                <span>{postState.commentCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
