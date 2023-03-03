import { Component, OnInit } from '@angular/core';
import {IUser} from "../../../../common/interfaces/frontend/User";
import {UsersService} from "../../../../services/frontend/user/users.service";
import {Router} from "@angular/router";
import {UserStoreService} from "../../../../services/frontend/user/store/user-store.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  users: IUser[] = [];
  constructor(private usersService: UsersService, private router: Router, private userStoreService: UserStoreService) { }

  ngOnInit(): void {
    this.usersService.getUsers().subscribe(users => {
      console.log(users)
    });
  }

  logout() {
    localStorage.clear();
    this.userStoreService.user = null;
    this.userStoreService.token = null;
    this.router.navigate(['login'])
  }
}
