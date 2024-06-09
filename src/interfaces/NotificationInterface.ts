export interface NotificationInterface {
  notificationId: string;
  notificationType: string;
  notificationContent: string;
  notificationMetadata?: object | null;
  isRead?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
