import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs/';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
 
  isLoading: boolean = false;
  error: string= null;
  private subscription$: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmitSignupForm(signupForm: NgForm) {
    const email = signupForm.value.email;
    const password = signupForm.value.password;

    if (!signupForm.valid) {
      return;
    }
    this.isLoading = true;
   this.subscription$ =  this.authService.signup(email, password).subscribe(
      (response) => {
        this.isLoading = false;
        console.log(response);
        this.router.navigate(['/login'])
      },
      (errorMessage) => {
       this.error = errorMessage;
       this.isLoading = false;
      }
    );
    signupForm.reset();
  }

  onHandleError(){
    this.error = null;
  }

  ngOnDestroy(): void {
    this.subscription$?.unsubscribe();
  }
}

