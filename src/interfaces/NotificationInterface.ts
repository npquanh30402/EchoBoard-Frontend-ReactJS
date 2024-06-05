export interface NotificationInterface {
  id: string;
  type: string;
  content: string;
  metadata?: {
    from: string;
    related_id: string;
    additional_info?: object;
  };
  read?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
