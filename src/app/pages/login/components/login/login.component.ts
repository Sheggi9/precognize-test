import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { catchError, of, Subject, takeUntil } from "rxjs";
import { AuthService } from "@services";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<null>();

  loginForm: FormControl<string | null> = new FormControl(null, [
    Validators.required,
    Validators.minLength(4)
  ]);
  isShowLoginError = false;
  serverErrorMessage: string = '';

  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm.valueChanges
      .pipe(
        takeUntil(this.unsubscribe$))
      .subscribe(_ => {
      this.isShowLoginError = false
      this.serverErrorMessage = ''
    })
  }

  login() {
    this.authService.login({
      name: this.loginForm.value!
    })
      .pipe(
        takeUntil(this.unsubscribe$),
        catchError((err, caught) => {
          this.serverErrorMessage = err.message
          return of();
        }),
      )
      .subscribe(res => {
        this.router.navigate([`admin-panel/users/${res.user.id}`])
      })
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(null);
    this.unsubscribe$.complete();
  }

  checkErrors(event: boolean) {
    if(!event) {
      this.serverErrorMessage = ''
    }
    this.isShowLoginError = event
  }
}
