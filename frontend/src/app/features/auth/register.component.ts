import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';  // ←

@Component({
  selector: 'app-register',
  template: `
    <div class="register-container">
      <mat-card class="register-card">
        <mat-card-header>
          <mat-card-title>Registrati</mat-card-title>
          <mat-card-subtitle>Crea un nuovo account</mat-card-subtitle>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Username</mat-label>
              <input matInput formControlName="username">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password</mat-label>
              <input matInput type="password" formControlName="password">
            </mat-form-field>

            <button mat-raised-button color="primary" type="submit"
                    class="full-width" [disabled]="!registerForm.valid || loading">
              {{loading ? 'Registrazione...' : 'Registrati'}}
            </button>
          </form>
        </mat-card-content>

        <mat-card-actions>
          <p>Hai già un account? <a routerLink="/auth/login">Accedi</a></p>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 60vh;
      padding: 20px;
    }
    .register-card { max-width: 400px; width: 100%; }
    .full-width { width: 100%; margin-bottom: 16px; }
  `]
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService  // ← AGGIUNTO
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      console.log('Invio registrazione al backend...', this.registerForm.value);

      // ← CHIAMA IL BACKEND
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registrazione completata!', response);
          alert('Registrazione completata! Ora puoi fare login.');
          this.loading = false;
          this.router.navigate(['/auth/login']);
        },
        error: (error) => {
          console.error('Errore registrazione:', error);
          alert('Errore durante la registrazione: ' + (error.error?.message || 'Errore sconosciuto'));
          this.loading = false;
        }
      });
    }
  }
}
