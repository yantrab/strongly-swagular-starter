import { Component } from '@angular/core';
import { AuthService } from '../api/services/auth.service';
import { Router } from '@angular/router';

@Component({ selector: 'app-login', templateUrl: './auth.component.html', styleUrls: ['./auth.component.scss'] })
export class LoginComponent {
  loginError?: string;
  model = this.service.loginFormModel({ localePath: 'loginForm', fields: [{ key: 'email' }, { key: 'password', type: 'password' }] });
  constructor(private service: AuthService, private router: Router) {}

  login() {
    this.service.login(this.model.formGroup.value).subscribe(
      user => {
        this.router.navigate(['']).catch(console.log);
      },
      error => {
        this.loginError = 'user or password is incorrect';
        console.log(error);
      }
    );
  }
}
