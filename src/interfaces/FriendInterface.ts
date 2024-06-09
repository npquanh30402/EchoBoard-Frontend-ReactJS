export interface FriendInterface {
  friendId: string;
  friendStatus: string;
  userId: string;
  username: string;
  fullName?: string | null | undefined;
  avatarUrl?: string | null | undefined;
  createdAt?: Date;
  updatedAt?: Date;
}
