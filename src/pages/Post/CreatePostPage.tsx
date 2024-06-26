import { useAppSelector, useDocumentTitle } from "../../hooks";
import { useRef, useState } from "react";
import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CodeToggle,
  CreateLink,
  diffSourcePlugin,
  DiffSourceToggleWrapper,
  headingsPlugin,
  imagePlugin,
  InsertImage,
  InsertTable,
  InsertThematicBreak,
  listsPlugin,
  ListsToggle,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  tablePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
  UndoRedo,
} from "@mdxeditor/editor";
import { createPostService, UploadImageService } from "../../services";
import { toast } from "react-toastify";
import { sanitizeAndTrimString } from "../../utils";
import { useNavigate } from "react-router-dom";
import { RouteEnum } from "../../enums";
import { PostInterface } from "../../interfaces";

export const CreatePostPage = () => {
  useDocumentTitle("Create a new post");

  const mdxRef = useRef<MDXEditorMethods>(null);
  const [postTitle, setPostTitle] = useState("");
  const { theme } = useAppSelector((state) => state.theme);

  const navigate = useNavigate();

  async function handleSave() {
    const postContent = mdxRef.current?.getMarkdown();

    if (postTitle && postContent) {
      const post = {
        postTitle: sanitizeAndTrimString(postTitle),
        postContent: sanitizeAndTrimString(postContent as string),
      };

      const response: PostInterface = await createPostService(post);

      if (response) {
        toast.success("Post created successfully!");
        navigate(RouteEnum.POST + "/" + response.postId);
      }
    }
  }

  async function imageUploadHandler(image: File) {
    const formData = new FormData();
    formData.append("imageFile", image);

    const response = await UploadImageService(formData);

    return import.meta.env.VITE_SERVER_URL + "/" + response;
  }

  return (
    <>
      <div className={"container mx-auto flex flex-col items-center my-8"}>
        <h1 className={"underline underline-offset-8 font-bold"}>
          Create a new post
        </h1>
        <div
          className={"flex flex-col justify-start w-full gap-6 px-4 md:px-10"}
        >
          <div className={"w-full"}>
            <span className="label label-text font-bold text-xl">Title:</span>
            <input
              type="text"
              placeholder="Title..."
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              className="input input-bordered w-full text-white"
            />
          </div>
          <div>
            <span className="label label-text font-bold text-xl">Content:</span>
            <div className={"border min-h-60 max-h-screen overflow-auto"}>
              <MDXEditor
                className={theme === "dark" ? "dark-theme" : ""}
                ref={mdxRef}
                markdown=""
                plugins={[
                  diffSourcePlugin(),
                  headingsPlugin(),
                  quotePlugin(),
                  listsPlugin(),
                  imagePlugin({
                    imageUploadHandler,
                  }),
                  markdownShortcutPlugin(),
                  tablePlugin(),
                  thematicBreakPlugin(),
                  toolbarPlugin({
                    toolbarContents: () => (
                      <>
                        <UndoRedo />
                        <p className={"text-slate-400 text-lg"}>|</p>
                        <BoldItalicUnderlineToggles />
                        <CodeToggle />
                        <p className={"text-slate-400 text-lg"}>|</p>
                        <ListsToggle />
                        <p className={"text-slate-400 text-lg"}>|</p>
                        <div className={"text-black dark:bg-black"}>
                          <BlockTypeSelect />
                        </div>
                        <p className={"text-slate-400 text-lg"}>|</p>
                        <CreateLink />
                        <InsertImage />
                        <p className={"text-slate-400 text-lg"}>|</p>
                        <InsertTable />
                        <InsertThematicBreak />
                        <DiffSourceToggleWrapper children={undefined} />
                      </>
                    ),
                  }),
                ]}
              />
            </div>
            <div className={"w-full flex justify-center mt-4"}>
              <button className={"btn btn-primary w-full"} onClick={handleSave}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
