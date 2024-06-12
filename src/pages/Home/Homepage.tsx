import { useDocumentTitle } from "../../hooks";
import { useCallback, useEffect, useRef, useState } from "react";
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

  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (!hasMore) return;
    if (isLoading) return;

    setIsLoading(true);

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
    } else {
      setHasMore(false);
    }
    setIsLoading(false);
  }, [fetchCursor, hasMore, isLoading]);

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
        <div id="loading" ref={loadingRef} className={"mt-12 text-lg"}>
          {isLoading ? (
            <p>Loading more content...</p>
          ) : !hasMore ? (
            <p>No more content to load</p>
          ) : (
            <p>Scroll down to load more content</p>
          )}
        </div>
      </div>
    </section>
  );
};
