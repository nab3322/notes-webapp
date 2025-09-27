import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard-container">
      <h1>Dashboard</h1>
      
      <div class="stats-grid">
        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">note</mat-icon>
              <div class="stat-info">
                <h2>{{stats.totalNotes}}</h2>
                <p>Note totali</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>

        <mat-card class="stat-card">
          <mat-card-content>
            <div class="stat-content">
              <mat-icon class="stat-icon">share</mat-icon>
              <div class="stat-info">
                <h2>{{stats.sharedNotes}}</h2>
                <p>Note condivise</p>
              </div>
            </div>
          </mat-card-content>
        </mat-card>
      </div>

      <div class="actions">
        <button mat-raised-button color="primary" routerLink="/notes">
          <mat-icon>add</mat-icon> Vai alle Note
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container { padding: 20px; max-width: 1200px; margin: 0 auto; }
    .stats-grid { 
      display: grid; 
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
      gap: 20px; 
      margin-bottom: 30px; 
    }
    .stat-content { display: flex; align-items: center; gap: 16px; }
    .stat-icon { font-size: 48px; width: 48px; height: 48px; color: #1976d2; }
    .stat-info h2 { margin: 0; font-size: 2rem; }
    .stat-info p { margin: 0; color: #666; }
    .actions { text-align: center; }
  `]
})
export class DashboardComponent {
  stats = {
    totalNotes: 42,
    sharedNotes: 12
  };
}