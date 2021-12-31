import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../auth.service';

@Component({
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isLoading = false;

  submitForm(form: NgForm) {
    const email = form.value.email as string;

    const pass = form.value.password as string;

    this.isLoading = true;

    this.authService.loginUser(email, pass).subscribe((value) => {
      this.isLoading = false;

      console.log(value);
      this.router.navigate(['/', 'chat']);
    });
  }
}
