import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";
import {UserStoreService} from "./services/frontend/user/store/user-store.service";
import {UsersService} from "./services/frontend/user/users.service";
import {GlobalErrorHandler} from "./common/errorHandler/globalErrorHandler";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private userStore: UserStoreService, private usersService: UsersService) {
    if(!this.userStore.user && !this.userStore.token) {

      const token: string | null = localStorage.getItem('token');
      if(token) {
        this.userStore.token = token;
        this.usersService.getUserInfo().subscribe(res => {
          this.userStore.user = res;
        })
      }
    }
  }
}
