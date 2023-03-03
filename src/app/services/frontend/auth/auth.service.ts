import { Injectable } from '@angular/core';
import {IUserLoginRequest, IUserLoginResponse} from "../../../common/interfaces/frontend/User";
import {catchError, Observable, of, tap} from "rxjs";
import {BackendService} from "../../backend/backend.service";
import {UserStoreService} from "../user/store/user-store.service";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private be: BackendService, private userStore: UserStoreService) { }

  login (v: IUserLoginRequest): Observable<IUserLoginResponse> {
    return this.be.login(v.name).pipe(
      catchError((err, caught) => {
        console.log(err);
        console.log(caught);
        return of();
      }),
      tap(res => {
        const {user, token} = res;
        this.userStore.user = user
        this.userStore.token = token
        localStorage.setItem('token', token);
      })
    )
  }

  logout() {}
}
