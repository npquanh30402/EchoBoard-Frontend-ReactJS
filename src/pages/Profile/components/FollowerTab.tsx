import { FollowCardItem } from "./FollowCardItem.tsx";
import { Dispatch, SetStateAction, useCallback, useEffect } from "react";
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
  const fetchData = useCallback(async () => {
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
  }, [followerData.fetchCursor, setFollowerData, userId]);

  useEffect(() => {
    function handleScroll() {
      const scroll =
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 5;

      if (scroll && followerData.hasMore) {
        fetchData().then();
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [fetchData, followerData.hasMore]);

  useEffect(() => {
    if (followerData.list.length === 0) {
      fetchData().then();
    }
  }, []);

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
      </div>
    </>
  );
};
