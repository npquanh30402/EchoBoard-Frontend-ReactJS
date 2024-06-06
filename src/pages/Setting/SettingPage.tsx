import {
  useAppDispatch,
  useAppSelector,
  useCustomWebsocket,
  useDocumentTitle,
} from "../../hooks";
import React, { useState } from "react";
import avatarBackup from "/src/assets/images/avatar_backup.jpg";
import { PROFILE } from "../../store/authSlice.ts";
import { updateProfileService } from "../../services";
import { ProfileInterface } from "../../interfaces";
import { toast } from "react-toastify";
import { sanitizeAndTrimString } from "../../utils";

export const SettingPage = () => {
  useDocumentTitle("Settings");

  const { user, profile } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string>("");

  const [formData, setFormData] = useState({
    fullName: profile?.fullName || "",
    bio: profile?.bio || "",
  });

  const { sendJsonMessage } = useCustomWebsocket(
    import.meta.env.VITE_WEBSOCKET_URL +
      "/api/notification/central-notification",
    "Central Notification",
  );

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target as
      | HTMLInputElement
      | HTMLTextAreaElement;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  function checkImage() {
    if (previewURL) {
      return previewURL;
    }

    if (profile?.profilePictureUrl) {
      return import.meta.env.VITE_SERVER_URL + "/" + profile?.profilePictureUrl;
    } else {
      return avatarBackup;
    }
  }

  const handleUpdateProfile = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formDataObject = new FormData();

    if (formData.fullName !== profile?.fullName) {
      formDataObject.append(
        "fullName",
        sanitizeAndTrimString(formData.fullName),
      );
    }

    if (formData.bio !== profile?.bio) {
      formDataObject.append("bio", sanitizeAndTrimString(formData.bio));
    }

    if (selectedFile) {
      formDataObject.append("profilePictureUrl", selectedFile);
      setSelectedFile(null);
    }

    const data = (await updateProfileService(
      formDataObject,
    )) as ProfileInterface;

    if (data) {
      toast.success("Updated successfully!");
      dispatch(PROFILE(data));

      sendJsonMessage({
        type: "account_activity",
        content: `You have updated your profile`,
        metadata: {
          from: user?.username,
          related_id: user?.id,
        },
        receiverId: profile?.id as string,
      });
    }
  };

  return (
    <section id={"settings"}>
      <div className={"mx-auto max-w-md p-4 rounded-xl text-center"}>
        <h1
          className={
            "text-3xl md:text-4xl font-bold underline underline-offset-8 mb-6"
          }
        >
          Settings
        </h1>
        <form className={"flex flex-col gap-4"} onSubmit={handleUpdateProfile}>
          <div className="avatar flex justify-center">
            <div className="relative w-24 rounded-full">
              <img
                src={checkImage()}
                alt={`${user?.username}'s avatar`}
                className="w-full h-full object-cover rounded-full"
              />
              <input
                type="file"
                name={"profilePictureUrl"}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className={"text-left gap-2 flex flex-col"}>
            <span className={"font-bold"}>What is your full name?</span>
            <input
              type="text"
              placeholder="Full name"
              className={"grow input input-bordered"}
              name={"fullName"}
              value={formData.fullName}
              autoComplete={"off"}
              onChange={handleInputChange}
            />
          </div>
          <div className={"text-left gap-2 flex flex-col"}>
            <span className={"font-bold"}>Do you want to add a bio?</span>
            <textarea
              className="textarea h-40 textarea-bordered"
              placeholder="Bio"
              name={"bio"}
              value={formData.bio}
              onChange={handleInputChange}
            ></textarea>
          </div>
          <button className={`btn btn-primary`}>Update</button>
        </form>
      </div>
    </section>
  );
};
