import {IUser} from "../frontend/User";

export interface IUserBackend extends IUser {
  expirationDate: string
}
