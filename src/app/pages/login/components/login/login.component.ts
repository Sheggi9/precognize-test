import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../../services/frontend/auth/auth.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm = new FormControl('', {nonNullable: true});
  constructor(private authService: AuthService, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {}

  login() {
    this.authService.login({
      name: this.loginForm.value
    }).subscribe(user => {
      console.log(user);
      this.router.navigate(['user'])
    })
  }

}
