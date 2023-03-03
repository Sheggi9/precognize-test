import {TUser} from "../../types/User";

export interface IUser {
  id?: number,
  name: string,
  creationDate: string,
  role: TUser
}
export interface IUserLoginResponse {
  token: string
  user: IUser
}
export interface IUserLoginRequest {
  name: string
}
