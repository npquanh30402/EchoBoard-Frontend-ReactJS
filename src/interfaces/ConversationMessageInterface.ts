export interface ConversationMessageInterface {
  messageId: string;
  sender: {
    id: string;
    username: string;
    profilePictureUrl: string;
  };
  messageText: string;
  files?: [];
  createdAt: Date;
}
