import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import {UIModule} from "../../UI/ui.module";


@NgModule({
  declarations: [
    UserComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    UIModule
  ]
})
export class UserModule { }
