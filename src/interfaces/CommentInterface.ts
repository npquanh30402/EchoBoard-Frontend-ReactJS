export interface CommentInterface {
  commentId: string;
  postId: string;
  parentCommentId: string | null;
  commentContent: string;
  commentCount?: number;
  replyCount?: number | null;
  author: {
    userId: string;
    username: string;
    avatarUrl?: string | null;
  };
  createdAt?: Date;
  updatedAt?: Date;
}
