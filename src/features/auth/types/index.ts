export type UserRole = "admin" | "viewer";

export interface UserState {
  role: UserRole;
  name: string;
  avatar?: string;
}