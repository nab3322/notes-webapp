import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
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
  `]
})
export class DashboardComponent {
  stats = {
    totalNotes: 42,
    sharedNotes: 12,
    folders: 8,
    recentActivity: 15
  };
}