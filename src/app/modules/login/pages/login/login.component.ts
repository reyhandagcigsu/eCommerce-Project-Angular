import { AuthService } from 'src/app/core/services/auth.service';
import { NgForm } from '@angular/forms';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { PlaceHolderDirective } from '../../../../shared/directives/place-holder.directive';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  @ViewChild(PlaceHolderDirective, { static: true })
  alertHost: PlaceHolderDirective;
  isLoading: boolean = false;
  error: string = null;
  private closeSubscription: Subscription;

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
      () => {
        this.isLoading = false;
        this.router.navigate(['/products']);
      },
      (errorMessage) => {
        //this.error = errorMessage;
        this.isLoading = false;
        this.showErrorAlert(errorMessage);
      }
    );
    loginForm.reset();
  }

  private showErrorAlert(errorMessage: string) {
    const hostViewContainerRef = this.alertHost.vievContainerRef;
    hostViewContainerRef.clear();
    const componentRef = hostViewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = errorMessage;
    this.closeSubscription = componentRef.instance.close.subscribe(() => {
      this.closeSubscription.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  onHandleError() {
    this.error = null;
  }
  ngOnDestroy(): void {
    if (this.closeSubscription) {
      this.closeSubscription.unsubscribe();
    }
  }
}
