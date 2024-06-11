export interface CommentInterface {
  commentId: string;
  postId: string;
  parentCommentId: string | null;
  commentContent: string;
  commentCount?: number;
  author: {
    userId: string;
    username: string;
    avatarUrl?: string | null;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
