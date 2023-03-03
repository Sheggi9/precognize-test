import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import {UserStoreService} from "@services";

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate, CanLoad {
  constructor(private router: Router, private userStoreService: UserStoreService  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userStoreService.user ? this.router.navigate([`admin-panel/users/${this.userStoreService.user.id}`]) : this.router.navigate(['login']);
  }
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.userStoreService.user ? this.router.navigate([`admin-panel/users/${this.userStoreService.user.id}`]) : this.router.navigate(['login']);
  }
}
