import { User } from "../entities/user.entity";

export interface UserLogin{
  user: User,
	token: string,
}