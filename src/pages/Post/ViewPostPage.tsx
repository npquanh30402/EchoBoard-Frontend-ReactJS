import {
  headingsPlugin,
  imagePlugin,
  listsPlugin,
  MDXEditor,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
} from "@mdxeditor/editor";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchPostService } from "../../services";
import { PostInterface } from "../../interfaces";
import { useAppSelector, useDocumentTitle } from "../../hooks";
import avatarBackup from "/src/assets/images/avatar_backup.jpg";
import { RouteEnum } from "../../enums";
import { formatDistanceToNow } from "date-fns";
import { CommentSection } from "./components/CommentSection.tsx";

export const ViewPostPage = () => {
  const [post, setPost] = useState<PostInterface | null>(null);
  const { postId } = useParams();

  useDocumentTitle(post?.postTitle as string);

  const navigate = useNavigate();

  const { theme } = useAppSelector((state) => state.theme);

  const avatarUrl =
    import.meta.env.VITE_SERVER_URL + "/" + post?.author.avatarUrl;

  useEffect(() => {
    async function fetchPost() {
      const response = await fetchPostService(postId as string);

      if (response) {
        setPost(response);
      }
    }

    fetchPost()
      .then()
      .catch(() => {
        navigate(RouteEnum.HOME);
      });
  }, [navigate, postId]);

  const dateCreated = () => {
    return formatDistanceToNow(new Date(post?.createdAt as unknown as string), {
      addSuffix: true,
    });
  };

  return (
    <section id={"view-post"}>
      {post && (
        <div
          className={"container flex flex-col items-center my-8 md:px-6 gap-6"}
        >
          <div
            className={
              "w-full flex justify-between items-center px-4 border-y py-4 border-y-black dark:border-y-white"
            }
          >
            <div className="avatar">
              <div className="w-16 rounded-full">
                <Link to={"/profile/" + post?.author.userId}>
                  <img
                    className={"w-full h-96 object-cover"}
                    src={post?.author.avatarUrl ? avatarUrl : avatarBackup}
                    alt={`${post?.author.username}'s avatar`}
                  />
                </Link>
              </div>
            </div>
            <div>
              <p className={"font-bold text-lg"}>{post.author.username}</p>
              <p className={"text-sm"}>{dateCreated()}</p>
            </div>
          </div>
          <div className={"w-full flex flex-col items-center"}>
            <h1
              className={
                "underline underline-offset-8 font-bold mb-8 dark:text-white"
              }
            >
              {post?.postTitle}
            </h1>
            <MDXEditor
              plugins={[
                headingsPlugin(),
                quotePlugin(),
                listsPlugin(),
                imagePlugin(),
                tablePlugin(),
                thematicBreakPlugin(),
              ]}
              className={theme === "dark" ? "dark-theme" : ""}
              markdown={post?.postContent || ""}
              readOnly
            />
          </div>
          <p
            className={
              "border-2 border-black dark:border-white w-full mt-10 mb-4"
            }
          ></p>
          <CommentSection post={post} setPost={setPost} postId={post.postId} />
        </div>
      )}
    </section>
  );
};
