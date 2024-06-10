import { useEffect, useState } from "react";
import { FollowerTab } from "./FollowerTab.tsx";
import { CursorSearchInterface, FollowInterface } from "../../../interfaces";
import { FollowingTab } from "./FollowingTab.tsx";

export type FollowDataType = {
  list: FollowInterface[];
  hasMore: boolean;
  fetchCursor: CursorSearchInterface | undefined;
};

export const Tabs = ({ userId }: { userId: string }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [followerData, setFollowerData] = useState<FollowDataType>({
    list: [],
    hasMore: true,
    fetchCursor: undefined,
  });
  const [followingData, setFollowingData] = useState<FollowDataType>({
    list: [],
    hasMore: true,
    fetchCursor: undefined,
  });

  useEffect(() => {
    setFollowerData({
      list: [],
      hasMore: true,
      fetchCursor: undefined,
    });
    setFollowingData({
      list: [],
      hasMore: true,
      fetchCursor: undefined,
    });
  }, [userId]);

  const tabs = [
    {
      id: 0,
      title: "Follower",
      content: (
        <FollowerTab
          followerData={followerData}
          userId={userId}
          setFollowerData={setFollowerData}
        />
      ),
    },
    {
      id: 1,
      title: "Following",
      content: (
        <FollowingTab
          followingData={followingData}
          userId={userId}
          setFollowingData={setFollowingData}
        />
      ),
    },
  ];

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <>
      <div role="tablist" className="tabs tabs-bordered w-full">
        {tabs.map((tab, index) => (
          <a
            role="tab"
            key={tab.id}
            className={`tab ${activeTab === index ? "tab-active" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.title}
          </a>
        ))}
      </div>
      {tabs[activeTab].content}
    </>
  );
};
