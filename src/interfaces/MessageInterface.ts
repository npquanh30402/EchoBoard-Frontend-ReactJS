export interface MessageInterface {
  conversationId: string;
  messageId: string;
  sender: {
    userId: string;
    username: string;
    avatarUrl: string;
  };
  messageContent: string;
  createdAt: Date;
}
