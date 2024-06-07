export interface NotificationInterface {
  id: string;
  type: string;
  content: string;
  metadata?: {
    from?: string | undefined;
    related_id?: string | undefined;
    additional_info?: object | null;
  };
  read?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
