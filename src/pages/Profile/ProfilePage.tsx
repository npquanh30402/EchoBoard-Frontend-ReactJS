import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  fetchFriendshipStatusService,
  fetchProfileService,
  sendFriendRequestService,
} from "../../services";
import { ProfileInterface } from "../../interfaces";
import { PageNotFound } from "../Other/PageNotFound.tsx";
import avatarBackup from "/src/assets/images/avatar_backup.jpg";
import {
  useAppSelector,
  useCustomWebsocket,
  useDocumentTitle,
} from "../../hooks";
import { toast } from "react-toastify";

export const ProfilePage = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState<ProfileInterface | null>(null);
  const picture =
    import.meta.env.VITE_SERVER_URL + "/" + profile?.profilePictureUrl;
  const { user } = useAppSelector((state) => state.auth);
  const [friendshipStatus, setFriendshipStatus] = useState("none");

  useDocumentTitle(`${profile?.username}'s profile`);

  const { sendJsonMessage } = useCustomWebsocket(
    import.meta.env.VITE_WEBSOCKET_URL +
      "/api/notification/central-notification",
    "Central Notification",
  );

  async function handleSendFriendRequest() {
    const response = await sendFriendRequestService(profile?.id as string);

    if (response) {
      toast.success("Friend request sent successfully!");
      setFriendshipStatus("pending");
    }

    sendJsonMessage({
      type: "friend_request",
      content: `User ${user?.username} has send you a friend request`,
      metadata: {
        from: user?.username,
        related_id: user?.id,
      },
      receiverId: profile?.id as string,
    });
  }

  useEffect(() => {
    async function fetchProfile() {
      if (id) {
        const response = await fetchProfileService(id);

        if (response) {
          setProfile(response);
        }
      }
    }

    async function fetchFriendshipStatus() {
      if (id) {
        const response = await fetchFriendshipStatusService(id);

        if (response) {
          setFriendshipStatus(response);
        }
      }
    }

    fetchProfile();
    fetchFriendshipStatus();
  }, [id]);

  const renderButton = () => {
    switch (friendshipStatus) {
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
          <div className="card card-bordered card-compact w-96 bg-base-200 shadow-xl py-6 flex flex-col justify-center items-center">
            <div className="avatar">
              <div className="w-28 rounded-full">
                <img
                  src={profile?.profilePictureUrl ? picture : avatarBackup}
                  alt={`${profile?.username}'s avatar`}
                />
              </div>
            </div>
            <div className="card-body flex flex-col items-center w-full">
              <h2 className="card-title text-2xl">@{profile?.username}</h2>
              <p>{profile?.fullName}</p>
              <div className="card-actions">
                <button className="btn btn-primary">Follow</button>
                {user?.id !== profile.id && renderButton()}
                {/*<button className="btn btn-primary">Message</button>*/}
              </div>
              <hr className={"text-white w-full mt-6"} />
              <div
                className={"flex flex-row gap-2 text-left items-center w-full"}
              >
                <i className="bi bi-person text-2xl"></i>
                <span>12 Followers you know</span>
              </div>
              <div className="avatar w-full">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div className="avatar -mr-2" key={index}>
                    <div className="w-12 rounded-full">
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        alt={""}
                      />
                    </div>
                  </div>
                ))}
                <span className="flex items-center justify-center bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white font-semibold border-2 border-gray-200 dark:border-gray-700 rounded-full w-12 -mr-2">
                  +999
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {!profile && <PageNotFound />}
    </section>
  );
};
