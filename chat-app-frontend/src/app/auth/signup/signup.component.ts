import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  templateUrl: './signup.component.html',
})
export class SignupComponent {
  constructor(private authService: AuthService, private router: Router) {}

  isLoading = false;

  submitForm(form: NgForm) {
    console.log(form);
    if (form.invalid) return;

    this.isLoading = true;

    this.authService
      .registerUser(
        form.value.firstName,
        form.value.lastName,
        form.value.email,
        form.value.password
      )
      .subscribe((user) => {
        // redirect to /chat
        console.log(user);

        this.router.navigate(['/', 'chat']);
      });
  }
}
