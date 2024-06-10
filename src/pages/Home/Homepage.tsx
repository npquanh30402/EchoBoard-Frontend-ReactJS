import { useDocumentTitle } from "../../hooks";
import { useCallback, useEffect, useState } from "react";
import { PostItem } from "./components/PostItem.tsx";
import { fetchPostLatestService } from "../../services";
import { CursorSearchInterface, PostInterface } from "../../interfaces";

export const Homepage = () => {
  useDocumentTitle("Homepage");

  const [postList, setPostList] = useState<PostInterface[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [fetchCursor, setFetchCursor] = useState<
    CursorSearchInterface | undefined
  >(undefined);

  // const { posts, cursor, hasMore } = useAppSelector((state) => state.post);
  //
  // const dispatch = useAppDispatch();

  const fetchData = useCallback(async () => {
    const formData = {
      cursor: fetchCursor,
    };

    const response = await fetchPostLatestService(formData);

    if (response.length > 0) {
      setPostList((prevPostList) => {
        const updatedPostList = [...prevPostList, ...response];
        const lastItem = updatedPostList[updatedPostList.length - 1];
        setFetchCursor({
          id: lastItem.postId,
          createdAt: lastItem.createdAt,
        });
        return updatedPostList;
      });

      setHasMore(true);
    } else {
      setHasMore(false);

      // dispatch(SET_POSTS(response));
    }
  }, [fetchCursor]);

  useEffect(() => {
    fetchData().then();
  }, []);

  useEffect(() => {
    function handleScroll() {
      const scroll =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 1;

      if (scroll && hasMore) {
        fetchData().then();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchData, hasMore]);

  return (
    <section id={"homepage"}>
      <div className={"flex flex-col justify-center items-center my-12"}>
        <h1 className={"font-bold text-4xl underline underline-offset-8"}>
          Latest Posts
        </h1>
        <div
          className={
            "flex flex-col md:flex-row w-full justify-center md:flex-wrap gap-6 items-stretch mt-8"
          }
        >
          {postList.length > 0 &&
            postList.map((item) => <PostItem key={item.postId} post={item} />)}
        </div>
      </div>
    </section>
  );
};
