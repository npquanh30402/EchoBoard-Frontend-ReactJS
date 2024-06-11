import { CommentInterface } from "../../../interfaces";
import avatarBackup from "/src/assets/images/avatar_backup.jpg";
import { format } from "date-fns";

export const CommentItem = ({ comment }: { comment: CommentInterface }) => {
  const author = comment.author;
  const avatar =
    import.meta.env.VITE_SERVER_URL + "/" + comment.author.avatarUrl;

  return (
    <div className={"flex flex-col gap-2 px-8 md:px-20 my-14"}>
      <div className={"flex justify-between items-center"}>
        <div className={"flex gap-2"}>
          <div className="avatar">
            <div className="w-6 rounded-full">
              <img src={author.avatarUrl ? avatar : avatarBackup} alt={""} />
            </div>
          </div>
          <span>{author.username}</span>
          <span>{format(new Date(String(comment.createdAt)), "PP")}</span>
        </div>
        <span>
          <i className="bi bi-three-dots text-xl"></i>
        </span>
      </div>
      <div>{comment.commentContent}</div>
      <div className={"flex gap-2"}>
        <span>
          <i className="bi bi-chat-left-dots"></i>
        </span>
        <span className={"cursor-pointer hover:underline"}>Reply</span>
      </div>
      <p className={"border-b mt-10 border-b-slate-400"}></p>
    </div>
  );
};
