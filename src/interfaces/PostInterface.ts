export interface PostInterface {
  postId: string;
  postTitle: string;
  postContent: string;
  likeCount: number;
  commentCount: number;
  author: {
    userId: string;
    username: string;
    fullName: string | null;
    avatarUrl: string | null;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
