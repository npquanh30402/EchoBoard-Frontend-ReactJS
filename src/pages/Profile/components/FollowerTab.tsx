import { FollowCardItem } from "./FollowCardItem.tsx";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { FetchFollowerService } from "../../../services";
import { FollowDataType } from "./Tabs.tsx";

export const FollowerTab = ({
  followerData,
  userId,
  setFollowerData,
}: {
  followerData: FollowDataType;
  userId: string;
  setFollowerData: Dispatch<SetStateAction<FollowDataType>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const loadingRef = useRef(null);

  const fetchData = useCallback(async () => {
    if (!followerData.hasMore) return;
    if (isLoading) return;

    setIsLoading(true);

    const formData = {
      cursor: followerData.fetchCursor,
    };

    const response = await FetchFollowerService(userId, formData);

    if (response.length > 0) {
      setFollowerData((prev) => {
        const lastItem = response[response.length - 1];

        const updatedList = [...prev.list, ...response];

        return {
          list: updatedList,
          hasMore: true,
          fetchCursor: {
            id: lastItem.followId,
            createdAt: lastItem.createdAt,
          },
        };
      });
    } else {
      setFollowerData((prev) => {
        return {
          ...prev,
          hasMore: false,
        };
      });
    }

    setIsLoading(false);
  }, [
    followerData.fetchCursor,
    followerData.hasMore,
    isLoading,
    setFollowerData,
    userId,
  ]);

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
    if (followerData.list.length === 0) {
      fetchData().then();
    }
  }, [followerData.list.length]);

  return (
    <>
      <div className={"flex flex-col items-center w-full"}>
        <h2 className={"font-bold"}>Follower</h2>
        <div className={"md:w-full"}>
          {followerData.list &&
            followerData.list.map((item) => {
              return <FollowCardItem key={item.followId} user={item} />;
            })}
        </div>
        <div id="loading" ref={loadingRef} className={"mt-12 text-lg"}>
          {isLoading ? (
            <p>Loading more content...</p>
          ) : !followerData.hasMore ? (
            <p>No more content to load</p>
          ) : (
            <p>Scroll down to load more content</p>
          )}
        </div>
      </div>
    </>
  );
};
