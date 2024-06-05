export interface ProfileInterface {
  id: string;
  username: string;
  fullName: string;
  bio: string;
  profilePictureUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
}
