import { Injectable } from '@angular/core';
import {IUser} from "../../../../common/interfaces/frontend/User";

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {
  user: IUser | null = null;
  token: string | null = null;
}
