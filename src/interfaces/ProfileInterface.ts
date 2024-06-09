export interface ProfileInterface {
  userId: string;
  username: string;
  fullName?: string | null | undefined;
  bio?: string | null | undefined;
  avatarUrl?: string | null | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}
