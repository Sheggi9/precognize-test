import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from "@angular/forms";

import { GlobalErrorHandler } from "@errorHandlers";
import { UserStoreService } from "@services";
import { UsersService } from "@services";
import { Subject, take, takeUntil } from "rxjs";

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
export class AppModule{
  private unsubscribe$ = new Subject<null>();

  constructor(private userStore: UserStoreService, private usersService: UsersService) {
    if(!this.userStore.user && !this.userStore.token) {

      const token: string | null = localStorage.getItem('token');
      if(token) {
        this.userStore.token = token;
        this.usersService.getUserInfo()
          .pipe(
            take(1),
            takeUntil(this.unsubscribe$)
          )
          .subscribe(res => {
            this.userStore.user = res;
            this.unsubscribe$.next(null);
            this.unsubscribe$.complete();
          })
      }
    }
  }
}
