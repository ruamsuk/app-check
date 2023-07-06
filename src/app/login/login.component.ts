import { Component, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });
  hide = true;
  loading = false;
  submitted = false;


  constructor(
    @Optional()
    private authService: AuthService,
    private router: Router,
    private toast: HotToastService
  ) {
  }

  submit () {
    if (this.loginForm.invalid) return;
    const {email, password} = this.loginForm.value;
    this.authService
      .login(email, password)
      .pipe(
        this.toast.observe({
          loading: 'loading...',
          success: 'Logged In Success',
          error: ({message}) => `${message}`
        })
      )
      .subscribe({
        next: (user) => {
          if (!user.user.emailVerified) {
            this.toast.warning("Email not verified You can't do anything.");
          }
          this.doAction(false);
        },
        error: () => {
          this.doAction(false);
        },
        complete: () => {
          this.router.navigate(['/landing']).catch();
        }
      });

  }

  private doAction(val: boolean) {
    this.loading = val;
    this.submitted = val;
  }
}
