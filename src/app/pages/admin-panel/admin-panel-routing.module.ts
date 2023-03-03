import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuardGuard } from "@guards";
import {AdminPanelComponent} from "./components/admin-panel/admin-panel.component";

const routes: Routes = [
  {
    path: '',
    component: AdminPanelComponent,
    canLoad: [UserGuardGuard],
    canActivate: [UserGuardGuard],
    canActivateChild: [UserGuardGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('../user/user.module').then(m => m.UserModule),
        canLoad: [UserGuardGuard],
        canActivate: [UserGuardGuard],
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
