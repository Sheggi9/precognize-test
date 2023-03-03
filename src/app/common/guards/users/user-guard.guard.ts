import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route, Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {UserStoreService} from "../../../services/frontend/user/store/user-store.service";

@Injectable({
  providedIn: 'root'
})
export class UserGuardGuard implements CanLoad, CanActivate {
  constructor(private userStore: UserStoreService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !!this.userStore.token ? true : this.router.navigate(['/login']);
  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return !!this.userStore.token ? true : this.router.navigate(['/login']);
  }

}
