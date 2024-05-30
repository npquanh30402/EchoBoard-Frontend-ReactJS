export interface UserInterface {
  id: string;
  username: string;
  email: string;
  emailVerified?: Date;
  isAdmin?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
