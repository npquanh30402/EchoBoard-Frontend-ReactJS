import { CommentItem } from "./CommentItem.tsx";
import {
  createACommentService,
  fetchCommentListService,
} from "../../../services";
import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { sanitizeAndTrimString } from "../../../utils";
import { toast } from "react-toastify";
import {
  CommentInterface,
  CursorSearchInterface,
  PostInterface,
} from "../../../interfaces";
import { useAppSelector } from "../../../hooks";

export const CommentSection = ({
  post,
  setPost,
  postId,
}: {
  post: PostInterface;
  setPost: (post: PostInterface) => void;
  postId: string;
}) => {
  const { user, profile } = useAppSelector((state) => state.auth);
  const [commentList, setCommentList] = useState<CommentInterface[]>([]);
  const [comment, setComment] = useState("");

  const [hasMore, setHasMore] = useState(true);
  const [fetchCursor, setFetchCursor] = useState<
    CursorSearchInterface | undefined
  >(undefined);

  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (!hasMore) return;
    if (isLoading) return;

    setIsLoading(true);

    const formData = {
      cursor: fetchCursor,
    };

    const response = await fetchCommentListService(postId, formData);

    if (response.length > 0) {
      setCommentList((prevCommentList) => {
        const updatedCommentList = [...prevCommentList, ...response];
        const lastItem = updatedCommentList[updatedCommentList.length - 1];
        setFetchCursor({
          id: lastItem.postId,
          createdAt: lastItem.createdAt,
        });
        return updatedCommentList;
      });
    } else {
      setHasMore(false);
    }
    setIsLoading(false);
  }, [fetchCursor, hasMore, isLoading, postId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchData().then();
        }
      },
      { threshold: 1.0 },
    );

    const currentRef = loadingRef.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchData]);

  useEffect(() => {
    fetchData().then();
  }, []);

  async function handleCreateComment(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();

    if (comment.trim().length > 0) {
      const formData = new FormData();

      formData.append("commentContent", sanitizeAndTrimString(comment));

      const response = (await createACommentService(
        postId,
        formData,
      )) as CommentInterface;

      if (response) {
        toast.success("Comment created successfully!");

        commentList.unshift({
          ...response,
          postId: postId,
          author: {
            userId: user!.userId,
            username: user!.username,
            avatarUrl: profile?.avatarUrl,
          },
        });

        setPost({
          ...post,
          commentCount: post.commentCount + 1,
        });
        setComment("");
      }
    }
  }

  return (
    <section id={"comment-section"} className={"w-full"}>
      <div className={"w-full"}>
        <h2 className={"underline underline-offset-8"}>
          Comments ({post.commentCount})
        </h2>
        <form
          onSubmit={handleCreateComment}
          className={"flex flex-col gap-2 my-4"}
        >
          <textarea
            rows={6}
            className="textarea textarea-bordered w-full"
            placeholder="Write a comment..."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          ></textarea>
          <button className={"btn btn-primary w-fit"}>Post comment</button>
        </form>
        {commentList.length > 0 &&
          commentList.map((comment) => {
            return <CommentItem key={comment.commentId} comment={comment} />;
          })}
        <div
          id="loading"
          ref={loadingRef}
          className={"mt-12 text-lg text-center"}
        >
          {isLoading ? (
            <p>Loading more comments...</p>
          ) : !hasMore ? (
            <p>No more comments to load</p>
          ) : (
            <p>Scroll down to load more comments</p>
          )}
        </div>
      </div>
    </section>
  );
};
