export interface ConversationInterface {
  conversationId: string;
  otherUser: {
    userId: string;
    username: string;
    avatarUrl?: string;
  };
  createdAt: Date;
}
