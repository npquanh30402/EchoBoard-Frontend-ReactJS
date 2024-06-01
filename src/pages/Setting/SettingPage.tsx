import { useAppDispatch, useAppSelector, useDocumentTitle } from "../../hooks";
import React, { useState } from "react";
import avatarBackup from "/public/assets/images/avatar_backup.jpg";
import { PROFILE } from "../../store/authSlice.ts";
import { updateProfileService } from "../../services";
import { ProfileInterface } from "../../interfaces";
import { toast } from "react-toastify";

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

    const formData = new FormData(event.currentTarget);

    const fullNameInput = formData.get("fullName") as string;
    const bioInput = formData.get("bio") as string;

    if (selectedFile) {
      formData.append("profilePictureFile", selectedFile);
      setSelectedFile(null);
    }

    if (fullNameInput !== profile?.fullName) {
      formData.append("fullName", formData.get("fullName") as string);
    }

    if (bioInput !== profile?.bio) {
      formData.append("bio", formData.get("bio") as string);
    }

    const data = (await updateProfileService(formData)) as ProfileInterface;

    if (data) {
      toast.success("Updated successfully!");
      dispatch(PROFILE(data));
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
                name={"upload-avatar"}
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
