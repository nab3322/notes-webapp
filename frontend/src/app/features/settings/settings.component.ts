import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  template: `
    <div class="settings-container">
      <h1>Impostazioni</h1>

      <!-- Profile Settings -->
      <mat-card class="settings-card">
        <mat-card-header>
          <mat-card-title>Profilo Utente</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="profileForm">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nome</mat-label>
              <input matInput formControlName="name">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Email</mat-label>
              <input matInput type="email" formControlName="email">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Username</mat-label>
              <input matInput formControlName="username">
            </mat-form-field>
          </form>
        </mat-card-content>

        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="saveProfile()">
            Salva
          </button>
        </mat-card-actions>
      </mat-card>

      <!-- App Preferences -->
      <mat-card class="settings-card">
        <mat-card-header>
          <mat-card-title>Preferenze</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="preferencesForm">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Tema</mat-label>
              <mat-select formControlName="theme">
                <mat-option value="light">Chiaro</mat-option>
                <mat-option value="dark">Scuro</mat-option>
              </mat-select>
            </mat-form-field>

            <div class="toggle-section">
              <mat-slide-toggle formControlName="notifications">
                Notifiche
              </mat-slide-toggle>
              
              <mat-slide-toggle formControlName="autoSave">
                Salvataggio automatico
              </mat-slide-toggle>
            </div>
          </form>
        </mat-card-content>

        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="savePreferences()">
            Salva Preferenze
          </button>
        </mat-card-actions>
      </mat-card>

      <!-- Change Password -->
      <mat-card class="settings-card">
        <mat-card-header>
          <mat-card-title>Cambia Password</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <form [formGroup]="passwordForm">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Password attuale</mat-label>
              <input matInput type="password" formControlName="currentPassword">
            </mat-form-field>

            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nuova password</mat-label>
              <input matInput type="password" formControlName="newPassword">
            </mat-form-field>
          </form>
        </mat-card-content>

        <mat-card-actions>
          <button mat-raised-button color="primary" (click)="changePassword()">
            Cambia Password
          </button>
        </mat-card-actions>
      </mat-card>

      <!-- Account Actions -->
      <mat-card class="settings-card">
        <mat-card-header>
          <mat-card-title>Account</mat-card-title>
        </mat-card-header>

        <mat-card-content>
          <p>Gestisci il tuo account e i tuoi dati</p>
        </mat-card-content>

        <mat-card-actions>
          <button mat-button (click)="exportData()">
            <mat-icon>download</mat-icon>
            Esporta Dati
          </button>
          <button mat-button color="warn" (click)="deleteAccount()">
            <mat-icon>delete</mat-icon>
            Elimina Account
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [`
    .settings-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }

    h1 {
      margin-bottom: 30px;
      color: #333;
    }

    .settings-card {
      margin-bottom: 24px;
    }

    .full-width {
      width: 100%;
      margin-bottom: 16px;
    }

    .toggle-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
      margin: 16px 0;
    }

    mat-card-actions {
      display: flex;
      gap: 12px;
    }
  `]
})
export class SettingsComponent implements OnInit {
  profileForm: FormGroup;
  preferencesForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.profileForm = this.fb.group({
      name: ['Mario Rossi', Validators.required],
      email: ['mario@email.com', [Validators.required, Validators.email]],
      username: ['mario_rossi', Validators.required]
    });

    this.preferencesForm = this.fb.group({
      theme: ['light'],
      notifications: [true],
      autoSave: [true]
    });

    this.passwordForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  saveProfile(): void {
    if (this.profileForm.valid) {
      console.log('Saving profile:', this.profileForm.value);
      alert('Profilo salvato!');
    }
  }

  savePreferences(): void {
    console.log('Saving preferences:', this.preferencesForm.value);
    alert('Preferenze salvate!');
  }

  changePassword(): void {
    if (this.passwordForm.valid) {
      console.log('Changing password...');
      alert('Password cambiata!');
      this.passwordForm.reset();
    }
  }

  exportData(): void {
    const data = {
      profile: this.profileForm.value,
      preferences: this.preferencesForm.value,
      exportDate: new Date()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'settings.json';
    link.click();
  }

  deleteAccount(): void {
    if (confirm('Sei sicuro di voler eliminare il tuo account?')) {
      console.log('Deleting account...');
      alert('Account eliminato');
    }
  }
}