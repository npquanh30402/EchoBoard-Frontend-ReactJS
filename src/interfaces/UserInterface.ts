export interface UserInterface {
  userId: string;
  username: string;
  email: string;
  emailVerified?: Date | null | undefined;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
