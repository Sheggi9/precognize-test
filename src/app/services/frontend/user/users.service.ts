import { Injectable } from '@angular/core';
import {BackendService} from "../../backend/backend.service";
import {IUser} from "../../../common/interfaces/frontend/User";
import {Observable} from "rxjs";
import {UserStoreService} from "./store/user-store.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private be: BackendService, private userStore: UserStoreService) { }

  getUsers(): Observable<IUser[]> {
    return this.be.getUsersByUserId({token: this.userStore.token!});
  }

  getUserInfo(): Observable<IUser> {
    return this.be.getUserInfo({token: this.userStore.token!});
  }
}
