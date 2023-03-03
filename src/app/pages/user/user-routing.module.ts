import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from "./components/user/user.component";
import { UsersComponent } from "./components/users/users.component";
import { RedirectGuard } from "@guards";

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path: 'users/:id',
    component: UserComponent
  },
  {
    path: '',
    pathMatch: 'full',
    component: UsersComponent,
    canActivate: [RedirectGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
