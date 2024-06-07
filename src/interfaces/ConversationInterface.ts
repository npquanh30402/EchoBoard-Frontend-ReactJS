export interface ConversationInterface {
  conversationId: string;
  otherUser: {
    id: string;
    username: string;
    profilePictureUrl?: string;
  };
  createdAt: Date;
}
