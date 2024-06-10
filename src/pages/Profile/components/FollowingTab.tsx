import { FollowCardItem } from "./FollowCardItem.tsx";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
import { FetchFollowingService } from "../../../services";
import { FollowDataType } from "./Tabs.tsx";

export const FollowingTab = ({
  followingData,
  userId,
  setFollowingData,
}: {
  followingData: FollowDataType;
  userId: string;
  setFollowingData: Dispatch<SetStateAction<FollowDataType>>;
}) => {
  const fetchData = useCallback(async () => {
    const formData = {
      cursor: followingData.fetchCursor,
    };

    const response = await FetchFollowingService(userId, formData);

    if (response.length > 0) {
      setFollowingData((prev) => {
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
      setFollowingData((prev) => {
        return {
          ...prev,
          hasMore: false,
        };
      });
    }
  }, [followingData.fetchCursor, setFollowingData, userId]);

  useEffect(() => {
    function handleScroll() {
      const scroll =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 5;

      if (scroll && followingData.hasMore) {
        fetchData().then();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchData, followingData.hasMore]);

  useEffect(() => {
    if (followingData.list.length === 0) {
      fetchData().then();
    }
  }, []);

  return (
    <>
      <div className={"flex flex-col items-center w-full"}>
        <h2 className={"font-bold"}>Follower</h2>
        <div className={"md:w-full"}>
          {followingData.list &&
            followingData.list.map((item) => {
              return <FollowCardItem key={item.followId} user={item} />;
            })}
        </div>
      </div>
    </>
  );
};
