import { AuthService } from 'src/app/core/services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;
  error: string = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmitLoginForm(loginForm: NgForm) {
    const email = loginForm.value.email;
    const password = loginForm.value.password;
    if (!loginForm.valid) {
      return;
    }
    this.isLoading = true;
    this.authService.login(email, password).subscribe(
      (response) => {
        this.isLoading = false;
        //console.log(response);
        this.router.navigate(['/products']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    loginForm.reset();
  }
}
