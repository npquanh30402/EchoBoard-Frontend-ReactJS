export interface WebsocketMessageInterface {
  type: string;
  data: {
    content: {
      profilePictureUrl: string;
      message: string;
      date: Date;
    };
    senderId: string;
  };
}
