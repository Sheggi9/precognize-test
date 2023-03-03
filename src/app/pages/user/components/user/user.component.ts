import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, takeUntil} from "rxjs";
import {IUser} from "@interfaces";
import {AuthService, UsersService} from "@services";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<null>()
  user: IUser | undefined;

  constructor(private authService: AuthService, private usersService: UsersService) { }

  ngOnInit(): void {
    this.usersService.getUserInfo()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe(user => {
        this.user = user;
      });
  }

  logout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }
}
