export interface IAuthError {
  email?: string[];
  username?: string[];
  password?: string[];
}
export interface IUserRegData {
  username: string;
  email: string;
  password: string;
}
export interface IUserAuthData {
  email: string;
  password: string;
}
export interface IUserUpdateData {
  username: string;
  email: string;
  password: string;
  bio?: string;
  image?: string;
}
export interface IUserFormData {
  user: IUserRegData | IUserAuthData | IUserUpdateData;
}

export interface IUser {
  id?: number;
  email: string;
  createdAt?: string;
  updatedAt?: string;
  username: string;
  bio: null | string;
  image: null | string;
  token: string;
}
export type TUserState = {
  user: IUser | null;
  isAuth: boolean;
  isFetch: boolean;
  errors: null | IAuthError;
};

export enum UserEndPoints {
  LOGIN = "/users/login",
  REGISTER = "/users",
  UPDATE = "/user",
}
