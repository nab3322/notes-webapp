import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

/**
 * Componente di Login minimale.
 */
@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <div class="login-card">
        <h2>Accedi</h2>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <input type="email" formControlName="email" placeholder="Email">
          <input [type]="hidePassword ? 'password' : 'text'" formControlName="password" placeholder="Password (min 6)">
          
          <div *ngIf="loading">Accesso in corso...</div>
          <button type="submit" [disabled]="!loginForm.valid || loading">
            Accedi
          </button>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .login-container { display: flex; justify-content: center; align-items: center; min-height: 50vh; }
    .login-card { padding: 20px; border: 1px solid #ddd; border-radius: 4px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
    input { display: block; margin-bottom: 10px; padding: 8px; width: 100%; border: 1px solid #ccc; border-radius: 4px; }
    button { padding: 10px 15px; background-color: #4f46e5; color: white; border: none; border-radius: 4px; cursor: pointer; }
    button:disabled { background-color: #a5b4fc; cursor: not-allowed; }
  `]
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      const { email, password } = this.loginForm.value;
      
      this.authService.login(email, password).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          console.error("Login fallito:", err);
          this.loading = false;
        }
      });
    }
  }
}
