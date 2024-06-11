import { CommentInterface, PostInterface } from "../../../interfaces";
import avatarBackup from "/src/assets/images/avatar_backup.jpg";
import { format } from "date-fns";
import { ChangeEvent, useState } from "react";
import {
  createACommentService,
  fetchReplyListService,
} from "../../../services";
import { sanitizeAndTrimString } from "../../../utils";
import { toast } from "react-toastify";

export const CommentItem = ({
  post,
  setPost,
  comment,
}: {
  post: PostInterface;
  setPost: (post: PostInterface) => void;
  comment: CommentInterface;
}) => {
  const [cmt, setCmt] = useState(comment);
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [showReply, setShowReply] = useState(false);
  const [replies, setReplies] = useState<CommentInterface[]>([]);

  const author = cmt.author;
  const avatar = import.meta.env.VITE_SERVER_URL + "/" + cmt.author.avatarUrl;

  async function handleFetchReplyList() {
    const response = await fetchReplyListService(cmt.commentId, {});

    if (response) {
      setReplies(response);
      setShowReply(true);
    }
  }

  async function handleReply(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (replyContent.trim().length > 0) {
      const formData = new FormData();

      formData.append("commentContent", sanitizeAndTrimString(replyContent));
      formData.append("parentCommentId", cmt.commentId);

      const response = (await createACommentService(
        cmt.postId,
        formData,
      )) as CommentInterface;

      if (response) {
        toast.success("You have Replied successfully!");

        const newReply = {
          ...response,
          postId: cmt.postId,
          author,
        };

        const updatedReplies = [newReply, ...replies];

        setCmt((prevCmt) => ({
          ...prevCmt,
          replyCount: prevCmt.replyCount ? prevCmt.replyCount + 1 : 1,
        }));

        setPost({
          ...post,
          commentCount: post.commentCount + 1,
        });

        setReplies(updatedReplies);
        setReplyContent("");
      }
    }
  }

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
          <span>{format(new Date(String(cmt.createdAt)), "PP")}</span>
        </div>
        <div className={"flex gap-2"}>
          {cmt.replyCount !== null && cmt.replyCount! > 0 && (
            <>
              {!showReply ? (
                <button
                  className={"btn btn-ghost"}
                  onClick={handleFetchReplyList}
                >
                  <i className="bi bi-plus-lg text-xl"></i>
                </button>
              ) : (
                <button
                  className={"btn btn-ghost"}
                  onClick={() => setShowReply(false)}
                >
                  <i className="bi bi-dash-lg text-xl"></i>
                </button>
              )}
            </>
          )}
          <button className={"btn btn-ghost"}>
            <i className="bi bi-three-dots text-xl"></i>
          </button>
        </div>
      </div>
      <div>{cmt.commentContent}</div>
      <div className={"flex gap-2"}>
        <span>
          <i className="bi bi-chat-left-dots"></i>
        </span>
        <span
          className={"cursor-pointer hover:underline"}
          onClick={() => setShowReplyForm(!showReplyForm)}
        >
          Reply
        </span>
      </div>
      {showReplyForm && (
        <form
          onSubmit={handleReply}
          className={"flex flex-col gap-2 my-4 w-full"}
        >
          <textarea
            rows={6}
            className="textarea textarea-bordered w-full"
            placeholder="Reply to this cmt..."
            onChange={(e) => setReplyContent(e.target.value)}
            value={replyContent}
          ></textarea>
          <button className={"btn btn-primary w-fit"}>Reply</button>
        </form>
      )}
      {showReply &&
        replies.map((reply) => (
          <CommentItem
            post={post}
            setPost={setPost}
            key={reply.commentId}
            comment={reply}
          />
        ))}
      <p className={"border-b mt-10 border-b-slate-400"}></p>
    </div>
  );
};
