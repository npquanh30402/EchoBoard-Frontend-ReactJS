import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchProfileService,
  followAnUserService,
  sendFriendRequestService,
  unFollowAnUserService,
} from "../../services";
import { ProfileInterface } from "../../interfaces";
import { PageNotFound } from "../Other/PageNotFound.tsx";
import avatarBackup from "/src/assets/images/avatar_backup.jpg";
import { useAppDispatch, useAppSelector, useDocumentTitle } from "../../hooks";
import { toast } from "react-toastify";
import { ADD_FRIEND } from "../../store/friendSlice.ts";
import { FriendEnum } from "../../enums";
import { Tabs } from "./components/Tabs.tsx";

export const ProfilePage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { id } = useParams();
  const [profile, setProfile] = useState<ProfileInterface | null>(null);
  const picture = import.meta.env.VITE_SERVER_URL + "/" + profile?.avatarUrl;

  useDocumentTitle(`${profile?.username}'s profile`);

  const dispatch = useAppDispatch();

  async function handleSendFriendRequest() {
    const response = await sendFriendRequestService(profile?.userId as string);

    if (response) {
      toast.success("Friend request sent successfully!");
      if (profile) {
        setProfile({
          ...profile,
          friendRequestStatus: "pending",
        });
      }

      dispatch(
        ADD_FRIEND({
          newFriend: response,
          listName: FriendEnum.RequestSentList,
        }),
      );
    }
  }

  async function handleFollowUser() {
    const response = await followAnUserService(profile?.userId as string);

    if (response) {
      toast.success("User followed successfully!");

      if (profile) {
        setProfile({
          ...profile,
          numberOfFollowers: profile.numberOfFollowers + 1,
          isFollowing: true,
        });
      }
    }
  }

  async function handleUnFollowUser() {
    const response = await unFollowAnUserService(profile?.userId as string);

    if (response) {
      toast.success("User unfollowed successfully!");

      if (profile) {
        setProfile({
          ...profile,
          numberOfFollowers: profile.numberOfFollowers - 1,
          isFollowing: false,
        });
      }
    }
  }

  useEffect(() => {
    async function fetchProfile() {
      if (id) {
        const response = (await fetchProfileService(id)) as ProfileInterface;

        if (response) {
          setProfile(response);
        }
      }
    }

    fetchProfile().then();
  }, [id]);

  const renderButton = () => {
    switch (profile?.friendRequestStatus) {
      case "pending":
        return (
          <button className="btn btn-outline btn-secondary opacity-50 cursor-not-allowed">
            Friend Request Pending
          </button>
        );
      case "accepted":
        return (
          <button className="btn btn-outline btn-success opacity-50 cursor-not-allowed">
            Already Friends
          </button>
        );
      case "rejected":
        return (
          <button className="btn btn-outline btn-error opacity-50 cursor-not-allowed">
            Friend Request Rejected
          </button>
        );
      default:
        return (
          <button
            className="btn btn-outline btn-accent"
            onClick={handleSendFriendRequest}
          >
            Send Friend Request
          </button>
        );
    }
  };

  return (
    <section id={"profile"}>
      {profile && (
        <div
          className={"flex flex-col justify-center items-center mx-auto my-24"}
        >
          <div className="card card-bordered card-compact w-96 md:w-1/2 bg-base-200 shadow-xl py-6 flex flex-col justify-center items-center">
            <div className="avatar">
              <div className="w-28 rounded-full">
                <img
                  src={profile?.avatarUrl ? picture : avatarBackup}
                  alt={`${profile?.username}'s avatar`}
                />
              </div>
            </div>
            <div className="card-body flex flex-col items-center w-full">
              <h2 className="card-title text-2xl">@{profile?.username}</h2>
              <p className={"text-lg"}>{profile?.fullName}</p>
              {user?.userId !== profile.userId && (
                <div className="card-actions">
                  {!profile.isFollowing ? (
                    <button
                      className="btn btn-primary"
                      onClick={handleFollowUser}
                    >
                      Follow
                    </button>
                  ) : (
                    <button
                      className="btn btn-error"
                      onClick={handleUnFollowUser}
                    >
                      Unfollow
                    </button>
                  )}
                  {renderButton()}
                  {/*<button className="btn btn-primary">Message</button>*/}
                </div>
              )}
              <hr className={"text-white w-full mt-6"} />
              <div
                className={
                  "flex flex-row justify-between gap-2 text-left items-center w-full"
                }
              >
                <div className={"flex gap-2 items-center"}>
                  <i className="bi bi-person text-2xl"></i>
                  <span>{profile.numberOfFollowers} Followers</span>
                </div>
                <div className={"flex gap-2 items-center"}>
                  <span>{profile.numberOfFollowing} Following</span>
                  <i className="bi bi-person text-2xl m;-2"></i>
                </div>
              </div>
              {/*<div className="avatar w-full">*/}
              {/*  {Array.from({ length: 6 }).map((_, index) => (*/}
              {/*    <div className="avatar -mr-2" key={index}>*/}
              {/*      <div className="w-12 rounded-full">*/}
              {/*        <img*/}
              {/*          src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"*/}
              {/*          alt={""}*/}
              {/*        />*/}
              {/*      </div>*/}
              {/*    </div>*/}
              {/*  ))}*/}
              {/*  <span className="flex items-center justify-center bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white font-semibold border-2 border-gray-200 dark:border-gray-700 rounded-full w-12 -mr-2">*/}
              {/*    +999*/}
              {/*  </span>*/}
              {/*</div>*/}
              <Tabs userId={profile.userId} />
            </div>
          </div>
        </div>
      )}
      {!profile && <PageNotFound />}
    </section>
  );
};
