import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserGuardGuard} from "./common/guards/users/user-guard.guard";

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'user',
    loadChildren: () => import('./pages/user/user.module').then(m => m.UserModule),
    canLoad: [UserGuardGuard],
    canActivate: [UserGuardGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
