import { Injectable } from '@angular/core';
import {IUserLoginRequest, IUserLoginResponse} from "../../../common/interfaces/frontend/User";
import {catchError, Observable, of, tap} from "rxjs";
import {BackendService} from "../../backend/backend.service";
import {UserStoreService} from "../user/store/user-store.service";
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private be: BackendService, private userStoreService: UserStoreService, private router: Router) { }

  login (v: IUserLoginRequest): Observable<IUserLoginResponse> {
    return this.be.login(v.name).pipe(
      tap(res => {
        const {user, token} = res;
        this.userStoreService.user = user
        this.userStoreService.token = token
        localStorage.setItem('token', token);
      })
    )
  }

  logout() {
    localStorage.clear();
    this.userStoreService.user = null;
    this.userStoreService.token = null;
    this.router.navigate(['login'])
  }
}
