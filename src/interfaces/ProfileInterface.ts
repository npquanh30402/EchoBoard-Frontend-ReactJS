export interface ProfileInterface {
  userId: string;
  username: string;
  fullName?: string | null | undefined;
  bio?: string | null | undefined;
  avatarUrl?: string | null | undefined;
  isFollowing?: boolean;
  isFollowedBy: boolean;
  friendRequestStatus: string | null;
  numberOfFollowers: number;
  numberOfFollowing: number;
  createdAt?: Date;
  updatedAt?: Date;
}
